import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/custom-ui/auth-card'
import Image from 'next/image'
import React from 'react'
import LoginForm from './components/LoginForm'


export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <Image
          src={"./assets/images/logo.svg"}
          width={0}
          height={0}
          sizes='100vw'
          className='w-[95px] h-auto mb-2'
          alt='notable logo'
        />
        <CardTitle>
          Welcome to Note
        </CardTitle>
        <CardDescription>
          Please log in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
