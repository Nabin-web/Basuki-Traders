"use client";
import React from "react";
import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { Sectors } from "@/utils/constants";
import Image from "next/image";
import BlurImage from "../BlurImage";

const SectorPresence = () => {
  return (
    <>
      {" "}
      <h1 className="mb-4 text-4xl leading-loose tracking-widest text-center pb-4 border-b border-primary">
        Our <span className=" text-primary">Sectors</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 lg:gap-4 px-4 lg:px-0">
        {Sectors.map((each, index) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
            <Card.Section className=" relative h-40  ">
              <Image
                src={each.logo}
                className=" w-full h-full"
                layout="fill"
                objectFit="cover"
                alt="Sector image"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text className="w-1/2 truncate" fw={500}>
                {each.name}
              </Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text className=" line-clamp-3 " size="sm" c="dimmed">
              {each.description}
            </Text>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SectorPresence;
