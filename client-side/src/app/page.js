import HeroSection from "@/components/Hero/page";
import Slogan from "@/components/Slogan";
import CompanyNetwork from "@/components/CompanyNetwork";
import PopularProduct from "@/containers/Product/Popular/page";
import Products from "@/containers/Product/page";
import { BASE_URL, options } from "@/utils/Api";
import HomeAboutUs from "@/containers/HomeAboutUs";

async function getPopularProducts() {
  const res = await fetch(`${BASE_URL}product/public/list/popular/products`, {
    headers: options,
    cache: "no-store",
  }).then((res) => res.json());

  const data = res?.data || [];
  return data;
}

export default async function Home() {
  const popularData = await getPopularProducts();

  return (
    <main className="container mx-auto">
      <HeroSection />
      <PopularProduct popularData={popularData} />
      <Slogan />
      <HomeAboutUs />
      <CompanyNetwork />
      <Products />
    </main>
  );
}
