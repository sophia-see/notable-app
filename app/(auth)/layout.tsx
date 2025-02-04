import React from 'react'

export default function AuthLayout({children}:{children: React.ReactNode}) {
  return (
    <main className='min-h-screen flex justify-center items-center'>
      <div className='mx-4 w-full max-w-[540px]'>
        {children}
      </div>
    </main>
  )
}
