import Image from 'next/image';
import React, {ReactNode} from 'react'

type Props = {
  groupName?: string; 
  itemName?: string;
  label?: string;
  description?: string;
  icon?: string;
}

function MoreInfoTab({groupName, itemName, label, description, icon}: Props) {
  return (
    <div className={groupName}>
      <p className="font-extrabold xl:font-bold text-xl lg:text-base px-2 text-white">{label}</p>
      <div className="flex w-full justify-center justify-items-center	justify-self-center	content-center py-4">
        {/* <Image 
          src={icon}
        /> */}

        <Image 
          src={icon || ''}
          alt="icon"
          width="120"
          height="120"

        />
   
      </div>
     
      <p className={itemName}>{description}</p>
    </div>
  )
}

export default MoreInfoTab