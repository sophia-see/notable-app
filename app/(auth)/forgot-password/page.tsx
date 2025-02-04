import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/custom-ui/auth-card'
import Image from 'next/image'
import React from 'react'
import ForgotPasswordForm from './components/ForgotPasswordForm'

export default function ForgotPasswordPage() {
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
          Forgotten your password?
        </CardTitle>
        <CardDescription>
          Enter your email below, and we’ll send you a link to reset it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  )
}
