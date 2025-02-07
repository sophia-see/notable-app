"use client"

import { Button } from '@/components/custom-ui/custom-button'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function CreateNoteButton() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const onCreateNote = () => {
        const params = new URLSearchParams(searchParams);

        params.set("noteId", "new");

        redirect(`${pathname}?${params.toString()}`)
    }

    return (
        <Button onClick={onCreateNote} className='w-[48px] h-[48px] bg-blue-500 p-2 flex justify-center items-center rounded-full'>
            <FaPlus color='white'/>
        </Button>
    )
}
