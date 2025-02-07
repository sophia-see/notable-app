import { z } from "zod";

export const notesValidateSchema = z.object({
    title: z.string().min(1, "Title must have at least 1 character").max(100, "Title can only have at most 100 characters"),
    content: z.string(),
    isArchived: z.boolean().default(false).optional(),
    tags: z.string().array().optional()
})