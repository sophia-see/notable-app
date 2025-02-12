"use client"

import { SearchInput } from '@/components/custom-ui/search-input'
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId") ?? ""
  const pathname = usePathname();
  const search = pathname.split("/").at(2) ?? "";

  const onSearchChange = useDebouncedCallback((value: string) => {
    redirect(`/search/${value}`)
  }, 500);

  return (
    <div className={`${!!noteId ? "hidden" : "flex"} flex-col gap-4 lg:hidden`}>
      <span className='text-preset-1 text-accent-foreground'>Search</span>
      <SearchInput 
        className="w-[300px]"
        placeholder="Search by title, content, or tags…"
        defaultValue={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
