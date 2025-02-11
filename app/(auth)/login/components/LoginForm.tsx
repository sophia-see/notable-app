"use client";

import { Button } from "@/components/custom-ui/auth-button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/custom-ui/auth-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginUser, loginWithGoogle } from "@/server-actions/auth";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
});
export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { email, password } = data;

        const response = await loginUser({ email, password });

        if (response?.error) {
            form.setError("root", {
                message: response?.message,
            });
        } else {
            form.reset();
            redirect("/home");
        }
    };

    const onLoginWithGoogle = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        await loginWithGoogle();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={form.formState.isSubmitting}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="email@example.com"
                                        {...field}
                                    />
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
                                <div className="flex justify-between items-center">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href={"/forgot-password"}
                                        className="underline text-foreground text-[12px] leading-[140%]"
                                    >
                                        Forgot
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!!form.formState.errors.root?.message && (
                        <FormMessage>
                            {form.formState.errors.root.message}
                        </FormMessage>
                    )}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div className="flex flex-col items-center gap-4">
                        <Separator />
                        <span className="mt-2 text-foreground text-preset-5">
                            Or log in with:
                        </span>
                        <Button
                            onClick={onLoginWithGoogle}
                            variant={"outline"}
                            className="w-full"
                        >
                            <FaGoogle />
                            Google
                        </Button>
                        <Separator />
                    </div>
                    <div className="text-center text-foreground text-preset-5">
                        No account yet?{" "}
                        <Link
                            href={"/register"}
                            className="text-accent-foreground hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </fieldset>
            </form>
        </Form>
    );
}
