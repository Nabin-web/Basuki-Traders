import HeroSection from "@/components/Hero/page";
import Navbar from "@/components/Navbar/pages";
import PopularProduct from "@/containers/Product/Popular/page";
import Products from "@/containers/Product/page";

export default function Home() {
  return (
    <main className="container mx-auto">
      <HeroSection />
      <PopularProduct />
      <Products />
    </main>
  );
}
