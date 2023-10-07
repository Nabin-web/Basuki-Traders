"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/utils/constants";

const Mobile = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const pathname = usePathname();

  return (
    <div className="block lg:hidden">
      <Burger opened={opened} onClick={toggle} />
      <Drawer opened={opened} onClose={close} title="" size="xs">
        <div className="flex flex-col gap-3 px-6">
          {links.map((e) => (
            <Link
              prefetch={false}
              href={e.path}
              className={`${
                pathname == e.path ? "text-primary" : ""
              } duration-300 text-lg`}
              onClick={close}
              key={e.label}
            >
              {e.label}
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Mobile;
