import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products }) {
    const productImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBK7fVNUW_FnDR8EQZp6bfYFBROAAD6mKDgrVlUSqbgtBoZm_Db_-TGF-A-1yyD3g-StT4gOAkzVrkd5urcuwEfDfEz25R9e0413P4ERcrKAkcCpZwy1AXa9LysANdSMWchcl0ytJYJtdBndu152YXYzAAE4B1MMuxwLN_A1vmTuVehwHCiIy7x5dOhMa3E3gb9WMm_JaQQGGheDgemcgv7xR_yhAL-s-9yJnhtlpE3Q_-rLPraMXy9gU1EnzgbHXqQbHU7BW2gs5A',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuARyag4Uol1LqW7RfeMb8sxOYt0273vrjIImkjsCMHZyp2j8ZmhTcrKL7Z7kTMuGlvGI1-0tM2vWNYGhn5tn2K7b3Wdjwz8QvoJsDgemdbXM9BVxLhy7rVVvEHSQAbU4j0X5ZC1mADm3gmkrqigVY3nylo_z8Umh9btni62W8OkDQhs18JetBqu71oumD2YBD9wDWrZ6NNU0n3DNXvH8MXDHwzdZzOKT4T8rhuToIVNzMEDPR1ISJAiHBzTPZrclMuadfwyTFpTSGg',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1DwzEZZvuxTxMFXJfD_7sNRxtgE-0a2s9kqbLlltSzZXhQnd3aEwJFFZM2kgW3sfNLngH9hvV5DXaVE23DilWHbak3erOvv6gzYqMkkIXasbmDpaDxtj4Kzo8cnGp5XwxX913duZP0ZEXcbHfd0udd3cSKXxNMJp1OfywKuDS3648Jo2n59N3Bcma8Kng_fqrke4C6YzZT7LOxn-Oqxb18_SgiH1XkwO69SH51r_OytIeWKx3siBuQ6SMYesaN2hSh7wRyoqFf44',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBenD6KWMpL54TWvfa1SyNRWpdG8gXXTU-Y96Drc8W-o1SVPIDQCildWwCyjPp0_l0D61hqHhd4lKaUtjrgzalfwXYxmFRFrMtHvMRfIWeL-OjUeGx_x53Eqy5hat7n2qKMSkYdlPLMEk5zsoqcwOlFkWlFlhIQp7LSPpgiWcxzp6MF4BxdrcfNCEkmuDvpjkryEcLh7SaZ3KkZfzx1DQ3dFm71mMCzIGKkbsBD-d6-piPsU3BYhYW4MpsKua7tLnhHZXu5zqpsoUM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuByBQZa0Vvv_AbzClihWITqtApRBwVG2Hohqb_pChvHmGDEUypPp7EeFS0Gdlpeb3YTAp1O_rlTLawip3mn2MdmjZd28y0TLCDk7LA1iu490-dZo5Lg7tbo1kKSOScYSlXt-nkHg8V6Mhi0t67w_JutFyHRDZjwqfmfQmxPaHzbB_RQR5DA47Vvo12z_-stT60GSiYD3aIFs961Zpqnpr1K5o8ZFl5ZQHknVT0hipPKrHsQAZx6BACrM0WHHDV-uNbzqzF6sZrA2QE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAMV0QBIrQ82FbfkVETciHkpWkbVSn66a-x90IqceJblMPqBuUwcn5S1HZnM6gLXRZei6jpEp2Ha-hwtt71k4HM__FcKSISXEFU3ncPQYP0IPNDV0BJEsHI0taAFb9be89D076v486_10WSLzqxwwxT2RCGM8qy9dazipOx6bxZpZP3mDL4OI63tCy8WFGnHDs4iXPpd9fM5yqWouZP2PhM_z1G6NxQG1iBX4NyWxUBVeLuIwPddbdi3wdTR380PmlSCt8whQcoIPg',
    ];

    const getProductImage = (index) => productImages[index % productImages.length];

    const [addingToCart, setAddingToCart] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [sortBy, setSortBy] = useState('featured');

    const handleAddToCart = (productId) => {
        setAddingToCart(productId);
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            onFinish: () => setAddingToCart(null),
        });
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
        if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
        return 0;
    });

    return (
        <PublicLayout>
            <Head title="Products" />
            <div className="min-h-screen bg-white dark:bg-background-dark">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-20">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16">
                        <div className="flex flex-col gap-3">
                            <p className="text-[10px] font-black text-[#8a8a60] dark:text-neutral-400 tracking-widest uppercase">Our Collection</p>
                            <h1 className="text-4xl md:text-5xl font-black text-[#181811] dark:text-white tracking-[-0.03em]">
                                ALL PRODUCTS
                            </h1>
                            <p className="text-[#8a8a60] dark:text-neutral-400 text-sm max-w-md font-medium">
                                Carefully curated pieces that blend timeless design with modern craftsmanship.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium">{products.length} items</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm bg-transparent border border-[#e6e6db] dark:border-neutral-700 rounded-lg px-3 py-2 text-[#181811] dark:text-white focus:ring-1 focus:ring-primary font-medium"
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low → High</option>
                                <option value="price-high">Price: High → Low</option>
                            </select>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="py-24 text-center">
                            <span className="material-symbols-outlined text-6xl text-[#e6e6db] dark:text-neutral-700">inventory_2</span>
                            <p className="text-[#8a8a60] dark:text-neutral-400 text-lg mt-4 font-medium">No products available at the moment.</p>
                            <p className="text-[#8a8a60] dark:text-neutral-500 text-sm mt-1">Check back soon for new arrivals.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product, productIndex) => (
                                <div
                                    key={product.id}
                                    className="group relative flex flex-col"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    {/* Image Container */}
                                    <Link href={route('products.show', product.id)} className="block">
                                        <div className="relative w-full aspect-[3/4] bg-[#f5f5f0] dark:bg-neutral-800 rounded-xl overflow-hidden cursor-pointer">
                                            <img
                                                src={getProductImage(productIndex)}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                                                    <span className="bg-primary text-[#181811] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                                                        Only {product.stock_quantity} left
                                                    </span>
                                                )}
                                                {product.stock_quantity === 0 && (
                                                    <span className="bg-[#181811] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                                                        Sold Out
                                                    </span>
                                                )}
                                                {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                                                        -{Math.round(((parseFloat(product.compare_price) - parseFloat(product.price)) / parseFloat(product.compare_price)) * 100)}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quick Actions Overlay */}
                                            <div className={`absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToCart(product.id);
                                                    }}
                                                    disabled={addingToCart === product.id || product.stock_quantity === 0}
                                                    className="w-full rounded-lg bg-white hover:bg-primary text-[#181811] h-10 text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {addingToCart === product.id ? 'Adding...' : product.stock_quantity === 0 ? 'Sold Out' : 'Quick Add'}
                                                </button>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="pt-4 flex flex-col gap-1">
                                        {product.category && (
                                            <p className="text-[10px] text-[#8a8a60] dark:text-neutral-400 font-bold uppercase tracking-widest">{product.category.name}</p>
                                        )}
                                        <Link href={route('products.show', product.id)}>
                                            <h3 className="text-sm font-bold text-[#181811] dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-pointer leading-snug">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-base font-black text-[#181811] dark:text-white">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </p>
                                            {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                                                <p className="text-sm text-[#8a8a60] line-through font-medium">
                                                    ${parseFloat(product.compare_price).toFixed(2)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}