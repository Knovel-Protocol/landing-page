import { getUser } from '@/app/actions/draft';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchProfileImage = async(path:string, setProfileUrl: Function) => {
  try{
    const { data, error } = await supabase.storage.from('profile_images').download(path)
    if (error) {
      throw error
    }

    const url = URL.createObjectURL(data)
    setProfileUrl(url);
  }catch(err){
    console.log('Error downloading image: ', err);
  }
}

export async function fetchProfileInfo(setError: Function, setProfileUrl: Function) {
  try{
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url, drafts, published, username')
      .eq('id', authoruid)
      .single(); 

      if(error){
        throw error; 
      }

      const imageFile = data?.avatar_url; 
      fetchProfileImage(imageFile, setProfileUrl);

 

  }catch(err){
    console.error(err);
  }
}