'use client'
import { User } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/client";
import { Profile } from "@/index";
import { useCallback, useState } from "react";


export const useProfile = (user: User | null) => {
  const supabase = createClient();

  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = useCallback(async() => {
    try{
      setLoading(true); 
      const {data, error, status} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

      if(error && status !== 406){
        console.log(error); 
        throw error; 
      }
  
      if(data){
        setFullname(data.full_name);
        setUsername(data.username); 
        setAvatarUrl(data.avatar_url); 
      }
  
    }catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  return {
    loading, 
    fullname,
    setFullname,
    username,
    setUsername,
    avatar_url,
    setAvatarUrl, 
    fetchProfile
  }

}
