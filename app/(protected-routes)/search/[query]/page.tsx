import React from 'react'
import BackButton from '../../components/BackButton';
import { notesByUserAndTag, searchNotesByUser, tagsByUser } from '@/server-actions/notes';
import NotesList from '../../components/NotesList';
import NotePage from '../../components/NotePage';
import NoteSettings from '../../components/NoteSettings';
import CreateNoteButton from '../../components/CreateNoteButton';
import SearchBar from '../components/SearchBar';

interface TagPageProps {
  params: Promise<{
    query?: string;
  }>;
  searchParams: Promise<{
    noteId?: string;
  }>;
}

export default async function SearchPage({params, searchParams}:TagPageProps) {
  const paramsValues = await params;
  const searchParamsValues = await searchParams;
  const { query } = paramsValues;
  const { noteId } = searchParamsValues;

  const userTags = await tagsByUser();
  const notes = await searchNotesByUser({query: query ?? ""});
  const note = noteId
      ? notes.find((i) => i.id == parseInt(noteId))
      : null;

  return (
    <div className='flex flex-col gap-4 h-full lg:flex-row lg:px-8'>
      <div className={`${!!noteId ? 'hidden' : "flex"} flex-col gap-4 lg:flex lg:w-[290px] lg:border-r-[1px] lg:py-5 lg:pr-4`}>

        <div className="hidden lg:block">
          <CreateNoteButton />
        </div>
        <div className='text-preset-5 text-foreground'>
          All notes matching <span className='text-accent-foreground'>"{query}"</span> are displayed below.
        </div>
        <NotesList notes={notes} />
      </div>
      
      {!!noteId && (
          <div className="flex-1">
              <NotePage note={note} tags={userTags} />
          </div>
      )}

      {!!noteId && (
          <div className="hidden lg:flex w-[290px]">
              <NoteSettings />
          </div>
      )}
    </div>
  )
}
