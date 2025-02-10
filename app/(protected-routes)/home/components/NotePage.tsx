"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/custom-ui/notes-form";
import { Input } from "@/components/custom-ui/notes-input";
import { Textarea } from "@/components/custom-ui/notes-textarea";
import { Separator } from "@/components/ui/separator";
import { NoteType } from "@/db/types";
import { useToast } from "@/hooks/use-toast";
import { createNote, updateNote } from "@/server-actions/notes";
import { notesValidateSchema } from "@/validation/notesValidateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Option } from "./TagsSelect";
import NotesHeader from "./NotesHeader";
import NoteDetails from "./NoteDetails";
import { Button } from "@/components/custom-ui/custom-button";
import React, { useEffect } from "react";

interface NotePageProps {
    note: NoteType | null;
    tags: Option[];
}

const formSchema = notesValidateSchema;

export default function NotePage({ note, tags }: NotePageProps) {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const noteId = searchParams.get("noteId") ?? "";
    const isNewNote = noteId == "new"
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: note?.title ?? "",
            content: note?.content ?? "",
            isArchived: note?.isArchived ?? false,
            tags: note?.tags ?? []
        },
    });

    useEffect(() => {
        form.reset({
            title: note?.title ?? "",
            content: note?.content ?? "",
            isArchived: note?.isArchived ?? false,
            tags: note?.tags ?? [],
        })
    }, [note, form]);

    const renderTags = React.useMemo(() => {
        return <NoteDetails tags={tags} note={note}/>
    }, [note, tags])

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { title, content, tags, isArchived } = data;

        const filteredTags = tags?.filter(i => i as string) ?? [];

        let response;

        if (note?.id) {
            response = await updateNote({id: note?.id, title, content, tags: filteredTags, isArchived: isArchived ?? false});
        } else {
            response = await createNote({title, content, tags: filteredTags, isArchived: isArchived ?? false});
        }


        if (response?.error) {
            toast({
                title: isNewNote ? "Create Note Error" : "Update Note Error",
                description: response?.message,
                duration: Infinity
            })
        } else {
            toast({
                title: isNewNote ? "Create Note Saved" : "Update Note Saved" ,
            })

            console.log({id: response?.id})
            if (isNewNote && !!response?.id) {
                const params = new URLSearchParams(searchParams);

                params.set("noteId", response?.id?.toString())

                redirect(`/home?${params.toString()}`)
            }
        }

        router.refresh();
    }


    return (
        <div className="h-full lg:py-5 lg:px-6 lg:border-r lg:border-border">
            <FormProvider {...form} >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-3 md:gap-4 h-full"
                    >
                        <NotesHeader />
                        <Separator className="lg:hidden"/>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter a title..." 
                                            className="text-preset-1 px-0"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {renderTags}
                        
                        <Separator />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Textarea placeholder="Start typing your note here…" className="resize-none h-full px-0 text-preset-5" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="hidden lg:block"/>
                                
                        <div className="hidden lg:flex lg:gap-4">
                            <Button type="submit">Save Note</Button>    
                            <Button type="button" variant={"secondary"}>Cancel</Button>    
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </div>
    );
}
