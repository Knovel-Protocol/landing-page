import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import AccountForm from '@/components/account/AccountForm';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'


type Props = {}

const inter = Inter({ subsets: ["latin"] });


function account({}) {
  const supabase = createClient();
  const [user, setUser] = useState<User|null>(null);


  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);



  return (
    <main className={`flex w-screen min-h-screen flex-col items-center ${inter.className}`}>
      {user ?  <AccountForm user={user}/> : <p>Loading</p>}
    </main>
  )
}

export default account