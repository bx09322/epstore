'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    // Preparar datos para enviar a payments
    const cartData = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtitle: item.subtitle
    }));

    // Guardar en localStorage para que payments pueda accederlo
    localStorage.setItem('checkoutCart', JSON.stringify(cartData));
    localStorage.setItem('checkoutTotal', getCartTotal().toString());

    // Redirigir a payments
    router.push('/payments');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#171720]">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-gray-400 mb-8">
                Agrega productos para comenzar tu compra
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Ir a la tienda
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171720]">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Carrito de Compras</h1>
            <p className="text-gray-400">{cart.length} producto(s) en tu carrito</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1a1a28] rounded-lg p-6 border border-white/10"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg truncate">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{item.subtitle}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">Cantidad:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white font-semibold w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-blue-400 font-bold text-xl">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-gray-500 text-sm">
                            ${item.price.toFixed(2)} c/u
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a28] rounded-lg p-6 border border-white/10 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Resumen del pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal:</span>
                    <span className="text-white">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Envío:</span>
                    <span className="text-green-400">GRATIS</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-white">Total:</span>
                      <span className="font-bold text-blue-400">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceder al pago
                </button>

                <Link
                  href="/shop"
                  className="block w-full text-center py-3 text-gray-400 hover:text-white transition-colors"
                >
                  Continuar comprando
                </Link>

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Pago 100% seguro
                  </p>
                  <div className="flex justify-center gap-4 opacity-50">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">🔒</span>
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
