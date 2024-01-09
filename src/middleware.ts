import { NextResponse, NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  console.log("middleware", request.url);
  
  //return NextResponse.redirect(new URL('/home', request.url))
}


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
