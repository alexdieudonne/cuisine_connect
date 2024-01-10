import { NextResponse, NextRequest } from "next/server";

function validateUUIDInURL(url: string) {
  const regex = /^(http|https):\/\/[^\/]+\/[0-9a-f]{24}$/;

  const match = url.match(regex);
  return match !== null;
}

export function middleware(request: NextRequest) {
  const userData = request.cookies.get('user');
  if (!userData) {
    if (validateUUIDInURL(request.url)) return NextResponse.redirect(new URL('/signin', request.url))
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
