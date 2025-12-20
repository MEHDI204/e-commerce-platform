<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    // Get cart items
    public function index()
    {
        $cartItems = CartItem::with('product.category', 'product.images')
            ->where(function($query) {
                if (Auth::check()) {
                    $query->where('user_id', Auth::id());
                } else {
                    $query->where('session_id', Session::getId());
                }
            })
            ->get();
        
        // Add primary_image to each product
        $cartItems->each(function($item) {
            $item->product->primary_image = $item->product->images->where('is_primary', true)->first() 
                ?? $item->product->images->first();
        });

        $total = $cartItems->sum(function($item) {
            return $item->quantity * $item->product->price;
        });

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    // Add item to cart
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check stock
        if ($product->stock_quantity < $request->quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cartItem = CartItem::where(function($query) use ($request) {
            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }
        })
        ->where('product_id', $request->product_id)
        ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => Auth::id(),
                'session_id' => Auth::check() ? null : Session::getId(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return redirect()->route('cart.index')->with('success', 'Product added to cart!');
    }

    // Update cart item quantity
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where(function($query) {
            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }
        })->findOrFail($id);

        if ($cartItem->product->stock_quantity < $request->quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return redirect()->route('cart.index')->with('success', 'Cart updated!');
    }

    // Remove item from cart
    public function destroy($id)
    {
        $cartItem = CartItem::where(function($query) {
            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }
        })->findOrFail($id);

        $cartItem->delete();

        return redirect()->route('cart.index')->with('success', 'Item removed from cart!');
    }

    // Get cart count (for navigation)
    public function count()
    {
        $count = CartItem::where(function($query) {
            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }
        })->sum('quantity');

        return response()->json(['count' => $count]);
    }
}

