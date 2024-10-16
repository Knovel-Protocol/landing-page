import { createClient } from "@/utils/supabase/client";

export const fetchBookInfo = async (bookId: string,  setChapters: React.Dispatch<React.SetStateAction<any[]>>, setLoading: Function) => {
  const supabase = createClient();
  try{
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

  }catch(err){
    console.error(err);
  }finally{
    setLoading(false);
  }

}