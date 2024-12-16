// import { handlers } from '@/lib/auth';
// export const { GET, POST } = handlers;
// see basePath fix https://github.com/nextauthjs/next-auth/discussions/12160

import { NextRequest } from 'next/server'

import { handlers } from '@/lib/auth'

const basePath = process.env.NEXT_PUBLIC_NEXT_CONFIG_BASE_PATH ?? ''

async function rewriteRequest(request: NextRequest) {
    let { protocol, host, pathname } = request.nextUrl;

    const headers = await request.headers
    // Host rewrite adopted from next-auth/packages/core/src/lib/utils/env.ts:createActionURL
    const detectedHost = headers.get("x-forwarded-host") ?? host
    const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol
    const _protocol = detectedProtocol.endsWith(":")
        ? detectedProtocol
        : detectedProtocol + ":";
    const url = new URL(`${_protocol}//${detectedHost}${basePath}${pathname}${request.nextUrl.search}`)

    return new NextRequest(url, request)
}

export async function GET(request: NextRequest) {
    return await handlers.GET(await rewriteRequest(request))
}

export async function POST(request: NextRequest) {
    return await handlers.POST(await rewriteRequest(request))
}