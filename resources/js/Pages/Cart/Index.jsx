import MainLayout from '@/Layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function CartIndex({ cartItems, total }) {
    const updateQuantity = (cartItem, newQuantity) => {
        if (newQuantity < 1) return;
        router.patch(`/cart/${cartItem.id}`, {
            quantity: newQuantity,
        }, {
            preserveScroll: true,
        });
    };

    const removeItem = (cartItem) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            router.delete(`/cart/${cartItem.id}`, {
                preserveScroll: true,
            });
        }
    };

    const clearCart = () => {
        if (confirm('هل أنت متأكد من تفريغ السلة؟')) {
            router.delete('/cart');
        }
    };

    return (
        <MainLayout title="سلة التسوق">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">سلة التسوق</h1>

                {cartItems && cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => {
                                const itemPrice = item.product.sale_price || item.product.price;
                                const itemTotal = itemPrice * item.quantity;
                                const productImage = item.product.images && item.product.images.length > 0
                                    ? item.product.images[0]
                                    : '/images/placeholder.png';

                                return (
                                    <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row gap-6">
                                        {/* Product Image */}
                                        <Link
                                            href={`/products/${item.product.slug}`}
                                            className="flex-shrink-0"
                                        >
                                            <img
                                                src={productImage}
                                                alt={item.product.name}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors mb-2 block"
                                            >
                                                {item.product.name}
                                            </Link>

                                            <p className="text-gray-600 mb-4">
                                                السعر: <span className="font-bold text-indigo-600">{itemPrice} ر.س</span>
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-4 space-x-reverse mb-4">
                                                <button
                                                    onClick={() => updateQuantity(item, item.quantity - 1)}
                                                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                                                >
                                                    <MinusIcon className="h-4 w-4" />
                                                </button>
                                                <span className="text-lg font-bold w-12 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item, item.quantity + 1)}
                                                    disabled={item.quantity >= item.product.quantity}
                                                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                                                >
                                                    <PlusIcon className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-bold text-gray-900">
                                                    المجموع: {itemTotal.toFixed(2)} ر.س
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item)}
                                                    className="text-red-600 hover:text-red-800 flex items-center space-x-1 space-x-reverse transition-colors"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                    <span>حذف</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Clear Cart Button */}
                            <button
                                onClick={clearCart}
                                className="w-full bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200 transition-colors font-medium"
                            >
                                تفريغ السلة
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">ملخص الطلب</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>المجموع الفرعي</span>
                                        <span className="font-bold">{total.toFixed(2)} ر.س</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>الشحن</span>
                                        <span className="font-bold text-green-600">مجاني</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>الإجمالي</span>
                                            <span className="text-indigo-600">{total.toFixed(2)} ر.س</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/orders/checkout"
                                    className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-xl transform hover:scale-105"
                                >
                                    إتمام الطلب
                                </Link>

                                <Link
                                    href="/products"
                                    className="block w-full text-center text-indigo-600 py-3 mt-4 hover:text-indigo-800 transition-colors font-medium"
                                >
                                    متابعة التسوق
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">السلة فارغة</h2>
                        <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
                        <Link
                            href="/products"
                            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                        >
                            ابدأ التسوق
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
