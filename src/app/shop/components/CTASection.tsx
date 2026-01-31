import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a28] via-[#171720] to-[#0f0f18]" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-[0.3em] mb-4">
          Ready to get started?
        </p>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Shop Now!
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-transparent border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
