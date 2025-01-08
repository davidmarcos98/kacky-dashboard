import { relations } from "drizzle-orm";
import { text, integer, timestamp, pgEnum, pgTable, varchar, date, doublePrecision } from "drizzle-orm/pg-core";

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
    twitch: varchar({ length: 255 }).default(""),
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

export const randomMapsTable = pgTable("random_maps", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    mapId: integer(),
    player: varchar({ length: 255 }).notNull(),
    datetime: timestamp().notNull().defaultNow(),
    medal: text(),
    timeSpent: integer(),
    mapper: text(),
    styles: text(),
    skipType: text(),
    atTime: integer(),
    finalTime: integer(),
    currentMedalCount: integer(),
    freeSkipCount: integer(),
    pbBeforeFin: integer(),
    mapTitle: text(),
    currentGoldCount: integer(),
})