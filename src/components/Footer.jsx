import React from 'react'

export default function Footer() {
  return (
    <div className='flex justify-center '>
    <div className=' text-amber-50 text-center fle justify-center items-center'>
        <p>&copy;{new Date().getFullYear()} HNG Conference Ticket Generator</p>
    </div>
    </div>
  )
}
