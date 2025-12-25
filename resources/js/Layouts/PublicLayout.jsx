import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Search, User, ChevronDown, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [searchOpen, setSearchOpen] = useState(false);
    const [country, setCountry] = useState('Canada (CAD $)');

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className={`border-b border-gray-200 fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${isScrolled ? 'py-3 shadow-md' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Left - Category Menu */}
                        <div className="flex items-center gap-4">
                            <button
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Center - Logo */}
                        <Link href={route('home')} className={`absolute left-1/2 -translate-x-1/2 font-extrabold tracking-tight text-outline transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-3xl leading-none'}`}>
                            {isScrolled ? (
                                <div>WISY SHOP</div>
                            ) : (
                                <>

                                    <div>WISY SHOP</div>
                                </>
                            )}
                        </Link>

                        {/* Right Icons */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                            )}

                            <Link
                                href={route('cart.index')}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="bg-white border-b border-gray-200 fixed top-[73px] left-0 right-0 z-40 p-4">
                    <div className="max-w-7xl mx-auto flex items-center gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                                autoFocus
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                                <Search className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                            type="button"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className={`pt-[89px] transition-all duration-300 ${searchOpen ? 'pt-[145px]' : ''}`}>{children}</main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Country/region</span>
                            <div className="relative">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:border-gray-400 transition-colors">
                                    {country}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                VISA
                            </div>
                            <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                AMEX
                            </div>
                            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                PP
                            </div>
                            <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                D
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                        © 2025, bifibwejfijjsnjknbfjkbfb
                    </div>
                </div>
            </footer>
        </div>
    );
}