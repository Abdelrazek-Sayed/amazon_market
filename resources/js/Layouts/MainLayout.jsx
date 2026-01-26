import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function MainLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Head title={title || 'متجري'} />
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
