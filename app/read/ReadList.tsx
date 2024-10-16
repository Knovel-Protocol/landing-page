import React from 'react'

type Props = {
  chapters: Chapter[];
};

type Chapter = {
  title: string;
  content: string;
};

const PAGE_WORD_LIMIT = 200; // Number of words per page (adjust as needed)

function ReadList({chapters}: Props) {
  
  return (
    <div className="h-full w-full flex flex-col py-10 px-4">
      {chapters.map((chapter, index) => (
        <div key={index} className="py-10">
           <div className="flex justify-center w-full p-4">
              <div className="text-center text-3xl font-medium px-4 py-2 text-white">
                  {chapter.title.split('\n').map((line:any, i:any) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
          </div>

          <div className="text-justify text-xl font-light px-4 py-2 text-white leading-relaxed"  style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: chapter.content }}>
                  
          </div>

        </div>
      ))}

      
    </div>
  )
}

export default ReadList