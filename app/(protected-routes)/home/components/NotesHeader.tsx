"use client"

import { Button } from '@/components/custom-ui/custom-button'
import { useAppContext } from '@/contexts/AppContext'
import { useToast } from '@/hooks/use-toast';
import { archiveNote, deleteNote } from '@/server-actions/notes';
import { redirect, useSearchParams } from 'next/navigation';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io'
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function NotesHeader() {
  const form = useFormContext();
  const { isDarkMode } = useAppContext();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId") ?? ""
  const isNew = noteId == "new"
  const { toast } = useToast();

  const onGoBack = () => {
      redirect("/home");
  }

  const onCancel = () => {
    form.reset();
  }

  const onArchive = async () => {
    if (noteId) {
      const response = await archiveNote({id: noteId});

      if (response?.error) {
        toast({
            title: "Archive Note Error",
            description: response?.message,
            duration: Infinity
        })
      } else {
        toast({
            title: "Note has been archived",
        })
      }
    }

    redirect("/home")
  }

  const onDelete = async () => {
    if (noteId) {
      const response = await deleteNote({id: noteId});

      if (response?.error) {
        toast({
            title: "Delete Note Error",
            description: response?.message,
            duration: Infinity
        })
      } else {
        toast({
            title: "Note has been deleted",
        })
      }
    }

    redirect("/home")
  }

  return (
    <div className="flex justify-between items-center lg:hidden">
        <div className="flex gap-1 items-center" onClick={onGoBack}>
            <IoIosArrowBack className={`${isDarkMode ? "fill-neutral-300" : "fill-neutral-600"}`}/>
            <span className={`text-preset-5 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Go Back</span>
        </div>
        <div className="flex items-center gap-4">
            {!isNew && <MdOutlineDeleteOutline onClick={onDelete} className='fill-accent-foreground'/>}
            {!isNew && <IoArchiveOutline onClick={onArchive} className='stroke-accent-foreground'/>}
            <Button variant={"ghost"} disabled={!form.formState.isDirty} className="w-auto p-0 text-preset-5" type='button' onClick={onCancel}>Cancel</Button>
            <Button variant={"ghost"} disabled={!form.formState.isDirty} className="text-preset-5 text-primary w-auto p-0" type="submit">Save Note</Button>
        </div>
    </div>
  )
}
