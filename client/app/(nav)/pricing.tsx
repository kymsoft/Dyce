import Image from 'next/image'
import Link from 'next/link'
import { images } from "@/constants";

import ComingSoon from '@/components/coming-soon';

const Pricing = () => {
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
          Pricing
        </h1>
            <ComingSoon/>
          
        
      </div>
    </div>
  )
}

export default Pricing