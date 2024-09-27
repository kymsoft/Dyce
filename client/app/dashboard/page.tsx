import Image from 'next/image'
import { images } from "@/constants";
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { LogoutButton } from '@/components/logout-button';

const Home = () => {
  return (
    <div className="flex items-end bg-black">
      
          <Image
            src={images.logo}
            alt="Logo"
            height={24}
            width={24}
            className="mx-2"
          />
          <h3 className="text-white">Dyce</h3>

          <LogoutButton>Logout</LogoutButton>
        </div>
  )
}

export default Home