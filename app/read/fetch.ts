import { createClient } from "@/utils/supabase/client";

export const fetchBookInfo = async (bookId: string,  setChapters: React.Dispatch<React.SetStateAction<any[]>>) => {
  const supabase = createClient();

  const{data, error} = await supabase
    .from('books')
    .select('book_chapters')
    .eq('id', bookId)
    .single();

    if(error){
      console.error('Error fetching chapter info:', error); 
      setChapters([]);
    }else {
      console.log("number of chapters", data?.book_chapters);
      setChapters(data?.book_chapters || []);
    }
}