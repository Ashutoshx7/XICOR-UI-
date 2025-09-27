import React from 'react'

const Bentogird = () => {
  return (
    <div className='max-w-7xl  border-neutral-200 bg-gray-100 mx-auto border-x min-h-screen'>
        <div className='grid grid-cols-3 gap-10'>
            <div className='h-40 w-full bg-red-400 col-span-1 '></div>
            <div className='h-40 w-full bg-purple-300  col-span-2'></div>
            <div className='h-40 w-full bg-yellow-400 col-span-2'></div>
            <div className='h-40 w-full bg-orange-400 col-span-1'></div>
        </div>
        Hello world
      
    </div>
  )
}

export default Bentogird
