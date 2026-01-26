import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* عن المتجر */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">عن متجري</h3>
                        <p className="text-sm">
                            متجرك الإلكتروني الموثوق للتسوق عبر الإنترنت. نوفر لك أفضل المنتجات بأسعار تنافسية.
                        </p>
                    </div>

                    {/* روابط سريعة */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-white transition-colors">
                                    المنتجات
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="hover:text-white transition-colors">
                                    السلة
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:text-white transition-colors">
                                    الطلبات
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* خدمة العملاء */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">خدمة العملاء</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    سياسة الإرجاع
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    الشحن والتوصيل
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    الأسئلة الشائعة
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    اتصل بنا
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* تواصل معنا */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">تواصل معنا</h3>
                        <ul className="space-y-2 text-sm">
                            <li>البريد الإلكتروني: info@mystore.com</li>
                            <li>الهاتف: +966 50 000 0000</li>
                            <li>العنوان: الرياض، المملكة العربية السعودية</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} متجري. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
