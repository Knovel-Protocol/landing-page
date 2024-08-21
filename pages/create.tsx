import Aligncenter from '@/icons/Aligncenter';
import Alignleft from '@/icons/Alignleft';
import Alignright from '@/icons/Alignright';
import Bold from '@/icons/Bold';
import Italics from '@/icons/Italics';
import Strikethrough from '@/icons/Strikethrough';
import Underline from '@/icons/Underline';
import { Inter } from 'next/font/google';
import React, { useRef, useState } from 'react';
import {marked} from 'marked';


type Props = {}
const inter = Inter({ subsets: ["latin"] });

function create({}: Props) {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const makeBold = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
  
      if (selectedText) {
        // Check if the selected text is already bold
        const isBold = selectedText.startsWith('**') && selectedText.endsWith('**');
        let newText;
  
        if (isBold) {
          // Remove the bold formatting
          newText = textarea.value.substring(0, start) +
            selectedText.slice(2, -2) + // Remove the surrounding **
            textarea.value.substring(end);
        } else {
          // Add bold formatting
          newText = textarea.value.substring(0, start) +
            `**${selectedText}**` +
            textarea.value.substring(end);
        }
  
        setText(newText);
      }
    }
  };
  

  const renderMarkdown = (text: string) => {
    const rawMarkup = marked.parse(text); // Use the parse method here
    return { __html: rawMarkup };
  };

  return (
    <main className={`flex w-screen h-screen items-center space-x-2 p-4 ${inter.className}`}>
      <div className="flex flex-col w-full h-full basis-1/4 bg-[#171717] rounded-2xl text-white">

        <div className="flex w-full space-x-1 px-2 mt-2">
          <Bold 
            className="hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500"
            onClick={makeBold}
          />
          <Italics  className="hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
          <Underline className="hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
          <Strikethrough className="hover:cursor-pointer w-1/4 p-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
        </div>

        <div className="flex w-full space-x-1 px-2 mt-2">
          <Alignleft className="hover:cursor-pointer w-1/3 px-4 py-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
          <Aligncenter className="hover:cursor-pointer w-1/3 px-4 py-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
          <Alignright className="hover:cursor-pointer w-1/3 px-4 py-2 size-14 bg-[#262626] rounded-md stroke-slate-500"/>
        </div>
        
  
      </div>

      <div className="flex w-full h-full basis-3/4 bg-[#2a2929] rounded-2xl text-white">
      <textarea 
        className="w-full h-full bg-[#2a2929] rounded-2xl p-2 focus:outline-none"
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      </div>


      <div 
        className="flex w-full h-full basis-3/4 bg-[#2a2929] rounded-2xl text-white p-4"
        dangerouslySetInnerHTML={renderMarkdown(text)} 
      />

    </main>
  )
}

export default create