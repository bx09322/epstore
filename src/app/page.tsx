import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <Hero />
      <Stats />
      <Categories />
      <Products />
      <Features />
      <Footer />
      <CookieConsent />
    </main>
  );
}
