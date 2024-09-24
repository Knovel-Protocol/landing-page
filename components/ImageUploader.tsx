import React, { useRef, useState } from 'react'

type Props = {
  titleContent ?: string;
  imageFile ?: File | null; 
  setImageFile ?: (file: File) => void;

}

function ImageUploader({titleContent, imageFile, setImageFile}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/') && setImageFile) {
      setImageFile(file);
    } 

  };

  return (
  
       <div className="w-1/2 h-1/3 flex flex-col my-4 self-center">
            <input ref={fileInputRef} accept="image/*"  className="hidden" type="file" onChange={handleImageChange}/>
            <div 
              onClick={() => fileInputRef?.current?.click()} 
              className="flex items-center justify-center w-full h-full self-center rounded-xl hover:cursor-pointer hover:border-2 hover:border-white"
              ref={imageContainerRef} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {imageFile ? (
                <img
                  className={`w-full h-full rounded-xl ${isHovered && "opacity-50"}`}
                  src={URL.createObjectURL(imageFile)}
                  alt={`${titleContent} book cover`}
                />
              ) : (
                <div
                className={`flex bg-[#2a2929] items-center justify-center rounded-xl w-full h-full ${isHovered && "opacity-50"}`}>
                  
                  <p>upload book cover</p>
                </div>
              )}
            </div>
          
        </div>


  )
}

export default ImageUploader