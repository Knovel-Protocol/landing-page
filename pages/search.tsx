import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Book } from '..';
import { Inter } from 'next/font/google';
import { fetchSearchResults } from '@/app/search/search';
import SearchIcon from '@/icons/SearchIcon';
import Back from '@/icons/Back';
import Link from 'next/link';

type Props = {}
const inter = Inter({ subsets: ["latin"] });

function search({}: Props) {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newQuery, setNewQuery] = useState('');

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }

  };

  useEffect(() => {
    if (q) {
      const searchBooks = async () => {
        await fetchSearchResults(q as string, setResults, setError, setLoading); 
      };

      searchBooks();
    }
  }, [q]);

  return (
    <main className={`flex flex-col w-screen min-h-screen items-center text-white ${inter.className}`}>
      <div className="flex relative items-center w-full justify-center my-8">
        <Link href="/explore" className="absolute left-10 text-white">
          <Back className="size-8 stroke-white" />
        </Link>

        <form onSubmit={handleSearch} className="flex w-1/2 bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] rounded-3xl p-0.5">
          <div className="w-full flex bg-black rounded-3xl items-center p-0.5 px-2">
            <SearchIcon className="size-5 md:size-4 sm:hidden"/>
            <input 
              type="text"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              className="flex justify-between py-3 px-3 bg-black w-full h-full rounded-3xl focus:outline-none" 
              placeholder="Search books, authors and community"
            />

            <button type="submit" className="p-2 bg-white text-black font-bold px-2 rounded-3xl">
              Search
            </button>
          </div>

        </form>

      </div>
    
    

      <div className="text-white text-2xl font-bold mb-4">
        <p>Search Results for "{q}"</p>
      </div>

      <div className="text-white">
        {results.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {results.map((result) => (
              <div onClick={() => router.push(`/book/${result.id}`)} key={result.id} className="w-fit h-fit">
                <img 
                  className="z-10 p-0.5 bg-white w-[300px] h-[480px] lg:w-[200px] lg:h-[320px] md:w-[150px] md:h-[250px] sm:w-[120px] sm:h-[180px] xs:w-[100px] xs:h-[160px] group-hover:bg-gradient-to-r from-[#7F60F9] to-[#6DDCFF] rounded-xl object-cover" 
                  src={result.book_image}
                  alt={result.title} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
   

    </main>
  )
}

export default search