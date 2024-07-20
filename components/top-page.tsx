import LandingHeader from '@/headers/landing-header';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
}

function TopPage({children}: Props): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full items-center  justify-center">


      <div >
      <p>books</p>

      <p className="pb-80">books</p>

      <p>books</p>


      <p>books</p>

      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p className="pb-80">books</p>

      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      <p>books</p>
      </div>
      
    </div>
  )
}

export default TopPage; 