"use client";
import adminLinks from "@/routes/Admin";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div
        className="w-[256px] text-sm text-white h-screen"
        style={{
          background: "linear-gradient(180deg, #0D0E23 0%, #0f5f66 100%)",
        }}
      >
        <h4 className="text-lg font-bold text-center mt-4 border-b border-white pb-2 mb-5">
          Admin Links
        </h4>
        {adminLinks.map((e) => (
          <Link
            href={e.link}
            prefetch={false}
            key={`admin-links-${e.key}`}
            className={`flex gap-2 items-center px-4 py-2 text-xs hover:bg-black duration-200 ${
              pathname == e.link ? "bg-[#2596be]" : ""
            }`}
          >
            {e.icon}
            {e.name}
          </Link>
        ))}
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
