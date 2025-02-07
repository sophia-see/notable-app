"use client";

import { Button } from "@/components/custom-ui/custom-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/custom-ui/notes-form";
import { Input } from "@/components/custom-ui/notes-input";
import { Textarea } from "@/components/custom-ui/notes-textarea";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { NoteType } from "@/db/types";
import { useToast } from "@/hooks/use-toast";
import { createNote } from "@/server-actions/notes";
import { notesValidateSchema } from "@/validation/notesValidateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { z } from "zod";

interface NotePageProps {
    note: NoteType | null;
}

const formSchema = notesValidateSchema;

export default function NotePage({ note }: NotePageProps) {
    const { isDarkMode } = useAppContext();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: note?.title ?? "",
            content: note?.content ?? "",
            isArchived: note?.isArchived ?? false,
            tags: note?.tags ?? []
        },
    });

    const onGoBack = () => {
        redirect("/home")
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { title, content, tags, isArchived } = data;

        const filteredTags = tags?.filter(i => i as string) ?? [];

        const response = await createNote({title, content, tags: filteredTags, isArchived: isArchived ?? false});

        if (response?.error) {
            toast({
                title: note?.id ? "Update Note Error" : "Create Note Error",
                description: response?.message,
                duration: Infinity
            })
        } else {
            toast({
                title: note?.id ? "Update Note Saved" : "Create Note Saved",
            })
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center" onClick={onGoBack}>
                            <IoIosArrowBack className={`${isDarkMode ? "fill-neutral-300" : "fill-neutral-600"}`}/>
                            <span className={`text-preset-5 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Go Back</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button type="reset">Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        placeholder="Enter a title..." 
                                        className="text-preset-2 "
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Separator />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Start typing your note here…" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            {/* mobile - tablet header */}

            {/* title */}

            {/* tags, lastEdited */}

            {/* separator */}

            {/* content */}
        </div>
    );
}
