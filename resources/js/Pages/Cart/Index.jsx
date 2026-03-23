import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ cartItems, total, auth }) {
    const productImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA8f-eJ9HwYTxRbWtqKisoc5fUoE2G0X5nrMQGdPST9I5_B1H2i-eBlOtTBAQWQ_MyFgkyNPE1uJDiPLMRWlTWFchLtcnIld1pBtfhLMvQ6rzb3qVp9cdA_X6DrIh2lOp9OyTSHSxg5dYrE9l0wOa3hPKTQdr6vdoRBfn6s9divZ7bJ3FWGh2EA6YnMLxBJwdC1HgHm4yxpZ1_llDerRwuFPljADj8hXFnBMoqWQ9tWL8s5_oCyNe3fUebF9C0TW9Y763ZL1xioO8Q',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAc8tkZPvx2kiKvfwv5tuYMWUXsS3BvuxK7cCcaNaPLLa8MUllNGIcWZpPL6lUuWKQeCV9g_rv1cURCcbS1yP0u2-A5EWQshHuQjH1yExCQzRNj9GCB9aAmW_062-nAz3CdISx68E7DKkOd4Mn-YamtUBH7ObPFRFAyB2LnDLKfGlVYOnzKnrvbDLI_F0-xx4pZItvcpmmZF1XrNqvp-FPymViKuTeCiwkvBDuUFi-YsPR5SNH7ETs5vAHEOEpLyymDkCSUYAVr6FI',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBGQHDsKX90kGcdFsRDRRjAOdVsTnMlIgTRxTTSXQidWZVrFfWDiTiRsmRZXLj-WlWu8vybqXhEXieKRm1QUK7LiTHJLs8DzJ3D_9xyxsigDO-BjL75NjII3Uh_XVlNAvjZrQMFQIV1nH2jilYdTQfo3i7tmLqq0Q-T0-L_byxtjNCfgarjFwlSVuKAFDyLqpXfmwBn5L5l3IVVqIXtVZrcZJ7HYLqIRHH9UEbUbCc1FiIGoVBXbIiYCBrBOODQPqQZADuDBYI_2M8',
    ];
    const getProductImage = (index) => productImages[index % productImages.length];

    const [updating, setUpdating] = useState(null);
    const [removing, setRemoving] = useState(null);

    const handleCheckout = () => {
        if (!auth?.user) {
            router.visit(route('login'), {
                data: { intended: route('orders.checkout') }
            });
        } else {
            router.visit(route('orders.checkout'));
        }
    };

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

    // Empty cart
    if (!cartItems || cartItems.length === 0) {
        return (
            <PublicLayout>
                <Head title="Shopping Cart" />
                <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4 text-center">
                    <span className="material-symbols-outlined text-7xl text-[#e6e6db] dark:text-neutral-700 mb-6">shopping_bag</span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#181811] dark:text-white mb-4 tracking-[-0.03em]">Your cart is empty</h1>
                    <p className="text-[#8a8a60] dark:text-neutral-400 text-base max-w-md mb-10 font-medium">
                        Looks like you haven't added anything yet. Let's find something special for you.
                    </p>
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-[#d9d900] text-[#181811] px-8 py-3 rounded-lg text-sm font-bold tracking-tight transition-all active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-lg">storefront</span>
                        Explore Products
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Shopping Cart" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em]">
                        Shopping Cart
                        <span className="ml-3 text-lg font-bold text-[#8a8a60] dark:text-neutral-400">({cartItems.length})</span>
                    </h1>
                    <Link href={route('products.index')} className="text-sm font-bold text-[#8a8a60] hover:text-[#181811] dark:hover:text-white transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-1">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>
                        <hr className="border-[#e6e6db] dark:border-neutral-700" />

                        {cartItems.map((item, itemIndex) => (
                            <div key={item.id} className="group">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-6">
                                    {/* Product */}
                                    <div className="col-span-6 flex items-center gap-5">
                                        <div className="w-20 h-20 rounded-xl bg-[#f5f5f0] dark:bg-neutral-800 overflow-hidden flex-shrink-0">
                                            <img
                                                src={getProductImage(itemIndex)}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <Link href={route('products.show', item.product.id)} className="text-sm font-bold text-[#181811] dark:text-white hover:text-primary transition-colors">
                                                {item.product.name}
                                            </Link>
                                            {item.product.category && (
                                                <p className="text-xs text-[#8a8a60] dark:text-neutral-400 font-medium mt-0.5">{item.product.category.name}</p>
                                            )}
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                disabled={removing === item.id}
                                                className="text-xs text-red-500 hover:text-red-700 font-bold mt-2 transition-colors disabled:opacity-50 flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                {removing === item.id ? 'Removing...' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-span-2 flex justify-center">
                                        <div className="flex items-center border border-[#e6e6db] dark:border-neutral-700 rounded-lg">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={updating === item.id || item.quantity <= 1}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 rounded-l-lg transition-colors disabled:opacity-30"
                                            >
                                                <span className="material-symbols-outlined text-base">remove</span>
                                            </button>
                                            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                disabled={updating === item.id}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 rounded-r-lg transition-colors disabled:opacity-30"
                                            >
                                                <span className="material-symbols-outlined text-base">add</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 text-right text-sm font-bold text-[#181811] dark:text-white">
                                        ${parseFloat(item.product.price).toFixed(2)}
                                    </div>

                                    {/* Total */}
                                    <div className="col-span-2 text-right text-sm font-black text-[#181811] dark:text-white">
                                        ${(item.quantity * parseFloat(item.product.price)).toFixed(2)}
                                    </div>
                                </div>
                                <hr className="border-[#e6e6db] dark:border-neutral-700" />
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-[#f5f5f0] dark:bg-neutral-800/50 rounded-2xl p-6 space-y-6">
                            <h2 className="text-lg font-black text-[#181811] dark:text-white">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-medium text-[#8a8a60] dark:text-neutral-400">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span className="text-[#181811] dark:text-white font-bold">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-[#8a8a60] dark:text-neutral-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600 dark:text-green-400 font-bold">Free</span>
                                </div>
                            </div>

                            <hr className="border-[#e6e6db] dark:border-neutral-600" />

                            <div className="flex justify-between items-center">
                                <span className="text-base font-black text-[#181811] dark:text-white">Total</span>
                                <span className="text-xl font-black text-[#181811] dark:text-white">${total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full flex items-center justify-center gap-2 h-12 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all rounded-lg text-[#181811] text-sm font-bold tracking-tight shadow-sm"
                            >
                                <span className="material-symbols-outlined text-lg">lock</span>
                                Proceed to Checkout
                            </button>

                            <div className="flex items-center justify-center gap-4 pt-2">
                                <span className="material-symbols-outlined text-[#8a8a60] text-[18px]">credit_card</span>
                                <span className="material-symbols-outlined text-[#8a8a60] text-[18px]">account_balance</span>
                                <span className="material-symbols-outlined text-[#8a8a60] text-[18px]">verified_user</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}