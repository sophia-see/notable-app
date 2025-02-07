"use server"

import { auth } from "@/auth"
import db from "@/db/drizzle";
import { notesTable, noteTagsTable, tagsTable, usersTable } from "@/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { z } from "zod";

interface CreateNotesProps {
    title: string;
    content: string;
    tags: string[];
}

export const notesByUser = async () => {
    const session = await auth();

    if (!session?.user?.id)
        throw new Error ("No user logged in");

    const notesWithTags = await db
        .select({
            id: notesTable.id,
            title: notesTable.title,
            content: notesTable.content,
            createdAt: notesTable.createdAt,
            tags: tagsTable.name,
        })
        .from(notesTable)
        .leftJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
        .leftJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
        .where(eq(notesTable.userId, parseInt(session.user.id)));

    const notesMap = new Map();

    notesWithTags.forEach((row) => {
        if (!notesMap.has(row.id)) {
            notesMap.set(row.id, {
                ...row,
                tags: []
            })
        }

        if (row.tags)
            notesMap.get(row.id).tags.push(row.tags);
    })

    return Array.from(notesMap.values());
}

export const createNotes = async ({title, content, tags}: CreateNotesProps) => {
    const notesSchema = z.object({
        title: z.string().min(1, "Title must have at least 1 character").max(100, "Title can only have at most 100 characters")
    });

    const formValidation = notesSchema.safeParse({
        title
    })

    if (!formValidation.success) {
        return {
            error: true,
            message: formValidation.error.issues[0]?.message ?? "An error occurred"
        }
    }

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: true,
            message: "You need to be logged in to create a note"
        }
    }

    try {
        const [user] = await db.select({id: usersTable.id}).from(usersTable).where(eq(usersTable.id, parseInt(session.user.id)));

        if (!user) {
            return {
                error: true,
                message: "Invalid user"
            }
        }
        
        const [newNote] = await db.insert(notesTable).values({
            title,
            content,
            userId: user.id!
        }).returning();    
        
        if (!newNote.id)
            throw new Error("Failed to create note");

        const noteId = newNote.id;

        if (tags.length > 0) {
            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    let [tag] = await db.select().from(tagsTable).where(eq(tagsTable.name, tagName));
    
                    if (!tag) {
                        [tag] = await db.insert(tagsTable).values({
                            name: tagName
                        }).returning()
                    }
    
                    return tag.id;
                })
            )

            await db.insert(noteTagsTable).values(
                tagIds.map((tagId) => ({noteId, tagId}))
            )
        }
    } catch (error) {
        console.log({error})
        return {
            error: true,
            message: "An error occurred"
        }
    }
}