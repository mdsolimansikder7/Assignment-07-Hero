import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    const redirectTo = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${redirectTo}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/product-details/:path*", "/profile/:path*"],
};