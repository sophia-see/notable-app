import { Separator } from '@/components/ui/separator';
import { tagsByUser } from '@/server-actions/notes'
import React from 'react'
import { PiTag } from 'react-icons/pi';
import TagsList from './components/TagsList';

export default async function TagsPage() {
  const tags = await tagsByUser();

  return (
    <div className='flex flex-col gap-4 lg:hidden'>
      <span className='text-preset-1 text-accent-foreground'>Tags</span>
      <TagsList tags={tags} />
    </div>
  )
}
