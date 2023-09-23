"use client";
import { Skeleton } from "@mantine/core";

export const SearchMainLoading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-8 mx-4 md:mx-0">
      {[1, 2, 4, 5, 6, 7, 8].map((e) => (
        <Skeleton height={377} key={`search-skeleton-${e}`} />
      ))}
    </div>
  );
};
