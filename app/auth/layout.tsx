import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex justify-center items-center h-full'>{children}</div>
  )
}

export default layout