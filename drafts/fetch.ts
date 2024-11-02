import { getUser } from '@/components/actions/draft';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchChapterInfo = async(draftId: string, setChapterCount:React.Dispatch<React.SetStateAction<number | null>>, setChapters: React.Dispatch<React.SetStateAction<any[]>>,  setImageFile: React.Dispatch<React.SetStateAction<string>>, setTitle: Function, setUserId: Function, setBookGenres: Function, setOldSynopsis: Function) => {
  const {data, error} = await supabase
    .from('drafts')
    .select('draft_chapters, book_image, title, author_id, book_genre, book_synopsis')
    .eq('draft_id', draftId)
    .single(); 

    if(error){
      console.error('Error fetching error count:', error); 
      setChapters([]);
      setChapterCount(null); 
    }else {
      setChapters(data?.draft_chapters || []);
      setChapterCount(data?.draft_chapters ? data.draft_chapters.length : 0); 
      setTitle(data?.title);
      setUserId(data?.author_id);
      setBookGenres(data?.book_genre);
      setOldSynopsis(data?.book_synopsis);

      const imagePath = data?.book_image || ''; 
      setImageFile(imagePath);
    }
}

export const fetchDraftBookImage = async(path:string, setBookUrl: Function, userId: string) => {
  try{
    const { data, error } = await supabase.storage.from('book_images').download(`${path}`)
    if (error) {
      throw error
    }

    const url = URL.createObjectURL(data);
    setBookUrl(url);
  }catch(err){
    console.log('Error downloading image: ', err);
  }
}

export const fetchPathToCover = async (draftId: string, setImageFile: Function, setBookUrl: Function, setUserId:Function) => {
  try {
    const {data, error} = await supabase
    .from('drafts')
    .select('book_image, author_id')
    .eq('draft_id', draftId)
    .single(); 

    if(error){
      console.error('Error fetching image:', error); 
    }else {
      const imagePath = data?.book_image || ''; 
      const userId = data?.author_id;
      setImageFile(imagePath);
      setUserId(userId);

      if(imagePath){
        fetchDraftBookImage(imagePath, setBookUrl, userId);
      }
    }

  }catch(err){
    console.log("Error trying to fetch draft cover", err);
  }
}

export const fetchChapterToEdit = async (draftId: string, index: number, setContent: Function, setTitleContent: Function, setImageFile: Function, setUserId: Function) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .select('book_image, draft_chapters, author_id')
      .eq('draft_id', draftId)
      .single(); 

    if(error){
      console.error("Error fetching chapter information", error); 
    }else {
      const chapter = data?.draft_chapters[index]; 
      setContent(chapter.content);
      setTitleContent(chapter.title);
      setImageFile(data?.book_image);
      setUserId(data?.author_id)
    }
    
  }catch(err){
    console.error(err); 
  }
}

export const deleteEntireDraft = async (draftId: string, userId: string, imageFile: string): Promise<boolean> => {
  try{

    const {data, error} = await supabase
      .from('drafts')
      .delete()
      .eq('draft_id', draftId);

    if (error) {
      console.error('Error deleting draft:', error.message);
      return false;
    }

    const {data: profileData, error: profileError} = await supabase
      .from('profiles')
      .select('drafts')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message);
      return false; // Return false if fetching the profile fails
    }

    const currentDrafts = profileData?.drafts || [];
    const updatedDrafts = currentDrafts.filter((id: string) => id !== draftId);

    // Step 4: Update the drafts array in the profiles table
    const { error: updateError } = await supabase
    .from('profiles')
    .update({ drafts: updatedDrafts })
    .eq('id', userId);

    if (updateError) {
      console.error('Error updating user drafts:', updateError.message);
      return false; // Return false if updating the drafts array fails
    }

    if(imageFile){
      const { error: imageError } = await supabase
        .storage
        .from('book_images')
        .remove([imageFile]);

      if (imageError) {
        console.error('Error deleting book image:', imageError.message);
        return false; // Return false if image deletion fails
      }

      console.log('Book image deleted successfully');

    }

    console.log('Draft deleted successfully:', data);
    return true; 

  }catch(err){
    console.error("Unexpected error", err);
    return false;
  }
}

