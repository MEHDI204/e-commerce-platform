import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function PublicLayout({ children }) {
    const { auth, cartCount } = usePage().props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#181811] dark:text-white font-display">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-solid border-[#181811]/10 bg-white/80 backdrop-blur-md dark:bg-background-dark/80 dark:border-white/10 px-4 md:px-10 py-3">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between whitespace-nowrap">
                    {/* Logo & Nav */}
                    <div className="flex items-center gap-8">
                        <Link href={route('home')} className="flex items-center gap-2 text-[#181811] dark:text-white">
                            <div className="size-6 bg-[#181811] dark:bg-primary flex items-center justify-center rounded">
                                <span className="material-symbols-outlined text-white dark:text-background-dark text-sm">grid_view</span>
                            </div>
                            <h2 className="text-xl font-black leading-tight tracking-[-0.05em]">wisyshop</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8 ml-4">
                            <Link href={route('products.index')} className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Shop</Link>
                            <Link href="/about" className="text-sm font-medium uppercase tracking-wider text-[#8a8a60] hover:text-[#181811] dark:hover:text-white transition-colors">About</Link>
                            <Link href="/contact" className="text-sm font-medium uppercase tracking-wider text-[#8a8a60] hover:text-[#181811] dark:hover:text-white transition-colors">Contact</Link>
                        </nav>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex flex-1 justify-end items-center gap-6">
                        <form onSubmit={handleSearch} className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64 relative">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#181811]/10 dark:border-white/10">
                                <div className="text-[#8a8a60] flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-[#8a8a60] px-3 text-sm font-normal"
                                    placeholder="Search items..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>

                        <div className="flex gap-3">
                            {user ? (
                                <Link
                                    href={user.is_admin ? route('admin.dashboard') : route('profile.edit')}
                                    className="flex items-center justify-center rounded-full h-10 w-10 hover:bg-[#181811]/5 dark:hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined">person</span>
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="flex items-center justify-center rounded-full h-10 w-10 hover:bg-[#181811]/5 dark:hover:bg-white/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined">person</span>
                                </Link>
                            )}
                            <Link
                                href={route('cart.index')}
                                className="flex items-center justify-center rounded-full h-10 w-10 hover:bg-[#181811]/5 dark:hover:bg-white/5 transition-colors relative"
                            >
                                <span className="material-symbols-outlined">shopping_basket</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-primary text-[#181811] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center h-10 w-10"
                        >
                            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#181811]/10 dark:border-white/10 mt-3 pt-4 pb-2 max-w-[1440px] mx-auto">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex items-center bg-[#f5f5f0] dark:bg-[#2a2a1a] rounded-lg px-3 py-2">
                                <span className="material-symbols-outlined text-[#8a8a60] text-[20px]">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-[#181811] dark:text-white placeholder-[#8a8a60]"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                        <nav className="flex flex-col gap-2">
                            <Link href={route('products.index')} className="text-sm font-medium py-2 hover:text-primary transition-colors">Shop</Link>
                            <Link href="/about" className="text-sm font-medium py-2 hover:text-primary transition-colors">About</Link>
                            <Link href="/contact" className="text-sm font-medium py-2 hover:text-primary transition-colors">Contact</Link>
                            <Link href="/help" className="text-sm font-medium py-2 hover:text-primary transition-colors">Help</Link>
                            {user && (
                                <>
                                    <Link href={route('orders.index')} className="text-sm font-medium py-2 hover:text-primary transition-colors">Orders</Link>
                                    <Link href={route('profile.edit')} className="text-sm font-medium py-2 hover:text-primary transition-colors">Profile</Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="mt-24 border-t border-[#181811]/10 dark:border-white/10 bg-white dark:bg-background-dark py-16">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="size-6 bg-[#181811] dark:bg-primary flex items-center justify-center rounded">
                                <span className="material-symbols-outlined text-white dark:text-background-dark text-sm">grid_view</span>
                            </div>
                            <h2 className="text-xl font-black tracking-[-0.05em]">wisyshop</h2>
                        </div>
                        <p className="text-[#8a8a60] text-sm leading-relaxed">
                            Elevating your daily experience through thoughtful design and high-quality materials.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6">Shop</h4>
                        <ul className="flex flex-col gap-4 text-sm font-medium text-[#8a8a60]">
                            <li><Link href={route('products.index')} className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href={route('products.index')} className="hover:text-primary transition-colors">Featured Items</Link></li>
                            <li><Link href={route('categories.index')} className="hover:text-primary transition-colors">Collections</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6">Support</h4>
                        <ul className="flex flex-col gap-4 text-sm font-medium text-[#8a8a60]">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-[#8a8a60] text-sm mb-4">Join for early access and updates.</p>
                        <form className="flex border-b-2 border-[#181811] dark:border-white py-2">
                            <input className="bg-transparent border-none flex-1 focus:ring-0 text-sm p-0 text-[#181811] dark:text-white placeholder:text-[#8a8a60]" placeholder="Your email" type="email" />
                            <button type="submit"><span className="material-symbols-outlined">arrow_forward</span></button>
                        </form>
                    </div>
                </div>
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[#8a8a60] uppercase tracking-widest">
                    <p>© 2024 Minimal E-commerce</p>
                    <div className="flex gap-6">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">Pinterest</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
