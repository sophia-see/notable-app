import { auth } from '@/auth';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function MainLayout({children}:{children: React.ReactNode}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <main className='min-h-screen w-full flex'>
      <div className="flex h-screen w-full text-neutral-700 bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen w-full">
          <Navbar />
          <main className={`rounded-t-[12px] bg-background-2 flex-1 overflow-auto`}>
            <div className='h-full py-6 px-4'>
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
    </main>
  )
}
