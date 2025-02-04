"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/custom-ui/auth-form'
import { Button } from '@/components/custom-ui/auth-button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { updatePassword } from '@/auth-actions'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

const formSchema = passwordMatchSchema

interface ResetPasswordFormProps {
  token: string;
}
export default function ResetPasswordForm({token}: ResetPasswordFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const {password, passwordConfirm} = data;

    const response = await updatePassword({
      token,
      password,
      passwordConfirm
    });

    if (response?.tokenInvalid)
      window.location.reload();

    if (response?.error) {
      form.setError("root", {
        message: response?.message
      })
    } else {
      toast({
        title: "Password Reset",
        description: (
          <div className=''>
            Your password has been updated. Click here to{" "}<Link href={"/login"} className='underline'>login</Link>
          </div>
        ),
        duration: Infinity
      })

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>Reset Password</Button>
      </form>
    </Form>
  )
}
