"use client"

import { Button } from '@/components/custom-ui/custom-button'
import { useToast } from '@/hooks/use-toast';
import { archiveNote, deleteNote } from '@/server-actions/notes';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { RiResetLeftFill } from "react-icons/ri";
import BackButton from './BackButton';

export default function NotesHeader() {
  const form = useFormContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isArchived = pathname.includes("archived")
  const noteId = searchParams.get("noteId") ?? ""
  const isNew = noteId == "new"
  const { toast } = useToast();

  const onCancel = () => {
    form.reset();
  }

  const onArchive = async () => {
    if (noteId) {
      const response = await archiveNote({id: noteId, isArchived: !isArchived});

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
        <BackButton />
        <div className="flex items-center gap-4">
            {!isNew &&<MdOutlineDeleteOutline onClick={onDelete} className='fill-accent-foreground'/>}
            {!isNew && isArchived ? <RiResetLeftFill   onClick={onArchive} className='stroke-accent-foreground'/> :  <IoArchiveOutline onClick={onArchive} className='stroke-accent-foreground'/>}
            <Button variant={"ghost"} disabled={!form.formState.isDirty} className="w-auto p-0 text-preset-5" type='button' onClick={onCancel}>Cancel</Button>
            <Button variant={"ghost"} disabled={!form.formState.isDirty} className="text-preset-5 text-primary w-auto p-0" type="submit">Save Note</Button>
        </div>
    </div>
  )
}
