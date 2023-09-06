import HeroSection from "@/components/Hero/page";
import Navbar from "@/components/Navbar/pages";
import PopularProduct from "@/components/Product/Popular/page";

export default function Home() {
  return (
    <main className="">
      <div>
        <Navbar />
        <HeroSection />
        <PopularProduct />
      </div>
    </main>
  );
}
