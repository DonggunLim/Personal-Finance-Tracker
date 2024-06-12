import { NextContext, NextRequest, NextResponse } from "next/server";

export interface MiddlewareResponse<D> {
  pass: boolean;
  response?: NextResponse;
  data?: D;
}

export type MiddlewareFunction<D> = (
  request: NextRequest,
  payload: NextContext
) => Promise<MiddlewareResponse<D>>;
