<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display the home page with featured products
     */
    public function home()
    {
        $featuredProducts = Product::with('category', 'images')->active()->orderBy('created_at', 'desc')->take(4)->get();
        
        $featuredProducts->each(function($product) {
            $product->primary_image = $product->images->where('is_primary', true)->first() 
                ?? $product->images->first();
        });

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts
        ]);
    }

    /**
     * Display a listing of all active products
     */
    public function index()
    {
        $products = Product::with('category', 'images')->active()->orderBy('name')->get();
        
        $products->each(function($product) {
            $product->primary_image = $product->images->where('is_primary', true)->first() 
                ?? $product->images->first();
        });
        
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Search products by query
     */
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        
        $products = Product::with('category', 'images')
            ->active()
            ->when($query, function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->orderBy('name')
            ->get();

        $products->each(function($product) {
            $product->primary_image = $product->images->where('is_primary', true)->first() 
                ?? $product->images->first();
        });

        return Inertia::render('SearchResults', [
            'products' => $products,
            'query' => $query,
        ]);
    }

    /**
     * Display the specified product
     * 
     * Uses route model binding - Laravel automatically finds the product
     * 
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        // Load relationships
        $product->load('category', 'images', 'reviews.user');
        
        // Only show if product is active
        if (!$product->is_active) {
            abort(404, 'Product not found or is no longer available.');
        }
        
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}