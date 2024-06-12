import { NextContext, NextRequest, NextResponse } from "next/server";
import {
  AddRecord,
  deleteReocrd,
  getRecord,
  updateRecord,
} from "@/service/record";
import { handleRequest } from "@/middlewares/handleRequest";
import { authMiddleware } from "@/middlewares/auth";

export async function POST(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForAddRecord, [authMiddleware]);
}

export async function GET(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForGetAllRecord, [
    authMiddleware,
  ]);
}

export async function PUT(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForUpdateRecord, [
    authMiddleware,
  ]);
}

export async function DELETE(request: NextRequest, context: NextContext) {
  return handleRequest(request, context, handlerForDeleteRecord, [
    authMiddleware,
  ]);
}

const handlerForAddRecord = async (request: NextRequest) => {
  const formData = await request.json();
  const user = request.data.user;
  const response = await AddRecord(user.id, formData);

  return NextResponse.json(response);
};

const handlerForGetAllRecord = async (request: NextRequest) => {
  const user = request.data.user;
  const response = await getRecord(user.id);
  return NextResponse.json(response);
};

const handlerForUpdateRecord = async (request: NextRequest) => {
  const formData = await request.json();
  const response = await updateRecord(formData._id, formData);
  return NextResponse.json(response);
};

const handlerForDeleteRecord = async (request: NextRequest) => {
  const { id } = await request.json();
  const response = await deleteReocrd(id);
  return NextResponse.json(response);
};
