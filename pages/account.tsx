import { Inter } from 'next/font/google';
import React from 'react';
import AccountForm from '@/app/account/AccountForm';
import { createClient } from '@/utils/supabase/client';


type Props = {}

const inter = Inter({ subsets: ["latin"] });


async function account({}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()



  return (
    <main className={`flex w-screen min-h-screen flex-col items-center ${inter.className}`}>
      <AccountForm user={user}/>
    </main>
  )
}

export default account