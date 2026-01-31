"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, ChevronDown } from "lucide-react";

export default function NixwareProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState("");
  const router = useRouter();

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: "NIXWARE - CS2",
      quantity,
      license: selectedLicense,
      price: 3.50,
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
      "14days": "3.50",
      "30days": "5.40"
    };
    
    const licenseTextMap: { [key: string]: string } = {
      "14days": "14 Days - €3.50",
      "30days": "30 Days - €5.40"
    };
    
    const price = priceMap[selectedLicense] || "0";
    const licenseText = licenseTextMap[selectedLicense] || "";
    
    // Construir la URL con los parámetros
    const params = new URLSearchParams({
      product: "NIXWARE - CS2",
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
          <h1 className="text-4xl font-bold mb-4">NIXWARE - CS2</h1>
          <ChevronDown className="mx-auto text-gray-500" size={24} />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          {/* Product Image */}
          <div className="relative">
            <div className="p-8 relative min-h-[500px] flex items-center justify-center">
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded z-10 text-center leading-tight">
                SALE<br />-37%
              </div>

              {/* Product Image */}
              <div className="text-center relative z-[5]">
                {/* Nixware Logo in black box */}
                <div className="bg-black rounded-lg p-6 mb-8 mx-auto inline-block">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd5_S81bCFjV-xbK2rUxDggqmjyqxcPl2QAg&s"
                    alt="Nixware Logo"
                    className="w-52 h-auto object-contain"
                  />
                </div>

                {/* Text outside the box */}
                <h2 className="text-5xl font-bold mb-3 text-white">NIXWARE</h2>
                <p className="text-blue-400 text-xl font-semibold tracking-wide uppercase">
                  CS2 MOD MENU
                </p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h2 className="text-3xl font-bold mb-3">NIXWARE - CS2</h2>
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-3xl font-bold">€3.5</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              NIXWARE is a software developed for Counter Strike 2 that offers
              many features such as aimbot, stream bypass, wallhack and many
              more. It's effective, undetectable and easy to use. Get NIXWARE
              for a powerful and convenient Counter Strike 2 experience.
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
                Choose License Type
              </label>
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose an option</option>
                <option value="14days">14 Days - €3.50</option>
                <option value="30days">30 Days - €5.40</option>
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