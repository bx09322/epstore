
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f0f14] to-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-blue-400 text-sm font-medium tracking-wide">
              Welcome to EPS Market !
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Right choice for those{" "}
              <span className="text-blue-400">who love to win!</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
              Eps Market is a reseller of premium software solutions for gaming lovers.
              Focusing on PC Games we offer premium products with great support and service.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105"
            >
              Shop Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-3xl" />
            <Image
              src="https://ext.same-assets.com/1402794096/3020716576.png"
              alt="Gaming Characters"
              width={600}
              height={500}
              className="relative z-10 animate-float"
              priority
            />
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    </section>
  );
}
