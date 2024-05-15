import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import {
  AddRecord,
  deleteReocrd,
  getRecord,
  updateRecord,
} from "@/service/record";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const formData = await req.json();

  return AddRecord(user.id, formData) //
    .then((res) => NextResponse.json(res));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  return getRecord(user.id) //
    .then((res) => NextResponse.json(res));
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const formData = await req.json();

  return updateRecord(formData._id, formData) //
    .then((res) => NextResponse.json(res));
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const { id } = await req.json();

  return deleteReocrd(id) //
    .then((res) => NextResponse.json(res));
}
