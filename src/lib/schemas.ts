import { z } from "zod";

// Common schemas
const LinkSchema = z.object({
  self: z.string().url().optional(),
  webui: z.string().optional(),
  edit: z.string().optional(),
  tinyui: z.string().optional(),
  collection: z.string().optional(),
  base: z.string().url().optional(),
  context: z.string().optional(),
}).partial();

const ExpandableSchema = z.record(z.string(), z.string().optional()).optional();

// User schema with partial validation
const UserSchema = z.object({
  type: z.string(),
  username: z.string(),
  userKey: z.string(),
  displayName: z.string(),
  profilePicture: z.object({
    path: z.string(),
    width: z.number(),
    height: z.number(),
    isDefault: z.boolean(),
  }).optional(),
  _links: z.object({
    self: z.string(),
  }).partial(),
  _expandable: z.record(z.string(), z.unknown()).optional(),
}).partial();

// Space schema with partial validation
const SpaceSchema = z.object({
  id: z.union([z.string(), z.number()]),
  key: z.string(),
  name: z.string(),
  status: z.string().optional(),
  type: z.string().optional(),
  creator: UserSchema.optional(),
  creationDate: z.string().optional(),
  lastModifier: UserSchema.optional(),
  lastModificationDate: z.string().optional(),
  _links: z.record(z.string(), z.unknown()).optional(),
  _expandable: ExpandableSchema,
}).partial();

// History schema with partial validation
const HistorySchema = z.object({
  latest: z.boolean().optional(),
  createdBy: UserSchema.optional(),
  createdDate: z.string().optional(),
  _links: z.record(z.string(), z.unknown()).optional(),
  _expandable: ExpandableSchema,
}).partial();

// Version schema with partial validation
const VersionSchema = z.object({
  by: UserSchema.optional(),
  when: z.string().optional(),
  message: z.string().optional(),
  number: z.number().optional(),
  minorEdit: z.boolean().optional(),
  hidden: z.boolean().optional(),
  _links: z.record(z.string(), z.unknown()).optional(),
  _expandable: ExpandableSchema,
}).partial();

// Ancestor schema with partial validation
const AncestorSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.string().optional(),
  title: z.string(),
  position: z.number().optional(),
  extensions: z.object({
    position: z.union([z.string(), z.number()]),
  }).optional(),
  _links: LinkSchema,
  _expandable: ExpandableSchema,
}).partial();

// Body content schema with partial validation
const BodyContentSchema = z.object({
  value: z.string(),
  representation: z.string().optional(),
  _expandable: ExpandableSchema,
});

// Body schema with partial validation
const BodySchema = z.object({
  storage: BodyContentSchema.optional(),
  view: BodyContentSchema,
  _expandable: ExpandableSchema,
});

// Main Confluence Page schema - focusing on essential fields
export const ConfluencePageSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.string(),
  title: z.string(),
  space: SpaceSchema,
  history: HistorySchema.optional(),
  version: VersionSchema.optional(),
  ancestors: z.array(AncestorSchema).optional(),
  position: z.number().optional(),
  container: SpaceSchema.optional(),
  body: BodySchema,
  extensions: z.object({
    position: z.union([z.string(), z.number()]),
  }).optional(),
  _links: LinkSchema.optional(),
  _expandable: ExpandableSchema,
});

// Type derived from the schema
export type ConfluencePage = z.infer<typeof ConfluencePageSchema>;

// Simplified schema for essential page data
export const ConfluencePageEssentialSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.string(),
  title: z.string(),
  space: z.object({
    key: z.string(),
    name: z.string(),
  }).partial(),
  body: z.object({
    storage: z.object({
      value: z.string(),
    }).partial(),
    view: z.object({
      value: z.string(),
    }),
  }),
});

export type ConfluencePageEssential = z.infer<typeof ConfluencePageEssentialSchema>;
