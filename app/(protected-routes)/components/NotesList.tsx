"use client"

import { NoteType } from '@/db/types';
import { formatDate } from '@/lib/utils';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

interface NotesListProps {
    notes: NoteType[];
}

const UNTITLED_NOTE: NoteType = {
    id: -1,
    createdAt: new Date(),
    userId: null,
    title: "Untitled Note",
    content: "",
    updatedAt: new Date(),
    isArchived: false,
    tags: []
}

export default function NotesList({notes}: NotesListProps) {
    const searchParams = useSearchParams();
    const currNote = searchParams.get("noteId") ?? ""
    const pathname = usePathname();
    const isNew = currNote == "new";
    const notesList = isNew ? [UNTITLED_NOTE, ...notes] : notes;
    
    const onClickNote = (id: string) => {
        const params = new URLSearchParams(searchParams);

        params.set("noteId", id);

        redirect(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='flex flex-col h-full '>
            {
                notesList.map((note, index) => {
                    const isNew = note.id == -1;
                    const isLast = index == notes.length-1;
                    const isSelected = currNote == note.id.toString();
                    
                    return (
                        <div className={`pt-1 rounded-[6px] flex flex-col gap-1 cursor-pointer ${isSelected || isNew? "bg-background" : ""} ${!isLast ? "border-b-[1px] border-border" : ""}`} key={note.id.toString()} onClick={() => onClickNote(note.id.toString())}>
                            <div className='flex flex-col gap-3 p-2'>
                                <span className='text-preset-3 text-accent-foreground'>{note.title}</span>
                                    {note.tags.length 
                                        ? (
                                            <div className='flex gap-1'>
                                                {note.tags.map((tag, index) => (
                                                    <div key={`${index}`} className='bg-background text-foreground text-preset-6 p-1 rounded-[4px]'>{tag}</div>
                                                ))}
                                            </div>
                                        )
                                        : <></>
                                    }
                                {!isNew && <span className='text-preset-6 text-foreground'>
                                    {formatDate(note.createdAt)}
                                </span>}
                            </div>
                            {/* {!isLast && <Separator />} */}
                        </div>
                    )
                })
            }
        </div>
    )
}
