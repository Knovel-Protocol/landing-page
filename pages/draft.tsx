import NewSynopsis from '@/app/popup/NewSynopsis';
import DraftList from '@/drafts/draftInfo/draftList';
import DraftSider from '@/drafts/draftSider';
import { editDraftSynopsis, fetchChapterInfo } from '@/drafts/fetch';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}
const inter = Inter({ subsets: ["latin"] });


function draft({}: Props) {
  const router = useRouter();
  const { q } = router.query;
  const [chapterCount, setChapterCount] = useState<number | null>(null);
  const [chapters, setChapters] = useState<any[]>([]); // Store the list of chapters
  const [imageFile, setImageFile] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [genres, setBookGenres] = useState<string[]>();
  const [synopsis, setSynopsis] = useState<boolean>(false);
  const [newSynopsis, setNewSynopsis] = useState<string>('');
  const [oldSynopsis, setOldSynopsis] = useState<string>('');

  const draftId = typeof q === 'string' ? q : '';
  
  useEffect(() => {
    if(q){
      fetchChapterInfo(draftId, setChapterCount, setChapters, setImageFile, setTitle, setUserId, setBookGenres, setOldSynopsis);
    }
  }, [q, genres, title])

  const handleConfirm = async () => {
    editDraftSynopsis(draftId, newSynopsis);
    setSynopsis(false);
  }


  return (
    <main className={`flex flex-col w-screen h-screen items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader /> 
      </div>

      <div className={`flex md:flex-col w-full h-full items-center space-x-2 p-4 overflow-hidden`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full text-white">
          <DraftSider
            draftId = {draftId}
            chapterCount={chapterCount}
            imageFile={imageFile}
            title={title}
            userId={userId}
            genres={genres}
          />
        </div>
        <div className="flex flex-col basis-3/4 rounded-xl w-full h-full overflow-y-scroll">
        <div onClick={() => setSynopsis(true)} className="p-4 text-gray-500 hover:text-gray-600 hover:cursor-pointer">
          {oldSynopsis ? (
            <p>{oldSynopsis}</p>
          ) : (
            <p>+ click to add a synopsis</p>
          )}
          
        </div>
        
          <DraftList
            chapters={chapters}
            draftId={draftId} 
          />
        </div>

        {synopsis && (
          <NewSynopsis 
            onCancel={() => setSynopsis(false)}
            setNewSynopsis={setNewSynopsis}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </main>
  )
}

export default draft