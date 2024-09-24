import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchChapterInfo = async(draftId: string, setChapterCount:React.Dispatch<React.SetStateAction<number | null>>, setChapters: React.Dispatch<React.SetStateAction<any[]>>,  setImageFile: React.Dispatch<React.SetStateAction<string>>) => {
  const {data, error} = await supabase
    .from('drafts')
    .select('draft_chapters, book_image')
    .eq('draft_id', draftId)
    .single(); 

    if(error){
      console.error('Error fetching error count:', error); 
      setChapters([]);
      setChapterCount(null); 
    }else {
      setChapters(data?.draft_chapters || []);
      setChapterCount(data?.draft_chapters ? data.draft_chapters.length : 0); 

      const imagePath = data?.book_image || ''; 
      setImageFile(imagePath);
    }
}


export const fetchBookImage = async(path:string, setBookUrl: Function) => {
  try{
    const { data, error } = await supabase.storage.from('book_images').download(path)
    if (error) {
      throw error
    }

    const url = URL.createObjectURL(data)
    setBookUrl(url);
  }catch(err){
    console.log('Error downloading image: ', err);
  }
}

export const fetchPathToCover = async (draftId: string, setImageFile: React.Dispatch<React.SetStateAction<string>>, setBookUrl: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const {data, error} = await supabase
    .from('drafts')
    .select('book_image')
    .eq('draft_id', draftId)
    .single(); 

    if(error){
      console.error('Error fetching image:', error); 
    }else {
      const imagePath = data?.book_image || ''; 
      setImageFile(imagePath);

      if(imagePath){
        fetchBookImage(imagePath, setBookUrl);
      }
    }

  }catch(err){
    console.log("Error trying to fetch draft cover", err);
  }
}

export const fetchChapterToEdit = async (draftId: string, index: number, setContent: Function, setTitleContent: Function, setImageFile: Function) => {
  try{
    const {data, error} = await supabase
      .from('drafts')
      .select('book_image, draft_chapters')
      .eq('draft_id', draftId)
      .single(); 

    if(error){
      console.error("Error fetching chapter information", error); 
    }else {
      const chapter = data?.draft_chapters[index]; 
      setContent(chapter.content);
      setTitleContent(chapter.title);
      setImageFile(data?.book_image);
    }
    
  }catch(err){
    console.error(err); 
  }
}