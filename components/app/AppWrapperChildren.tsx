"use client"

import { useAppContext } from '@/contexts/AppContext';
import React from 'react'

interface AppWrapperChildrenProps {
  children: React.ReactNode;
}

export default function AppWrapperChildren({children}: AppWrapperChildrenProps) {
  const { font, isDarkMode } = useAppContext();

  React.useEffect(() => {
    if (isDarkMode)
      document.documentElement.classList.add("dark");
    else 
      document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className={`font-${font}`}>
      {children}
    </div>
  )
}
