'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Taxonomy } from './taxonomy';
import { SelectTaxonomy } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TaxonomiesTable({
  taxonomies,
  offset,
  totalTaxonomies
}: {
  taxonomies: SelectTaxonomy[];
  offset: number;
  totalTaxonomies: number;
}) {
  let router = useRouter();
  let taxonomiesPerPage = 10;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Taxonomies</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[500px] sm:table-cell">
                Title
              </TableHead>
              <TableHead>GitHub Repository</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Explore</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxonomies.map((taxonomy) => (
              <Taxonomy key={taxonomy.id} taxonomy={taxonomy} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {offset} - {Math.max(offset + taxonomiesPerPage, totalTaxonomies)}
              {/* {Math.max(0, Math.min(offset - taxonomiesPerPage, totalTaxonomies) + 1)}-{offset} */}
            </strong>{' '}
            of <strong>{totalTaxonomies}</strong> taxonomies
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset < taxonomiesPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + taxonomiesPerPage > totalTaxonomies}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
