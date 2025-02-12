import { auth } from '@/auth';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { tagsByUser } from '@/server-actions/notes';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function MainLayout({children}:{children: React.ReactNode}) {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("no log in")
    redirect("/login")
  }
  
  const tags = await tagsByUser();
  
  return (
    <div className='min-h-screen w-full flex'>
      <div className="flex h-screen w-full">
        <Sidebar tags={tags}/>
        <div className="flex flex-col flex-1 h-screen w-full">
          <Navbar />
          <main className={`relative rounded-t-[12px] lg:rounded-t-none bg-background-2 flex-1 overflow-auto`}>
            <div className=' h-full py-5 px-4 md:py-6 md:px-8 lg:p-0'>
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
