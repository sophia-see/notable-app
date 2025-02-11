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
    <div className={`font-${font} flex flex-col gap-3 flex-1 lg:max-w-[528px] lg:p-8`}>
      <div className='flex items-center gap-2' onClick={onBackClicked} role='button'>
        <IoIosArrowBack className={`fill-foreground`}/>
        <span className={`text-preset-4 text-foreground`}>Settings</span>
      </div>
      {children}
    </div>
  )
}
