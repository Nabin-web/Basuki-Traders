import HeroSection from "@/components/Hero/page";
import Navbar from "@/components/Navbar/pages";
import PopularProduct from "@/components/Product/Popular/page";
import Products from "@/components/Product/page";

export default function Home() {
  return (
    <main className="container mx-auto">
      <HeroSection />
      <PopularProduct />
      <Products />
    </main>
  );
}
