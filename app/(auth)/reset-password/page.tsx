import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/custom-ui/auth-card'
import Image from 'next/image'
import React from 'react'
import ResetPasswordForm from './components/ResetPasswordForm'
import db from '@/db/drizzle'
import { passwordResetTokensTable } from '@/db/passwordResetTokensSchema'
import { eq } from "drizzle-orm";
import Link from 'next/link'

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>
}

export default async function ResetPasswordPage({searchParams}: ResetPasswordPageProps) {
  const searchParamsValue = await searchParams;
  const { token } = searchParamsValue;
  let isTokenValid = false;
  
  if (token) {
    const [passwordResetToken] = await db.select().from(passwordResetTokensTable).where(eq(passwordResetTokensTable.token, token));

    const now = Date.now();

    if (!!passwordResetToken?.tokenExpiry && now < passwordResetToken.tokenExpiry.getTime()) {
      isTokenValid = true;
    }
  }

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
          {isTokenValid ? "Reset Your Password" : "Password reset link is invalid or expired"}
        </CardTitle>
        {isTokenValid && 
          <CardDescription>
            Choose a new password to secure your account.
          </CardDescription>
        }
      </CardHeader>
      <CardContent>
        {isTokenValid 
          ? <ResetPasswordForm token={token as string} /> 
          : (
            <div className='flex justify-center'>
              <Link href={"/forgot-password"} className='underline'>Request another password reset link</Link>
            </div>
          )
        }
      </CardContent>
    </Card>
  )
}
