import { Book } from "@/index";
import { createClient } from "@/utils/supabase/client";

export const fetchSearchResults = async (query:string, setResults: React.Dispatch<React.SetStateAction<Book[]>>, setError: React.Dispatch<React.SetStateAction<string | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const supabase = createClient();

  try {
    const {data, error, status} = await supabase
        .from('books')
        .select('*', { count: 'exact' })
        .ilike('title', `%${query}%`)


    if (error && status !== 406) {
      console.log(error);
      throw error;
    }

    setResults(data || []);
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(String(error));
    }
} finally {
  setLoading(false);
}

}
