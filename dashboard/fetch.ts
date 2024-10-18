import { getUser } from '@/app/actions/draft';
import { fetchDraftBookImage } from '@/drafts/fetch';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchProfileImage = async(imageFile:string, setProfileUrl: Function) => {
  try{
    const { data, error } = await supabase.storage.from('profile_images').download(imageFile)
    if (error) {
      throw error
    }

    const url = URL.createObjectURL(data)
    setProfileUrl(url);
  }catch(err){
    console.log('Error downloading image: ', err);
  }
}

export async function fetchProfileInfo(setError: Function, setProfileUrl: Function, setDraftLength: Function, setPublishedLength: Function, setUserId: Function, setImageFile: Function, setBookmarkLength: Function) {
  try{
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url, drafts, published, username, id, bookmark') 
      .eq('id', authoruid)
      .single(); 

      if(error){
        throw error; 
      }

      setDraftLength(data?.drafts.length)
      setPublishedLength(data?.published.length); 
      setUserId(data?.id); 
      setBookmarkLength(data?.bookmark.length)
  
      const imageFile = data?.avatar_url; 
      setImageFile(imageFile); 
      if(imageFile){
        fetchProfileImage(imageFile, setProfileUrl);
      }
 
  }catch(err){
    console.error(err);
  }
}

export async function fetchProfileDrafts(userId:string, setProfileUrl: Function, setError: Function){
  try {

    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url, username')
      .eq('id', userId)
      .single(); 

    if(error){
      throw error; 
    }

    const imageFile = data?.avatar_url; 
 
    if(imageFile){
      fetchProfileImage(imageFile, setProfileUrl);
    }
  }
  catch(err){
    console.error(err); 
  }
}

export async function fetchDraftInfo(userId: string, setError: Function, setDrafts: Function) {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .select('title, created_at, draft_id, book_image, draft_chapters')
      .eq('author_id', userId);

      if(error){
        throw error;
      }
     
      setDrafts(data);    
    if(error){
      throw error; 
    }

  }catch(err){
    console.error(err); 
  }
}

export async function retrieveProfilePhoto(setError: Function, setProfileUrl: Function, setUserId: Function){
  try{
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', authoruid)
      .single();

      const imageFile = data?.avatar_url; 
      if(imageFile){
        fetchProfileImage(imageFile, setProfileUrl); 
      }
      
      setUserId(authoruid);

    

  }catch(err){
    console.error("Error encountered", err); 
  }
}