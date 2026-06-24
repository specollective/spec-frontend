import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const host = req.headers.get('host');
  const wwwRegex = /^www\./;
  // This redirect will only take effect on a production website (on a non-localhost domain)
  if (host && wwwRegex.test(host) && !host.includes('localhost')) {
    const newHost = host.replace(wwwRegex, '');
    return NextResponse.redirect(`https://${newHost}${req.nextUrl.pathname}`, 301);
  }

  const { pathname } = req.nextUrl;
  if (pathname === '/glqf' || pathname.startsWith('/glqf/')) {
    return basicAuth(req, {
      realm: 'glqf',
      expectedUser: process.env.GLQF_BASIC_AUTH_USER,
      expectedPass: process.env.GLQF_BASIC_AUTH_PASS,
    });
  }
  if (pathname === '/giee' || pathname.startsWith('/giee/')) {
    return basicAuth(req, {
      realm: 'giee',
      expectedUser: process.env.GIEE_BASIC_AUTH_USER,
      expectedPass: process.env.GIEE_BASIC_AUTH_PASS,
    });
  }

  return NextResponse.next();
}

function basicAuth(
  req: NextRequest,
  { realm, expectedUser, expectedPass }: {
    realm: string;
    expectedUser?: string;
    expectedPass?: string;
  },
) {
  if (!expectedUser || !expectedPass) {
    return new NextResponse('Basic auth not configured', { status: 503 });
  }

  const header = req.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(':');
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${realm}"` },
  });
}
