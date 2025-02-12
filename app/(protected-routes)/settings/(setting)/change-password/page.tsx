"use client";

import { Button } from "@/components/custom-ui/custom-button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/custom-ui/settings-form";
import { Input } from "@/components/custom-ui/settings-input";
import { useToast } from "@/hooks/use-toast";
import { changePassword } from "@/server-actions/auth";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { z } from "zod";

const formSchema = z
    .object({
        oldPassword: passwordSchema,
    })
    .and(passwordMatchSchema);

export default function ChangePasswordPassword() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { oldPassword, password, passwordConfirm } = data;
        const response = await changePassword({
            oldPassword,
            password,
            passwordConfirm,
        });

        if (response?.error) {
            form.setError("root", { message: response?.message });
        } else {
            toast({
                title: "Change Password",
                description: (
                    <div className="">Your password has been updated.</div>
                ),
                duration: Infinity,
            });
        }
    };

    return (
        <div className={`flex flex-col gap-6`}>
            <span
                className={`text-accent-foreground text-preset-1`}
            >
                Change Password
            </span>
            <div className="flex flex-col gap-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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
                                    <FormLabel>New Password</FormLabel>
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
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription className="flex items-center gap-2">
                                        <CiCircleInfo />
                                        Must match the new password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!!form.formState.errors.root?.message && (
                            <FormMessage>
                                {form.formState.errors.root.message}
                            </FormMessage>
                        )}
                        <div className="flex justify-end">
                            <Button type="submit">Save Password</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
