import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function SearchResults({ products = [], query = '', filters = {} }) {
    const [searchQuery, setSearchQuery] = useState(query);

    const searchImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBm2Cuxm18gmPM-yoFrdEk7F8Fymp1aV6tGBUw4RSFFzN21zWB4GejEk__ysQViMny3NtvLWUtHwFc6oDB6LMPFe5E1U7JJN475uRN7gqMD4yuGAoa8xM9q0olbXZiOi0vlRGmV3_snejD2FH_mwllvhfGe9xKzL7mwiarIJuxjrA9kXmBRykd5wkVaInRdJgzdZEtLUZfYGJmTJo_qNIuC4PFhEY9dQ7iupucwhCt56xOf-m7Jy67QDLEeRfDhdf-HfoFmSX22FMs',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbEHSOmTsfKFKvM5Q4efCjpVZoE9vmWK9f23EEDCZLRKdsmmw5e21dt1I_OQal49kCA-9HlIvx6QliXZiCpBxv6gqyluIvp7TKI_QbtLVz1wkD-EQr74LCzeaSbcJ6AllUXJXWUUvlw5-_bP1sGCzh4F0X--WSFlAI5nlrbzFZpe6SNML6qzy3dtwAGYDsI_BiLmD4M7FgPsMHmprBdutPdR3TSEpW51S4VZc_V5EtePn3CziBiwOpgnC3lC2lP3g3Rf7ZumlN5vI',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBAKXnjYgG8cG2P1c0MxI8sYaXDG7l1qmzEgBhzG23TUUn9G5jcUODcnUul5-A_VN4tUhb0IWbYjls1HIPUaB0m5R_24vDh5XpR22uxKy_Almlp93lSI4zoP-dg2xvlFZ2T7qMWTXO87IvsHWqA8kpHuYwT4DiKsAngmB_HnYEhIXpzrmCRVZnSf3JM6SBWx6HTkFSQOeIlT4DYcCIk5zxEOgeC7yiyA9vdKn20b3KS0mmEPv6nUUVLafdG1S1iDinKl3j79ROFNo4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBoIvvEg1IU9hTNdS3paeRgE4OnXqrXvB84YwV4bHV97-fU1XD0IyJJXBtge5K1Wz5kDYjEJIjqR19lZPWXx7lWtZTbOo1xH9tCMLtUCXlgjT831ycR8hUA8e3stkjBxXzj8Fdig9d-M5Gkw6TW1z1jopL9OM6oaHqKYDLb6XPm1LM1i9IyFmDO4WFNhxNpegkLXKhG85sewA394KIIxkJYxONOjWJQ2SLhtFuUa7oKpfmRqYQCGwrC9lK9gDo1kk1sNGoEUWMAmU8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCDH0FsqUiY-WtGj5gRrw3nW-gDl0jRNzUUGKcfAOvLKjnLHW4xa3Ofp2v_b8XBag-kw5TQkOTWvyOOgsMscYV1WxMVlFT_R49vfYMyTypqKnsG6IbPuT9TG3I2SvVX-xu4Q1toV0LdJxU-7VSH9w_Wr7taZThGmTTEvXPSkZ5qhvvFWjsJ0gX2fdEMtBbXueJpIGBao0zBRPUd9ZCgw4x2IjedCcaNCO78jznt7FXlLKXWwPBGt-ejuxiXhR5B3N3Y3gfC5uAX568',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnFALoucpZcMegFpdrW8S03EWZUfT08aZ2-lXNH-88WSiA7TE2bD8k-iwMQckAiOvGZ0CvkQRSp_NfDlbZTHNOF6Y5lj2PI6BLF6neCeeagvVueHFyobGwKiKztej_MACu4el6CQJNezbnDHPy_YOxvpowLLRTDP4oWbLoHsaJplyITDs7pbgx7RHBsV8d7vdgDMHqriFHb_e6hKF7rECt7B6qakZFMiITBvIs3htlT9Fvsf6vb75LK35KfQOSOb8d-fLJqkMQ-00',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB8bxMgREatO2IsPSY-XwMZHk__G3574ary6CSlXeHbKv25URrbE-8Yg5MKAI7P3EH3yAnXLF5b5OuxQ86VOwD_cPSdp6Ix2265ZmuiMlmnuxK2LpUGJ3oUEtbDSib3MrQfqkLjr1k2MT5Iuoaq2vkXwA_1xdzSKoMKvVtmIQzOYk0U6k2gQ9-odDRMvKb5_sCtpvHvlGQ_lSV19oXnuk0liYykJcSRd5puEZhXPuk4D5n-e28ENLaSfWJiBePtTrfcLSe4i-J7UEs',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBnL7pBjL4gJnvuAFSCZDZqxk3l46edmB-BqKYuDqJx5J3nz4PcopSNDue9uwLp6DCv0V-QnPAUI4lx-oiZ3YLMNl2FIC8fw1m1v0xrIJ-Adc_jw4FQ-7TghlSCGwt3wfCdJ9BAqrVEai_27jYaRGQsafjR41BJaQIqkZNpRa-JDPGmy4HhDMgkz-rqF_bRtybhhKx0g7pqXnjZa_oYtV9WJFjVm3Onkt26HZ9j02H0cArNFJvolzYxzfWGhIcp21GebDxUubTkFMw',
    ];

    const getProductImage = (index) => searchImages[index % searchImages.length];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('products.index'), { search: searchQuery });
    };

    return (
        <PublicLayout>
            <Head title={`Search: ${query || 'All Products'}`} />

            <main className="flex flex-col min-h-screen max-w-[1440px] mx-auto px-6 md:px-10 py-8 md:py-12 w-full">
                {/* Search Heading & Sort */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#f5f5f0] dark:border-[#333] pb-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#8a8a60] dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Search Results</p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#181811] dark:text-white">
                            "{query || 'All Products'}"
                        </h1>
                        <p className="text-[#8a8a60] dark:text-gray-400 text-base mt-1">
                            Found {products.length || products?.data?.length || 0} items matching your search
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative group">
                            <button className="flex h-10 items-center gap-2 px-4 rounded-lg border border-[#e5e5e5] dark:border-[#444] bg-white dark:bg-[#222] hover:border-black dark:hover:border-white transition-colors">
                                <span className="text-sm font-medium">Sort by: Relevance</span>
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap gap-3 mb-10">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f0] dark:bg-[#333] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                        <span className="text-sm font-medium">Price Range</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f0] dark:bg-[#333] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                        <span className="text-sm font-medium">Color</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f0] dark:bg-[#333] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                        <span className="text-sm font-medium">Size</span>
                        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {(products?.data || products || []).map((product, i) => (
                        <Link
                            key={product.id || i}
                            href={product.id ? route('products.show', product.id) : '#'}
                            className="group cursor-pointer flex flex-col gap-4"
                        >
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#f5f5f0] dark:bg-[#333]">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url("${getProductImage(i)}")` }}
                                />
                                <button className="absolute bottom-4 right-4 size-10 bg-white dark:bg-black text-black dark:text-white rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg hover:bg-primary hover:text-black">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-primary">
                                    {product.name || `Product ${i + 1}`}
                                </h3>
                                <p className="text-[#8a8a60] dark:text-gray-400 text-sm mt-1">{product.category?.name || 'All Categories'}</p>
                                <p className="text-base font-semibold mt-2">${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {(products?.data || products || []).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="size-20 bg-[#f5f5f0] dark:bg-[#333] rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl opacity-50">search_off</span>
                        </div>
                        <h2 className="text-3xl font-black mb-4">We couldn't find a match for '{query}'</h2>
                        <p className="text-[#8a8a60] dark:text-gray-400 mb-8 max-w-md">
                            Sorry, but the item you are looking for doesn't exist or has been removed. Check your spelling or try a new search.
                        </p>
                        <Link
                            href={route('products.index')}
                            className="bg-primary hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                        >
                            Browse New Arrivals
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {(products?.data || products || []).length > 0 && (
                    <div className="flex items-center justify-center mt-16 pb-8 border-t border-[#f5f5f0] dark:border-[#333] pt-8">
                        <div className="flex items-center gap-2">
                            <button className="flex size-10 items-center justify-center rounded-lg hover:bg-[#f5f5f0] dark:hover:bg-[#333] transition-colors">
                                <span className="material-symbols-outlined text-xl">chevron_left</span>
                            </button>
                            <button className="flex size-10 items-center justify-center rounded-lg bg-primary text-black text-sm font-bold">1</button>
                            <button className="flex size-10 items-center justify-center rounded-lg hover:bg-[#f5f5f0] dark:hover:bg-[#333] text-sm font-medium transition-colors">2</button>
                            <button className="flex size-10 items-center justify-center rounded-lg hover:bg-[#f5f5f0] dark:hover:bg-[#333] transition-colors">
                                <span className="material-symbols-outlined text-xl">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}
