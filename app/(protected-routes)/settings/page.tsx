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
import { useAppContext } from '@/contexts/AppContext';

interface SettingsItemProps {
  name: string;
  icon: IconType;
  path: string;
}

function SettingsItem ({name, icon: Icon, path}: SettingsItemProps) {
  const onItemClicked = () => {
    redirect(`/settings/${path}`)
  }
  
  return (
    <div className='flex items-center gap-2 py-[12.5px]' onClick={onItemClicked} role='button'>
      <Icon className='stroke-neutral-950'/>
      <span className='text-preset-4 text-neutral-950'>{name}</span>
    </div>
  )
}

export default function SettingsPage() {
  const { font } = useAppContext();
  return (
    <div className={`font-${font}`}>
      <div className='lg:hidden flex flex-col gap-4 text-neutral-950'>
        <span className='text-preset-1'>Settings</span>
        <div className='flex flex-col gap-2'>
          <SettingsItem name='Color Theme' icon={IoSunnyOutline} path={"color-theme"} />
          <SettingsItem name='Font Theme' icon={AiOutlineFontSize} path={"font-theme"} />
          <SettingsItem name='Change Password' icon={CiLock} path={"change-password"} />
          <Separator />
          <div className='flex items-center gap-2 py-[12.5px]' onClick={async () => await logout()}>
            <IoLogOutOutline />
            <span className='text-preset-4'>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}
