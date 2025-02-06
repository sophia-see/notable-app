"use client"

import { useAppContext } from '@/contexts/AppContext';
import { redirect } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

interface SettingLayoutProps {
  children: React.ReactNode;
}

export default function SettingLayout({children}: SettingLayoutProps) {
  const { font, isDarkMode } = useAppContext();

  const onBackClicked = () => {
    redirect(`/settings`)
  };

  return (
    <div className={`font-${font} flex flex-col gap-3`}>
      <div className='flex items-center gap-2' onClick={onBackClicked} role='button'>
        <IoIosArrowBack className={`${isDarkMode ? "fill-neutral-300" : "fill-neutral-600"}`}/>
        <span className={`text-preset-4 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Settings</span>
      </div>
      {children}
    </div>
  )
}
