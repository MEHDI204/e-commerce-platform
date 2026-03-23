import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Checkout({ cartItems, subtotal, tax, shipping, total, addresses }) {
    const productImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBl6zVDO4V1b30Va9LUa9AiOe2jlbJMyKo4VewWkvCVTX5F-aZA0iinADnY2hdOZw8JDHKnj4uyvRYlKdsvg01RE2piAX_Qh9k7BM3d5vGYk6essLXtyY-jXBVLe-_um63GPL7swowsWwCJnmxhnwIJ5dhaKNbryeC2Ea0mmmixjbYNhAxr5WOZl94bNWfo1nRWzD1zW-kMabyU9geuNeEw9FyUTIZek6aT7sn7ToEIaLw9-z2o1xIBVSftG4_ywk3ZAT4gk0FWyhM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuANlz0XqDpCGADcHzYxKQb0tv4-Oltsix59wDbbO6MuMHN1FbIqvyt1FBTwsz0yDw9E7iexy0adl6zzRjvbfbcpJTwEdtxEeMqm5oPygzXiyt76MFXaGrFmv2Sxe_-FHOEkE79qZaPFrUP1-XRmcFYxap-NfX-Ei6Jy_1CdAJ6pqFoDHN8OMaGeOdqNjEEFVR3GueoN-E9YOqNl3vkorNgtu99sYOWaV4FnHe738qETWNMGRpcjj4nc4LTR9AsOUOfr-kBFg9LFQ6Y',
    ];
    const getProductImage = (index) => productImages[index % productImages.length];

    const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0);
    const [creatingAddress, setCreatingAddress] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        shipping_address_id: addresses.find(a => a.is_default)?.id || addresses[0]?.id || '',
        billing_address_id: addresses.find(a => a.is_default)?.id || addresses[0]?.id || '',
        payment_method: 'credit_card',
        address_line1: '',
        address_line2: '',
        city: '',
        state_province: '',
        postal_code: '',
        country: 'United States',
        recipient_name: '',
        recipient_phone: '',
    });

    const handleCreateAddress = async () => {
        setCreatingAddress(true);
        try {
            const response = await axios.post(route('addresses.store'), {
                address_line1: data.address_line1,
                address_line2: data.address_line2,
                city: data.city,
                state_province: data.state_province,
                postal_code: data.postal_code,
                country: data.country,
                recipient_name: data.recipient_name,
                recipient_phone: data.recipient_phone,
            });
            setData({
                ...data,
                shipping_address_id: response.data.id,
                billing_address_id: response.data.id,
            });
            setShowNewAddress(false);
            router.reload({ only: ['addresses'] });
        } catch (error) {
            console.error('Failed to create address:', error);
        } finally {
            setCreatingAddress(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <PublicLayout>
            <Head title="Checkout" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm font-medium text-[#8a8a60] dark:text-neutral-400 mb-8">
                    <Link href={route('cart.index')} className="hover:text-[#181811] dark:hover:text-white transition-colors">Cart</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-[#181811] dark:text-white font-bold">Checkout</span>
                </nav>

                <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-10">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Form Steps */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-8 bg-[#181811] dark:bg-primary rounded-full flex items-center justify-center text-white dark:text-[#181811] text-sm font-black">1</div>
                                <h2 className="text-lg font-black text-[#181811] dark:text-white">Shipping Address</h2>
                            </div>

                            {!showNewAddress && addresses.length > 0 && (
                                <div className="space-y-3">
                                    {addresses.map((address) => (
                                        <label key={address.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                            data.shipping_address_id == address.id
                                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                                : 'border-[#e6e6db] dark:border-neutral-700 hover:border-[#8a8a60]'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="shipping_address_id"
                                                value={address.id}
                                                checked={data.shipping_address_id == address.id}
                                                onChange={(e) => setData('shipping_address_id', e.target.value)}
                                                className="mt-1 text-primary focus:ring-primary"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-sm text-[#181811] dark:text-white">{address.recipient_name || 'Address'}</p>
                                                <p className="text-sm text-[#8a8a60] dark:text-neutral-400 mt-0.5">
                                                    {address.address_line1}{address.address_line2 && `, ${address.address_line2}`}
                                                </p>
                                                <p className="text-sm text-[#8a8a60] dark:text-neutral-400">
                                                    {address.city}, {address.state_province} {address.postal_code}
                                                </p>
                                                <p className="text-sm text-[#8a8a60] dark:text-neutral-400">{address.country}</p>
                                            </div>
                                        </label>
                                    ))}
                                    <button type="button" onClick={() => setShowNewAddress(true)} className="text-sm font-bold text-primary hover:underline">
                                        + Add New Address
                                    </button>
                                </div>
                            )}

                            {showNewAddress && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Full Name</label>
                                            <input type="text" value={data.recipient_name} onChange={(e) => setData('recipient_name', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Phone</label>
                                            <input type="text" value={data.recipient_phone} onChange={(e) => setData('recipient_phone', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Address Line 1 *</label>
                                        <input type="text" required value={data.address_line1} onChange={(e) => setData('address_line1', e.target.value)}
                                            className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Address Line 2</label>
                                        <input type="text" value={data.address_line2} onChange={(e) => setData('address_line2', e.target.value)}
                                            className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">City *</label>
                                            <input type="text" required value={data.city} onChange={(e) => setData('city', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">State/Province</label>
                                            <input type="text" value={data.state_province} onChange={(e) => setData('state_province', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Postal Code</label>
                                            <input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Country *</label>
                                            <input type="text" required value={data.country} onChange={(e) => setData('country', e.target.value)}
                                                className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        {addresses.length > 0 && (
                                            <button type="button" onClick={() => setShowNewAddress(false)} className="text-sm font-bold text-[#8a8a60] hover:text-[#181811] dark:hover:text-white transition-colors">
                                                ← Use Existing
                                            </button>
                                        )}
                                        <button type="button" onClick={handleCreateAddress} disabled={creatingAddress || !data.address_line1 || !data.city || !data.country}
                                            className="ml-auto px-5 py-2.5 bg-[#181811] dark:bg-primary text-white dark:text-[#181811] text-sm font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                                            {creatingAddress ? 'Saving...' : 'Save Address'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Billing Address */}
                        <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-8 bg-[#181811] dark:bg-primary rounded-full flex items-center justify-center text-white dark:text-[#181811] text-sm font-black">2</div>
                                <h2 className="text-lg font-black text-[#181811] dark:text-white">Billing Address</h2>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.billing_address_id === data.shipping_address_id}
                                    onChange={(e) => { if (e.target.checked) setData('billing_address_id', data.shipping_address_id); }}
                                    className="w-5 h-5 rounded border-[#e6e6db] dark:border-neutral-700 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-[#181811] dark:text-white">Same as shipping address</span>
                            </label>

                            {data.billing_address_id !== data.shipping_address_id && (
                                <div className="mt-4 space-y-3">
                                    {addresses.map((address) => (
                                        <label key={address.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                            data.billing_address_id == address.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-[#e6e6db] dark:border-neutral-700 hover:border-[#8a8a60]'
                                        }`}>
                                            <input type="radio" name="billing_address_id" value={address.id}
                                                checked={data.billing_address_id == address.id}
                                                onChange={(e) => setData('billing_address_id', e.target.value)}
                                                className="mt-1 text-primary focus:ring-primary" />
                                            <div className="flex-1">
                                                <p className="font-bold text-sm text-[#181811] dark:text-white">{address.recipient_name || 'Address'}</p>
                                                <p className="text-sm text-[#8a8a60] dark:text-neutral-400">{address.formatted_address}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-8 bg-[#181811] dark:bg-primary rounded-full flex items-center justify-center text-white dark:text-[#181811] text-sm font-black">3</div>
                                <h2 className="text-lg font-black text-[#181811] dark:text-white">Payment Method</h2>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { value: 'credit_card', label: 'Credit Card', icon: 'credit_card' },
                                    { value: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' },
                                    { value: 'cash_on_delivery', label: 'Cash on Delivery', icon: 'payments' },
                                ].map(method => (
                                    <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                                        data.payment_method === method.value
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                            : 'border-[#e6e6db] dark:border-neutral-700 hover:border-[#8a8a60]'
                                    }`}>
                                        <input type="radio" name="payment_method" value={method.value}
                                            checked={data.payment_method === method.value}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                            className="text-primary focus:ring-primary" />
                                        <span className="material-symbols-outlined text-[20px] text-[#8a8a60]">{method.icon}</span>
                                        <span className="text-sm font-bold text-[#181811] dark:text-white">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-[#f5f5f0] dark:bg-neutral-800/50 rounded-2xl p-6 space-y-6">
                            <h2 className="text-lg font-black text-[#181811] dark:text-white">Order Summary</h2>

                            <div className="space-y-4 max-h-64 overflow-y-auto">
                                {cartItems.map((item, itemIndex) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-lg bg-white dark:bg-neutral-700 overflow-hidden flex-shrink-0">
                                            <img src={getProductImage(itemIndex)} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-[#181811] dark:text-white truncate">{item.product.name}</p>
                                            <p className="text-xs text-[#8a8a60] dark:text-neutral-400">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-bold text-[#181811] dark:text-white">${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-[#e6e6db] dark:border-neutral-600" />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium text-[#8a8a60]">
                                    <span>Subtotal</span>
                                    <span className="text-[#181811] dark:text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-[#8a8a60]">
                                    <span>Tax (10%)</span>
                                    <span className="text-[#181811] dark:text-white">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-[#8a8a60]">
                                    <span>Shipping</span>
                                    <span className="text-[#181811] dark:text-white">${shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <hr className="border-[#e6e6db] dark:border-neutral-600" />

                            <div className="flex justify-between items-center">
                                <span className="text-base font-black text-[#181811] dark:text-white">Total</span>
                                <span className="text-xl font-black text-[#181811] dark:text-white">${total.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={processing || !data.shipping_address_id || !data.billing_address_id}
                                className="w-full flex items-center justify-center gap-2 h-12 bg-primary hover:bg-[#d9d900] active:scale-[0.98] rounded-lg text-[#181811] text-sm font-bold tracking-tight transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">lock</span>
                                {processing ? 'Placing Order...' : 'PLACE ORDER'}
                            </button>

                            {errors.shipping_address_id && <p className="text-sm text-red-500">{errors.shipping_address_id}</p>}
                            {errors.billing_address_id && <p className="text-sm text-red-500">{errors.billing_address_id}</p>}

                            <div className="flex items-center justify-center gap-2 text-[#8a8a60] dark:text-neutral-400">
                                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                                <span className="text-xs font-medium">Secure & encrypted checkout</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
