"use server";

import { Option } from "@/app/(protected-routes)/home/components/TagsSelect";
import { auth } from "@/auth";
import db from "@/db/drizzle";
import { notesTable, noteTagsTable, tagsTable, usersTable } from "@/db/schema";
import { notesValidateSchema } from "@/validation/notesValidateSchema";
import { and, eq, inArray } from "drizzle-orm";

export const tagsByUser = async () => {
    const session = await auth();

    if (!session?.user?.id) throw new Error("No user logged in");

    const userId = session?.user?.id;

    const tags = await db
        .select({
            tagId: tagsTable.id,
            tagName: tagsTable.name
        })
        .from(tagsTable)
        .leftJoin(noteTagsTable, eq(tagsTable.id, noteTagsTable.tagId))
        .leftJoin(notesTable, eq(noteTagsTable.noteId, notesTable.id))
        .where(eq(notesTable.userId, parseInt(userId)))

        
    const uniqueTags = Array.from(new Set(tags.map((tag) => tag.tagName)))
        .map((tagName) => ({
            tagName,
        })
    );

    const formatAsOptions = uniqueTags.map(i => ({
        label: i.tagName,
        value: i.tagName
    }))

    return formatAsOptions as Option[] ?? [];
}

export const notesByUser = async () => {
    const session = await auth();

    if (!session?.user?.id) throw new Error("No user logged in");

    const notesWithTags = await db
        .select({
            id: notesTable.id,
            title: notesTable.title,
            content: notesTable.content,
            createdAt: notesTable.createdAt,
            updatedAt: notesTable.updatedAt,
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
                tags: [],
            });
        }

        if (row.tags) notesMap.get(row.id).tags.push(row.tags);
    });

    return Array.from(notesMap.values());
};

interface CreateNotesProps {
    title: string;
    content: string;
    tags: string[];
    isArchived: boolean;
}

export const createNote = async ({
    title,
    content,
    tags,
    isArchived
}: CreateNotesProps) => {
    const notesSchema = notesValidateSchema;

    const formValidation = notesSchema.safeParse({
        title,
        content,
        tags,
        isArchived
    });

    if (!formValidation.success) {
        return {
            error: true,
            message:
                formValidation.error.issues[0]?.message ?? "An error occurred",
        };
    }

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: true,
            message: "You need to be logged in to create a note",
        };
    }

    try {
        const [user] = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.id, parseInt(session.user.id)));

        if (!user) {
            return {
                error: true,
                message: "Invalid user",
            };
        }

        const [newNote] = await db
            .insert(notesTable)
            .values({
                title,
                content,
                isArchived,
                userId: user.id!,
            })
            .returning();

        if (!newNote.id) throw new Error("Failed to create note");

        const noteId = newNote.id;
        const userId = user.id;

        if (tags.length > 0) {
            const tagIds = await Promise.all(
                tags.map(async (tagName) => {
                    let [tag] = await db
                        .select()
                        .from(tagsTable)
                        .where(and(eq(tagsTable.name, tagName), (eq(tagsTable.userId, userId))));

                    if (!tag) {
                        [tag] = await db
                            .insert(tagsTable)
                            .values({
                                name: tagName,
                                userId
                            })
                            .returning();
                    }

                    return tag.id;
                })
            );

            await db
                .insert(noteTagsTable)
                .values(tagIds.map((tagId) => ({ noteId, tagId })));
        }
    } catch (error) {
        console.log({ error });
        return {
            error: true,
            message: "An error occurred",
        };
    }
};

interface UpdateNotesProps {
    id: number;
    title: string;
    content: string;
    tags: string[];
    isArchived: boolean;
}

export const updateNote = async ({
    id,
    title,
    content,
    tags,
    isArchived
}: UpdateNotesProps) => {
    const notesSchema = notesValidateSchema;

    const formValidation = notesSchema.safeParse({
        title,
        content,
        tags,
        isArchived
    });

    if (!formValidation.success) {
        return {
            error: true,
            message:
                formValidation.error.issues[0]?.message ?? "An error occurred",
        };
    }

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: true,
            message: "You need to be logged in to update a note",
        };
    }

    try {
        const [user] = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.id, parseInt(session.user.id)));

        if (!user) {
            return {
                error: true,
                message: "Invalid user",
            };
        }

        const [note] = await db
            .update(notesTable)
            .set({
                title,
                content,
                isArchived,
                userId: user.id!,
                updatedAt: new Date()
            })
            .where(eq(notesTable.id, id))
            .returning();

        if (!note.id) throw new Error("Failed to update note");

        const noteId = note.id;
        const userId = user.id;

        // Fetch existing tag IDs for the note
        const existingNoteTags = await db
            .select({ tagId: noteTagsTable.tagId })
            .from(noteTagsTable)
            .where(eq(noteTagsTable.noteId, noteId));

        const existingTagIds = new Set(existingNoteTags.map((nt) => nt.tagId));

        const tagIds = await Promise.all(
            tags.map(async (tagName) => {
                let [tag] = await db
                    .select()
                    .from(tagsTable)
                    .where(and(eq(tagsTable.name, tagName), (eq(tagsTable.userId, userId))));

                if (!tag) {
                    [tag] = await db
                        .insert(tagsTable)
                        .values({
                            name: tagName,
                            userId
                        })
                        .returning();
                }

                return tag.id;
            })
        );

        
        const newTagIds = new Set(tagIds);

        // Find tag IDs that need to be removed (present in DB but not in new tags)
        const tagsToRemove = [...existingTagIds].filter((tagId) => !newTagIds.has(tagId));

        if (tagsToRemove.length > 0) {
            await db
                .delete(noteTagsTable)
                .where(
                    and(
                        eq(noteTagsTable.noteId, noteId),
                        inArray(noteTagsTable.tagId, tagsToRemove)
                    )
                )
        }

        // Insert new tag relations (prevent duplicates)
        if (newTagIds.size > 0) {
            await db
                .insert(noteTagsTable)
                .values([...newTagIds].map((tagId) => ({ noteId, tagId })))
                .onConflictDoNothing();
        }
    } catch (error) {
        console.log({ error });
        return {
            error: true,
            message: "An error occurred",
        };
    }
};