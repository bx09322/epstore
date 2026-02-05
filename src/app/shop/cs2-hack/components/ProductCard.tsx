"use client";

import Image from "next/image";
import Link from "next/link";
import { Keyboard, Mouse, Headphones, Gamepad2, Monitor, Package, ShoppingCart } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
  price: number;
  originalPrice?: number;
  badge?: "sale" | "out-of-stock" | "new" | "hot";
  gradientFrom?: string;
  gradientTo?: string;
  icon?: "keyboard" | "mouse" | "headset" | "controller" | "monitor";
}

const iconMap = {
  keyboard: Keyboard,
  mouse: Mouse,
  headset: Headphones,
  controller: Gamepad2,
  monitor: Monitor,
};

export default function ProductCard({
  id,
  name,
  subtitle,
  image,
  price,
  originalPrice,
  badge,
  gradientFrom = "from-blue-900/80",
  gradientTo = "to-slate-900/90",
  icon = "keyboard",
}: ProductCardProps) {
  const isOutOfStock = badge === "out-of-stock";
  const IconComponent = iconMap[icon] || Package;
  const { addToCart, isInCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;

    addToCart({
      id,
      name,
      subtitle: subtitle || '',
      image,
      price,
      originalPrice
    });

    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="group block relative">
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden rounded-xl">
          {/* Product Image Container */}
          <div
            className={`relative aspect-square bg-gradient-to-br ${gradientFrom} ${gradientTo} overflow-hidden`}
          >
            {/* Inner border glow */}
            <div className="absolute inset-2 rounded-lg border border-white/10" />

            {/* Decorative wave at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 z-10">
              <svg
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-full h-full"
              >
                <path
                  d="M0,40 C60,20 120,60 180,40 C240,20 300,60 360,40 C380,35 400,45 400,40 L400,80 L0,80 Z"
                  fill="rgba(0,0,0,0.5)"
                />
                <path
                  d="M0,55 C80,35 160,70 240,50 C320,30 380,60 400,55 L400,80 L0,80 Z"
                  fill="rgba(0,0,0,0.3)"
                />
              </svg>
            </div>

            {/* Badge */}
            {badge && (
              <div className="absolute top-4 left-4 z-20">
                {badge === "sale" && (
                  <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                    Sale
                  </span>
                )}
                {badge === "out-of-stock" && (
                  <span className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                    Out of Stock
                  </span>
                )}
                {badge === "new" && (
                  <span className="px-3 py-1.5 bg-cyan-500 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                    New
                  </span>
                )}
                {badge === "hot" && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded uppercase tracking-wider shadow-lg">
                    Hot
                  </span>
                )}
              </div>
            )}

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-6 z-[5]">
              <Image
                src={image}
                alt={name}
                width={280}
                height={280}
                className="object-contain w-4/5 h-4/5 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Brand text overlay at bottom */}
            <div className="absolute bottom-4 left-0 right-0 z-20 text-center">
              <h4 className="text-white font-bold text-lg tracking-wide uppercase drop-shadow-lg">
                {name.split(" ")[0]}
              </h4>
              <p className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
                {subtitle || "Gaming Gear"}
              </p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300 z-[15]" />
          </div>

          {/* Product Info */}
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {name}
              {subtitle && (
                <span className="text-muted-foreground font-normal"> - {subtitle}</span>
              )}
            </h3>

            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-muted-foreground line-through text-sm">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className={isOutOfStock ? "text-muted-foreground" : "text-white"}>
                ${price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            w-full py-3 px-4 rounded-lg font-semibold text-sm
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isOutOfStock
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : showAdded
              ? 'bg-green-500 text-white'
              : isInCart(id)
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
          `}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock
            ? 'Sin Stock'
            : showAdded
            ? '¡Agregado!'
            : isInCart(id)
            ? 'Ya en el carrito'
            : 'Agregar al carrito'
          }
        </button>
      </div>
    </div>
  );
}