<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'images')->active()->orderBy('name')->get();
        
        // Add primary_image to each product
        $products->each(function($product) {
            $product->primary_image = $product->images->where('is_primary', true)->first() 
                ?? $product->images->first();
        });
        
        return Inertia::render('Products/Index',[
            'products' => $products
        ]);
    }

    public function show($id)
    {
        $product = Product::with('category', 'images', 'reviews.user')
            ->active()
            ->findOrFail($id);
        
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}
