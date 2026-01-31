import Link from "next/link";
import { ChevronRight, MessageCircle, Mail, ShoppingBag, FileText } from "lucide-react";

const pages = [
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "About", href: "/about", icon: FileText },
  { label: "Privacy Policy", href: "/privacy-policy", icon: FileText },
  { label: "FAQ", href: "/faq", icon: FileText },
];

const categories = [
  { label: "FiveM Products", href: "/category/fivem" },
  { label: "GTA V Products", href: "/category/gta-v" },
  { label: "CS2 Products", href: "/category/cs2" },
  { label: "Valo Products", href: "/category/valo" },
  { label: "Call Of Duty Products", href: "/category/cod" },
  { label: "DayZ Products", href: "/category/dayz" },
  { label: "R6 Products", href: "/category/r6" },
];

export function Footer() {
  return (
    <footer className="bg-[#0f0f15] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Safe Market</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Safe Market is a reseller of premium software solutions for gaming lovers.
              Focusing on computer games, we offer premium products with great support and service.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@safemarket.vip"
                  className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  info@safemarket.vip
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Pages</h4>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.label}>
                  <Link
                    href={page.href}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <page.icon className="h-4 w-4 mr-2" />
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm text-center">
            © Copyright 2021 – 2025 | safemarket.vip | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
