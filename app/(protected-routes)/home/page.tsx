import React from 'react'
import NotePage from './components/NotePage';

interface HomePageProps {
    searchParams: Promise<{
        noteId?: string;
    }>
}

export default async function HomePage({searchParams}: HomePageProps) {
    const searchParamsValue = await searchParams;
    const { noteId } = searchParamsValue;

    console.log({noteId})
    
    return (
        <div className='text-foreground flex'>
            <div className='hidden lg:flex w-[290px] border-r-[1px]'>
                sidebar
            </div>

            {!!noteId && (
                <div className='flex-1'>
                    <NotePage id={noteId} />
                </div>
            )}

            <div className='hidden lg:flex w-[290px]'>
                note settings
            </div>
        </div>
    )
}
