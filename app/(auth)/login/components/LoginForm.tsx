"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/custom-ui/auth-form'
import { Button } from '@/components/custom-ui/auth-button'
import { Input } from '@/components/ui/input'
import { passwordSchema } from '@/validation/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { FaGoogle } from "react-icons/fa";
import { loginUser, loginWithGoogle } from '@/auth-actions'
import { redirect } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema
})
export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const {email, password} = data;

    const response = await loginUser({email, password});

    if (response?.error) {
      form.setError("root", {
        message: response?.message
      })
    } else {
      form.reset();
      redirect("/all")
    }
  }

  const onLoginWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await loginWithGoogle();

    console.log({res})
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between items-center'>
                <FormLabel>Password</FormLabel>
                <Link href={"/forgot-password"} className='underline text-neutral-600 text-[12px] leading-[140%]'>Forgot</Link>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!form.formState.errors.root?.message && 
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        }
        <Button type='submit' className='w-full'>Login</Button>
        <div className='flex flex-col items-center gap-4'>
          <Separator />
          <span className='mt-2 text-neutral-600 text-preset-5'>Or log in with:</span>
          <Button onClick={onLoginWithGoogle} variant={"outline"} className='w-full'>
            <FaGoogle />
            Google
          </Button>  
          <Separator />
        </div>
        <div className='text-center text-neutral-600  text-preset-5'>
          No account yet?{" "}
          <Link href={"/register"} className='text-neutral-950 hover:underline'>Sign up</Link>
        </div>
      </form>
    </Form>
  )
}
