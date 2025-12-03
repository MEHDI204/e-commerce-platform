import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ cartItems, total }) {
    const [updating, setUpdating] = useState(null);
    const [removing, setRemoving] = useState(null);

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        setUpdating(itemId);
        router.patch(route('cart.update', itemId), {
            quantity: newQuantity,
        }, {
            preserveScroll: true,
            onFinish: () => setUpdating(null),
        });
    };

    const handleRemove = (itemId) => {
        setRemoving(itemId);
        router.delete(route('cart.destroy', itemId), {
            preserveScroll: true,
            onFinish: () => setRemoving(null),
        });
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <PublicLayout>
                <Head title="Shopping Cart" />
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <div className="rounded-lg bg-white p-12 text-center shadow">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-2 text-sm text-gray-500">Start shopping to add items to your cart.</p>
                        <div className="mt-6">
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Shopping Cart" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const product = item.product;
                                const itemTotal = item.quantity * parseFloat(product.price);
                                const primaryImage = product.primary_image;

                                return (
                                    <div key={item.id} className="flex gap-4 rounded-lg bg-white p-4 shadow">
                                        <Link href={route('products.show', product.id)} className="shrink-0">
                                            <div className="h-24 w-24 overflow-hidden rounded-lg bg-gray-200">
                                                {primaryImage ? (
                                                    <img
                                                        src={primaryImage.image_url}
                                                        alt={primaryImage.alt_text || product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-gray-400">
                                                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        <div className="flex flex-1 flex-col">
                                            <div className="flex flex-1 justify-between">
                                                <div className="flex-1">
                                                    <Link
                                                        href={route('products.show', product.id)}
                                                        className="text-lg font-semibold text-gray-900 hover:text-gray-600"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    {product.category && (
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {product.category.name}
                                                        </p>
                                                    )}
                                                    <p className="mt-2 text-sm font-medium text-gray-900">
                                                        ${parseFloat(product.price).toFixed(2)}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    disabled={removing === item.id}
                                                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                                >
                                                    {removing === item.id ? (
                                                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        disabled={updating === item.id || item.quantity <= 1}
                                                        className="rounded-md border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center text-sm font-medium">
                                                        {updating === item.id ? '...' : item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        disabled={updating === item.id || item.quantity >= product.stock_quantity}
                                                        className="rounded-md border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50 disabled:opacity-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Subtotal</p>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ${itemTotal.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route('products.index')}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
                            
                            <div className="space-y-2 border-b border-gray-200 pb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-900">$10.00</span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                <span className="text-lg font-semibold text-gray-900">
                                    ${(total + total * 0.1 + 10).toFixed(2)}
                                </span>
                            </div>

                            <Link
                                href={route('orders.checkout')}
                                className="mt-6 block w-full rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-medium text-white hover:bg-gray-700"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

