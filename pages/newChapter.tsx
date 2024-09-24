import { handleSumbitAnotherDraftChapter } from '@/app/actions/draft';
import TipTap2 from '@/components/TipTap2';
import { fetchPathToCover } from '@/drafts/fetch';
import ExploreHeader from '@/headers/explore-header'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type Props = {}

function newChapter({}: Props) {
  const router = useRouter();
  const { q } = router.query;

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

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (hasUnsavedChanges && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
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
  }, [hasUnsavedChanges, router]);


  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleTitleContentChange = (value: string) => {
    setTitleContent(value);
  };

  const handleSave = async() => { 
    const draftId = typeof q === 'string' ? q : '';  
    setHasUnsavedChanges(false); 
    await handleSumbitAnotherDraftChapter(draftId, titleContent, content, setError);
    router.push(`/draft?q=${draftId}`); 

  }

  const draftId = typeof q === 'string' ? q : '';

  useEffect(() => {
    if(q){
      fetchPathToCover(draftId, setImageFile, setBookUrl);
    }
  }, [q])

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
      />
 
  </main>
  )
}

export default newChapter