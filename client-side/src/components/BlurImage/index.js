import Image from "next/image";
import React, { useState } from "react";

export default function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    // <Link prefetch={false} href={image.href} className="group">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <Image
        alt="Product Image"
        src={image}
        layout="fill"
        className={`
              duration-700 ease-in-out group-hover:opacity-75 object-contain
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
    // </Link>
  );
}
