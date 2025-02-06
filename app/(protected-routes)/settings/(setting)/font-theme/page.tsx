"use client"

import { Button } from '@/components/custom-ui/custom-button';
import { FONT, useAppContext } from '@/contexts/AppContext'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

interface ItemProps {
  name: string;
  description: string;
  font: FONT;
  setFont: React.Dispatch<React.SetStateAction<FONT>>;
  value: FONT;
}

function Item ({name, description, font, setFont, value}: ItemProps) {
  const isActive = value == font;

  const onClickItem = () => {
    setFont(value)
  }

  return (
    <div 
      className={`flex justify-between items-center gap-4 p-4 rounded-[12px] border-[1px] border-neutral-200 ${isActive ? "bg-neutral-100" : ""}`}
      onClick={onClickItem}
      role='button'
    >
      <div className='flex gap-4 items-center'>
        <div className={`p-2 border-[1px] border-neutral-200 text-neutral-950 rounded-[12px] font-${value}`}>Aa</div>
        <div className='flex flex-col gap-[6px]'>
          <span className='text-preset-4 text-neutral-950'>{name}</span>
          <span className='text-preset-6 text-neutral-700'>{description}</span>
        </div>
      </div>
      <div className={`w-[16px] h-[16px] ${isActive ? "border-[4px] bg-neutral-0 border-blue-500" : "border-[2px] border-neutral-200"} rounded-full`}></div>
    </div>
  )
}

export default function page() {
  const { font, setFont } = useAppContext();
  const [tempFont, setTempFont] = useState<FONT>(font);

  const onSaveFont = () => {
    setFont(tempFont);
    redirect("/settings")
  }

  return (
    <div className={`font-${tempFont} flex flex-col gap-5`}>
      <div className='flex flex-col gap-2'>
        <span className='text-neutral-950 text-preset-1'>Font Theme</span>
        <span className='text-neutral-700 text-preset-5'>Choose your font theme:</span>
      </div>
      <div className='flex flex-col gap-4'>
        <Item 
          name="Sans-serif" 
          description='Clean and modern, easy to read.' 
          font={tempFont} 
          setFont={setTempFont}
          value={FONT.sans}
        />
        <Item 
          name="Serif" 
          description='Classic and elegant for a timeless feel.' 
          font={tempFont} 
          setFont={setTempFont}
          value={FONT.serif}
        />
        <Item 
          name="Monospace" 
          description='Code-like, great for a technical vibe.' 
          font={tempFont} 
          setFont={setTempFont}
          value={FONT.mono}
        />
      </div>
      <div className='ml-auto'>
        <Button onClick={onSaveFont}>Apply Changes</Button>
      </div>
    </div>
  )
}
