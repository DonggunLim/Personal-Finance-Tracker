import { getRecordByDate } from "@/service/record";
import { NextContext, NextRequest, NextResponse } from "next/server";
import { getStartEndDate } from "@/utilities/common";
import { handleRequest } from "@/middlewares/handleRequest";
import { authMiddleware } from "@/middlewares/auth";

export async function GET(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForGetRecordsByDate, [
    authMiddleware,
  ]);
}

const handlerForGetRecordsByDate = async (
  request: NextRequest,
  context: NextContext
) => {
  const user = request.data.user;
  const date = context.params?.date || "";
  const { startDate, endDate } = getStartEndDate(date);

  const res = await getRecordByDate(user.id, startDate, endDate);
  return NextResponse.json(res);
};
