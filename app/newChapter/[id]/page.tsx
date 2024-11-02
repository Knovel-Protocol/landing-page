'use client'

import { handleSumbitAnotherDraftChapter } from '@/components/actions/draft';
import TipTap2 from '@/components/TipTap2';
import { fetchPathToCover } from '@/drafts/fetch';
import ExploreHeader from '@/headers/explore-header'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
  params: {
    id: string;
  };
}

function newChapter({params}: Props) {
  const router = useRouter();
  const { id } = params;

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
  const [bookUrl, setBookUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');


  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    const savedContent = localStorage.getItem('content') || '';
    const savedTitleContent = localStorage.getItem('titleContent') || '';
    setContent(savedContent);
    setTitleContent(savedTitleContent);
  }, []);

  useEffect(() => {
    // Save content and titleContent to localStorage whenever they change
    localStorage.setItem('content', content);
    localStorage.setItem('titleContent', titleContent);
    setHasUnsavedChanges(!!content || !!titleContent);
  }, [content, titleContent]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     if (hasUnsavedChanges && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
  //       router.events.emit('routeChangeError');
  //       throw 'Abort route change. Please ignore this error.';
  //     } else {
  //       localStorage.removeItem('content');
  //       localStorage.removeItem('titleContent');
  //     }
  //   };
  //   router.events.on('routeChangeStart', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [hasUnsavedChanges, router]);


  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleTitleContentChange = (value: string) => {
    setTitleContent(value);
  };

  const handleSave = async() => { 
    setHasUnsavedChanges(false); 
    await handleSumbitAnotherDraftChapter(id, titleContent, content, setError);
    router.push(`/draft/${id}`); 

  }

  useEffect(() => {
    if(id){
      fetchPathToCover(id, setImageFile, setBookUrl, setUserId);
    }
  }, [id])

  return (
    <main className={`flex flex-col w-screen h-screen items-center`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>

      <TipTap2 
        content={content}
        titleContent={titleContent}
        onChange={handleContentChange}
        titleOnChange={handleTitleContentChange}
        handleSubmit={handleSave}
        imageFile={imageFile}
        bookUrl={bookUrl || ''}
        userId={userId}
        draftId={id}
      />
 
  </main>
  )
}

export default newChapter