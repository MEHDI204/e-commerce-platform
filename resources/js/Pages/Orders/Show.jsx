import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order }) {
    const productImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBLc3g6qbr-Szkia9y_XPlULufLK7IXcR0Oi03bzr8RnzQfO5XjW0QZwYktXZRcMaAZTQ8Oa9o00yUHLrGBCqQdnFDezd2YNNlND-mYkBOyfZaMKkc46T-a1gBaNe-_-e8GTSyLv25fjU8OPfbvCAhfZq4RPhsD3dKFTjtdiwfZbea2THaouRxhaL3Cf-_hnDKAnZp7bH9IuXN0bEp65kNjvljvR43m1ct_Gxciis-YAL-2x19-IpYYLpF7oeA9tVLo2fVzAaYxXNE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC-xlU30P_WOt0UC88YnAW3Gic9CTf-Hz89ogHu2yw0qp6nstgblahZldKIC3FtlEENULDvaa2wVM4O56Hg9mM7vUQqQvOlToMJ5_Tp3Axy4BY2S2JEsmpiTx-NIa4hBsbEhIsgUBbXu_PMroM3FrwBD8UNCyClY_52bvvZfBy5cYudR3H-nsSx-HXLFpWhVTWjtp6kCh9vxIiHDeWogI1Mkj_J7RmNjsADcT63cnfZDrRFczotzQBKnVPjKXq1zPhzc1gFn1_R3Xw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA6YEauJLtnt3XS81uwfAb5S5pLQ53sT-smqDkofdD1aRyWJ49XKo4Ey7Cn1opyWzOnMubO8VJLuzjtzjajUJolc3fLM1-j_YKM0pJXdFHzQhI7rMY2I-fZ8CIMybinGhYhg0lTqSNLUKLYqikc47G9pGw9K9bj9k3BXCRVetoboJ9rRxynNXbT3BvFlDBlt3yYimzHdulnc5M1iqDhbJZbksmhdbTiBUjap4RA4i2hqp4NM7Fmi98XuJyNeXd1gxvchd4Z0E5uuCo',
    ];
    const getProductImage = (index) => productImages[index % productImages.length];

    const statusColors = {
        delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        processing: 'bg-primary/20 text-[#181811] dark:text-primary',
        pending: 'bg-[#f5f5f0] text-[#8a8a60] dark:bg-neutral-700 dark:text-neutral-300',
    };

    return (
        <PublicLayout>
            <Head title={`Order #${order.order_number}`} />
            <div className="max-w-[900px] mx-auto px-4 md:px-10 py-12 md:py-16">

                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-3">
                        Thank you for your order!
                    </h1>
                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium max-w-md mx-auto">
                        Your order <span className="font-bold text-[#181811] dark:text-white">#{order.order_number}</span> has been placed successfully.
                    </p>
                </div>

                {/* Order Card */}
                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 overflow-hidden">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-[#e6e6db] dark:border-neutral-700 gap-4">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-1">Order Number</p>
                            <p className="text-lg font-black text-[#181811] dark:text-white">#{order.order_number}</p>
                            <p className="text-xs text-[#8a8a60] dark:text-neutral-400 font-medium mt-1">
                                Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${statusColors[order.order_status] || statusColors.pending}`}>
                            {order.order_status}
                        </span>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border-b border-[#e6e6db] dark:border-neutral-700">
                        {order.shipping_address && (
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-3">Shipping Address</p>
                                <div className="text-sm font-medium text-[#181811] dark:text-white space-y-0.5">
                                    <p className="font-bold">{order.shipping_address.recipient_name || 'N/A'}</p>
                                    <p className="text-[#8a8a60] dark:text-neutral-400">{order.shipping_address.address_line1}{order.shipping_address.address_line2 && `, ${order.shipping_address.address_line2}`}</p>
                                    <p className="text-[#8a8a60] dark:text-neutral-400">{order.shipping_address.city}, {order.shipping_address.state_province} {order.shipping_address.postal_code}</p>
                                    <p className="text-[#8a8a60] dark:text-neutral-400">{order.shipping_address.country}</p>
                                </div>
                            </div>
                        )}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-3">Payment</p>
                            <div className="text-sm font-medium space-y-1">
                                {order.payment_method && (
                                    <p className="text-[#181811] dark:text-white font-bold">
                                        {order.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </p>
                                )}
                                <p className={`text-sm font-bold ${order.payment_status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
                                    {order.payment_status?.charAt(0).toUpperCase() + order.payment_status?.slice(1)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b border-[#e6e6db] dark:border-neutral-700">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-4">Items</p>
                        <div className="space-y-4">
                            {order.items.map((item, itemIndex) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[#f5f5f0] dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
                                        <img src={getProductImage(itemIndex)} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#181811] dark:text-white truncate">{item.product.name}</p>
                                        <p className="text-xs text-[#8a8a60] dark:text-neutral-400">Qty: {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm font-black text-[#181811] dark:text-white">${parseFloat(item.total_price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between text-sm font-medium text-[#8a8a60] dark:text-neutral-400">
                            <span>Subtotal</span>
                            <span className="text-[#181811] dark:text-white">${parseFloat(order.subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-[#8a8a60] dark:text-neutral-400">
                            <span>Tax</span>
                            <span className="text-[#181811] dark:text-white">${parseFloat(order.tax_amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-[#8a8a60] dark:text-neutral-400">
                            <span>Shipping</span>
                            <span className="text-[#181811] dark:text-white">${parseFloat(order.shipping_amount).toFixed(2)}</span>
                        </div>
                        <hr className="border-[#e6e6db] dark:border-neutral-600 my-2" />
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-base font-black text-[#181811] dark:text-white">Total</span>
                            <span className="text-xl font-black text-[#181811] dark:text-white">${parseFloat(order.total_amount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link
                        href={route('products.index')}
                        className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary hover:bg-[#d9d900] rounded-lg text-[#181811] text-sm font-bold tracking-tight transition-all active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-lg">storefront</span>
                        Continue Shopping
                    </Link>
                    <Link
                        href={route('orders.index')}
                        className="flex-1 flex items-center justify-center gap-2 h-12 border border-[#e6e6db] dark:border-neutral-700 rounded-lg text-[#181811] dark:text-white text-sm font-bold tracking-tight hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 transition-all active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-lg">receipt_long</span>
                        View All Orders
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
