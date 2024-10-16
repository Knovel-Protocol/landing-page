'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error);
    return { error: error.message }
  }

  return { success: true }

}

export async function createAccount(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error);
    return { error: error.message }
  }

  console.log('are we signing up?')

  //await revalidatePath('/')
  //redirect('/signin')
  return { success: true }


}

export async function logout(router:any) {
  const supabase = createClient();

    // Check if a user's logged in
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      console.log('user is', user);
      await supabase.auth.signOut()
    }
    router.push("/signin")
  return { success: true }

}