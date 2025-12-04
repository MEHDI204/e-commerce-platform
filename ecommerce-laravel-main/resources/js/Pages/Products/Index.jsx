import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products }) {
    const [addingToCart, setAddingToCart] = useState(null);

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

    return (
        <PublicLayout>
            <Head title="Home" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Our Products</h1>
                
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">No products available.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <div
                            key={product.id}
                            className="rounded-xl overflow-hidden bg-white border hover:shadow-md transition"
                        >
                            <Link href={route('products.show', product.id)}>
                                <div className="w-full h-60 bg-gray-100">
                                    {product.primary_image ? (
                                        <img
                                            src={product.primary_image.image_url}
                                            alt={product.primary_image.alt_text || product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">
                                            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        
                            <div className="p-3">
                                <Link href={route('products.show', product.id)}>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {product.name}
                                    </h3>
                                </Link>
                        
                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    ${parseFloat(product.price).toFixed(2)}
                                </p>
                        
                                {product.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                                    <p className="text-sm text-gray-500 line-through">
                                        ${parseFloat(product.compare_price).toFixed(2)}
                                    </p>
                                )}
                        
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={addingToCart === product.id || product.stock_quantity === 0}
                                    className="mt-3 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {addingToCart === product.id
                                        ? 'Adding...'
                                        : product.stock_quantity === 0
                                            ? 'Out of Stock'
                                            : 'Add to Cart'}
                                </button>
                            </div>
                        </div>                        
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}