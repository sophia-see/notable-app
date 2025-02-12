import React from 'react'
import SearchBar from './components/SearchBar'

export default async function SearchLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col gap-4 h-full'>
      <SearchBar />
      {children}
    </div>
  )
}
