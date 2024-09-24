import DraftList from '@/drafts/draftInfo/draftList';
import DraftSider from '@/drafts/draftSider';
import { fetchChapterInfo } from '@/drafts/fetch';
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


  const draftId = typeof q === 'string' ? q : '';
  
  useEffect(() => {
    if(q){
      fetchChapterInfo(draftId, setChapterCount, setChapters, setImageFile);
    }
  }, [q])


  return (
    <main className={`flex flex-col w-screen h-screen items-center overflow-hidden ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader /> 
      </div>

      <div className={`flex w-full h-full items-center space-x-2 p-4`}>
        <div className="flex basis-1/4 bg-[#171717] rounded-xl w-full h-full">
          <DraftSider
            draftId = {draftId}
            chapterCount={chapterCount}
            imageFile={imageFile}
          />
        </div>
        <div className="flex basis-3/4 rounded-xl w-full h-full overflow-y-scroll">
          <DraftList
            chapters={chapters}
            draftId={draftId} 
          />
        </div>
      </div>
    </main>
  )
}

export default draft