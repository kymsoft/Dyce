"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { images } from "@/constants";
import RegisterForm from '@/components/register-form';
import ComingSoon from '@/components/coming-soon';

const SignUp = () => {
  const [isReady, setReady] = useState(false)
  return (
    <div
      className="flex  flex-col items-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
    from-[#9400FF] to-[#0D1117] h-[100vh]"
    >
      <div className="space-y-4 my-16">
        <div className="flex justify-center items-center ">
          <Link href="/">
          <Image
            src={images.logo}
            alt="Logo"
            height={70}
            width={70}
            className="mx-auto p-3 rounded-full"
          />
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-white drop-shadow-md text-center">
          Sign Up to enjoy Dyce
        </h1>

        {
          isReady ? (
            <RegisterForm />
          ) : (
            <ComingSoon/>
          )
        }
        
      </div>
      <div className=" gap-5 flex w-full mb-3 p-3 items-center justify-center text-center">
        <Link href="" className="text-white">
          Team
        </Link>
        <Link href="" className="text-white">
          Contact
        </Link>
        <p className="text-white">@Dyce 2024</p>
      </div>
    </div>
  )
}

export default SignUp