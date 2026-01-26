import { Link } from '@inertiajs/react';

export default function CategoryCard({ category }) {
    const categoryImage = category.image || '/images/category-placeholder.png';

    return (
        <Link
            href={`/products?category=${category.id}`}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
            {/* Category Image with Overlay */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={categoryImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Category Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1 group-hover:text-indigo-300 transition-colors">
                    {category.name}
                </h3>
                {category.description && (
                    <p className="text-sm text-gray-200 line-clamp-2">
                        {category.description}
                    </p>
                )}
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all duration-300" />
        </Link>
    );
}
