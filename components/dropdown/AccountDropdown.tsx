import LogoutIcon from '@/icons/LogoutIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { getAccount } from '@wagmi/core'
import { config } from '@/config';
import { useAccount } from 'wagmi';
import HomeIcon from '@/icons/HomeIcon'
import WorldIcon from '@/icons/WorldIcon'
import { addWalletAddress } from '../actions/login';


type Props = {
  userId : string
}

function AccountDropdown({userId}: Props) {
   const account = getAccount(config);
   const { address, isConnected } = useAccount();
   const [walletAdded, setWalletAdded] = useState(false);

   useEffect(() => {
    const addWallet = async () => {
      if(isConnected && address && account?.chainId){
        if(!walletAdded){
          await addWalletAddress(address, account?.chainId, userId);
          setWalletAdded(true); 
        }
      }
    }
    addWallet(); 
   }, [isConnected, address, userId])

  return (
    <div className="flex flex-col space-y-4 py-4 w-full text-sm font-medium text-[#e3e4e5]">
      {!isConnected ? (
     <div className="flex items-center self-center justify-center px-4 hover:cursor-pointer py-2">
         <w3m-connect-button />
      </div>
      ) : (
        <div className="flex items-center self-center justify-center px-4 hover:cursor-pointer hover:bg-black py-2">
          <w3m-button />
        </div>
      )}

      <Link className="flex items-center space-x-2 hover:cursor-pointer hover:bg-black px-3 py-3" href="/dashboard">
        <HomeIcon />
        <p>dashboard</p>
      </Link>

      <Link className="hidden halflg:flex items-center space-x-2 hover:cursor-pointer hover:bg-black px-3 py-3" href="/dashboard">
        <WorldIcon />
        <p>commnunity</p>
      </Link>
      
      <Link className="flex items-center space-x-2 hover:cursor-pointer hover:bg-black px-3 py-3" href="/account">
        <SettingsIcon />
        <p>Settings</p>
      </Link>

      <form action="/auth/signout" method="post" className="w-full border-y hover:bg-black border-black hover:cursor-pointer">
          <button className="flex items-center space-x-2 px-3 py-3" type="submit">
            <LogoutIcon />
            <p>Logout</p>
          </button>
       
      </form>
      
    </div>
  )
}

export default AccountDropdown