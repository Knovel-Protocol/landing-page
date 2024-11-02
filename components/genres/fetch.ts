import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

export const fetchBooksByGenre = async (genre: string) => {
  try {
    const { data, error, status } = await supabase
      .from('books')
      .select('*')
      .contains('book_genre', [genre]);  // Checks if the genre array contains the specific genre

    if (error && status !== 406) {
      console.log(error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
