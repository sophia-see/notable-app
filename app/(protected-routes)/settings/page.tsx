"use client"

import React from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { Separator } from '@/components/ui/separator';
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from '@/auth-actions';
import { IconType } from 'react-icons/lib';
import { redirect } from 'next/navigation';
import { FONT, useAppContext } from '@/contexts/AppContext';

interface SettingsItemProps {
  name: string;
  icon: IconType;
  path: string;
  isDarkMode: boolean;
}

function SettingsItem ({name, icon: Icon, path, isDarkMode}: SettingsItemProps) {
  const onItemClicked = () => {
    redirect(`/settings/${path}`)
  }
  
  return (
    <div className='flex items-center gap-2 py-[12.5px]' onClick={onItemClicked} role='button'>
      <Icon className={`${isDarkMode ? "stroke-neutral-0" : "stroke-neutral-950"}`}/>
      <span className={`text-preset-4 ${isDarkMode ? "text-neutral-0" : "text-neutral-950"}`}>{name}</span>
    </div>
  )
}

export default function SettingsPage() {
  const { isDarkMode } = useAppContext();
  const onLogout = async () => {
    await logout();
  }

  return (
    <>
      <div className={`lg:hidden flex flex-col gap-4 ${isDarkMode ? "text-neutral-0" : "text-neutral-950"}`}>
        <span className='text-preset-1'>Settings</span>
        <div className='flex flex-col gap-2'>
          <SettingsItem name='Color Theme' icon={IoSunnyOutline} path={"color-theme"} isDarkMode={isDarkMode}/>
          <SettingsItem name='Font Theme' icon={AiOutlineFontSize} path={"font-theme"} isDarkMode={isDarkMode}/>
          <SettingsItem name='Change Password' icon={CiLock} path={"change-password"} isDarkMode={isDarkMode}/>
          <Separator />
          <div className='flex items-center gap-2 py-[12.5px]' onClick={onLogout}>
            <IoLogOutOutline />
            <span className='text-preset-4'>Logout</span>
          </div>
        </div>
      </div>
    </>
  )
}
