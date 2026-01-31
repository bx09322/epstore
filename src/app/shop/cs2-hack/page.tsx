import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/app/shop/cs2-hack/components/ProductCard";
import { ChevronDown } from "lucide-react";

const products = [
  {
    id: "NIXWARE",
    name: "NIXWARE",
    subtitle: "CS2 MOD MENU",
    image: "https://safemarket.vip/wp-content/uploads/2024/05/nixwarrrrrr.png",
    price: 3.5,
    originalPrice: 5.49,
    badge: "sale" as const,
    gradientFrom: "from-blue-900/70",
    gradientTo: "to-slate-900/95",
    icon: "keyboard" as const,
  },
  {
    id: "MEMESENSE",
    name: "MEMESENSE",
    subtitle: "PREMIUM CS2 MENU",
    image: "https://safemarket.vip/wp-content/uploads/2024/03/banner17_by_slimarts-600x600.png",
    price: 3.50,
    priceRange: { min: 3.50, max: 19.99 },
    gradientFrom: "from-blue-900/70",
    gradientTo: "to-slate-900/95",
    icon: "mouse" as const,
  },
  {
    id: "NEVERLOSE",
    name: "NEVERLOSE",
    subtitle: "CS2 MOD MENU",
    image: "https://safemarket.vip/wp-content/uploads/2024/06/nlsafemarke-600x600.png",
    price: 3.00,
    priceRange: { min: 3.00, max: 134.99 },
    badge: "sale" as const,
    gradientFrom: "from-cyan-900/70",
    gradientTo: "to-slate-900/95",
    icon: "keyboard" as const,
  },
  {
    id: "MIDNIGHT",
    name: "MIDNIGHT",
    subtitle: "CS2 MOD MENU",
    image: "https://safemarket.vip/wp-content/uploads/2024/02/banner18_by_slimarts-600x600.png",
    price: 6.99,
    originalPrice: 7.99,
    badge: "sale" as const,
    gradientFrom: "from-red-900/70",
    gradientTo: "to-slate-900/95",
    icon: "headset" as const,
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CS2 Cheats & Mods
          </h1>
          <p className="max-w-3xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            Step into the competitive edge with our exclusive CS2 cheats collection.
            Experience unparalleled gameplay with our premium mod menus and tools
            designed for gamers who demand the best in performance and quality. From
            precision aimbots to inventory changers, our products are
            curated to elevate your gaming experience instantly.
          </p>

          {/* Scroll indicator */}
          <div className="animate-bounce mt-12">
            <ChevronDown className="w-8 h-8 text-muted-foreground mx-auto" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <p className="text-muted-foreground text-sm">
              Showing all {products.length} results
            </p>
            <div className="relative">
              <select className="appearance-none bg-secondary text-foreground px-4 py-2 pr-10 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer">
                <option>Sort by popularity</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
                <option>Sort by latest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}