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

export async function fetchProfilePicture(setError: Function, setProfileUrl: Function, userId: string, setImageFile: Function) {
  try{
    const {data, error} = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single();

      const imageFile = data?.avatar_url; 
      setImageFile(imageFile); 

      if(imageFile){
        fetchProfileImage(imageFile, setProfileUrl); 
      }
      
      return true;

  }catch(err){
    console.error(err); 
    return false;
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

export async function fetchBookReadingList (draftId: string) {
  try{
    if (!draftId) {
      return null;
    }
    
    const{data, error} = await supabase
      .from('books')
      .select('id, title, author_name, book_image, book_synopsis, book_genre, author_verified, rating')
      .eq('id', draftId)
      .single(); 

      if (error || !data) {
        console.log("Book not found or error occurred for draftId:", draftId);
        return null; // Return null if no data is found
      }
      return data;
  }catch(err){
    console.error("Error encountered trying to fetch book info", err);
    return null;
  }
}

export async function fetchReadingList(userId: string, setBookmarks: Function) {
  try{
   const {data, error} = await supabase
    .from('profiles')
    .select('bookmark')
    .eq('id', userId)
    .single();

    if (error || !data) {
      throw error || new Error("No profile data found for the specified user.");
    }


    const bookmarks: string[] = data.bookmark || [];

    const bookmarkPromises = bookmarks.map((bookmark) => fetchBookReadingList(bookmark));
    const bookInfos = await Promise.all(bookmarkPromises);
 
    setBookmarks(bookInfos);

  }catch(err){
    console.error("Error encountered trying to fetch reading list info", err);
  }
}


