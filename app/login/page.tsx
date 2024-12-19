import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';
import { Github, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''
const originInternal = process.env.NEXT_PUBLIC_ORIGIN_INTERNAL

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Login TDT using GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signIn('github', {
                // redirectTo: `${originInternal}${basePath}/taxonomies`
                redirectTo: '/tdt/taxonomies'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">
              <Github className="h-6 w-6 mr-2" />
              Sign in with GitHub
            </Button>
          </form>
        </CardFooter>
      </Card>
      <div className="w-full max-w-sm flex justify-end mt-4">
        <Link href="/" className="w-full max-w-[fit-content]">
          <Button variant="link" className="w-full">
            <ArrowLeft className="h-6 w-6 mr-2" />
            Return to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
