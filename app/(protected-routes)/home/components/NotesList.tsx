"use client"

import { Separator } from '@/components/ui/separator';
import { NoteType } from '@/db/types';
import { formatDate } from '@/lib/utils';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

interface NotesListProps {
    notes: NoteType[];
}

export default function NotesList({notes}: NotesListProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const onClickNote = (id: string) => {
        const params = new URLSearchParams(searchParams);

        params.set("noteId", id);

        redirect(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='flex flex-col gap-1'>
            {
                notes.map((note, index) => {
                    const isLast = index == notes.length-1;

                    return (
                        <div className='flex flex-col gap-1 cursor-pointer' key={note.id.toString()} onClick={() => onClickNote(note.id.toString())}>
                            <div className='flex flex-col gap-3 p-2'>
                                <span className='text-preset-3 text-neutral-950'>{note.title}</span>
                                    {note.tags.length 
                                        ? (
                                            <div className='flex gap-1'>
                                                {note.tags.map((tag, index) => (
                                                    <div key={`${index}`} className='text-neutral-950 text-preset-6 p-1 bg-neutral-200 rounded-[4px]'>{tag}</div>
                                                ))}
                                            </div>
                                        )
                                        : <></>
                                    }
                                <span className='text-preset-6 text-neutral-700'>
                                    {formatDate(note.createdAt)}
                                </span>
                            </div>
                            {!isLast && <Separator />}
                        </div>
                    )
                })
            }
        </div>
    )
}
