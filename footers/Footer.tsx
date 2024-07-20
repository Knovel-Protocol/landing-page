import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <div className="w-full items-center justify-center flex text-white px-40 xl:px-28 lg:px-16 sm:px-8">
      <div className="w-full border-t border-gray-600">

        <div className="my-8 flex w-full">
          <div className="basis-1/3 font-mono">
            <p>knovel</p>
          </div>

          <div className="basis-2/3 flex sm:flex-col w-full sm:space-x-0 sm:space-y-8 space-x-20 md:space-x-8">
              <div className="flex flex-col">
                  <p className="text-white/40">Development</p>
                  <p>Documentation</p>
                  <p>FAQs</p>
              </div>

              <div className="flex flex-col">
                <p className="text-white/40">Social</p>
                <p>LinkedIn</p>
              </div>

          </div>

        </div>

      
      </div>
    </div>
  )
}

export default Footer