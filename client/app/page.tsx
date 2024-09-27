import Image from "next/image";
import React from "react";
import { images } from "@/constants";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const Home = () => {
  return (
    <div className="home-bg h-full">
      <div className="py-5 px-10 flex items-end justify-between">
        <div className="flex items-end">
          <Image
            src={images.logo}
            alt="Logo"
            height={24}
            width={24}
            className="mx-2"
          />
          <h3 className="text-white">Dyce</h3>
        </div>
        <div className="flex">
          <div className="flex mx-2">
          <Link href="/" className="text-white mx-1 text-sm">Products </Link>
           <button className="text-white"><IoIosArrowDown /></button>
          </div>
          
          <Link href="/" className="text-white mx-2 text-sm">Resources </Link>
          <Link href="/" className="text-white mx-2 text-sm">Service</Link>
        </div>
        <div>
        <Link href="/sign-in" className="text-white border px-4 py-2 text-sm rounded-md">Sign In</Link>
          
        </div>
      </div>
      
      <div className="flex h-[80vh] justify-center items-center ">
        <div className="block">
        
        <h1 className="text-center mx-10 text-white mb-10 text-2xl md:mx-48">Transforming Africa's Payment and Checkout Ecosystem with Dyce: Experience Convenience Like Never Before!</h1>
        <div className="text-center">
           <Link href='/sign-up' className="rounded-lg text-white bg-[#3E006E] px-4 py-3 hover:bg-[#6800B8] text-sm"> Get Started</Link>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;
