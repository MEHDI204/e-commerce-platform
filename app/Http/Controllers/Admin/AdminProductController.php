<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminProductController extends Controller
{
    /**
     * Display a listing of all products for admin management
     * 
     * Returns all products with their category and primary image
     * Used in the admin dashboard products table
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Get all products with their relationships
        $products = Product::with(['category', 'images'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($product) {
                // Find the primary image or use the first available image
                $primaryImage = $product->images->where('is_primary', true)->first()
                    ?? $product->images->first();

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'price' => $product->price,
                    'stock_quantity' => $product->stock_quantity,
                    'category' => $product->category ? $product->category->name : 'No Category',
                    'category_id' => $product->category_id,
                    'is_active' => $product->is_active,
                    'image_url' => $primaryImage ? $primaryImage->image_url : null,
                    'description' => $product->description,
                    'compare_price' => $product->compare_price,
                    'cost' => $product->cost,
                    'weight' => $product->weight,
                ];
            });

        return response()->json($products);
    }

    /**
     * Store a newly created product in the database
     * 
     * Handles:
     * - Product creation with all fields
     * - Automatic slug generation from product name
     * - Image upload and storage
     * - Primary image creation
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // Max 10MB
        ]);

        try {
            DB::beginTransaction();

            // Generate a unique slug from the product name
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $counter = 1;

            // Ensure slug is unique by appending a number if necessary
            while (Product::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            // Create the product
            $product = Product::create([
                'name' => $validated['name'],
                'slug' => $slug,
                'sku' => $validated['sku'],
                'description' => $validated['description'] ?? null,
                'price' => $validated['price'],
                'compare_price' => $validated['compare_price'] ?? null,
                'cost' => $validated['cost'] ?? null,
                'stock_quantity' => $validated['stock_quantity'],
                'weight' => $validated['weight'] ?? null,
                'category_id' => $validated['category_id'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
            ]);

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Generate unique filename: timestamp-random-originalname
                $filename = time() . '-' . Str::random(10) . '.' . $image->getClientOriginalExtension();

                // Store in public/storage/products directory
                $path = $image->storeAs('products', $filename, 'public');

                // Create product image record with the primary flag set to true
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => '/storage/' . $path,
                    'alt_text' => $product->name,
                    'is_primary' => true,
                    'sort_order' => 0,
                ]);
            }

            DB::commit();

            // Return the created product with its relationships
            $product->load('category', 'images');

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified product in the database
     * 
     * Handles:
     * - Updating all product fields
     * - Regenerating slug if name changes
     * - Replacing primary image if new image is uploaded
     * - Deleting old image file from storage
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Validate incoming request data
        // SKU must be unique except for the current product
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku,' . $id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        try {
            DB::beginTransaction();

            // Regenerate slug if product name has changed
            if ($product->name !== $validated['name']) {
                $slug = Str::slug($validated['name']);
                $originalSlug = $slug;
                $counter = 1;

                // Ensure new slug is unique
                while (Product::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                    $slug = $originalSlug . '-' . $counter;
                    $counter++;
                }

                $validated['slug'] = $slug;
            }

            // Update product with validated data
            $product->update($validated);

            // Handle new image upload if provided
            if ($request->hasFile('image')) {
                // Get the current primary image
                $oldImage = $product->images()->where('is_primary', true)->first();

                // Delete old image file from storage if it exists
                if ($oldImage && $oldImage->image_url) {
                    $oldPath = str_replace('/storage/', '', $oldImage->image_url);
                    Storage::disk('public')->delete($oldPath);
                    $oldImage->delete();
                }

                // Upload and store new image
                $image = $request->file('image');
                $filename = time() . '-' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('products', $filename, 'public');

                // Create new primary image record
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => '/storage/' . $path,
                    'alt_text' => $product->name,
                    'is_primary' => true,
                    'sort_order' => 0,
                ]);
            }

            DB::commit();

            // Return updated product with relationships
            $product->load('category', 'images');

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified product from the database
     * 
     * Handles:
     * - Deleting all associated product images from storage
     * - Deleting product image records
     * - Deleting the product (cascade will handle other relationships)
     * 
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            DB::beginTransaction();

            // Delete all associated image files from storage
            foreach ($product->images as $image) {
                if ($image->image_url) {
                    $path = str_replace('/storage/', '', $image->image_url);
                    Storage::disk('public')->delete($path);
                }
            }

            // Delete product (cascade will delete product_images records)
            $product->delete();

            DB::commit();

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}