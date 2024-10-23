import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core";

export const mapsTable = pgTable("maps", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }),
  thumbnail: varchar({ length: 255 }),
});
export const mapsRelations = relations(mapsTable, ({ many }) => ({
    finishes: many(finishesTable),
}));

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
});
export const usersRelations = relations(usersTable, ({ many }) => ({
    finishes: many(finishesTable),
}));

export const finishesTable = pgTable("finishes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    mapId: integer().notNull().references(() => mapsTable.id),
    userId: integer(),
    clip: varchar({ length: 255 }).notNull(),
    date: date().notNull(),
});
export const finishesRelation = relations(finishesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [finishesTable.userId],
        references: [usersTable.id],
    }),
    map: one(mapsTable, {
        fields: [finishesTable.mapId],
        references: [mapsTable.id],
    }),
}))