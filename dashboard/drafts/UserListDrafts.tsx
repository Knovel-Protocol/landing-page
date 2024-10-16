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
    <div className="w-full h-full px-4">

      <div className="grid grid-cols-4 gap-4">
        {drafts.map((draft, index) => (
    
          <div onClick={() => router.push(`/draft?q=${draft.draft_id}`)} key={index} className="flex flex-col hover:cursor-pointer">
              <div className="text-4xl font-bold text-white">
                {draft.title ? (
                  <p>{draft.title}</p>
                ) : (
                  <p>No title</p>
                )}
              </div>
         
            <BookCover imageFile={draft.book_image} userId={userId}/>

            <div className="flex space-x-1 text-sm font-extralight text-white mt-6">
              <p>written:</p>
              <p>{formatDate(`${draft.created_at}`)}</p>
            </div>
              
          </div>
          
        ))}

      </div>

    </div>
  )
}

export default UserListDrafts