import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { notesTable } from "./notesSchema";
import { tagsTable } from "./tagsSchema";

export const noteTagsTable = pgTable("note_tags", {
    noteId: integer("note_id").references(() => notesTable.id, { onDelete: "cascade" }).notNull(),
    tagId: integer("tag_id").references(() => tagsTable.id, { onDelete: "cascade" }).notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.noteId, table.tagId] })
}))


/**
 * HOW TO USE:
 * 

GETTING NOTES THROUGH TAG
export async function getNotesByTag(tagName: string) {
  const notes = await db
    .select({
      id: notesTable.id,
      title: notesTable.title,
      content: notesTable.content,
      createdAt: notesTable.createdAt,
    })
    .from(notesTable)
    .innerJoin(noteTagsTable, eq(notesTable.id, noteTagsTable.noteId))
    .innerJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
    .where(eq(tagsTable.name, tagName));

  return notes;
}

ADDING TAG TO NOTES
export async function addTagToNote(noteId: number, tagName: string) {
  // Check if tag already exists
  let tag = await db
    .select()
    .from(tagsTable)
    .where(eq(tagsTable.name, tagName))
    .limit(1);

  // If tag doesn't exist, create it
  if (tag.length === 0) {
    const [newTag] = await db
      .insert(tagsTable)
      .values({ name: tagName })
      .returning();

    tag = [newTag];
  }

  const tagId = tag[0].id;

  // Link tag to the note in noteTagsTable
  await db
    .insert(noteTagsTable)
    .values({ noteId, tagId })
    .onConflictDoNothing(); // Avoid duplicate entries

  return { message: `Tag '${tagName}' added to note ${noteId}.` };
}
 */