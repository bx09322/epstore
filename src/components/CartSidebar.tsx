'use client';

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#0a0a0f] border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Carrito ({cart.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg mb-2">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-xs mb-2">{item.subtitle}</p>
                        
                        {/* Price */}
                        <p className="text-blue-400 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors h-fit"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-gray-400 text-sm">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear cart button */}
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400">Total:</span>
                <span className="text-white font-bold">${getCartTotal().toFixed(2)}</span>
              </div>

              {/* Checkout button */}
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Ir al checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}