"use client"

import { Button } from '@/components/custom-ui/custom-button';
import { FONT, useAppContext } from '@/contexts/AppContext'
import React, { useState } from 'react'
import Item from '../components/SettingItem';

export default function FontThemePage() {
  const { font, setFont } = useAppContext();
  const [tempFont, setTempFont] = useState<FONT>(font);

  const onSaveFont = () => {
    setFont(tempFont);
  }

  return (
    <div className={`font-${font} flex flex-col gap-5`}>
      <div className='flex flex-col gap-2'>
      <span className={`text-accent-foreground text-preset-1`}>Font Theme</span>
      <span className={`text-foreground text-preset-5`}>Choose your font theme:</span>
      </div>
      <div className='flex flex-col gap-4'>
        <Item
          name="Sans-serif" 
          description='Clean and modern, easy to read.' 
          selected={tempFont} 
          setSelected={setTempFont}
          value={FONT.sans}
          icon={<span className='font-sans'>Aa</span>}
        />
        <Item
          name="Serif" 
          description='Classic and elegant for a timeless feel.' 
          selected={tempFont} 
          setSelected={setTempFont}
          value={FONT.serif}
          icon={<span className='font-serif'>Aa</span>}
        />
        <Item
          name="Monospace" 
          description='Code-like, great for a technical vibe.' 
          selected={tempFont} 
          setSelected={setTempFont}
          value={FONT.mono}
          icon={<span className='font-mono'>Aa</span>}
        />
      </div>
      <div className='ml-auto'>
        <Button onClick={onSaveFont}>Apply Changes</Button>
      </div>
    </div>
  )
}
