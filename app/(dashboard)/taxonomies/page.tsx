import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaxonomiesTable } from '../taxonomies-table';
import { getUserTaxonomies } from '@/lib/db';
import { auth } from '@/lib/auth'

export default async function TaxonomiesPage(
  props: {
    searchParams: Promise<{ offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const offset = searchParams.offset ?? 0;
  const session = await auth()
  
  const userEmail = session?.user?.email ?? '';
  const { taxonomies, newOffset, totalTaxonomies } = await getUserTaxonomies(
    userEmail,
    Number(offset)
  );
  console.log(session)
  console.log(taxonomies)
  
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Taxonomy
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <TaxonomiesTable
          taxonomies={taxonomies}
          offset={newOffset ?? 0}
          totalTaxonomies={totalTaxonomies}
        />
      </TabsContent>
    </Tabs>
  );
}
