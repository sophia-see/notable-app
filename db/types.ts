import { InferSelectModel } from "drizzle-orm";
import { notesTable } from "./schema";

export type NoteType = InferSelectModel<typeof notesTable> & {
    tags: string[];
};