export async function fetchBookData(id: string){
  try{
    const {data, error} = await supabase.from('books').select('*').eq('id', id).single(); 

    if(error){
      console.log("error fetching book");
      return null;

    }

    return data;


  }catch(err){
    console.error("Unexpected error", err)
  }
}

export const fetchBookmark = async(setError: Function, id: string, setBookmark: Function, setUserId: Function) => {
  try{
    const authoruid = await getUser(setError);
    if (!authoruid) return;

    setUserId(authoruid);

    const {data, error} = await supabase
      .from('profiles')
      .select('bookmark')
      .eq('id', authoruid)
      .single(); 

      if(error){
        console.error('Error fetching user profile:', error.message); 
      }else if(data?.bookmark) {
        if(data.bookmark.includes(id)){
          setBookmark(true)
        }
      }

  }catch(err){
    console.error("Error encountered:", err); 
  }
}

export const updateBookmarkData = async (userId: string, bookmark: boolean, bookId: string) => {
  try{
    const {data, error} = await supabase
      .from('profiles')
      .select('bookmark')
      .eq('id', userId)
      .single();

    if(error){
      console.error('Error fetching user profile:', error.message);
      return;
    }

    let updatedBookmarks = [...(data?.bookmark || [])];

    if(bookmark){
      // if the book is already bookmarked remove it
      updatedBookmarks = updatedBookmarks.filter((item: string) => item !== bookId);

    }else {
      // add book to the bookmark
      updatedBookmarks.push(bookId);
    }

    // update the user's bookmark in the profile
    const {error: updateError} = await supabase
      .from('profiles')
      .update({bookmark: updatedBookmarks})
      .eq('id', userId); 

    if(updateError){
      console.error("Error updating bookmarks:", updateError.message); 
    }


  }catch(err){
    console.error("Error encountered:", err); 
  }
}

export const updateDraftGenre = async (draftId: string, genre: string) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .select('book_genre')
      .eq('draft_id', draftId)
      .single(); 

    if(error){
      console.error("Error fetching draft data", error.message); 
    }

    let updatedGenres = [...(data?.book_genre || [])];
    if(updatedGenres.includes(genre)){
      return;

    }else {
      updatedGenres.push(genre);
    }

    const {error: updateError} = await supabase
      .from('drafts')
      .update({book_genre: updatedGenres})
      .eq('draft_id', draftId);

    if(updateError){
      console.error("Error updating genre:", updateError.message); 
    }

  }catch(err){
    console.error("Error encountered", err); 
  }
}

export const removeDraftGenre = async(draftId: string, genre: string) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .select('book_genre')
      .eq('draft_id', draftId)
      .single();

      if(error){
        console.error("Error retrieving draft data", error);
      }

      let updatedGenres = [...(data?.book_genre || [])];

      if(updatedGenres.includes(genre)){
        updatedGenres = updatedGenres.filter((item: string) => item !== genre);
      }else {
        return;
      }

    const {error: updateError} = await supabase
      .from('drafts')
      .update({book_genre: updatedGenres})
      .eq('draft_id', draftId);

    if(updateError){
      console.error("Error updating genre:", updateError.message); 
    }
      

  }catch(err){
    console.error("Error encountered", err); 
  }
}

export const editDraftTitle = async(title: string, draftId: string) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .update({title: title})
      .eq('draft_id', draftId); 

    if(error){
      console.log("Error updating draft title", error.message);
    }

  }catch(err){
    console.error("Error encountered", err);
  }
}

export const editDraftSynopsis = async(draftId: string, synopsis: string) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .update({book_synopsis: synopsis})
      .eq('draft_id', draftId);

      if(error){
        console.log("Error updating draft synopsis", error.message); 
      }

  }catch(err){
    console.error("Error encountered", err); 
  }
}