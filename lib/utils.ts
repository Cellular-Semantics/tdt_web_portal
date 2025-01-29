import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SignJWT } from 'jose';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Session {
  name: string;
  email?: string;
  repoOrg?: string;
}

export async function generateToken(session: Session, secretKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(key);
}
