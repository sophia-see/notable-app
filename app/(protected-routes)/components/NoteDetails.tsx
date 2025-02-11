import React from 'react'
import { PiTag } from 'react-icons/pi'
import TagsSelect, { Option } from './TagsSelect'
import { GoClock } from 'react-icons/go'
import { formatDate } from '@/lib/utils'
import { NoteType } from '@/db/types'

interface NoteDetailsProps {
  note: NoteType | null;
  tags: Option[];
}

export default function NoteDetails({note, tags}: NoteDetailsProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <div className="min-w-[115px] flex items-center gap-[6px]">
            <PiTag />
            <span className="text-preset-6 md:text-preset-5 text-foreground">Tags</span>
        </div>
        <div className="flex-1">
            <TagsSelect tags={tags} initialSelected={note?.tags ?? []}/>
        </div>
      </div>
      <div className="flex items-center">
        <div className="min-w-[115px] flex items-center gap-[6px] py-4">
            <GoClock />
            <span className="text-preset-6 md:text-preset-5 text-foreground">Last edited</span>
        </div>
        <div className="flex-1">
            <span className="text-preset-6 md:text-preset-5 text-foreground">
            {note?.updatedAt ? formatDate(note?.updatedAt) : "N/A"}
            </span>
        </div>
      </div>
      </div>
  )
}
