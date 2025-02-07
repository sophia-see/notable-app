import { Button } from '@/components/custom-ui/custom-button'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export default function CreateNoteButton() {
    return (
        <Button className='w-[48px] h-[48px] bg-blue-500 p-2 flex justify-center items-center rounded-full'>
            <FaPlus color='white'/>
        </Button>
    )
}
