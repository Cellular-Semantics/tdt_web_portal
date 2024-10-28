import 'server-only';

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
  boolean
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, sql, and, or } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

console.log("connection string: ", process.env.POSTGRES_URL);
const connection = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(connection);

export const taxonomies = pgTable('taxonomies', {
  id: serial('id').primaryKey(),
  repo_url: text('repo_url').notNull(),
  taxon_id: text('taxon_id'),
  title: text('title').notNull(),
  description: text('description'),
  author_orcid: text('author_orcid'),
  doc_url: text('doc_url'),
  purl: text('purl'),
  last_edited: timestamp('last_edited').notNull(),
  active: boolean('active').notNull(),
  is_public: boolean('is_public').notNull()
});

export const user_taxonomies = pgTable('user_taxonomies', {
  id: serial('id').primaryKey(),
  user_email: text('user_email').notNull(),
  taxonomy_id: integer('taxonomy_id').notNull().references(() => taxonomies.id),
});

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectTaxonomy = typeof taxonomies.$inferSelect;
export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getTaxonomies(
  search: string,
  offset: number
): Promise<{
  taxonomies: SelectTaxonomy[];
  newOffset: number | null;
  totalTaxonomies: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      taxonomies: await db
        .select()
        .from(taxonomies)
        .where(
          and(
            ilike(taxonomies.title, `%${search}%`),
            eq(taxonomies.active, true)
          )
        )
        .limit(1000),
      newOffset: null,
      totalTaxonomies: 0
    };
  }

  if (offset === null) {
    return { taxonomies: [], newOffset: null, totalTaxonomies: 0 };
  }

  let totalTaxonomies = await db.select({ count: count() }).from(taxonomies).where(eq(taxonomies.active, true));
  let moreTaxonomies = await db.select().from(taxonomies).where(eq(taxonomies.active, true)).limit(5).offset(offset);
  let newOffset = moreTaxonomies.length >= 5 ? offset + 5 : null;

  return {
    taxonomies: moreTaxonomies,
    newOffset,
    totalTaxonomies: totalTaxonomies[0].count
  };
}

export async function getPublicTaxonomies(
  offset: number
): Promise<{
  taxonomies: SelectTaxonomy[];
  totalTaxonomies: number;
}> {

  if (offset === null) {
    return { taxonomies: [], totalTaxonomies: 0 };
  }

  let totalTaxonomies = await db
                            .select({ count: count() })
                            .from(taxonomies)
                            .where(
                              and(
                                eq(taxonomies.active, true),
                                eq(taxonomies.is_public, true)
                              )
                            );
  let moreTaxonomies = await db
                          .select()
                          .from(taxonomies)
                          .where(
                            and(
                              eq(taxonomies.active, true),
                              eq(taxonomies.is_public, true)
                            )
                          );

  return {
    taxonomies: moreTaxonomies,
    totalTaxonomies: totalTaxonomies[0].count
  };
}

export async function getUserTaxonomies(
  userEmail: string,
  offset: number
): Promise<{
  taxonomies: SelectTaxonomy[];
  newOffset: number | null;
  totalTaxonomies: number;
}> {

  if (offset === null) {
    return { taxonomies: [], newOffset: null, totalTaxonomies: 0 };
  }

  const sq = db.select().from(user_taxonomies).where(eq(user_taxonomies.user_email, `%${userEmail}%`)).as('sq');

  let totalTaxonomies = await db
                          .select({ count: count() })
                          .from(taxonomies)
                          .where(eq(taxonomies.active, true));

  let moreTaxonomies = await db
                          .select()
                          .from(taxonomies)
                          .innerJoin(sq, eq(sq.taxonomy_id, taxonomies.id))
                          .where(eq(taxonomies.active, true))
                          .limit(5)
                          .offset(offset);
  // Flatten the result
  const flattenedTaxonomies = moreTaxonomies.map((result) => ({
    id: result.taxonomies.id,
    repo_url: result.taxonomies.repo_url,
    taxon_id: result.taxonomies.taxon_id,
    title: result.taxonomies.title,
    description: result.taxonomies.description,
    author_orcid: result.taxonomies.author_orcid,
    doc_url: result.taxonomies.doc_url,
    purl: result.taxonomies.purl,
    last_edited: result.taxonomies.last_edited,
    active: result.taxonomies.active,
    is_public: result.taxonomies.is_public,
  }));

  const newOffset = flattenedTaxonomies.length >= 5 ? offset + 5 : null;

  return {
    taxonomies: flattenedTaxonomies,
    newOffset,
    totalTaxonomies: totalTaxonomies[0].count
  };
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
