import { getServerSession } from "next-auth";
import { getRecordByDate } from "@/service/record";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type Props = {
  params: { date: string };
};

export async function GET(_: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const [startDate, endDate] = params.date.split("~");

  return getRecordByDate(user.id, startDate, endDate) //
    .then((res) => NextResponse.json(res));
}
