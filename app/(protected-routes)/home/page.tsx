import React from 'react'
import NotePage from './components/NotePage';
import NotesList from './components/NotesList';
import { notesByUser, tagsByUser } from '@/server-actions/notes';
import CreateNoteButton from './components/CreateNoteButton';

interface HomePageProps {
    searchParams: Promise<{
        noteId?: string;
    }>
}

export default async function HomePage({searchParams}: HomePageProps) {
    const searchParamsValue = await searchParams;
    const { noteId } = searchParamsValue;

    const userNotes = await notesByUser();
    const userTags = (await tagsByUser());

    const note = noteId ? userNotes.find(i => i.id == parseInt(noteId)) : null;

    return (
        <div className='text-foreground flex h-full'>
            <div className={`${!!noteId ? "hidden" : "flex flex-col gap-4"} w-full lg:flex lg:flex-col lg:gap-4 lg:w-[290px] lg:border-r-[1px]`}>
                <span className='text-preset-1 text-foreground'>All Notes</span>
                <NotesList notes={userNotes} />
            </div>

            {!!noteId && (
                <div className='flex-1'>
                    <NotePage note={note} tags={userTags}/>
                </div>
            )}

            <div className='hidden lg:flex w-[290px]'>
                note settings
            </div>

            <div className={`${!!noteId ? "hidden" : ""} absolute right-0 bottom-0 mr-4 mb-4`}>
                <CreateNoteButton />
            </div>
        </div>
    )
}
