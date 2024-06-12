import { MiddlewareFunction } from "@/types/middleware";
import { NextContext, NextRequest, NextResponse } from "next/server";

export async function handleRequest<P, D>(
  request: NextRequest,
  context: NextContext,
  handler: (
    request: NextRequest,
    context: NextContext
  ) => Promise<NextResponse>,
  middlewares: MiddlewareFunction<D>[]
) {
  for (const middleware of middlewares) {
    const result = await middleware(request, context);

    if (!result.pass) {
      return result.response;
    } else if (result.data) {
      if (!request.data) {
        request.data = {};
      }

      request.data = {
        ...request.data,
        ...result.data,
      };
    }
  }

  return handler(request, context);
}
