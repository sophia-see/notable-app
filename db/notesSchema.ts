import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";

export const notesTable = pgTable("notes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => usersTable.id, {
    onDelete: "cascade"
  }),
  title: varchar("title", { length: 100 }).notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isArchived: boolean("is_archived").default(false).notNull(),
});