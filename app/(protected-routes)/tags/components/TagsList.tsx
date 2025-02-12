"use client"

import React from 'react'
import { Option } from '../../components/TagsSelect'
import { PiTag } from 'react-icons/pi';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';

interface TagsListProps {
  tags: Option[];
}

export default function TagsList({tags}: TagsListProps) {
  const onClickTags = (tagName: string) => {
    redirect(`/tags/${tagName}`)
  }

  return (
    <div className='flex flex-col gap-1'>
      {tags.map((tag, index) => {
        const isLast = index == (tags.length - 1);
        return (
          <div className='flex flex-col gap-1' key={`${index}`}>
            <div className='flex gap-2 items-center py-[10px] cursor-pointer' onClick={() => onClickTags(tag.value)}>
              <PiTag className='fill-foreground'/>
              <span className='text-preset-4 text-foreground'>{tag.value}</span>
            </div>
            {!isLast && <Separator />}
          </div>
        )
      })}
    </div>
  )
}
