import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Features />
      <Reviews />
      <Download />
      <Footer />
    </main>
  );
}
