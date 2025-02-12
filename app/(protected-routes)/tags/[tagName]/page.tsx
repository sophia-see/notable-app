import React from 'react'
import BackButton from '../../components/BackButton';
import { notesByUserAndTag, tagsByUser } from '@/server-actions/notes';
import NotesList from '../../components/NotesList';
import NotePage from '../../components/NotePage';
import NoteSettings from '../../components/NoteSettings';

interface TagPageProps {
  params: Promise<{
    tagName?: string;
  }>;
  searchParams: Promise<{
    noteId?: string;
  }>;
}

export default async function TagPage({params, searchParams}:TagPageProps) {
  const paramsValues = await params;
  const searchParamsValues = await searchParams;
  const { tagName } = paramsValues;
  const { noteId } = searchParamsValues;

  console.log({paramsValues})

  const userTags = await tagsByUser();
  const notes = await notesByUserAndTag({tagName: tagName ?? ""});
  const note = noteId
      ? notes.find((i) => i.id == parseInt(noteId))
      : null;

  return (
    <div className='flex flex-col gap-4 h-full'>
      <div className={`${noteId ? 'hidden' : "flex flex-col gap-4"}`}>
        <BackButton path='/tags'/>
        <span className='text-preset-1 text-foreground'>
          Notes Tagged:{" "}
          <span className='text-accent-foreground'>
            {tagName}
          </span>
        </span>
        <div className='text-preset-5 text-foreground'>
          All notes with the <span className='text-accent-foreground'>"{tagName}"</span> tag are shown here.
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
