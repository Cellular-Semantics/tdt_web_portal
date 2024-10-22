import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from '../products-table';
import { getProducts } from '@/lib/db';
import { auth } from '@/lib/auth'

export default async function TaxonomiesPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const session = await auth()
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );
  return (
    <Tabs defaultValue="all">
      <div>
        {session ? (
          <p>My email is {session.user?.email}</p>
        ) : (
          <p>Session not available</p>
        )}
        </div>
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
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
