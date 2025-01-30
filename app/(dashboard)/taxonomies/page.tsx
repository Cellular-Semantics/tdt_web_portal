import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaxonomiesTable } from '../taxonomies-table';
import { getUserTaxonomies } from '@/lib/db';
import { auth } from '@/lib/auth';
import AddTaxonModal from 'components/modal/add_taxonomy_modal';

export default async function TaxonomiesPage(
  props: {
    searchParams: Promise<{ offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const offset = searchParams.offset ?? 0;
  const session = await auth();
  
  const userEmail = session?.user?.email ?? '';
  const userName = session?.user?.username ?? '';
  const { taxonomies, newOffset, totalTaxonomies } = await getUserTaxonomies(
    userEmail,
    Number(offset)
  );
  // console.log(JSON.stringify(session));
  // console.log(taxonomies);
  
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <AddTaxonModal userEmail={userEmail} />
        </div>
      </div>
      <TabsContent value="all">
        <TaxonomiesTable
          taxonomies={taxonomies}
          user_email={userEmail}
          user_name={userName}
          offset={newOffset ?? 0}
          totalTaxonomies={totalTaxonomies}
        />
      </TabsContent>
    </Tabs>
  );
}