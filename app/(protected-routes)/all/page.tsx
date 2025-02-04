"use client"

import { logout } from '@/auth-actions'
import { Button } from '@/components/custom-ui/auth-button'
import React from 'react'

export default function all() {

  const onLogout = async () => {
    await logout();
  }
  
  return (
    <div>
      all
      <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}
