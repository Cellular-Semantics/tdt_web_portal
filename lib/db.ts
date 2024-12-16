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
import { count, eq, ilike, sql, and, or, notInArray } from 'drizzle-orm';
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
  h5ad_url: text('h5ad_url'),
  last_edited: timestamp('last_edited').notNull(),
  active: boolean('active').notNull(),
  is_public: boolean('is_public').notNull()
});

export const user_taxonomies = pgTable('user_taxonomies', {
  id: serial('id').primaryKey(),
  user_email: text('user_email').notNull(),
  taxonomy_id: integer('taxonomy_id').notNull().references(() => taxonomies.id),
});


export type SelectTaxonomy = typeof taxonomies.$inferSelect;

export async function getTaxonomies(
  search: string,
  offset: number
): Promise<{
  taxonomies: SelectTaxonomy[];
  newOffset: number | null;
  totalTaxonomies: number;
}> {

  if (offset === null) {
    return { taxonomies: [], newOffset: null, totalTaxonomies: 0 };
  }

  let totalTaxonomies = await db.select({ count: count() }).from(taxonomies).where(eq(taxonomies.active, true));
  let moreTaxonomies = await db.select().from(taxonomies).where(eq(taxonomies.active, true)).offset(offset);
  let newOffset = moreTaxonomies.length >= 5 ? offset + 5 : null;

  return {
    taxonomies: moreTaxonomies,
    newOffset,
    totalTaxonomies: totalTaxonomies[0].count
  };
}

export async function getPublicTaxonomies(
  search: string,
  offset: number
): Promise<{
  taxonomies: SelectTaxonomy[];
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
              or(
                ilike(taxonomies.title, `%${search}%`),
                ilike(taxonomies.description, `%${search}%`)
              ),
              eq(taxonomies.active, true),
              eq(taxonomies.is_public, true)
            )
          )
          .limit(1000),
        totalTaxonomies: -1
      };
    }

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

  const sq = db.select().from(user_taxonomies).where(eq(user_taxonomies.user_email, `${userEmail}`)).as('sq');

  let totalTaxonomies = await db
                          .select({ count: count() })
                          .from(taxonomies)
                          .innerJoin(sq, eq(sq.taxonomy_id, taxonomies.id))
                          .where(eq(taxonomies.active, true));

  let moreTaxonomies = await db
                          .select()
                          .from(taxonomies)
                          .innerJoin(sq, eq(sq.taxonomy_id, taxonomies.id))
                          .where(eq(taxonomies.active, true))
                          .limit(10)
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
    h5ad_url: result.taxonomies.h5ad_url,
    last_edited: result.taxonomies.last_edited,
    active: result.taxonomies.active,
    is_public: result.taxonomies.is_public,
  }));

  const newOffset = flattenedTaxonomies.length >= 10 ? offset + 10 : null;

  return {
    taxonomies: flattenedTaxonomies,
    newOffset,
    totalTaxonomies: totalTaxonomies[0].count
  };
}

/**
 * List of taxonomies that the user can add (all taxonomies - user taxonomies).
 * @param userEmail current user
 * @returns all taxonomies - user taxonomies
 */
export async function getUnregisteredTaxonomiesForUser(
  userEmail: string
): Promise<{
  taxonomies: SelectTaxonomy[];
}> {
  // const sq = db.select().from(user_taxonomies).where(eq(user_taxonomies.user_email, `${userEmail}`)).as('sq');
  const registeredTaxonomyIds = await db
    .select({ taxonomyId: user_taxonomies.taxonomy_id })
    .from(user_taxonomies)
    .where(eq(user_taxonomies.user_email, userEmail));

  const unregisteredTaxonomies = await db
    .select()
    .from(taxonomies)
    .where(notInArray(taxonomies.id, registeredTaxonomyIds.map(row => row.taxonomyId)));

  return {
    taxonomies: unregisteredTaxonomies
  };
}

export async function addUserTaxonomy(userEmail: string, taxonomyId: number) {
  await db.insert(user_taxonomies).values({
    user_email: userEmail,
    taxonomy_id: taxonomyId,
  });
}

export async function deleteUserTaxonomy(userEmail: string, taxonomyId: number) {
  await db
    .delete(user_taxonomies)
    .where(
      and(
        eq(user_taxonomies.user_email, userEmail),
        eq(user_taxonomies.taxonomy_id, taxonomyId)
      )
    );
}

