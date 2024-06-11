import { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  console.log(`middleware in ${request.url}`);
}

export const config = { matcher: ["/", "/report"] };
