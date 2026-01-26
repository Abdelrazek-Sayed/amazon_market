<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|array',
            'shipping_address.name' => 'required|string',
            'shipping_address.phone' => 'required|string',
            'shipping_address.address' => 'required|string',
            'shipping_address.city' => 'required|string',
            'shipping_address.country' => 'required|string',
        ]);

        $cartItems = Cart::where('user_id', auth()->id())->with('product')->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'السلة فارغة');
        }

        $total = 0;

        DB::transaction(function () use ($request, $cartItems, &$total) {
            $total = $cartItems->sum(function ($item) {
                $price = $item->product->sale_price ?? $item->product->price;
                return $price * $item->quantity;
            });

            $order = Order::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'billing_address' => $request->billing_address ?? $request->shipping_address,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->sale_price ?? $item->product->price,
                ]);

                // Update product quantity
                $item->product->decrement('quantity', $item->quantity);
            }

            // Clear cart
            Cart::where('user_id', auth()->id())->delete();
        });

        return redirect()->route('orders.index')->with('success', 'تم إنشاء الطلب بنجاح');
    }
}
