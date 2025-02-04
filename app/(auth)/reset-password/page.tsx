import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/custom-ui/auth-card'
import Image from 'next/image'
import React from 'react'
import ResetPasswordForm from './components/ResetPasswordForm'

export default function ResetPasswordPage() {
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
          Reset Your Password
        </CardTitle>
        <CardDescription>
          Choose a new password to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  )
}
