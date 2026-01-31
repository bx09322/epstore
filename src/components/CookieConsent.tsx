"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs">
      <div className="bg-[#12121a] border border-white/10 rounded-xl p-6 shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Cookie className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <p className="text-gray-300 text-sm text-center mb-4">
          Our site uses cookies. Learn more about our use of cookies:{" "}
          <button type="button" className="text-blue-400 hover:text-blue-300 underline">
            cookie policy
          </button>
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
