import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { AuthUser } from "@/service/user";
import { MiddlewareFunction } from "@/types/middleware";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface AuthData {
  user: AuthUser;
}

export const authMiddleware: MiddlewareFunction<AuthData> = async (
  _request,
  _payload
) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return {
      pass: false,
      response: NextResponse.json(
        {
          error: "Authentication error",
        },
        { status: 401 }
      ),
    };
  }

  return {
    pass: true,
    data: { user },
  };
};
