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
      <div className="flex h-screen w-full bg-neutral-0 text-neutral-700">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen w-full">
          <Navbar />
          <main className="flex-1 overflow-auto p-4 mb-1">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </main>
  )
}
