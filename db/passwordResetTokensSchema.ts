import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";

export const passwordResetTokensTable = pgTable("passwordResetTokens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => usersTable.id, {
    onDelete: "cascade"
  }).unique(),
  token: text("password"),
  tokenExpiry: timestamp("token_expiry")
});