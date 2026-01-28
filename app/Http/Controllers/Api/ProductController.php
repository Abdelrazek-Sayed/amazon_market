<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->where('is_active', true)
            ->with(['category', 'reviews']);

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate(12)->through(function ($product) {
            $product->average_rating = $product->average_rating;
            $product->reviews_count = $product->reviews_count;
            return $product;
        });

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::where('id', $id)
            ->where('is_active', true)
            ->with(['category', 'productImages', 'reviews.user'])
            ->firstOrFail();

        $product->average_rating = $product->average_rating;
        $product->reviews_count = $product->reviews_count;

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->with('reviews')
            ->take(4)
            ->get()
            ->map(function ($p) {
                $p->average_rating = $p->average_rating;
                $p->reviews_count = $p->reviews_count;
                return $p;
            });

        return response()->json([
            'product' => $product,
            'related_products' => $relatedProducts,
        ]);
    }

    public function categories()
    {
        $categories = Category::where('is_active', true)->get();
        return response()->json($categories);
    }
}
