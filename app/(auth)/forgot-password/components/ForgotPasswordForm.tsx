"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/custom-ui/auth-form'
import { Button } from '@/components/custom-ui/auth-button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { resetPassword } from '@/auth-actions'

const formSchema = z.object({
  email: z.string().email(),
})
export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await resetPassword(data.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className='space-y-4' disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful} >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder='email@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isSubmitSuccessful && <FormMessage className='text-green-600'>Password reset link has been sent to your email address.</FormMessage>}
          <Button type='submit' className={`w-full ${form.formState.isSubmitSuccessful ? "bg-green-600" : ""}`}>{form.formState.isSubmitSuccessful ? "Sent successful" : "Send Reset Link"}</Button>
        </fieldset>
      </form>
    </Form>
  )
}
