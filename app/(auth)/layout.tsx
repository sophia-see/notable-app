import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AuthLayout({children}:{children: React.ReactNode}) {
  const session = await auth();

  if (!!session?.user?.id) {
    redirect("/home")
  }

  return (
    <main className='min-h-screen flex justify-center items-center'>
      <div className='mx-4 w-full max-w-[540px]'>
        {children}
      </div>
    </main>
  )
}
