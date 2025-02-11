import React from 'react'
import SettingsMenu from './components/SettingsMenu';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({children}: SettingsLayoutProps) {

  return (
    <div className={`flex lg:px-8 w-full h-full`}>
      <SettingsMenu />
      {children}
    </div>
  )
}
