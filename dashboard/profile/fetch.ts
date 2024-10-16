
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export async function uploadProfilePicture(userId: string, filePath: string, file:File){
  try{
    const{data, error}  =  await supabase.storage.from('profile_images').upload(`${filePath}`, file, {
      upsert: true,
    })

    if(error){
      console.error("Error uploading image", error);
    }

    // Send path to profiles table
    const {data: profileUpdate, error: profileError} = await supabase
      .from('profiles')
      .update({avatar_url: filePath})
      .eq('id', userId); 

      if(profileError){
        console.error('Error updating user profile:', profileError.message);
      }

    console.log('User profile updated successfully');
  
  }catch(err){
    console.error("Error encounted", err); 
  }
}
