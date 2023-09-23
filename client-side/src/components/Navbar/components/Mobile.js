"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";
import { links } from "../pages";
import Link from "next/link";

const Mobile = () => {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <div className="block lg:hidden">
      <Burger opened={opened} onClick={toggle} />
      <Drawer opened={opened} onClose={close} title="">
        <div className="flex flex-col gap-3 px-6">
          {links.map((e) => (
            <Link
              prefetch={false}
              href={e.path}
              className={`${
                location.pathname == e.path ? "text-orange-500" : ""
              } duration-300 text-lg`}
              onClick={close}
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
