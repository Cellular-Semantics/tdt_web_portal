import { NextRequest, NextResponse } from 'next/server';
import { deleteUserTaxonomy } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { userEmail, taxonomyId } = await req.json();
  await deleteUserTaxonomy(userEmail, taxonomyId);
  return NextResponse.json({ message: 'Taxonomy deleted successfully' });
}