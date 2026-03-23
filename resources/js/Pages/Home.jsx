import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ featuredProducts = [] }) {
    const heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPyLbVD3qAyfjBQKsb9DKQKqXUXlUbTtEPF0cykA2Xjg_Iu1WSwh152YURQBZ9jwh_fPToETDabaoJivOMMLZsxJtszB-V4QO2LMWg97rCg1CQCl4E19gDOK1Fq8YeCD9CXhewD57Y6TQpM7WuafdBxKXAqv86qhB1lKWGBFQbn2fMGvvCyxXwIpT-zAA0LNgGWzA4Ue8d832YVygzqbQzSUsepojcbWB6TdHx2Fyo5JYiH7tlVZpwJ6E4fwG31iNctlQBZN52HBI';

    const productCards = [
        {
            name: 'Minimalist Leather Tote',
            price: '$120.00',
            badge: 'New',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgH1oDIbsFdDeIx8lcAratGzCT-UMAPQTCDy8cvv8nbIHWhfRLT1z6WFm9uBV24-KPVj0ZE9_nRPuAs_RpHNZLg20U65w0uL4yvd6r74Q1p1tIm6iDb65v3KnqyZK8Pb-rdGBs_kw6waiaVKpVY0nr9dtxprPUlXK9TDM_fZrkDCWaGTW8xM1UuwQGQZruKh69ln-yiejqeGRXo1whMae25apImsCs4aVjevKkElFAjtCq7_22Wup2lQnHFoL0nLWtulGcXESRmvM',
        },
        {
            name: 'Classic Timepiece',
            price: '$185.00',
            badge: null,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWoOCGSB6t5xSxmJqtbJnyyaXIcHdPTUyPvflkPT5bQhlMrBHFaa5fXn1ZMYbwB6HYEdz66-mcTlIr-6a0KJj0Vnxkg10ncYCS2mJVjO4OvpvgYu3THsLMIOmh9c8IsbdXNrFb9IuwQyhqaTBrLDhjLGocOsqZvIKKIrF1ZdPho04Lm9vcXIHS4EED_Rm9kKmUCTuq6k8HLWKYuVK8PsZQIJWVF43lgpFsWUmgxhLiZyDGZPB7fEy7AHRDXADKFbXAvwGIE1jG8x0',
        },
        {
            name: 'Cotton Crewneck',
            price: '$45.00',
            badge: null,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0UGNn-1EJKZWg2cctEAKs2hvUfjgxbaeLHxJryVft2fErFltLxBKhpDmw44SQ-ZJYrXA9vgozyOfYqLV_DRmjUS4-0wzSJAs86uyf3tLoDxYRr9-V9pOgRbU10_8REomr6c2HxiM1Fctq19ZqnXlzs7GnvNej3HGJffV49wMbvZ7g_UoJb42QDe9F11cynMmA0VEVxTJHzdciMYzhvQcdV3KaBbnb01I3ACzqgnearEYoFBKy4KdwA1qfjP8pEr0wHbEuH33ehkQ',
        },
        {
            name: 'Daily Sunglasses',
            price: '$90.00',
            badge: null,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvAVWN1VDnIbUXKIKFk7-sKmnFdMN049Pk7XOGn-fweUY6RhsNbVpj9yu431mhGZIG609cIGzYMx26OcFsyfTOCzJXW6zOgZ_yVxAj86LgXss8Da6NAmvLdlw3P9sX3yG41MkUnrbro_mOadCJyZX4aCFNNMCi8y2IVwRuAAbzxpRq-m41v4SFdFmOuKEc9gGEn0rIuXwrOv38TMcJMu6nmUTOUHKHKGMPW3mXmhJqvyF0GJD7XkKi1S5nPb10DGQggW0h8VITF-Y',
        },
    ];

    const menswearImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvUa1t7cAzcAO1xzMHj8XNt47-xd6AFKVAGBckbxAl3OnYz9nUXtQ34ewh_hlqjjpm0X2xQgqeaZ9wdJJugjBY4_X3UfRiuCNTzxxgrPCSgDuJWr0vTR-zgyaCBkK8cxE_94piDyOCG0GnYUPtX5wLC-T9gBVzOtff-2JRNOFjcgUkwTpG0OoOs78lQdfWnPvaGdSLgVq5vq3Isj7sS1BYv0ccZMbkqv94uVbYBe1x1bqynkNQOFZahui6-XiXJuKTvsV8tsOT1cM';
    const accessoriesImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEplW1VZlB20JB88efkFEYCMiPACHg4vWQgZiHplJYDloD4-RAEwFE5RkMaHiHVjU6cILcoV-0WTMQBmQuwVALEdkDl6aWUmqfRQCbRrxjRF1BNYEbCSMP77Z21qAmLevUjwFkzqZS7u3SMeirdNkrt3OK56W3LPoZVGJyChKmSbzTrMbg57aq30DogDIOAolSw3aDFtH2Ky82li_0CtIMKx9uZr9R2TjxsqQwllrr3LBJxnwfaw_flPlykoQ_f4kHHLZnd31VUgg';

    return (
        <PublicLayout>
            <Head title="Home" />

            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                <div className="flex flex-col max-w-[1200px] flex-1">

                    {/* Hero Section */}
                    <div className="flex flex-col gap-6 py-10 md:gap-8 md:flex-row items-center">
                        <div
                            className="w-full bg-center bg-no-repeat aspect-[4/3] md:aspect-square bg-cover rounded-xl shadow-2xl md:w-1/2"
                            style={{ backgroundImage: `url("${heroImage}")` }}
                        />
                        <div className="flex flex-col gap-6 md:gap-8 md:w-1/2 md:pl-12">
                            <div className="flex flex-col gap-4 text-left">
                                <span className="text-sm font-bold tracking-[0.2em] text-[#8a8a60] uppercase">Season 2024</span>
                                <h1 className="text-[#181811] dark:text-white text-5xl font-black leading-tight tracking-[-0.033em] xl:text-7xl">
                                    ESSENTIALS REDEFINED.
                                </h1>
                                <h2 className="text-[#181811]/70 dark:text-white/70 text-lg font-normal leading-relaxed max-w-md">
                                    Curated pieces for the modern lifestyle. Quality craftsmanship meets minimalist aesthetic.
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('products.index')}
                                    className="flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-[#181811] text-base font-bold leading-normal tracking-[0.015em] hover:scale-105 transition-transform"
                                >
                                    Shop the Collection
                                </Link>
                                <Link
                                    href={route('about')}
                                    className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-white dark:bg-white/10 border-2 border-[#181811] dark:border-white text-[#181811] dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#181811] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                                >
                                    Lookbook
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Featured Products Header */}
                    <div className="flex items-center justify-between px-4 pb-6 pt-12 border-b-2 border-[#181811] dark:border-white/20 mb-8">
                        <h2 className="text-[#181811] dark:text-white text-3xl font-black leading-tight tracking-[-0.015em] uppercase">Featured Products</h2>
                        <Link href={route('products.index')} className="text-sm font-bold underline underline-offset-4 hover:text-primary transition-colors">View All</Link>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                        {productCards.map((card, i) => (
                            <div key={i} className="flex flex-col gap-4 pb-3 group cursor-pointer">
                                <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                                    <div
                                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${card.image}")` }}
                                    />
                                    {card.badge && (
                                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black rounded">
                                            {card.badge}
                                        </div>
                                    )}
                                    <button className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 bg-white text-black py-3 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                        Quick Add
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#181811] dark:text-white text-lg font-bold leading-normal">{card.name}</p>
                                    <p className="text-[#8a8a60] text-sm font-medium leading-normal">{card.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Banner */}
                    <div className="my-20">
                        <div className="bg-primary rounded-2xl overflow-hidden relative">
                            <div className="flex flex-col justify-center gap-8 px-10 py-20 text-center items-center">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-[#181811] tracking-tight text-[36px] font-black leading-tight md:text-5xl max-w-[800px] uppercase">
                                        Free Shipping on orders over $100
                                    </h1>
                                    <p className="text-[#181811]/80 text-lg font-medium max-w-[600px] mx-auto">
                                        Premium quality essentials delivered straight to your door. Limited time offer on all domestic orders.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href={route('products.index')}
                                        className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-[#181811] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-black transition-colors shadow-xl"
                                    >
                                        Claim Offer
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-20 select-none pointer-events-none">
                                <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>local_shipping</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="h-[400px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                            <div
                                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url("${menswearImage}")` }}
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <h3 className="text-white text-4xl font-black uppercase mb-2">Menswear</h3>
                                <p className="text-white/80 text-lg mb-6">Structural designs for daily wear.</p>
                                <div className="w-12 h-1 bg-primary group-hover:w-24 transition-all duration-300" />
                            </div>
                        </div>
                        <div className="h-[400px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                            <div
                                className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url("${accessoriesImage}")` }}
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <h3 className="text-white text-4xl font-black uppercase mb-2">Accessories</h3>
                                <p className="text-white/80 text-lg mb-6">The details that define you.</p>
                                <div className="w-12 h-1 bg-primary group-hover:w-24 transition-all duration-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
