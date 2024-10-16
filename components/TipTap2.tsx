import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { Inter } from 'next/font/google';
import React from 'react'
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import ImageUploader2 from './ImageUploader2';
import BoldButton from '@/icons/BoldButton';
import ItalicsButton from '@/icons/ItalicsButton';
import UnderlineButton from '@/icons/UnderlineButton';
import Strikethrough from '@/icons/Strikethrough';
import Alignleft from '@/icons/Alignleft';
import Aligncenter from '@/icons/Aligncenter';
import Alignright from '@/icons/Alignright';
import BulletListButton from '@/icons/BulletListButton';
import OrderedListButton from '@/icons/OrderedListButton';

const inter = Inter({ subsets: ["latin"] });

type Props = {
  content ?: string;
  titleContent ?: string;
  onChange: (value: string) => void;
  titleOnChange: (value: string) => void;
  handleSubmit ?: () => void; 
  imageFile : string;
  bookUrl : string;
  userId : string;
  draftId : string;
}

function TipTap2({content, titleContent, onChange, titleOnChange, handleSubmit, imageFile, bookUrl, userId, draftId}: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image, 
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      CharacterCount.configure({
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3'
        }
      }), 
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3'
        }
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
      
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

  })

  const titleEditor = useEditor({
    extensions: [
      StarterKit, 
      Placeholder.configure({
        placeholder: 'Enter chapter title...',
      }),
    ],
    content: titleContent,
    onUpdate: ({ editor }) => {
      titleOnChange(editor.getText());
    },
  })


  return (
    <main className={`flex w-screen h-full items-center space-x-2 p-4 ${inter.className}`}> 
      <div className="relative flex flex-col w-full h-full basis-1/4 bg-[#171717] rounded-2xl text-white">

        <ImageUploader2 
          imageFile={imageFile}
          bookUrl={bookUrl}
          titleContent={titleContent}
          userId={userId}
          draftId={draftId}
        />
        
        <div className="flex w-full space-x-1 px-2 mt-2">
          <p 
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`flex text-2xl items-center justify-center font-semibold font-mono ${editor?.isActive('heading', { level: 1 }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md text-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md text-slate-500'}`}
          >H1</p>

          <p 
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`flex text-2xl items-center justify-center font-semibold font-mono ${editor?.isActive('heading', { level: 2 }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md text-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md text-slate-500'}`}
          >H2</p>

          
          <p 
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`flex text-2xl items-center justify-center font-mono font-semibold ${editor?.isActive('heading', { level: 3 }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md text-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md text-slate-500'}`}
          >H3</p>

        </div>

        <div className="flex w-full space-x-1 px-2 mt-2">
          <BoldButton  
            className={`${editor?.isActive('bold') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          />

          <ItalicsButton 
            className={`${editor?.isActive('italic') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          />

          <UnderlineButton 
            className={`${editor?.isActive('underline') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          />

          <Strikethrough
            className={`${editor?.isActive('strike') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          />
        </div>

        <div className="flex w-full space-x-1 px-2 mt-2">
          <Alignleft 
            className={`${editor?.isActive({ textAlign: 'left' }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          />

          <Aligncenter 
            className={`${editor?.isActive({ textAlign: 'center' }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          />

          <Alignright
            className={`${editor?.isActive({ textAlign: 'right' }) ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          />

        </div>


        <div className="flex w-full space-x-1 px-2 mt-2">
          <BulletListButton 
            className={`${editor?.isActive('bulletList') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          />

          <OrderedListButton 
            className={`${editor?.isActive('orderedList') ? 'hover:cursor-pointer w-1/4 p-2 size-14 bg-white rounded-md stroke-slate-500' : 'hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500'}`}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          />
        </div>

        <div className="absolute bottom-0 w-full">

          <div className="text-slate-400 text-sm p-4">
            <p> {editor?.storage.characterCount.characters()} characters </p>
            <p>{editor?.storage.characterCount.words()} words</p>
          </div>
    

          <div onClick={handleSubmit} className="hover:cursor-pointer bg-indigo-600 p-4 mb-4 rounded-2xl mx-4 font-semibold text-xl text-center">
              <p>Save</p>
          </div>
      
        </div>

      </div>

      <div className="flex flex-col space-y-1 w-full h-full basis-3/4  rounded-2xl text-white">
        <div className="flex basis-1/12 rounded-2xl bg-[#2a2929]">
          <EditorContent editor={titleEditor} className="self-center w-full"/>
        </div>
        <div className="flex basis-11/12 overflow-hidden w-full h-full rounded-2xl bg-[#2a2929]">
          <EditorContent editor={editor} className="w-full"/>
        </div>
          
      </div>

  </main>
  )
}

export default TipTap2