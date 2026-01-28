<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::whereNull('parent_id')
            ->where('is_active', true)
            ->with('children')
            ->take(8)
            ->get();

        $featuredProducts = Product::where('is_featured', true)
            ->where('is_active', true)
            ->where('quantity', '>', 0)
            ->with(['category', 'reviews'])
            ->take(8)
            ->get()
            ->map(function ($product) {
                $product->average_rating = $product->average_rating;
                $product->reviews_count = $product->reviews_count;
                return $product;
            });

        $newProducts = Product::where('is_active', true)
            ->where('quantity', '>', 0)
            ->with(['category', 'reviews'])
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($product) {
                $product->average_rating = $product->average_rating;
                $product->reviews_count = $product->reviews_count;
                return $product;
            });

        return response()->json([
            'categories' => $categories,
            'featured_products' => $featuredProducts,
            'new_products' => $newProducts,
        ]);
    }
}
