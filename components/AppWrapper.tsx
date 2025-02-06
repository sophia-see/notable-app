"use client"

import { AppProvider } from '@/contexts/AppContext';
import React from 'react'

interface AppWrapperProps {
  children: React.ReactNode;
}
export default function AppWrapper({children}: AppWrapperProps) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}
