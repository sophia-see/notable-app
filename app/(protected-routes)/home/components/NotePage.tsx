"use client"

import React from 'react'

interface NotePageProps {
    id: string;
}

export default function NotePage({id}: NotePageProps) {
  return (
    <div>Note: {id}</div>
  )
}
