import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUser, updateUserinfo } from "@/service/user";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const data = await req.json();

  const updatedObject = { [data.title]: data.data };

  return updateUserinfo(user.id, updatedObject) //
    .then((res) => NextResponse.json(res));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  return getUser(user.id) //
    .then((res) => NextResponse.json(res));
}
