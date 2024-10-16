import { Area, getCroppedImg } from '@/app/tools/cropImage';
import React, { useRef, useState } from 'react'
import Cropper from 'react-easy-crop';
import { uploadProfilePicture } from './fetch';

type Props = {
  profilePath ?: string;
  profileUrl ?: string; 
  userId : string;
}

function ProfilePhoto({profilePath, profileUrl, userId}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [chooseCropped, setChooseCropped] = useState<boolean>(false); 
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);



  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function readFile(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const urlToFile = async (croppedImage: string) => {
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    
    // Create a new File object
    const file = new File([blob], "croppedImage.jpg", { type: blob.type });
    
    return file;
  };


  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const imageDataUrl = await readFile(file)

      if(typeof imageDataUrl === 'string'){
        setImageSrc(imageDataUrl);
        setChooseCropped(true); 
      }
    }
  };

  const handleCropConfirm = async () => {
    if (croppedAreaPixels && imageSrc) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels); 

      setCroppedImage(croppedImage);
      setChooseCropped(false); 

      urlToFile(croppedImage).then((file) => {
        if(!profilePath){
          const fileExt = file.name.split('.').pop()
          const filePath = `${userId}/${Math.random()}.${fileExt}`
  
          uploadProfilePicture(userId, filePath, file)

        }else {
          uploadProfilePicture(userId, profilePath, file)
        }

      })

    }
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

      {chooseCropped && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 text-base">
            <div className="flex flex-col w-1/3 h-3/4 bg-black/60 text-white rounded-xl shadow-lg p-6">
                <div className="relative w-full h-full">
                  <Cropper 
                     image={imageSrc}
                     crop={crop}
                     zoom={zoom}
                     aspect={1} 
                     cropShape="round"
                     showGrid={false}
                     onCropChange={setCrop}
                     onZoomChange={setZoom}
                     onCropComplete={onCropComplete}
                  />
                </div>

                <div className="flex justify-center w-full space-x-2">
                  <button
                    onClick={handleCropConfirm}
                    className="px-2 py-3 w-5/12 text-white font-semibold bg-zinc-800 rounded-xl"
                  >
                    Crop
                  </button>
                     
                </div>
            </div>
        </div>
      )}
      
    </div>
  )
}

export default ProfilePhoto