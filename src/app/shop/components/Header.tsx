"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
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
              <Link href="/" className="flex items-center gap-1 z-10">
                <span className="text-2xl font-bold text-blue-500">EPS</span>
                <span className="text-2xl font-bold text-white">Market</span>
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Shop
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </div>

              <div className="flex items-center gap-4 z-10">
                <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>

                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Search className="w-6 h-6" />
                </button>

                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="hidden md:flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Salir
                  </button>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Acceso
                  </button>
                )}

                <button
                  className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* MENÚ MÓVIL - FULLSCREEN OVERLAY */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        {/* Backdrop oscuro */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Panel del menú */}
        <div
          className={`
            absolute right-0 top-0 h-full w-[280px] bg-[#0a0a0f] border-l border-white/10
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col h-full p-6">
            {/* Espaciado superior */}
            <div className="h-20" />

            {/* Links del menú */}
            <nav className="flex-1 space-y-2">
              <Link
                href="/"
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>

            {/* Botón de login/logout al fondo */}
            <div className="pt-6 border-t border-white/10">
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-3 px-4 rounded-lg transition-all w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Salir</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 py-3 px-4 rounded-lg transition-all w-full"
                >
                  <User className="w-5 h-5" />
                  <span>Acceso</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}