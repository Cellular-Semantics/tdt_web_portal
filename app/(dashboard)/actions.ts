'use server';

import { deleteUserTaxonomy } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// export async function deleteTaxonomy(formData: FormData) {
//   let email = Number(formData.get('email'));
//   let id = Number(formData.get('taxon_id'));
//   await deleteUserTaxonomy(id);
//   revalidatePath('/');
// }
