import { handleSubmitDraft } from '@/app/actions/draft';
import ConfirmDraft from '@/app/popup/ConfirmDraft';
import TipTap from '@/components/TipTap';
import ExploreHeader from '@/headers/explore-header';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


type Props = {}
const inter = Inter({ subsets: ["latin"] });

function create({}: Props) {
  const router = useRouter();

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
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);



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
    setShowConfirm(true);
  }

  const handleConfirm = async() => {
    if(title.trim()){
      setHasUnsavedChanges(false); 
      const draftId = await handleSubmitDraft(bookImage, titleContent, content, setError, title);
      router.push(`/draft?q=${draftId}`); 

      // Clear localStorage after saving the draft
      localStorage.removeItem('content');
      localStorage.removeItem('titleContent');
    }
  }


  return (
    <main className={`flex flex-col w-screen h-screen items-center ${inter.className}`}>
      <div  className="sticky top-0 w-full z-50">
        <ExploreHeader />
      </div>
      <TipTap 
        content={content} 
        titleContent={titleContent}
        onChange={handleContentChange} 
        titleOnChange={handleTitleContentChange}
        handleSubmit={handleSave}
        setImageFile={setBookImage}
      />

      {showConfirm && (
        <ConfirmDraft
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          setTitle={setTitle}
        />
      )}
    </main>
  )
}

export default create