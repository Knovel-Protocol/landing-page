import { handleEditChapter } from '@/app/actions/draft';
import TipTap3 from '@/components/TipTap3'
import { fetchChapterToEdit } from '@/drafts/fetch';
import ExploreHeader from '@/headers/explore-header'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function Edit({}: Props) {
  const router = useRouter(); 
  const {draftId, index} = router.query;

    const [content, setContent] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('content') || ''; // This will only run on the client side
    }
    return '';
  });

   const [titleContent, setTitleContent] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('titleContent') || '';
    }
    return '';
  });


  const [imageFile, setImageFile] = useState<string>('');
  const [bookUrl, setBookUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');



  const [unsavedChanges, setUnsavedChanges] = useState(false); // Track unsaved changes


  useEffect(() => {
    if (draftId && index && typeof draftId === 'string') {
      const draft_id = draftId.trim();
      const chapter_index = parseInt(index as string);
      fetchChapterToEdit(draft_id, chapter_index, setContent, setTitleContent, setImageFile, setUserId);
    }
  }, [draftId, index]);
  

  const handleContentChange = (value: string) => {
    setContent(value);
    localStorage.setItem('unsavedContent', value);
    setUnsavedChanges(true);
  };

  const handleTitleContentChange = (value: string) => {
    setTitleContent(value);
    localStorage.setItem('unsavedTitleContent', value);
    setUnsavedChanges(true);
  };


  const handleSave = async() => { 
    setUnsavedChanges(false);
    //perform the operation i need
    localStorage.removeItem('unsavedContent');
    localStorage.removeItem('unsavedTitleContent');

    const chapter_index = parseInt(index as string);
    const draft_id = typeof draftId === 'string' ? draftId.trim() : '';  
   
    handleEditChapter(setError, titleContent, content, chapter_index, draft_id); 
    router.push(`/draft?q=${draft_id}`);
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (unsavedChanges && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.events.emit('routeChangeError');
        throw 'Abort route change. Please ignore this error.';
      } else {
        localStorage.removeItem('content');
        localStorage.removeItem('titleContent');
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [unsavedChanges, router]);

  return (
    <main className={`flex flex-col w-screen h-screen items-center`}>
       <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <TipTap3 
        content={content}
        titleContent={titleContent}
        onChange={handleContentChange}
        titleOnChange={handleTitleContentChange}
        handleSubmit={handleSave}
        imageFile={imageFile}
        bookUrl={bookUrl || ''}
        setBookUrl={setBookUrl}
        draftId={typeof draftId == 'string' ? draftId.trim(): ''}
        userId={userId}
      />
    </main>
  )
}

export default Edit