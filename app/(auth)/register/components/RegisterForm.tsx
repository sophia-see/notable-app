"use client";

import { Button } from "@/components/custom-ui/auth-button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/custom-ui/auth-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { registerUser } from "@/server-actions/auth";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";

const formSchema = z
    .object({
        email: z.string().email(),
    })
    .and(passwordMatchSchema);

export default function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { email, password, passwordConfirm } = data;

        const response = await registerUser({
            email,
            password,
            passwordConfirm,
        });

        if (response?.error) {
            form.setError("email", {
                message: response?.message,
            });
        } else {
            redirect("/login");
        }
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription className="flex items-center gap-2">
                                    <CiCircleInfo />
                                    At least 8 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription className="flex items-center gap-2">
                                    <CiCircleInfo />
                                    Passwords must match
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                    <div className="flex flex-col items-center gap-4">
                        <Separator />
                        <span className="mt-2 text-foreground text-preset-5">
                            Or log in with:
                        </span>
                        <Button variant={"outline"} className="w-full">
                            <FaGoogle />
                            Google
                        </Button>
                        <Separator />
                    </div>
                    <div className="text-center text-foreground text-preset-5">
                        Already have an account?{" "}
                        <Link
                            href={"/login"}
                            className="text-accent-foreground hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </fieldset>
            </form>
        </Form>
    );
}
