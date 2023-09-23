"use client";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { BASE_URL, IMAGE_URL, fetcher, options } from "@/utils/Api";
import React from "react";
import { FaPlus } from "react-icons/fa";
import useSWR from "swr";

const ProductListing = () => {
  const { data, mutate, isLoading } = useSWR(
    {
      url: `${BASE_URL}product`,
      headers: options,
    },
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <div className="px-10 mb-10 flex  gap-4 mt-4">
      <div className="font-thin text-left">
        <>
          <h1 className="pr-4 py-1 mb-2 border-b border-gray-400">
            Categories
          </h1>
          <div className="pr-4 text-sm flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((each, i) => (
              <div className=" hover:text-orange-500 cursor-pointer">
                Category
              </div>
            ))}
          </div>
        </>
      </div>
      <div className=" flex-1">
        <h1 className=" text-lg mb-4">"100" Search Result for "Product"</h1>
        <div className=" relative grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 items-center flex-wrap gap-4">
          {data?.data?.map((each, index) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text className=" w-2/3 truncate" fw={500}>
                  Refirgirator Refirgirator Refirgirator
                </Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Show Details
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
