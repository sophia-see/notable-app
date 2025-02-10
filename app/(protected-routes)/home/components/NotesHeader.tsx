"use client"

import { Button } from '@/components/custom-ui/custom-button'
import { useAppContext } from '@/contexts/AppContext'
import { redirect, useRouter } from 'next/navigation';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io'

export default function NotesHeader() {
  const form = useFormContext();
  const { isDarkMode } = useAppContext();
  const router = useRouter();
  
  const onGoBack = () => {
      redirect("/home");
  }

  const onCancel = () => {
    form.reset();
  }

  return (
    <div className="flex justify-between items-center lg:hidden">
        <div className="flex gap-1 items-center" onClick={onGoBack}>
            <IoIosArrowBack className={`${isDarkMode ? "fill-neutral-300" : "fill-neutral-600"}`}/>
            <span className={`text-preset-5 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Go Back</span>
        </div>
        <div className="flex items-center gap-4">
            <Button variant={"ghost"} disabled={!form.formState.isDirty} className="text-preset-5" type='button' onClick={onCancel}>Cancel</Button>
            <Button variant={"ghost"} className="text-preset-5 text-primary" type="submit">Save Note</Button>
        </div>
    </div>
  )
}
