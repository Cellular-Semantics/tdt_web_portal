import { NextRequest, NextResponse } from 'next/server';
import { getTaxonomies } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { search = '', offset = 0 } = Object.fromEntries(req.nextUrl.searchParams);
  const { taxonomies } = await getTaxonomies(search as string, Number(offset));
  return NextResponse.json(taxonomies);
}