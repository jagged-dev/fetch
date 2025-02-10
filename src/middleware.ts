import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const cookieStore = await cookies();
    const authorized = cookieStore.get("authorized")?.value === "true";

    if (authorized && path.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!authorized && path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
