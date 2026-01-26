import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { StarIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

export default function ProductShow({ product, relatedProducts, auth }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const displayPrice = product.sale_price || product.price;
    const hasDiscount = product.sale_price && product.sale_price < product.price;
    const images = product.images && product.images.length > 0 ? product.images : ['/images/placeholder.png'];

    const addToCart = () => {
        router.post('/cart/add', {
            product_id: product.id,
            quantity: quantity,
        });
    };

    const submitReview = (e) => {
        e.preventDefault();
        router.post(`/products/${product.id}/reviews`, {
            rating,
            comment,
        }, {
            onSuccess: () => {
                setComment('');
                setRating(5);
            },
        });
    };

    const renderStars = (count, filled = true) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                filled && i < count ? (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ) : (
                    <StarOutline key={i} className="h-5 w-5 text-gray-300" />
                )
            );
        }
        return stars;
    };

    return (
        <MainLayout title={product.name}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-lg overflow-hidden ${selectedImage === index ? 'ring-4 ring-indigo-600' : ''
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-24 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {product.category && (
                                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                                    {product.category.name}
                                </span>
                            )}

                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 space-x-reverse mb-6">
                                <div className="flex">
                                    {renderStars(Math.floor(product.average_rating || 0))}
                                </div>
                                <span className="text-gray-600">
                                    ({product.reviews_count || 0} تقييم)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline space-x-3 space-x-reverse">
                                    <span className="text-4xl font-bold text-indigo-600">
                                        {displayPrice} ر.س
                                    </span>
                                    {hasDiscount && (
                                        <>
                                            <span className="text-2xl text-gray-500 line-through">
                                                {product.price} ر.س
                                            </span>
                                            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                                خصم {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">الوصف</h3>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.quantity > 0 ? (
                                    <span className="text-green-600 font-medium">
                                        متوفر في المخزون ({product.quantity} قطعة)
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-medium">غير متوفر</span>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.quantity > 0 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        الكمية
                                    </label>
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            <MinusIcon className="h-5 w-5" />
                                        </button>
                                        <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                            className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            <PlusIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            {product.quantity > 0 && (
                                <button
                                    onClick={addToCart}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 space-x-reverse text-lg font-bold shadow-xl transform hover:scale-105"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    <span>إضافة إلى السلة</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">التقييمات والمراجعات</h2>

                    {/* Add Review Form */}
                    {auth.user && (
                        <form onSubmit={submitReview} className="mb-8 p-6 bg-gray-50 rounded-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">أضف تقييمك</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    التقييم
                                </label>
                                <div className="flex space-x-2 space-x-reverse">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            {star <= rating ? (
                                                <StarIcon className="h-8 w-8 text-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
                                            ) : (
                                                <StarOutline className="h-8 w-8 text-gray-300 cursor-pointer hover:scale-110 transition-transform" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    التعليق
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="شارك تجربتك مع هذا المنتج..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                إرسال التقييم
                            </button>
                        </form>
                    )}

                    {/* Reviews List */}
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-200 pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <span className="font-bold text-gray-900">
                                                {review.user?.name || 'مستخدم'}
                                            </span>
                                            <div className="flex">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.created_at).toLocaleDateString('ar')}
                                        </span>
                                    </div>
                                    {review.comment && (
                                        <p className="text-gray-600">{review.comment}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">لا توجد تقييمات بعد</p>
                    )}
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">منتجات ذات صلة</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
