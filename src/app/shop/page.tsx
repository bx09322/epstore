"use client";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { GameCard } from "./components/GameCard";
import { CTASection } from "./components/CTASection";
import { ChevronRight, ChevronDown, Home } from "lucide-react";
import Link from "next/link";

const games = [
  {
    title: "F1veM",
    count: 12,
    image: "https://ext.same-assets.com/1402794096/822277925.png",
    href: "/category/fivem",
  },
  {
    title: "Counter Strike 2",
    count: 7,
    image: "https://ext.same-assets.com/1402794096/556650642.png",
    href: "/shop/cs2-hack",
  },
  {
    title: "Rust",
    count: 3,
    image: "https://ext.same-assets.com/1402794096/2352063766.png",
    href: "/category/rust",
  },
  {
    title: "Rainbow Six Siege",
    count: 3,
    image: "https://ext.same-assets.com/1402794096/1898529828.png",
    href: "/category/r6",
  },
  {
    title: "DayZ",
    count: 3,
    image: "https://ext.same-assets.com/1402794096/1911522223.png",
    href: "/category/dayz",
  },
  {
    title: "Fortnite",
    count: 2,
    image: "https://ext.same-assets.com/1402794096/3848600720.png",
    href: "/category/fortnite",
  },
  {
    title: "Apex Legends",
    count: 1,
    image: "https://ext.same-assets.com/1402794096/203939338.png",
    href: "/category/apex",
  },
  {
    title: "Squad",
    count: 1,
    image: "https://ext.same-assets.com/1402794096/1749030201.png",
    href: "/category/squad",
  },
  {
    title: "Red Dead Redemption",
    count: 1,
    image: "https://ext.same-assets.com/1402794096/1182875423.png",
    href: "/category/rdr",
  },
  {
    title: "Roblox",
    count: 1,
    image: "https://ext.same-assets.com/1402794096/2836102475.png",
    href: "/category/roblox",
  },
  {
    title: "Call Of Duty",
    count: 1,
    image: "https://ext.same-assets.com/1402794096/1590224948.png",
    href: "/category/cod",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#171720]">
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background with decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a28] to-[#171720]" />

          {/* Decorative blur circles */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-900/20 rounded-full blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-[400px] h-[250px] bg-blue-800/15 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Shop
            </h1>
            <div className="flex justify-center">
              <ChevronDown className="h-6 w-6 text-white/50 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-600" />
            <span className="text-white font-medium">Shop</span>
          </nav>
        </div>

        {/* Section Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h2 className="text-3xl font-bold text-white">Shop</h2>
        </div>

        {/* Games Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <GameCard
                  key={game.title}
                  title={game.title}
                  count={game.count}
                  image={game.image}
                  href={game.href}
                />
              ))}
            </div>

            {/* No products message */}
            <div className="mt-16 text-center">
              <p className="text-gray-500 text-lg">
                No products were found matching your selection.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
