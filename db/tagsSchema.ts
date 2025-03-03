import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./schema";

export const tagsTable = pgTable("tags", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    userId: integer("user_id").references(() => usersTable.id, {
        onDelete: "cascade"
    }),
});