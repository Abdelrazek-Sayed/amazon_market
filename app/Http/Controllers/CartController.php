<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::where('user_id', auth()->id())
            ->with('product')
            ->get();

        $total = $cartItems->sum(function ($item) {
            $price = $item->product->sale_price ?? $item->product->price;
            return $price * $item->quantity;
        });

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->quantity < $request->quantity) {
            return back()->with('error', 'المنتج غير متوفر بالكمية المطلوبة');
        }

        $cartItem = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'تمت إضافة المنتج إلى السلة');
    }

    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        if ($cart->product->quantity < $request->quantity) {
            return back()->with('error', 'المنتج غير متوفر بالكمية المطلوبة');
        }

        $cart->update(['quantity' => $request->quantity]);

        return back()->with('success', 'تم تحديث السلة');
    }

    public function remove(Cart $cart)
    {
        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        $cart->delete();

        return back()->with('success', 'تم حذف المنتج من السلة');
    }

    public function clear()
    {
        Cart::where('user_id', auth()->id())->delete();

        return back()->with('success', 'تم تفريغ السلة');
    }
}
