import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Eulen Executor",
    image: "https://ext.same-assets.com/1402794096/2125280677.png",
    priceFrom: 19.99,
    priceTo: 89.99,
    sale: false,
    gradient: "from-pink-500/20 via-purple-500/10 to-blue-500/20",
  },
  {
    name: "redENGINE Executor",
    image: "https://ext.same-assets.com/1402794096/2912148142.png",
    priceFrom: 7.99,
    priceTo: 49.99,
    sale: true,
    discount: "20%",
    gradient: "from-red-500/20 via-gray-900 to-red-600/10",
  },
  {
    name: "redENGINE Spoofer",
    image: "https://ext.same-assets.com/1402794096/291700931.png",
    priceFrom: 9.99,
    priceTo: 39.99,
    sale: true,
    discount: "25%",
    gradient: "from-red-500/20 via-gray-900 to-blue-500/10",
  },
  {
    name: "redENGINE + Nexus Bundle Pack",
    image: "https://ext.same-assets.com/1402794096/2373955.png",
    priceFrom: 17.99,
    priceTo: 89.99,
    sale: true,
    discount: "10%",
    gradient: "from-red-500/15 via-gray-900 to-cyan-500/15",
  },
  {
    name: "Susano",
    image: "https://ext.same-assets.com/1402794096/2855791265.png",
    priceFrom: 10.99,
    priceTo: 74.99,
    sale: true,
    discount: "15%",
    gradient: "from-blue-500/20 via-gray-900 to-blue-600/10",
  },
  {
    name: "HX Softwares",
    image: "https://ext.same-assets.com/1402794096/279893036.png",
    priceFrom: null,
    priceTo: null,
    sale: false,
    readMore: true,
    gradient: "from-blue-500/20 via-gray-900 to-cyan-500/10",
  },
  {
    name: "TZX Project",
    image: "https://ext.same-assets.com/1402794096/573400688.png",
    priceFrom: 4.99,
    priceTo: 39.99,
    sale: true,
    discount: "20%",
    gradient: "from-blue-400/20 via-gray-900 to-blue-500/10",
  },
  {
    name: "TZ Project",
    image: "https://ext.same-assets.com/1402794096/3233854188.png",
    priceFrom: 3.99,
    priceTo: 39.99,
    sale: true,
    discount: "33%",
    gradient: "from-blue-500/20 via-gray-900 to-blue-600/10",
  },
  {
    name: "Nexus Menu (Phaze)",
    image: "https://ext.same-assets.com/1402794096/2561292807.png",
    priceFrom: 4.99,
    priceTo: 49.99,
    sale: true,
    discount: "33%",
    gradient: "from-cyan-500/20 via-gray-900 to-blue-500/10",
  },
  {
    name: "Lumia Menu",
    image: "https://ext.same-assets.com/1402794096/863341519.png",
    priceFrom: 9.99,
    priceTo: 29.99,
    sale: true,
    discount: "33%",
    gradient: "from-blue-500/20 via-gray-900 to-purple-500/10",
  },
  {
    name: "MidNight - GTA Online",
    image: "https://ext.same-assets.com/1402794096/3702582747.png",
    priceFrom: 6.99,
    priceTo: 21.99,
    sale: true,
    discount: "30%",
    gradient: "from-purple-500/20 via-gray-900 to-blue-500/10",
  },
  {
    name: "MemeSense - CS2",
    image: "https://ext.same-assets.com/1402794096/1876732197.png",
    priceFrom: 3.50,
    priceTo: 19.99,
    sale: false,
    gradient: "from-blue-500/20 via-gray-900 to-purple-500/10",
  },
];

export default function Products() {
  return (
    <section id="shop" className="bg-[#0a0a0f] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Best-Selling Products
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link
              key={index}
              href="#"
              className="group bg-gradient-to-br from-[#12121a] to-[#0c0c12] rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all card-hover"
            >
              <div className={`relative aspect-square bg-gradient-to-br ${product.gradient}`}>
                {product.sale && product.discount && (
                  <span className="absolute top-4 left-4 z-10 sale-badge">
                    SALE
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                {product.priceFrom !== null ? (
                  <p className="text-blue-400 font-bold">
                    €{product.priceFrom.toFixed(2)} – €{product.priceTo?.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-gray-400">Read more</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105"
          >
            All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
