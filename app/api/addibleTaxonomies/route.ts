import { NextRequest, NextResponse } from 'next/server';
import { getUnregisteredTaxonomiesForUser } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');
  if (!userEmail) {
    return NextResponse.json({ error: 'userEmail is required' }, { status: 400 });
  }
  const { taxonomies } = await getUnregisteredTaxonomiesForUser(userEmail);
  return NextResponse.json(taxonomies);
}