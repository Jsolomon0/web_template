import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

function isAuthorized(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) {
    return false;
  }
  const base64 = header.slice("Basic ".length);
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [user, password] = decoded.split(":");
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function proxy(request: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return new NextResponse(
      "ADMIN_PASSWORD is not set. Set it to enable the admin UI.",
      { status: 403 },
    );
  }
  if (!isAuthorized(request)) {
    return unauthorized();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
