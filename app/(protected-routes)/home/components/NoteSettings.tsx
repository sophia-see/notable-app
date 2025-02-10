"use client"

import { useToast } from '@/hooks/use-toast';
import { archiveNote, deleteNote } from '@/server-actions/notes';
import { redirect, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoArchiveOutline } from 'react-icons/io5'
import { MdOutlineDeleteOutline } from "react-icons/md";

interface ItemProps {
    onClick: () => void; 
    children: React.ReactNode;
}

function Item ({onClick, children}: ItemProps) {
    return (
        <div 
            className={`
                flex gap-2 items-center 
                py-3 px-4 
                border border-border rounded-[8px] 
                cursor-pointer
            `}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default function NoteSettings() {
    const searchParams = useSearchParams();
    const noteId = searchParams.get("noteId") ?? ""
    const { toast } = useToast();

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
        <div className='flex flex-col gap-3 w-full py-5 pl-4'>
            <Item onClick={onArchive}>
                <IoArchiveOutline />
                <span className='text-preset-4 text-foreground'>Archive Note</span> 
            </Item>
            <Item onClick={onDelete}>
                <MdOutlineDeleteOutline />
                <span className='text-preset-4 text-foreground'>Delete Note</span>
            </Item>
        </div>
    )
}
