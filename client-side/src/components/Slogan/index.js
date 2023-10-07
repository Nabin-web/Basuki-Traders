import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "../Button";

const Slogan = () => {
  return (
    <div className="mb-16 mt-8">
      <div className="relative h-96 flex items-center">
        <div className="w-full h-full bg-black/30 z-10" />
        <div className="capitalize text-left absolute z-20 pl-4 lg:pl-20 text-white tracking-wider font-bold">
          <h3 className="mb-3 text-3xl">
            <span>Connecting </span>
            <span className="">Worlds, </span>
          </h3>
          <h3 className="mb-5 text-3xl">
            <span>Delivering </span>
            <span className="">Possibilities</span>
          </h3>
          <Button className="px-6 py-4 text-xl flex items-center gap-2 rounded-lg bg-primary hover:shadow-lg">
            Join us <FaArrowRight />
          </Button>
        </div>
        <Image
          src="/containers.jpg"
          layout="fill"
          objectFit="cover"
          className=" w-full h-full"
          alt="food image"
        />
      </div>
    </div>
  );
};

export default Slogan;
