"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, Eye, ChevronDown } from "lucide-react";

export default function MidNightProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState("");
  const router = useRouter();

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", {
      product: "MidNight - CS2",
      quantity,
      license: selectedLicense,
      price: 4.99,
    });
  };

  const handleLoginClick = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    const callbackUrl = encodeURIComponent(currentUrl);
    router.push(`/login?callbackUrl=${callbackUrl}`);
  };

  const handlePayment = () => {
    if (!selectedLicense) {
      alert('Please select a license type first');
      return;
    }
    
    // Mapear las licencias a sus precios
    const priceMap: { [key: string]: string } = {
      "1day": "4.99",
      "7days": "14.99",
      "30days": "39.99",
      "lifetime": "99.99"
    };
    
    const licenseTextMap: { [key: string]: string } = {
      "1day": "1 Day - €4.99",
      "7days": "7 Days - €14.99",
      "30days": "30 Days - €39.99",
      "lifetime": "Lifetime - €99.99"
    };
    
    const price = priceMap[selectedLicense] || "0";
    const licenseText = licenseTextMap[selectedLicense] || "";
    
    // Construir la URL con los parámetros
    const params = new URLSearchParams({
      product: "MidNight - CS2",
      price: price,
      license: licenseText,
      quantity: quantity.toString()
    });
    
    router.push(`/payments/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">Soft</span>
              <span className="text-white">Market</span>
            </h1>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
              <a href="/shop/" className="hover:text-blue-400 transition">
                Shop
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                FAQ
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                About
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Legacy
              </a>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="relative hover:text-blue-400 transition">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="hover:text-blue-400 transition">
              <Search size={20} />
            </button>
            <button
              onClick={handleLoginClick}
              className="hover:text-blue-400 transition flex items-center gap-2"
            >
              <User size={20} />
              <span className="text-sm hidden lg:inline">Login or Register</span>
            </button>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">MidNight - CS2</h1>
          <ChevronDown className="mx-auto text-gray-500" size={24} />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-8 relative overflow-hidden">
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
                SALE<br />-37%
              </div>

              {/* Zoom Icon */}
              <button className="absolute top-4 left-4 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-200 transition">
                <Eye size={20} />
              </button>

              {/* Product Image */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  {/* Triangle Logo */}
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Outer triangle */}
                      <path
                        d="M 100 20 L 180 150 L 20 150 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                      />
                      {/* Middle triangle */}
                      <path
                        d="M 100 40 L 160 140 L 40 140 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                      />
                      {/* Inner triangle */}
                      <path
                        d="M 100 60 L 140 130 L 60 130 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="8"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <h2 className="text-4xl font-bold mb-2">MIDNIGHT</h2>
                  <p className="text-blue-400 text-xl font-bold tracking-wider">
                    CS2 MOD MENU
                  </p>
                </div>
              </div>

              {/* Decorative grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#4444ff 1px, transparent 1px), linear-gradient(90deg, #4444ff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h2 className="text-3xl font-bold mb-3">MidNight - CS2</h2>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 line-through text-xl">€7.99</span>
                <span className="text-blue-400 text-3xl font-bold">€4.99</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              With Nixware, you will be able to customize the
              cheating experience to your needs. Make the 
              cheating experience your own with our customizable
              visuals. Set the colors just the way you like them,
              change bloom, and plenty more. With our humanized 
              aimbot you will be able to enhance your aim up to a
              previously unreachable level, our aimbot will provide
              you with the settings you need.
            </p>

            {/* Status */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-sm">
                • <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-400 font-bold">UNDETECTED</span>
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2 text-sm text-blue-400">
              <li>• Undetected Counter Strike 2 Software</li>
              <li>• Instant Key</li>
            </ul>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Pay with PayPal / Paysafecard / Giftcards
            </button>

            {/* License Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Choose Licence Type
              </label>
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose an option</option>
                <option value="1day">1 Day - €4.99</option>
                <option value="7days">7 Days - €14.99</option>
                <option value="30days">30 Days - €39.99</option>
                <option value="lifetime">Lifetime - €99.99</option>
              </select>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-800 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-800 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>

            {/* SKU */}
            <div className="text-sm text-gray-500">
              <span className="font-semibold">SKU:</span> N/A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}