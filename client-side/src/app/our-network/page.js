import Companies from "@/containers/OurNetwork/Companies";
import Countries from "@/containers/OurNetwork/Countries";
import { COUNTRIES } from "@/utils/constants";
import Image from "next/image";

const OurNetwork = () => {
  return (
    <div className="">
      <div className="relative w-full h-[350px] flex justify-center items-center">
        <Image
          src="/our_network_bg.jpg"
          fill
          sizes="800px"
          className="w-auto h-full object-cover"
        />
        <div className="absolute text-white w-full mx-auto container">
          <h2 className="font-bold text-4xl mb-2">Our Network</h2>
          <div className="font-semibold text-xl">
            Connecting with people, exporting and importing, fostering growth
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Countries />
        <Companies />
      </div>
    </div>
  );
};

export default OurNetwork;
