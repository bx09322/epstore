"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, Eye, ChevronDown } from "lucide-react";

export default function NeverLoseProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState("");
  const router = useRouter();

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", {
      product: "NeverLose - CS2",
      quantity,
      license: selectedLicense,
      price: selectedLicense === "1month" ? 34.99 : 249.99,
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
      "1month": "34.99",
      "lifetime": "249.99"
    };
    
    const licenseTextMap: { [key: string]: string } = {
      "1month": "1 Month - €34.99",
      "lifetime": "Lifetime - €249.99"
    };
    
    const price = priceMap[selectedLicense] || "0";
    const licenseText = licenseTextMap[selectedLicense] || "";
    
    // Construir la URL con los parámetros
    const params = new URLSearchParams({
      product: "NeverLose - CS2",
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
          <h1 className="text-4xl font-bold mb-4">NeverLose - CS2</h1>
          <ChevronDown className="mx-auto text-gray-500" size={24} />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-8 relative overflow-hidden">
              {/* Zoom Icon */}
              <button className="absolute top-4 left-4 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-200 transition z-10">
                <Eye size={20} />
              </button>

              {/* Product Image */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  {/* Crosshair Logo */}
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Outer circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Middle circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="45"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Inner circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="20"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Crosshair lines */}
                      {/* Top */}
                      <line
                        x1="100"
                        y1="10"
                        x2="100"
                        y2="30"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Bottom */}
                      <line
                        x1="100"
                        y1="170"
                        x2="100"
                        y2="190"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Left */}
                      <line
                        x1="10"
                        y1="100"
                        x2="30"
                        y2="100"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                      {/* Right */}
                      <line
                        x1="170"
                        y1="100"
                        x2="190"
                        y2="100"
                        stroke="#00d4ff"
                        strokeWidth="6"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <h2 className="text-5xl font-bold mb-2 tracking-wide" style={{ fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>
                    NEVERLOSE
                  </h2>
                  <p className="text-blue-400 text-xl font-bold tracking-wider">
                    <span className="text-white">PREMIUM </span>
                    <span className="text-blue-500">CS2 MENU</span>
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
              <h2 className="text-3xl font-bold mb-3">NeverLose - CS2</h2>
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-2xl">€34.99</span>
                <span className="text-gray-400">–</span>
                <span className="text-blue-400 text-2xl">€249.99</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              MidNight is a software developed for Counter Strike 2 
              that offers many features such as aimbot, stream 
              bypass, wallhack and many more. It's effective, 
              undetectable and easy to use. Get MidNight for a 
              powerful and convenient Counter Strike 2 experience.
            </p>

            {/* Status */}
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-blue-400 font-semibold">status:</span>{" "}
                <span className="text-green-400 font-bold">UNDETECTED</span>
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2 text-sm text-blue-400">
              <li>• Undedetected Counter Strike 2 Software</li>
              <li>• Instant Key</li>
              <li>• Showcase video in the description</li>
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
                <option value="1month">1 Month - €34.99</option>
                <option value="lifetime">Lifetime - €249.99</option>
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
          </div>
        </div>
      </div>
    </div>
  );
}