import MainLayout from '@/Layouts/MainLayout';
import ProductCard from '@/Components/ProductCard';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProductsIndex({ products, categories, filters }) {
    const [showFilters, setShowFilters] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        category: filters.category || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        search: filters.search || '',
        sort: filters.sort || 'created_at',
        order: filters.order || 'desc',
    });

    const applyFilters = () => {
        router.get('/products', localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({
            category: '',
            min_price: '',
            max_price: '',
            search: '',
            sort: 'created_at',
            order: 'desc',
        });
        router.get('/products');
    };

    return (
        <MainLayout title="المنتجات">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">جميع المنتجات</h1>
                    <p className="text-gray-600">اكتشف مجموعتنا الواسعة من المنتجات</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Mobile Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center justify-center space-x-2 space-x-reverse bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        <FunnelIcon className="h-5 w-5" />
                        <span>التصفية</span>
                    </button>

                    {/* Filters Sidebar */}
                    <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-64 flex-shrink-0`}>
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">التصفية</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                    مسح الكل
                                </button>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الفئة
                                </label>
                                <select
                                    value={localFilters.category}
                                    onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">جميع الفئات</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نطاق السعر
                                </label>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <input
                                        type="number"
                                        placeholder="من"
                                        value={localFilters.min_price}
                                        onChange={(e) => setLocalFilters({ ...localFilters, min_price: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="إلى"
                                        value={localFilters.max_price}
                                        onChange={(e) => setLocalFilters({ ...localFilters, max_price: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Sort Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    الترتيب حسب
                                </label>
                                <select
                                    value={`${localFilters.sort}-${localFilters.order}`}
                                    onChange={(e) => {
                                        const [sort, order] = e.target.value.split('-');
                                        setLocalFilters({ ...localFilters, sort, order });
                                    }}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="created_at-desc">الأحدث</option>
                                    <option value="created_at-asc">الأقدم</option>
                                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                                    <option value="name-asc">الاسم: أ-ي</option>
                                    <option value="name-desc">الاسم: ي-أ</option>
                                </select>
                            </div>

                            <button
                                onClick={applyFilters}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                            >
                                تطبيق التصفية
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {products.data && products.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.data.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.links && products.links.length > 3 && (
                                    <div className="mt-8 flex justify-center">
                                        <nav className="flex items-center space-x-2 space-x-reverse">
                                            {products.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-4 py-2 rounded-lg ${link.active
                                                            ? 'bg-indigo-600 text-white'
                                                            : link.url
                                                                ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">لا توجد منتجات متاحة</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
