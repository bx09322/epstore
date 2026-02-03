"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, Eye, ChevronDown } from "lucide-react";

export default function MemeSenseProduct() {
  const [quantity, setQuantity] = useState(1);
  const [selectedLicense, setSelectedLicense] = useState("");
  const router = useRouter();

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", {
      product: "MemeSense - CS2",
      quantity,
      license: selectedLicense,
      price: selectedLicense === "1day" ? 3.50 : 19.99,
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
      "1day": "3.50",
      "7days": "9.99",
      "30days": "19.99"
    };
    
    const licenseTextMap: { [key: string]: string } = {
      "1day": "1 Day - €3.50",
      "7days": "7 Days - €9.99",
      "30days": "30 Days - €19.99"
    };
    
    const price = priceMap[selectedLicense] || "0";
    const licenseText = licenseTextMap[selectedLicense] || "";
    
    // Construir la URL con los parámetros
    const params = new URLSearchParams({
      product: "MemeSense - CS2",
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
              <span className="text-blue-500">EPS</span>
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
          <h1 className="text-4xl font-bold mb-4">MemeSense - CS2</h1>
          <ChevronDown className="mx-auto text-gray-500" size={24} />
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          {/* Product Image */}
          <div className="relative">
            <div className="p-8 relative">

              {/* Product Image */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center w-full">
                  {/* MemeSense Logo Image */}
                  <div className="relative w-full max-w-md mx-auto mb-8">
                    <img 
                      src="https://safemarket.vip/wp-content/uploads/2024/03/banner17_by_slimarts.png"
                      alt="MemeSense CS2"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h2 className="text-3xl font-bold mb-3">MemeSense - CS2</h2>
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-2xl">€3.50</span>
                <span className="text-gray-400">–</span>
                <span className="text-blue-400 text-2xl">€19.99</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              MemeSense is a cutting-edge software tailored for 
              the ultimate gaming experience in Counter Strike 2. 
              Packed with an array of features including aim 
              assistance, skin changer, wall vision, and beyond, 
              MemeSense ensures you dominate the game 
              effortlessly and discreetly. Elevate your Counter 
              Strike 2 gameplay with MemeSense and unleash your 
              full potential in every match.
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
                <option value="1day">1 Day - €3.50</option>
                <option value="7days">7 Days - €9.99</option>
                <option value="30days">30 Days - €19.99</option>
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