import Link from 'next/link'
import React from 'react'

type Props = {}

function AccountDropdown({}: Props) {
  return (
    <div className="flex flex-col p-4 space-y-4 text-lg font-semibold">
      <p className="hover:bg-slate-100 px-2 py-2">connect wallet</p>
      <Link className="hover:bg-slate-100 px-2 py-2" href="/account">
          <p>Settings</p>
      </Link>
      <p className="hover:bg-slate-100 px-2 py-2">log out</p>
    </div>
  )
}

export default AccountDropdown