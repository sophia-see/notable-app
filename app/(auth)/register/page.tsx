import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/custom-ui/auth-card'
import Image from 'next/image'
import React from 'react'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
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
          Create Your Account
        </CardTitle>
        <CardDescription>
          Sign up to start organizing your notes and boost your productivity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}
