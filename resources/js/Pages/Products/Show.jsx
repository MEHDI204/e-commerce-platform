import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleAddToCart = () => {
        if (quantity < 1 || quantity > product.stock_quantity) return;
        setAddingToCart(true);
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity,
        }, {
            preserveScroll: true,
            onFinish: () => setAddingToCart(false),
        });
    };

    const productImages = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDNoUbEYpVqhkPLN5xrcGwkZdnEGvc2xH7Ru9g4Gaz7zZ8CNsAc1p2pONoly2EGjxKoKZk-iiYfk3wa-rnewHAmN2u1JvSTFxUN5MsezaqCmNKxsjOxdmyYYLnTQfe9NasHgPFa0Ibq2SX4yKRjDHgWBsjqOP-1lWHfDVa3WQUUlYliEw6gvnQFq8j3iztPpopp03bIKvI7LIbMG7mRDUph5LkcwxUvRPMR5tzHVcrcGfltfEYqCXXy2GWxsARsDI5H3d7nA4A0dJE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBsv40I6b1pFPS95LYvt7WtvMyLOUuYOIddEggfu5LWUvC9jWu8QlUvwAcDeF9aAOmgpxWaXJtUkXXULgHHSpixvuXUDzSLTEFEdgcrLmbso0cZtn5eBEsCB1TM62P4xPV9zm2KHES7MnA4o5g2F-in19JiJMjFZzgefS2tUHYaDjZTnrpHmcMU13M6bHAoPr4TEXr616bOCEHdDUjWp0y9QFnsvbV54OYZrLCGwtWaHxeqcWi2_ukdIiDSUJj0TQy0ZHG-DcV_qpg',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxaoSDFkFIX11JjM4E9Fu2kV_YivhbsFRtAyYjEXTdrGccbLKJo5vtXCC8KZg9RbRJB61PetpJgpcyNv8wFLdXyca5kwGrNd8YG07QhtixysHJOT6l-vEZowlUCdZivpLrNwqfJoVBt6SpfaA9yB1aYnxbQCEn2jNMZRxzxPd4lmmmgfgkpBUV6BfI9kfr440eY_XhSz895wBWhveVz_1J2RiYt3XW9Vo8kBTTqtYolJ0NimtXhE77ody-wxAcsE6yjtHvIPPln4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBzf5GkNIurxUKdREjcnw4kSsKET0Wo_nL-v6sxWOdCmBleru0CZr2rwU6at8Gqv8x72kfE0D2jjYc22UheVa1uUAlRz3913NCZYu9TZ_fcOPSn2hMVbai9RRRcrtWSb3L1GxFrmAD2TuZiCkcj032gMKPVTyCWCXCARM8CoTmpenqQmA9Kswf4CEF2gA8xgfjFpCgUVw8fzk9oEbSZLpQtiV21-yQFqf48EfD_IX7IiDPefPEBj38KKTsS5Ri27ft6RqsXeyafxAQ',
    ];
    const currentImage = productImages[selectedImageIndex] || productImages[0];

    return (
        <PublicLayout>
            <Head title={product.name} />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm font-medium text-[#8a8a60] dark:text-neutral-400 mb-8">
                    <Link href={route('home')} className="hover:text-[#181811] dark:hover:text-white transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <Link href={route('products.index')} className="hover:text-[#181811] dark:hover:text-white transition-colors">Products</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-[#181811] dark:text-white">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Images */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="aspect-square overflow-hidden rounded-2xl bg-[#f5f5f0] dark:bg-neutral-800">
                            <img
                                src={currentImage}
                                alt={product.name}
                                className="h-full w-full object-cover transition-opacity duration-300"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3">
                            {productImages.map((imgUrl, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`aspect-square overflow-hidden rounded-xl bg-[#f5f5f0] dark:bg-neutral-800 transition-all ${
                                        selectedImageIndex === index
                                            ? 'ring-2 ring-[#181811] dark:ring-primary ring-offset-2'
                                            : 'hover:ring-1 ring-[#8a8a60]/30'
                                    }`}
                                >
                                    <img
                                        src={imgUrl}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-6 lg:py-4">
                        {/* Badge & Title */}
                        <div className="flex flex-col gap-3">
                            {product.category && (
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400">
                                    {product.category.name}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.02em] leading-tight">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-black text-[#181811] dark:text-white">
                                ${parseFloat(product.price).toFixed(2)}
                            </span>
                            {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                                <>
                                    <span className="text-lg text-[#8a8a60] line-through font-medium">
                                        ${parseFloat(product.compare_price).toFixed(2)}
                                    </span>
                                    <span className="bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                                        Save {Math.round(((parseFloat(product.compare_price) - parseFloat(product.price)) / parseFloat(product.compare_price)) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Rating Placeholder */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span key={star} className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            <span className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium ml-1">4.8 (36 reviews)</span>
                        </div>

                        {/* Divider */}
                        <hr className="border-[#e6e6db] dark:border-neutral-700" />

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-[#181811] dark:text-white mb-3">Description</h3>
                            <p className="text-[#8a8a60] dark:text-neutral-400 text-sm leading-relaxed font-medium">{product.description}</p>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2">
                            <span className={`material-symbols-outlined text-lg ${product.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'}`}
                                  style={{ fontVariationSettings: "'FILL' 1" }}>
                                {product.stock_quantity > 0 ? 'check_circle' : 'cancel'}
                            </span>
                            <span className={`text-sm font-bold ${product.stock_quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        {/* Quantity Selector */}
                        {product.stock_quantity > 0 && (
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-[#181811] dark:text-white mb-3">Quantity</h3>
                                <div className="flex items-center border border-[#e6e6db] dark:border-neutral-700 rounded-lg w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 rounded-l-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">remove</span>
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock_quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock_quantity, parseInt(e.target.value) || 1)))}
                                        className="w-16 text-center border-x border-[#e6e6db] dark:border-neutral-700 bg-transparent h-11 text-sm font-bold text-[#181811] dark:text-white focus:ring-0 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                        className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 rounded-r-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">add</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart || product.stock_quantity === 0}
                                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all text-[#181811] font-bold text-sm tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                                {addingToCart ? 'Adding...' : product.stock_quantity === 0 ? 'Out of Stock' : 'ADD TO CART'}
                            </button>
                            <button className="h-12 w-12 rounded-lg border border-[#e6e6db] dark:border-neutral-700 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 transition-colors flex-shrink-0">
                                <span className="material-symbols-outlined text-lg">favorite</span>
                            </button>
                            <button className="h-12 w-12 rounded-lg border border-[#e6e6db] dark:border-neutral-700 flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 transition-colors flex-shrink-0">
                                <span className="material-symbols-outlined text-lg">share</span>
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-4 rounded-xl bg-[#f5f5f0] dark:bg-neutral-800/50 p-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[20px] text-[#8a8a60]">local_shipping</span>
                                <div>
                                    <p className="text-sm font-bold text-[#181811] dark:text-white">Free Shipping</p>
                                    <p className="text-xs text-[#8a8a60] dark:text-neutral-400">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[20px] text-[#8a8a60]">replay</span>
                                <div>
                                    <p className="text-sm font-bold text-[#181811] dark:text-white">Easy Returns</p>
                                    <p className="text-xs text-[#8a8a60] dark:text-neutral-400">30-day return policy</p>
                                </div>
                            </div>
                            {product.weight && (
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px] text-[#8a8a60]">scale</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#181811] dark:text-white">Weight</p>
                                        <p className="text-xs text-[#8a8a60] dark:text-neutral-400">{product.weight} kg</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
