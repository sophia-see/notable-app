"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/custom-ui/auth-form'
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
import { CiCircleInfo } from "react-icons/ci";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema
})
export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async () => {

  }

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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className='flex items-center gap-2'>
                <CiCircleInfo />
                At least 8 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>Login</Button>
        <div className='flex flex-col items-center gap-4'>
          <Separator />
          <span className='mt-2 text-neutral-600 text-preset-5'>Or log in with:</span>
          <Button variant={"outline"} className='w-full'>
            <FaGoogle />
            Google
          </Button>
          <Separator />
        </div>
        <div className='text-center text-neutral-600  text-preset-5'>
          Already have an account?{" "}
          <Link href={"/login"} className='text-neutral-950 hover:underline'>Login</Link>
        </div>
      </form>
    </Form>
  )
}
