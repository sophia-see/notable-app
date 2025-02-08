"use client";

import { Button } from "@/components/custom-ui/custom-button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/custom-ui/notes-form";
import { Input } from "@/components/custom-ui/notes-input";
import { Textarea } from "@/components/custom-ui/notes-textarea";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { NoteType } from "@/db/types";
import { useToast } from "@/hooks/use-toast";
import { createNote, updateNote } from "@/server-actions/notes";
import { notesValidateSchema } from "@/validation/notesValidateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { PiTag } from "react-icons/pi";
import { z } from "zod";
import TagsSelect, { Option } from "./TagsSelect";
import { GoClock } from "react-icons/go";

interface NotePageProps {
    note: NoteType | null;
    tags: Option[];
}

const formSchema = notesValidateSchema;

export default function NotePage({ note, tags }: NotePageProps) {
    const { isDarkMode } = useAppContext();
    const { toast } = useToast();
    const router = useRouter();

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

        let response;

        if (note?.id) {
            response = await updateNote({id: note?.id, title, content, tags: filteredTags, isArchived: isArchived ?? false});
        } else {
            response = await createNote({title, content, tags: filteredTags, isArchived: isArchived ?? false});
        }


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

        router.refresh();
    }


    return (
        <div className="flex flex-col gap-3 h-full">
            <FormProvider {...form} >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-3 h-full"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1 items-center" onClick={onGoBack}>
                                <IoIosArrowBack className={`${isDarkMode ? "fill-neutral-300" : "fill-neutral-600"}`}/>
                                <span className={`text-preset-5 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}>Go Back</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant={"ghost"} className="text-preset-5" type="reset">Cancel</Button>
                                <Button variant={"ghost"} className="text-preset-5 text-primary" type="submit">Save Note</Button>
                            </div>
                        </div>
                        <Separator />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter a title..." 
                                            className="text-preset-2 px-0"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                                <div className="min-w-[115px] flex items-center gap-[6px]">
                                    <PiTag />
                                    <span className="text-preset-6 text-neutral-700">Tags</span>
                                </div>
                                <div className="flex-1">
                                    <TagsSelect tags={tags} initialSelected={note?.tags ?? []}/>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="min-w-[115px] flex items-center gap-[6px] py-4">
                                    <GoClock />
                                    <span className="text-preset-6 text-neutral-700">Last edited</span>
                                </div>
                                <div className="flex-1">
                                    <span className="text-preset-6 text-neutral-700">
                                    {note?.updatedAt?.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <Separator />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Textarea placeholder="Start typing your note here…" className="h-full px-0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </FormProvider>
            {/* mobile - tablet header */}

            {/* title */}

            {/* tags, lastEdited */}

            {/* separator */}

            {/* content */}
        </div>
    );
}
