import React, { useRef, useState } from 'react'

type Props = {
  profileUrl ?: string; 
}

function ProfilePhoto({profileUrl}: Props) {
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

    // if (file && file.type.startsWith('image/') && setImageFile) {
    //   setImageFile(file);
    // } 

  };

  return (
    <div className="w-full h-fit flex justify-center my-6">
      <input ref={fileInputRef} accept="image/*"  className="hidden" type="file" onChange={handleImageChange}/>

      <div 
        className="w-[250px] h-[250px] rounded-full hover:cursor-pointer hover:border-2 hover:border-gray-600"
        onClick={() => fileInputRef?.current?.click()} 
        ref={imageContainerRef} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

      {profileUrl ? (
        <img
         className={`w-full h-full rounded-full ${isHovered && "opacity-50"}`}
         src={profileUrl}
         alt={`profile pic`}
        />
      ) : (
        <div className={`flex text-white bg-[#2a2929] w-full h-full rounded-full items-center justify-center ${isHovered && "opacity-50"}`}>
          <p>upload a photo</p>
        </div>
      )}
      </div>
      
    </div>
  )
}

export default ProfilePhoto