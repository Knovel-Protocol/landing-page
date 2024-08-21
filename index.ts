// types/index.ts
export interface Book {
  id: string;
  title: string;
  author_name: string;
  book_image: string;
  book_synopsis: string;
  book_genre: string[];
  finished: boolean;
  rating: number;
  author_verified: boolean;
}

export interface Profile {
  username: string; 
  full_name: string;
  avatar_url: string;
}
