<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AddressController;

// Import Admin Controllers
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCategoryController;

// Public routes - accessible to everyone
Route::get('/', [ProductsController::class, 'index'])->name('home');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductsController::class, 'show'])->name('products.show');

// Cart routes - public (works for guests too)
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

// Authenticated routes - requires user to be logged in
Route::middleware('auth')->group(function () {
    // User Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Customer Addresses
    Route::post('/addresses', [AddressController::class, 'store'])->name('addresses.store');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // Categories (keeping auth for now)
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
});

/**
 * Admin Routes
 * 
 * These routes are for admin/owner management of the e-commerce platform
 * Protected by 'auth' middleware - only authenticated users can access
 * 
 * TODO: Add 'admin' middleware to restrict access to admin users only
 * For now, any authenticated user can access these routes
 * 
 * To add admin-only access:
 * 1. Create is_admin migration: php artisan make:migration add_is_admin_to_users_table
 * 2. Add boolean 'is_admin' field to users table
 * 3. Create admin middleware: php artisan make:middleware IsAdmin
 * 4. Register middleware in app/Http/Kernel.php
 * 5. Replace 'auth' with ['auth', 'admin'] in the middleware below
 */
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    
    // Admin Dashboard - shows statistics and overview
    // Accessible at: /admin/dashboard or just /dashboard (since dashboard redirects here)
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    /**
     * Admin Product Management Routes
     * Uses Laravel's resource controller for RESTful operations
     * 
     * GET    /admin/products          -> index()   - List all products (JSON)
     * POST   /admin/products          -> store()   - Create new product
     * PUT    /admin/products/{id}     -> update()  - Update existing product
     * DELETE /admin/products/{id}     -> destroy() - Delete product
     */
    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::put('/products/{id}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy'])->name('products.destroy');
    
    /**
     * Admin Category Management Routes
     * Uses Laravel's resource controller for RESTful operations
     * 
     * GET    /admin/categories        -> index()   - List all categories (JSON)
     * POST   /admin/categories        -> store()   - Create new category
     * PUT    /admin/categories/{id}   -> update()  - Update existing category
     * DELETE /admin/categories/{id}   -> destroy() - Delete category
     */
    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{id}', [AdminCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');
});

// Also make the /dashboard route point to admin dashboard for convenience
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
});

require __DIR__.'/auth.php';