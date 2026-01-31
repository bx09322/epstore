import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5">
      {/* Tagline */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Experienced, reliable and the best!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-bold text-blue-500">Safe</span>
              <span className="text-xl font-bold text-white">Market</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Safe Market is a reseller of premium software solutions for gaming lovers.
              Focusing on PC Games, we offer premium products with great support and service.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@safemarket.vip"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  info@safemarket.vip
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold mb-4">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#shop"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms Of Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FiveM Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  CS2 Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Call Of Duty Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Apex Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  DayZ Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © Copyright 2021 – 2025 | safemarket.vip
          </p>
        </div>
      </div>
    </footer>
  );
}
