"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import FloatingLogin from "./FloatingLogin";
import CartSidebar from './CartSidebar';
import dynamic from 'next/dynamic';

// Importar AdminPanel dinámicamente para evitar problemas de SSR
const AdminPanel = dynamic(() => import('./AdminPanel'), { ssr: false });

interface UserData {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { getCartCount } = useCart();

  // Cargar usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error al cargar usuario:', e);
      }
    }
  }, []);

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

  const handleLoginSuccess = (loggedUser: UserData) => {
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowAdminPanel(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setMobileMenuOpen(false);
  };

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
                {/* BOTÓN DEL CARRITO ACTUALIZADO */}
                <button 
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>

                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Search className="w-6 h-6" />
                </button>

                {user ? (
                  <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-2 text-white">
                      <User className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium">{user.username}</span>
                      {user.isAdmin && (
                        <>
                          <span className="text-yellow-400 text-xs">👑 Admin</span>
                          <button
                            onClick={() => setShowAdminPanel(!showAdminPanel)}
                            className="text-xs bg-blue-500/20 hover:bg-blue-500/30 px-2 py-1 rounded transition-colors"
                          >
                            Panel
                          </button>
                        </>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Salir
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLoginClick}
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
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <div
          className={`
            absolute right-0 top-0 h-full w-[280px] bg-[#0a0a0f] border-l border-white/10
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col h-full p-6">
            <div className="h-20" />

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

              {user?.isAdmin && (
                <button
                  onClick={() => {
                    setShowAdminPanel(!showAdminPanel);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 py-3 px-4 rounded-lg transition-all"
                >
                  👑 Panel Admin
                </button>
              )}
            </nav>

            <div className="pt-6 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-400 px-4">
                    Conectado como: <span className="text-white font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-3 px-4 rounded-lg transition-all w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Salir</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
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

      {/* Login Flotante */}
      {showLogin && (
        <FloatingLogin
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Panel de Administración */}
      {showAdminPanel && user?.isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => setShowAdminPanel(false)}
                className="mb-4 flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                <X className="w-5 h-5" />
                Cerrar Panel
              </button>
              <AdminPanel />
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}