import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }) {
    const statusColors = {
        delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        processing: 'bg-primary/20 text-[#181811] dark:text-primary',
        pending: 'bg-[#f5f5f0] text-[#8a8a60] dark:bg-neutral-700 dark:text-neutral-300',
    };

    return (
        <PublicLayout>
            <Head title="My Orders" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-16">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="md:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-1">
                            <h2 className="text-lg font-black text-[#181811] dark:text-white mb-4">My Account</h2>
                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#8a8a60] hover:text-[#181811] hover:bg-[#f5f5f0] dark:hover:text-white dark:hover:bg-neutral-800 transition-colors">
                                <span className="material-symbols-outlined text-lg">person</span>
                                Profile
                            </Link>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-[#181811] dark:text-white bg-[#f5f5f0] dark:bg-neutral-800">
                                <span className="material-symbols-outlined text-lg">receipt_long</span>
                                Orders
                            </div>
                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#8a8a60] hover:text-[#181811] hover:bg-[#f5f5f0] dark:hover:text-white dark:hover:bg-neutral-800 transition-colors">
                                <span className="material-symbols-outlined text-lg">settings</span>
                                Settings
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-8">My Orders</h1>

                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-[#f5f5f0] dark:bg-neutral-800/50 rounded-2xl">
                                <span className="material-symbols-outlined text-6xl text-[#e6e6db] dark:text-neutral-600">receipt_long</span>
                                <p className="text-[#8a8a60] dark:text-neutral-400 mt-4 font-medium">You haven't placed any orders yet.</p>
                                <Link
                                    href={route('products.index')}
                                    className="inline-flex items-center gap-2 mt-6 bg-primary hover:bg-[#d9d900] text-[#181811] px-6 py-3 rounded-lg text-sm font-bold transition-all active:scale-[0.98]"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <Link key={order.id} href={route('orders.show', order.id)} className="block group">
                                        <div className="bg-white dark:bg-neutral-800/50 border border-[#e6e6db] dark:border-neutral-700 rounded-2xl p-6 hover:border-[#8a8a60] dark:hover:border-neutral-500 transition-all">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-sm font-black text-[#181811] dark:text-white">
                                                            Order #{order.order_number}
                                                        </h3>
                                                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColors[order.order_status] || statusColors.pending}`}>
                                                            {order.order_status}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-[#8a8a60] dark:text-neutral-400 font-medium">
                                                        {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        {' · '}
                                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-lg font-black text-[#181811] dark:text-white">
                                                        ${parseFloat(order.total_amount).toFixed(2)}
                                                    </p>
                                                    <span className="material-symbols-outlined text-[#8a8a60] group-hover:text-[#181811] dark:group-hover:text-white transition-colors">arrow_forward</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PublicLayout>
    );
}
