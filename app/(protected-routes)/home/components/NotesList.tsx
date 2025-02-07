import { Separator } from '@/components/ui/separator';
import { NoteType } from '@/db/types';
import React from 'react'

interface NotesListProps {
    notes: NoteType[];
}

export default function NotesList({notes}: NotesListProps) {
  return (
    <div className='flex flex-col gap-1'>
        {
            notes.map((note) => {
                return (
                    <div className='flex flex-col gap-1' key={note.id.toString()}>
                        <div className='flex flex-col gap-3'>
                            <span>{note.title}</span>
                            <span>{note.tags.length ? note.tags.map(tag => tag).join(", ") : "-"}</span>
                            <span>
                                {note.createdAt.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <Separator />
                    </div>
                )
            })
        }
    </div>
  )
}
