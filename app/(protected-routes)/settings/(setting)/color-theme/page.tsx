"use client"

import { Button } from '@/components/custom-ui/custom-button';
import { COLOR, FONT, useAppContext } from '@/contexts/AppContext'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import Item from '../components/SettingItem';
import { IoSunnyOutline } from 'react-icons/io5';
import { CiDark } from "react-icons/ci";
import { ImBrightnessContrast } from "react-icons/im";

export default function ColorThemePage() {
  const { color, setColor, isDarkMode } = useAppContext();
  const [tempColor, setTempColor] = useState<COLOR>(color);

  const onSaveFont = () => {
    setColor(tempColor);
  }

  return (
    <div className={`flex flex-col gap-5`}>
      <div className='flex flex-col gap-2'>
        <span className={`${isDarkMode ? "text-neutral-0" : "text-neutral-950"} text-preset-1`}>Color Theme</span>
        <span className={`${isDarkMode ? "text-neutral-300" : "text-neutral-700"} text-preset-5`}>Choose your color theme:</span>
      </div>
      <div className='flex flex-col gap-4'>
        <Item
          name="Light Mode" 
          description='Pick a clean and classic light theme' 
          selected={tempColor} 
          setSelected={setTempColor}
          value={COLOR.light}
          icon={<IoSunnyOutline color={isDarkMode ? "#FFFFFF" : "#000000"}/>}
        />
        <Item
          name="Dark Mode" 
          description='Select a sleek and modern dark theme' 
          selected={tempColor} 
          setSelected={setTempColor}
          value={COLOR.dark}
          icon={<CiDark color={isDarkMode ? "#FFFFFF" : "#000000"}/>}
        />
        <Item
          name="System" 
          description='Adapts to your device’s theme' 
          selected={tempColor} 
          setSelected={setTempColor}
          value={COLOR.system}
          icon={<ImBrightnessContrast color={isDarkMode ? "#FFFFFF" : "#000000"}/>}
        />
      </div>
      <div className='ml-auto'>
        <Button onClick={onSaveFont}>Apply Changes</Button>
      </div>
    </div>
  )
}
