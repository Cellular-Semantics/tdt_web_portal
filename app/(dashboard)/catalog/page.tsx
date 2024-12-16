import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';
import { TaxonomyCard } from '../taxonomy-card';
import { getPublicTaxonomies } from '@/lib/db';

export default async function CatalogPage(
    props: {
        searchParams: Promise<{ q: string; offset: string }>;
      }
){
    const searchParams = await props.searchParams;
    const search = searchParams.q ?? '';
    const { taxonomies, totalTaxonomies } = await getPublicTaxonomies(search, 
        Number(0)
    );
    const description = totalTaxonomies >= 0 
        ? `Explore ${totalTaxonomies} publicly available BRAIN-BICAN taxonomies.` 
        : `'${search}' search results`;
    return (
        <Card>
        <CardHeader>
          <CardTitle>Taxonomies Catalog</CardTitle>
          <p></p>
          <p></p>
          <CardDescription>
          {description} 
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taxonomies.map((taxonomy) => (
                <TaxonomyCard key={taxonomy.id} taxonomy={taxonomy} />
              ))}
            </div>
        </CardContent>
      </Card>
);

};   
