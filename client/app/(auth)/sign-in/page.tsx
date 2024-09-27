import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { images } from "@/constants";
import LoginForm from '@/components/login-form';

const SignIn = () => {
  return (
    <div
      className="flex  flex-col items-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
    from-[#9400FF] to-[#0D1117]"
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
          Sign In to your Dyce
        </h1>

        <LoginForm />
        {/* <LoginButton>
          <Button variant="secondary" size="lg">
            Sign In
          </Button>
        </LoginButton> */}
      </div>
      <div className=" gap-5 flex w-full mb-3 p-3 items-center justify-center text-center">
        <Link href="" className="text-white">
          Terms and Conditions
        </Link>
        <Link href="" className="text-white">
          Team
        </Link>
        <Link href="" className="text-white">
          Contact and Support
        </Link>
        <p className="text-white">@Dyce 2024</p>
      </div>
    </div>
  )
}

export default SignIn