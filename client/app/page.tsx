"use client";

import Image from "next/image";
import React, { useState } from "react";
import { images } from "@/constants";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import NavigationMenuArea from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/footer";

const Home = () => {
  const [isClick, setIsClick] = useState(false);

  const toogleNavbar = (): void => {
    setIsClick(!isClick);
  };
  return (
    <div className="home-bg h-[100vh]">
      <div className="py-5 pl-10 pr-5 flex items-end justify-between">
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
        <div className="flex items-end max-md:hidden">
          <NavigationMenuArea />
        </div>

        <div className="flex items-end space-x-3">
          <div>
            <Link
              href="/sign-in"
              className="text-white border px-4 py-2 text-sm rounded-md hover:bg-slate-700"
            >
              Sign In
            </Link>
          </div>
          <div className="md:hidden items-center">
            <Button
              className="inline-flex items-center justify-center p-2 rounded-md
          focus:outline-none bg-transparent hover:bg-transparent"
              onClick={toogleNavbar}
            >
              {isClick ? (
                <ImCross height={20} className="text-2xl" />
              ) : (
                <IoReorderThreeOutline className="text-2xl" />
              )}
            </Button>
            {isClick && (
              <div className="fixed md:hidden ml-auto w-full h-full bg-slate-700 mt-2 pt-10 p-4 rounded-md left-0 right-0 shadow-md transition-all duration-1000 ease-in-out overflow-y-auto opacity-95">
                <div className="px-2 pt-2 pb-2 space-y-3 sm:px-3 ">
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-white">Why Dyce?</AccordionTrigger>
                      <AccordionContent className="text-white">
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-white">Products</AccordionTrigger>
                      <AccordionContent className="text-white">
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-white">Resources</AccordionTrigger>
                      <AccordionContent className="text-white">
                        Yes. It&apos;s animated by default, but you can disable
                        it if you prefer.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <div className="mb-8 mt-4">
                      <Link href="/" className="text-white text-[15px]">Pricing</Link>
                      </div>
                      
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <div className="mb-8">
                      <Link href="/" className="text-white text-[15px]">Contact</Link>
                      </div>
                      
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="w-full">
                    <Link href="/sign-up">
                      <Button className="bg-[#3e006e] hover:bg-[#1b0030] w-full rounded-2xl px-3 py-1 opacity-100">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-[80vh] justify-center items-center ">
        <div className="block">
          <h1 className="text-center mx-10 text-white mb-2 text-3xl md:mx-48">
          Skip the hassle. One Tap at the Time.
          </h1>
          <h2 className="text-center mx-10 text-white mb-10 text-xl md:mx-48">
            Stepping up Africa's payment and checkout ecosystem. Hop on!
          </h2>
          <div className="text-center">
            <Link
              href="/sign-up"
              className="rounded-lg text-white bg-[#3E006E] px-4 py-3 hover:bg-[#6800B8] text-sm"
            >
              {" "}
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
