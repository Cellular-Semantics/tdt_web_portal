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

export default async function CatalogPage(){
    const { taxonomies, totalTaxonomies } = await getPublicTaxonomies(
        Number(0)
    );
    return (
        <Card>
        <CardHeader>
          <CardTitle>Taxonomies Catalog</CardTitle>
          <p></p>
          <p></p>
          <CardDescription>
          Explore {totalTaxonomies} publicly available BRAIN-BICAN taxonomies. 
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
    // return (
    //     <section className="flex flex-col items-center justify-center px-4">
    //         <h1 className="text-3xl font-bold mb-6">Taxonomies Catalog</h1>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {taxonomies.map((taxonomy) => (
    //                 <Card key={taxonomy.id} className="max-w-[400px]">
    //                     <CardHeader className="flex gap-3">
    //                         <h2>{taxonomy.title}</h2>
    //                     </CardHeader>
    //                     <CardBody>
    //                         {taxonomy.description && (
    //                             <p>
    //                                 {taxonomy.description.length > 250
    //                                     ? `${taxonomy.description.substring(0, 250)}...`
    //                                     : taxonomy.description}
    //                             </p>
    //                         )}
    //                         <p><strong>Repo URL:</strong> <a href={taxonomy.repo_url}>{taxonomy.repo_url}</a></p>
    //                         {taxonomy.author_orcid && <p><strong>Author ORCID:</strong> {taxonomy.author_orcid}</p>}
    //                         {taxonomy.doc_url && (
    //                             <p>
    //                                 <strong>Document URL:</strong> 
    //                                 <a href={taxonomy.doc_url}>
    //                                     <i className="icon-doc-url"></i> {taxonomy.doc_url}
    //                                 </a>
    //                             </p>
    //                         )}
    //                         {taxonomy.purl && <p><strong>PURL:</strong> <a href={taxonomy.purl}>{taxonomy.purl}</a></p>}
    //                     </CardBody>
    //                     <CardFooter>
    //                         {/* Add any footer content if needed */}
    //                     </CardFooter>
    //                 </Card>
    //             ))}
    //         </div>
    //     </section>
    // );
};   


// const CatalogPage: React.FC<CatalogPageProps> = ({ taxonomies }) => {
//   return (
//     <div className="catalog-page">
//       {taxonomies.map((taxonomy) => (
//         <div key={taxonomy.id} className="card">
//           <h2>{taxonomy.title}</h2>
//           <p>{taxonomy.decription}</p>
//           <p><strong>Repo URL:</strong> <a href={taxonomy.repo_url}>{taxonomy.repo_url}</a></p>
//           <p><strong>Author ORCID:</strong> {taxonomy.author_orcid}</p>
//           <p><strong>Document URL:</strong> <a href={taxonomy.doc_url}>{taxonomy.doc_url}</a></p>
//           <p><strong>PURL:</strong> <a href={taxonomy.purl}>{taxonomy.purl}</a></p>
//           <p><strong>Last Edited:</strong> {taxonomy.last_edited}</p>
//           <p><strong>Active:</strong> {taxonomy.active ? 'Yes' : 'No'}</p>
//           <p><strong>Public:</strong> {taxonomy.public ? 'Yes' : 'No'}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const taxonomies = await getPublicTaxonomies();
//   return {
//     props: {
//       taxonomies,
//     },
//   };
// };

// export default CatalogPage;