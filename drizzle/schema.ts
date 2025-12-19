import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Stripe payment fields
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "canceled", "past_due", "trialing", "incomplete"]),
  subscriptionPlan: varchar("subscriptionPlan", { length: 64 }),
  
  // Reading tracking
  readingStreak: int("readingStreak").default(0).notNull(),
  lastReadingDate: timestamp("lastReadingDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tarot cards table - stores all 78 cards with their meanings and interpretations
 */
export const cards = mysqlTable("cards", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  number: int("number").notNull(), // 0-21 for Major Arcana, 1-14 for Minor Arcana
  suit: mysqlEnum("suit", ["major", "wands", "cups", "swords", "pentacles"]).notNull(),
  arcana: mysqlEnum("arcana", ["major", "minor"]).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  meaning: text("meaning").notNull(), // Core meaning of the card
  uprightInterpretation: text("uprightInterpretation").notNull(),
  reversedInterpretation: text("reversedInterpretation").notNull(),
  symbolism: text("symbolism").notNull(), // Symbolic meanings
  keywords: json("keywords").$type<string[]>().notNull(), // Array of keywords
  themes: json("themes").$type<string[]>().notNull(), // Thematic categories
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;

/**
 * Readings table - stores user tarot readings
 */
export const readings = mysqlTable("readings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  spreadType: mysqlEnum("spreadType", [
    "daily",
    "three-card",
    "love",
    "career",
    "celtic-cross",
    "custom"
  ]).notNull(),
  question: text("question"), // User's question or intention
  cardIds: json("cardIds").$type<number[]>().notNull(), // Array of card IDs in the reading
  isReversed: json("isReversed").$type<boolean[]>().notNull(), // Array of reversal flags
  interpretation: text("interpretation"), // AI-generated interpretation
  isFavorite: boolean("isFavorite").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reading = typeof readings.$inferSelect;
export type InsertReading = typeof readings.$inferInsert;

/**
 * Journals table - stores user notes and reflections on readings
 */
export const journals = mysqlTable("journals", {
  id: int("id").autoincrement().primaryKey(),
  readingId: int("readingId").notNull().references(() => readings.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  notes: text("notes"), // User's personal notes
  reflection: text("reflection"), // User's reflection on the reading
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Journal = typeof journals.$inferSelect;
export type InsertJournal = typeof journals.$inferInsert;

/**
 * Payment history table - stores Stripe payment records
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).notNull().unique(),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }),
  amount: int("amount").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).notNull(),
  productId: varchar("productId", { length: 100 }), // Reference to products.ts
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
