import { NextRequest, NextResponse } from 'next/server';
import { addUserTaxonomy } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { userEmail, taxonomyId } = await req.json();
  await addUserTaxonomy(userEmail, taxonomyId);
  return NextResponse.json({ message: 'Taxonomy added successfully' });
}