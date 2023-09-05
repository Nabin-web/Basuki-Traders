import HeroSection from "@/components/Hero/page";
import Navbar from "@/components/Navbar/pages";

export default function Home() {
  return (
    <main className="">
      <div
      // style={{
      //   backgroundImage: `url('/herosection.jpg')`,
      //   // backgroundImage: `url(${externalImage})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      // }}
      >
        <Navbar />
        <HeroSection />
      </div>
    </main>
  );
}
