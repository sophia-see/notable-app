import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const tagsTable = pgTable("tags", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).unique().notNull(),
});