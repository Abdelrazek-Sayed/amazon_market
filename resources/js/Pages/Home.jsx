import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import CategoryCard from '@/Components/CategoryCard';
import { Link } from '@inertiajs/react';
import { SparklesIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function Home({ categories, featuredProducts, newProducts }) {
    return (
        <MainLayout title="الرئيسية">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in">
                            مرحباً بك في متجري
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                            تسوق أفضل المنتجات بأسعار تنافسية وجودة عالية
                        </p>
                        <Link
                            href="/products"
                            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            ابدأ التسوق الآن
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <TruckIcon className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">شحن سريع</h3>
                        <p className="text-gray-600 text-sm">توصيل خلال 2-3 أيام</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">دفع آمن</h3>
                        <p className="text-gray-600 text-sm">معاملات مشفرة 100%</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCardIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">طرق دفع متنوعة</h3>
                        <p className="text-gray-600 text-sm">دعم جميع وسائل الدفع</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SparklesIcon className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">جودة عالية</h3>
                        <p className="text-gray-600 text-sm">منتجات أصلية ومضمونة</p>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            {categories && categories.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">تصفح حسب الفئة</h2>
                        <p className="text-gray-600">اختر الفئة المناسبة لك</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            )}

            {/* Featured Products Section */}
            {featuredProducts && featuredProducts.length > 0 && (
                <div className="bg-gradient-to-b from-gray-50 to-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">المنتجات المميزة</h2>
                            <p className="text-gray-600">أفضل المنتجات المختارة لك</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* New Products Section */}
            {newProducts && newProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">أحدث المنتجات</h2>
                        <p className="text-gray-600">تابع آخر الإضافات لمتجرنا</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            عرض جميع المنتجات
                        </Link>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
