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
import { useToast } from "@/hooks/use-toast";
import { updatePassword } from "@/server-actions/auth";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = passwordMatchSchema;

interface ResetPasswordFormProps {
    token: string;
}
export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { password, passwordConfirm } = data;

        const response = await updatePassword({
            token,
            password,
            passwordConfirm,
        });

        if (response?.tokenInvalid) window.location.reload();

        if (response?.error) {
            form.setError("root", {
                message: response?.message,
            });
        } else {
            toast({
                title: "Password Reset",
                description: (
                    <div className="">
                        Your password has been updated. You can now login with
                        your new password.
                    </div>
                ),
                duration: Infinity,
            });
            form.reset();
            redirect("/login");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                {!!form.formState.errors.root?.message && (
                    <FormMessage>
                        {form.formState.errors.root.message}
                    </FormMessage>
                )}
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
            </form>
        </Form>
    );
}
