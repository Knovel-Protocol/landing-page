import LinkIcon from '@/icons/LinkIcon'
import LogoutIcon from '@/icons/LogoutIcon'
import SettingsIcon from '@/icons/SettingsIcon'
import Link from 'next/link'
import React, {useState} from 'react'
import { logout } from '../actions/login'
import { useRouter } from 'next/router'

type Props = {}

function AccountDropdown({}: Props) {
   const router = useRouter();
   const [wallectConnect, setWalletConnect] = useState<boolean>(false);
  return (
    <div className="flex flex-col space-y-4 py-4 text-sm font-medium text-[#e3e4e5]">
      <div  className="flex items-center space-x-2 px-3 hover:cursor-pointer hover:bg-black py-2">
          <LinkIcon className="size-6"/>
          <p>Connect Wallet</p>
      </div>
      
      <Link className="flex items-center space-x-2 hover:cursor-pointer hover:bg-black px-3 py-2" href="/account">
        <SettingsIcon />
        <p>Settings</p>
      </Link>

      <div onClick={() => logout(router)} className="flex items-center space-x-2 px-3 border-y py-2 hover:bg-black border-black hover:cursor-pointer">
        <LogoutIcon />
        <p>Logout</p>
      </div>
      
    </div>
  )
}

export default AccountDropdown