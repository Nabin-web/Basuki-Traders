import React from "react";
import Link from "next/link";
import { links } from "@/utils/constants";
import { RiMailSendLine, RiPhoneFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="pb-8 pt-16 border-t mt-10 border-gray-300 shadow-md">
      <div className="container mx-auto">
        <div className="flex gap-4 justify-between w-full">
          <div>
            <div className="pb-2 text-2xl font-bold text-primary">
              Ashirbad Traders
            </div>
            <p className="text-gray-500 text-sm">
              Trading made easy with our services.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <div className="flex flex-col gap-2">
              {links.map((e) => (
                <Link
                  key={e.label}
                  prefetch={false}
                  href={e.path}
                  className="hover:text-primary hover:underline duration-200 font-normal w-full text-sm"
                >
                  {e.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <RiPhoneFill />
              Contact No.
            </div>
            <div className="mt-1">+977 9856236598</div>

            <div className="flex items-center gap-2">
              <RiMailSendLine />
              Email Address{" "}
            </div>
            <div className="mt-1">hr@ashirbadtraders.com.np</div>
          </div>
        </div>
        <div>Copyright ©2023 All rights reserved | Ashirbad Traders</div>
      </div>
    </footer>
  );
};

export default Footer;
