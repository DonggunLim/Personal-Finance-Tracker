import { NextContext } from "./middleware";
import { NextRequest } from "next/server";

type NextParams = { [key: string]: string };

declare module "next/server" {
  interface NextRequest {
    data?: any;
  }
}

declare module "next/server" {
  interface NextContext {
    params?: NextParams;
  }
}
