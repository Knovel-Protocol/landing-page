import React, { useEffect, useState } from 'react'
import { fetchDraftInfo } from '../fetch';
import { formatDate } from '@/app/tools/formatDate';
import BookCover from './BookCover';
import { useRouter } from 'next/router';

type Props = {
  userId: string;
  setError: Function; 
}

function UserListDrafts({userId, setError}: Props) {
  const router = useRouter();
  const [drafts, setDrafts] = useState<any[]>([]);


  useEffect(() => {
    if(userId && typeof userId === 'string'){
      fetchDraftInfo(userId, setError, setDrafts); 
    }
  }, [userId])
  
  return (
 

      <div className="h-fit w-full grid grid-cols-4 gap-4 p-4 xl:grid-cols-2 xl:gap-6 halflg:grid-cols-1 halflg:gap-10 md:grid-cols-2 ss:grid-cols-1 ss:items-center overflow-y-auto">
        {drafts.map((draft, index) => (
    
          <div onClick={() => router.push(`/draft?q=${draft.draft_id}`)} key={index} className="flex-col h-full hover:cursor-pointer">
              <div className="text-3xl font-bold w-full truncate whitespace-nowrap overflow-hidden text-white">
                {draft.title || 'No title'}
              </div>
         
            <BookCover imageFile={draft.book_image} userId={userId}/>

            <div className="flex space-x-1 text-sm font-extralight text-white mt-8">
              <p>written:</p>
              <p>{formatDate(`${draft.created_at}`)}</p>
            </div>
              
          </div>
          
        ))}

      </div>

   
  )
}

export default UserListDrafts