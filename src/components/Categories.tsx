"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Counter Strike 2",
    image: "https://ext.same-assets.com/1402794096/250624400.png",
    slug: "cs2",
    color: "from-orange-500/30 to-yellow-600/20",
  },
  {
    name: "DayZ",
    image: "https://ext.same-assets.com/1402794096/2232512158.png",
    slug: "dayz",
    color: "from-green-500/30 to-emerald-600/20",
  },
  {
    name: "FiveM",
    image: "https://ext.same-assets.com/1402794096/2031919524.png",
    slug: "fivem",
    color: "from-orange-500/30 to-red-600/20",
  },
  {
    name: "Fortnite",
    image: "https://ext.same-assets.com/1402794096/3060681139.png",
    slug: "fortnite",
    color: "from-purple-500/30 to-pink-600/20",
  },
  {
    name: "Rainbow Six",
    image: "https://ext.same-assets.com/1402794096/1498524506.png",
    slug: "rainbow-six",
    color: "from-blue-500/30 to-cyan-600/20",
  },
  {
    name: "Apex Legends",
    image: "https://ext.same-assets.com/1402794096/2383942201.png",
    slug: "apex",
    color: "from-red-500/30 to-orange-600/20",
  },
  {
    name: "Call Of Duty",
    image: "https://ext.same-assets.com/1402794096/822601862.png",
    slug: "cod",
    color: "from-green-600/30 to-emerald-700/20",
  },
  {
    name: "Rust",
    image: "https://ext.same-assets.com/1402794096/691109400.png",
    slug: "rust",
    color: "from-amber-500/30 to-orange-600/20",
  },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#0a0a0f] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Categories
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`#${category.slug}`}
              className="relative flex-shrink-0 w-40 md:w-48 aspect-square rounded-xl overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />

              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
