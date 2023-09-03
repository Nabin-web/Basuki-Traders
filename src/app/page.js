import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Image
        src="/logo.png"
        width={120}
        height={120}
        alt="Picture of the logo"
      />

      <div>Nav bar</div>
    </main>
  );
}
