import React, { useRef } from 'react'

type Props = {
  imageFile ?: string;
  bookUrl ?: string;
}

function ImageUploader2({imageFile, bookUrl}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 

  };

  return (
    <div className="flex flex-col self-center my-4 w-1/2 h-1/3">
      <input ref={fileInputRef} accept="image/*"  className="hidden" type="file" onChange={handleImageChange}/>

          <div className="flex items-center justify-center rounded-xl w-full h-full hover:cursor-pointer hover:border-2 hover:border-white">
            {imageFile ? (
              <img 
                className={`w-full h-full rounded-xl`}
                src={bookUrl}
              />
       
            ) : (
              <div className="flex bg-[#2a2929] items-center justify-center self-center my-4 rounded-xl w-full h-full text-white">
                <p>upload book cover</p>
              </div>
            )}
            
          </div>
      </div>
  )
}

export default ImageUploader2