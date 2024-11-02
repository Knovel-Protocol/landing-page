import { Book } from "@/index";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();


export const fetchNewRelease = async (page: number, booksPerPage: number, setBooks: React.Dispatch<React.SetStateAction<Book[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const { data, error, status} = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false }) // Sort by created_at in descending order
      .range(page * booksPerPage, (page + 1) * booksPerPage - 1);

    if (error && status !== 406) {
      console.log(error);
      throw error;
    }

    setBooks(data || []);
  } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
  } finally {
    setLoading(false);
  }
};

export const fetchTopRated = async (page: number, booksPerPage: number, setBooks: React.Dispatch<React.SetStateAction<Book[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const { data, error, status} = await supabase
      .from('books')
      .select('*')
      .order('rating', { ascending: false }) // Sort by created_at in descending order
      .range(page * booksPerPage, (page + 1) * booksPerPage - 1);

    if (error && status !== 406) {
      console.log(error);
      throw error;
    }

    setBooks(data || []);
  } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
  } finally {
    setLoading(false);
  }
};

export const fetchBooks = async (page: number, booksPerPage: number, setBooks: React.Dispatch<React.SetStateAction<Book[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    const { data, error, status} = await supabase
      .from('books')
      .select('*')
      .range(page * booksPerPage, (page + 1) * booksPerPage - 1);

    if (error && status !== 406) {
      console.log(error);
      throw error;
    }

    setBooks(data || []);
  } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
  } finally {
    setLoading(false);
  }
};