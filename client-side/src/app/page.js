import HeroSection from "@/components/Hero/page";
import PopularProduct from "@/containers/Product/Popular/page";
import Products from "@/containers/Product/page";
import { BASE_URL, options } from "@/utils/Api";

async function getPopularProducts() {
  const res = await fetch(`${BASE_URL}product/public/list/popular/products`, {
    headers: options,
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
      <Products />
    </main>
  );
}
