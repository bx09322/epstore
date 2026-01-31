"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0f0f14] border-b border-blue-500/20 py-2.5 px-4">
        <p className="text-center text-sm md:text-base font-semibold text-white">
          We accept PayPal, Paysafe, Bank Transfer and other GiftCards on our{" "}
          <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
            Discord Server
          </Link>
        </p>
      </div>

      <nav className="bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold text-blue-500">Safe</span>
              <span className="text-2xl font-bold text-white">Market</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/shop" className="text-gray-300 hover:text-white">Shop</Link>
              <Link href="#" className="text-gray-300 hover:text-white">Contact</Link>
              <Link href="#" className="text-gray-300 hover:text-white">FAQ</Link>
              <Link href="#" className="text-gray-300 hover:text-white">About</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-300 hover:text-white">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              <button className="p-2 text-gray-300 hover:text-white">
                <Search className="w-6 h-6" />
              </button>

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="hidden md:flex items-center gap-2 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  Salir
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <User className="w-5 h-5" />
                  Acceso
                </button>
              )}

              <button
                className="lg:hidden p-2 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
