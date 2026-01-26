import { Link, router } from '@inertiajs/react';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export default function ProductCard({ product }) {
    const displayPrice = product.sale_price || product.price;
    const hasDiscount = product.sale_price && product.sale_price < product.price;

    const addToCart = (e) => {
        e.preventDefault();
        router.post('/cart/add', {
            product_id: product.id,
            quantity: 1,
        });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarIcon key={i} className="h-4 w-4 text-yellow-400" />);
            } else {
                stars.push(<StarOutline key={i} className="h-4 w-4 text-gray-300" />);
            }
        }
        return stars;
    };

    const mainImage = product.images && product.images.length > 0
        ? product.images[0]
        : '/images/placeholder.png';

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
        >
            {/* Product Image */}
            <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {hasDiscount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        خصم {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                    </div>
                )}
                {product.is_featured && (
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        مميز
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 space-x-reverse mb-2">
                    <div className="flex">
                        {renderStars(product.average_rating || 0)}
                    </div>
                    <span className="text-sm text-gray-600">
                        ({product.reviews_count || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <span className="text-2xl font-bold text-indigo-600">
                            {displayPrice} ر.س
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                                {product.price} ر.س
                            </span>
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={addToCart}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse font-medium"
                >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>إضافة للسلة</span>
                </button>
            </div>
        </Link>
    );
}
