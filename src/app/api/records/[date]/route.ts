import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { getRecordByDate } from "@/service/record";
import { NextRequest, NextResponse } from "next/server";
import { getStartEndDate } from "@/utilities/common";

type Props = {
  params: { date: string };
};

export async function GET(_: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    throw new Response("Authentication error", { status: 401 });
  }

  const date = params.date;
  const { startDate, endDate } = getStartEndDate(date);

  return getRecordByDate(user.id, startDate, endDate) //
    .then((res) => NextResponse.json(res));
}
