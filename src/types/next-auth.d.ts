import { AuthUser } from "@/service/user";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
