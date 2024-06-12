import { getRecordByDate } from "@/service/record";
import { NextContext, NextRequest, NextResponse } from "next/server";
import { handleRequest } from "@/middlewares/handleRequest";
import { authMiddleware } from "@/middlewares/auth";

export async function GET(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForGetRecordByPeriod, [
    authMiddleware,
  ]);
}

const handlerForGetRecordByPeriod = async (
  request: NextRequest,
  context: NextContext
) => {
  const dateRange = context.params?.date || "";
  const [startDate, endDate] = dateRange.split("~");

  if (!startDate || !endDate) {
    return NextResponse.json(
      {
        error: `Invaild eate range format. startDate : ${startDate}, endDate : ${endDate}`,
      },
      { status: 400 }
    );
  }

  const user = request.data.user;
  const response = await getRecordByDate(user.id, startDate, endDate);
  return NextResponse.json(response);
};
