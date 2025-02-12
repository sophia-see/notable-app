"use client"
import { redirect, usePathname } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface BackButtonProps {
  path?: string;
}

export default function BackButton({path}: BackButtonProps) {
  const pathname = usePathname();
  const onGoBack = () => {
    redirect(path ?? pathname);
  }

  return (
    <div className="flex gap-1 items-center" onClick={onGoBack}>
      <IoIosArrowBack className={`fill-foreground`}/>
      <span className={`text-preset-5 text-foreground`}>Go Back</span>
    </div>
  )
}
