import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const placeholderProducts = [
    { id: 'p1', name: 'Essential Oversized Tee', price: '59.00', category: { name: 'Menswear' }, primary_image: null, is_featured: true, is_new: false },
    { id: 'p2', name: 'Structured Canvas Tote', price: '129.00', category: { name: 'Accessories' }, primary_image: null, is_featured: false, is_new: true },
    { id: 'p3', name: 'Relaxed Fit Chinos', price: '89.00', category: { name: 'Menswear' }, primary_image: null, is_featured: true, is_new: false },
    { id: 'p4', name: 'Minimalist Chronograph', price: '249.00', category: { name: 'Accessories' }, primary_image: null, is_featured: false, is_new: true },
];

export default function Welcome({ auth, products }) {
    const displayProducts = products && products.length > 0 ? products : placeholderProducts;
    const [addingToCart, setAddingToCart] = useState(null);

    const handleAddToCart = (productId) => {
        if (typeof productId === 'string') return;
        setAddingToCart(productId);
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            onFinish: () => setAddingToCart(null),
        });
    };

    return (
        <PublicLayout>
            <Head title="wisyshop - Essentials Redefined" />

            {/* Hero Section */}
            <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-text-main">
                <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-text-main/80 via-text-main/40 to-transparent"></div>
                <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full">
                    <div className="max-w-2xl">
                        <p className="text-text-muted uppercase tracking-[0.3em] text-xs font-display mb-6">New Collection 2026</p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-display tracking-tight leading-[0.9] mb-6">
                            ESSENTIALS<br />REDEFINED
                        </h1>
                        <p className="text-lg text-white/70 mb-10 max-w-md font-light leading-relaxed">
                            Timeless pieces designed for the modern wardrobe. Quality meets simplicity.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('products.index')}
                                className="inline-flex items-center gap-2 bg-primary text-text-main px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-[#d9d900] transition-colors shadow-lg"
                            >
                                Shop the Collection
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Link>
                            <a
                                href="#lookbook"
                                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all"
                            >
                                Lookbook
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 md:py-28 bg-background-light">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-text-muted uppercase tracking-[0.3em] text-xs font-display mb-2">Curated for you</p>
                            <h2 className="text-3xl md:text-4xl font-black font-display text-text-main tracking-tight">
                                Featured Products
                            </h2>
                        </div>
                        <Link
                            href={route('products.index')}
                            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-text-main hover:text-primary transition-colors"
                        >
                            View All
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayProducts.slice(0, 4).map((product) => (
                            <div
                                key={product.id}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white mb-4">
                                    <Link href={typeof product.id === 'number' ? route('products.show', product.id) : '#'}>
                                        {product.primary_image ? (
                                            <img
                                                src={product.primary_image.image_url}
                                                alt={product.primary_image.alt_text || product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#f0f0e8] flex items-center justify-center">
                                                <span className="material-symbols-outlined text-5xl text-text-muted/30">image</span>
                                            </div>
                                        )}
                                    </Link>

                                    {(product.is_new || product.is_featured) && (
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.is_new ? 'bg-primary text-text-main' : 'bg-text-main text-white'}`}>
                                                {product.is_new ? 'New' : 'Featured'}
                                            </span>
                                        </div>
                                    )}

                                    {typeof product.id === 'number' && (
                                        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={addingToCart === product.id}
                                                className="w-full bg-text-main text-white py-3 text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors disabled:opacity-50"
                                            >
                                                {addingToCart === product.id ? 'Adding...' : (
                                                    <span className="flex items-center justify-center gap-1">
                                                        <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                                                        Quick Add
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <Link href={typeof product.id === 'number' ? route('products.show', product.id) : '#'}>
                                    <p className="text-[11px] text-text-muted uppercase tracking-wider mb-1">
                                        {product.category?.name || 'Category'}
                                    </p>
                                    <h3 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-bold text-text-main">
                                        ${parseFloat(product.price).toFixed(2)}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden mt-8 text-center">
                        <Link
                            href={route('products.index')}
                            className="inline-flex items-center gap-1 text-sm font-medium text-text-main hover:text-primary transition-colors"
                        >
                            View All Products
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-16 md:py-20 bg-primary">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black font-display text-text-main tracking-tight mb-2">
                            Free Shipping on orders over $100
                        </h2>
                        <p className="text-text-muted text-sm">No code needed. Applied automatically at checkout.</p>
                    </div>
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center gap-2 bg-text-main text-white px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-black/80 transition-colors shadow-lg whitespace-nowrap"
                    >
                        Claim Offer
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </div>
            </section>

            {/* Category Cards */}
            <section className="py-20 md:py-28 bg-background-light">
                <div className="max-w-[1280px] mx-auto px-6 md:px-10">
                    <div className="text-center mb-12">
                        <p className="text-text-muted uppercase tracking-[0.3em] text-xs font-display mb-2">Shop by category</p>
                        <h2 className="text-3xl md:text-4xl font-black font-display text-text-main tracking-tight">
                            Explore Collections
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href={route('products.index', { category: 'menswear' })}
                            className="group relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                                alt="Menswear"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-main/80 via-text-main/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-display mb-2">Collection</p>
                                <h3 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight mb-4">
                                    Menswear
                                </h3>
                                <span className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                    Shop Now
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </span>
                            </div>
                        </Link>

                        <Link
                            href={route('products.index', { category: 'accessories' })}
                            className="group relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1611923134239-b9be5816e778?w=800&q=80"
                                alt="Accessories"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-main/80 via-text-main/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-display mb-2">Collection</p>
                                <h3 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight mb-4">
                                    Accessories
                                </h3>
                                <span className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                    Shop Now
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
