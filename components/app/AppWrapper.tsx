"use client"

import { AppProvider } from '@/contexts/AppContext';
import React from 'react'
import AppWrapperChildren from './AppWrapperChildren';

interface AppWrapperProps {
  children: React.ReactNode;
}
export default function AppWrapper({children}: AppWrapperProps) {
  return (
    <AppProvider>
      <AppWrapperChildren>
      { children}
      </AppWrapperChildren>
    </AppProvider>
  )
}
