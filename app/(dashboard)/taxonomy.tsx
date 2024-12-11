import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectTaxonomy } from '@/lib/db';
import { deleteProduct } from './actions';

export function Taxonomy({ taxonomy }: { taxonomy: SelectTaxonomy }) {
  const status = taxonomy.is_public == true ? 'public' : 'private'; 

  const handleExploreClick = () => {
    // const baseUrl = process.env.TDT_API_URL;
    const baseUrl = process.env.NEXT_PUBLIC_TDT_API_URL;
    const repoUrl = taxonomy.repo_url;
    const repoName = repoUrl.split('/').pop();
    const fullUrl = `${baseUrl}/browser/${repoName}/annotation`;
    console.log(fullUrl);
    window.open(fullUrl, '_blank');
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
      {taxonomy.title}
      </TableCell>
      <TableCell className="font-medium">
        <a href={taxonomy.repo_url} target="_blank" rel="noopener noreferrer">
          {taxonomy.repo_url}
        </a>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Button variant="default" onClick={handleExploreClick}>Explore</Button>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
