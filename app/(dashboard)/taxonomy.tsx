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
import { generateToken } from '@/lib/utils';
// import { deleteProduct } from './actions';

const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''

export function Taxonomy({ taxonomy, user_email, user_name }: { taxonomy: SelectTaxonomy; user_email: string; user_name: string }) {
  const status = taxonomy.is_public == true ? 'public' : 'private'; 

  const handleExploreClick = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_TDT_API_URL;
    const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET;
    const repoUrl = taxonomy.repo_url;
    const repoName = repoUrl.split('/').pop();
    const repoOrg = repoUrl.replace(`/${repoName}`, '').split('/').pop();
    const session = { 
      name: user_name, 
      // email: user_email,
      repoOrg: repoOrg 
    };
    if (!secretKey) {
      throw new Error('NEXT_PUBLIC_TOKEN_SECRET is not defined');
    }

    // Function to set a cookie
    function setCookie(name: string, value: string, hours: number) {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    const token = await generateToken(session, secretKey);
    setCookie("tdtAuthToken", token, 12);
    // const fullUrl = `${baseUrl}/browser/${repoName}/table/annotation?token=${token}`;
    const fullUrl = `${baseUrl}/browser/${repoName}/table/annotation`;
    console.log(fullUrl);
    window.open(fullUrl, '_blank');
  };

  const handleDelete = async () => {
    console.log('Deleting taxonomy:', taxonomy.id + ' for user: ' + user_email);
    const response = await fetch(`${basePath}/api/deleteUserTaxonomy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail: user_email, taxonomyId: taxonomy.id }),
    });

    if (response.ok) {
      console.log('Taxonomy deleted successfully');
      window.location.reload(); // Refresh the page
    } else {
      console.error('Failed to delete taxonomy');
    }
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
              <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
