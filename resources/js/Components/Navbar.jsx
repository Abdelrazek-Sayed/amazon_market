import { Link, usePage } from '@inertiajs/react';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${searchQuery}`;
        }
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <ShoppingCartIcon className="h-8 w-8 text-white" />
                        <span className="text-2xl font-bold text-white">متجري</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث عن المنتجات..."
                                className="w-full px-4 py-2 pr-10 rounded-full border-0 focus:ring-2 focus:ring-white"
                            />
                            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 space-x-reverse">
                        <Link
                            href="/products"
                            className="text-white hover:text-indigo-200 transition-colors font-medium"
                        >
                            المنتجات
                        </Link>

                        {auth.user ? (
                            <>
                                <Link
                                    href="/cart"
                                    className="text-white hover:text-indigo-200 transition-colors flex items-center space-x-1 space-x-reverse"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" />
                                    <span>السلة</span>
                                </Link>
                                <Link
                                    href="/orders"
                                    className="text-white hover:text-indigo-200 transition-colors font-medium"
                                >
                                    طلباتي
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-white hover:text-indigo-200 transition-colors flex items-center space-x-1 space-x-reverse"
                                >
                                    <UserIcon className="h-6 w-6" />
                                    <span>{auth.user.name}</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-white hover:text-indigo-200 transition-colors font-medium"
                                >
                                    تسجيل الدخول
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors font-medium"
                                >
                                    إنشاء حساب
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-indigo-500">
                        <form onSubmit={handleSearch} className="mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث عن المنتجات..."
                                className="w-full px-4 py-2 rounded-full"
                            />
                        </form>
                        <div className="flex flex-col space-y-2">
                            <Link href="/products" className="text-white hover:text-indigo-200 py-2">
                                المنتجات
                            </Link>
                            {auth.user ? (
                                <>
                                    <Link href="/cart" className="text-white hover:text-indigo-200 py-2">
                                        السلة
                                    </Link>
                                    <Link href="/orders" className="text-white hover:text-indigo-200 py-2">
                                        طلباتي
                                    </Link>
                                    <Link href="/profile" className="text-white hover:text-indigo-200 py-2">
                                        الملف الشخصي
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-white hover:text-indigo-200 py-2">
                                        تسجيل الدخول
                                    </Link>
                                    <Link href="/register" className="text-white hover:text-indigo-200 py-2">
                                        إنشاء حساب
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
