import BookIcon from '@/icons/BookIcon'
import CommentIcon from '@/icons/CommentIcon'
import NewPage from '@/icons/NewPage'
import TrashIcon from '@/icons/TrashIcon'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { deleteEntireDraft, editDraftTitle, fetchDraftBookImage, removeDraftGenre, updateDraftGenre } from './fetch'
import ImageUploader2 from '@/components/ImageUploader2'
import ConfirmDeleteDraft from '@/components/popup/ConfirmDeleteDraft'
import NewGenre from '@/components/popup/NewGenre'
import EditTitlePopup from '@/components/popup/EditTitlePopup'

type Props = {
 draftId : string;
 chapterCount ?: number | null;
 imageFile : string;
 title : string;
 userId : string;
 genres ?: string[];
}

function DraftSider({draftId, chapterCount, imageFile, title, userId, genres}: Props) {
  const router = useRouter();
  const [chapters, setChapter] = useState<number | null>(null);
  const [bookUrl, setBookUrl] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [addGenre, setAddGenre] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>('');
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  useEffect(() => {
    if(imageFile){
      fetchDraftBookImage(imageFile, setBookUrl, userId.trim());
    }
  }, [imageFile])

  const handleDelete = () => {
    setConfirmDelete(true);
  }

  const handleConfirm = async() => {
    if(draftId){
      deleteEntireDraft(draftId, userId, imageFile).then(success => {
        if(success){
          router.push("/explore")
        }else{
          console.log('could not delete draft')
        }
      })
    }

  }

  const handleGenreConfirm = async() => {
    if(genre){
      updateDraftGenre(draftId, genre.trim());
      setAddGenre(false); 
    }
  }

  const handleRemoveGenre = async(selectedGenre:string) => {
    removeDraftGenre(draftId, selectedGenre);
  }

  const handleConfirmTitle = async() => {
    if(newTitle.trim() != title){
      editDraftTitle(newTitle, draftId);
    }
    setEditTitle(false);
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex flex-col">
          <ImageUploader2 
            imageFile={imageFile}
            bookUrl={bookUrl}
            titleContent={title}
            userId={userId}
            draftId={draftId}
          />


          <div onClick={() => setEditTitle(true)} className="text-white font-bold text-4xl lg:text-2xl text-center hover:cursor-pointer hover:text-gray-500">
            <p>{title}</p>
          </div>

          <div className="flex-col w-full text-[#a5a5a5] text-sm items-center px-4 lg:px-2 py-6 lg:py-4 md:py-1">
              <p className="text-xs text-center mb-2">BOOK STATS</p>

              <div className="flex w-full space-x-10 text-sm items-center">
                  <div className="flex space-x-2 items-center">
                    <BookIcon className="stroke-[#a5a5a5]"/>
                    <p>Chapters</p>
                  </div>
                
                  <div className="flex items-center bg-[#a5a5a5] rounded-2xl px-3 py-1 text-white">
                    <p>{chapterCount}</p>
                  </div>

              </div>
            
            <div className="flex md:hidden space-x-2 text-sm items-center">
              <CommentIcon className="stroke-[#a5a5a5]"/>
              <p>Comments</p>
            </div>

          </div>


          <div onClick={() => router.push(`/newChapter/${draftId}`)} className="flex text-[#a5a5a5] text-sm items-center space-x-2 px-4 lg:px-2 hover:cursor-pointer">
            <NewPage className="stroke-[#a5a5a5]"/>
            <p>new chapter</p>
          </div>

        
      </div>

   
      <div onClick={() => setAddGenre(true)} className="flex text-gray-500 hover:text-gray-600 hover:cursor-pointer px-4 lg:px-2 self-center mt-4">
        <p>+ click to add genre</p>
      </div>

      
      <div className="flex-grow overflow-y-auto md:h-[50px] px-4 lg:px-2 py-2">
        {genres?.map((genre, index) => (
          <div onClick={() => handleRemoveGenre(genre)} key={index} className="hover:cursor-pointer">
            {genre}
          </div>
        ))}
      </div>

     

      <div className="flex-shrink-0 md:flex md:p-1 md:justify-center md:items-center md:mt-2 p-4 lg:p-2 mb-2 w-full">
        <div className="hover:cursor-pointer bg-indigo-600 text-center p-3 lg:p-2 md:w-1/2 rounded-xl font-semibold text-lg lg:text-base text-white">
          <p>publish</p>
        </div>

        <div onClick={handleDelete} className="flex items-center w-full md:w-1/2 justify-center mt-4 md:mt-0 space-x-2 text-red-600 hover:cursor-pointer hover:underline">
          <TrashIcon />
          <p>delete</p>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDeleteDraft 
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDelete(false)}
          bookTitle={title}
        />
      )}

      {addGenre && (
        <NewGenre 
          setGenre={setGenre}
          onCancel={() => setAddGenre(false)}
          onConfirm={handleGenreConfirm}
        />
      )}

      {editTitle && (
        <EditTitlePopup 
          onCancel={() => setEditTitle(false)}
          setTitle={setNewTitle}
          onConfirm={handleConfirmTitle}
          
        />
      )}
     
    </div>
  )
}

export default DraftSider