import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  const wwwRegex = /^www\./;
  // This redirect will only take effect on a production website (on a non-localhost domain)
  if (host && wwwRegex.test(host) && !host.includes('localhost')) {
    const newHost = host.replace(wwwRegex, '');
    return NextResponse.redirect(`https://${newHost}${req.nextUrl.pathname}`, 301);
  }

  return NextResponse.next();
}
