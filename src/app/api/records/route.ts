import { NextContext, NextRequest, NextResponse } from "next/server";
import {
  AddRecord,
  deleteReocrd,
  getRecord,
  updateRecord,
} from "@/service/record";
import { handleRequest } from "@/middlewares/handleRequest";
import { authMiddleware } from "@/middlewares/auth";
import { FormData } from "@/components/ExpenseFormModal";

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
  const installmentData = parseInstallment(
    formData.installment,
    formData.price,
    formData.date,
  );
  const user = request.data.user;
  const response = await AddRecord(user.id, {
    ...formData,
    installmentDetails: installmentData,
  });

  return NextResponse.json(response);
};

const handlerForGetAllRecord = async (request: NextRequest) => {
  const user = request.data.user;
  const response = await getRecord(user.id);
  return NextResponse.json(response);
};

const handlerForUpdateRecord = async (request: NextRequest) => {
  const formData = await request.json();
  const installmentData = parseInstallment(
    formData.installment,
    formData.price,
    formData.date,
  );
  const response = await updateRecord(formData._id, {
    ...formData,
    installmentDetails: installmentData,
  });
  return NextResponse.json(response);
};

const handlerForDeleteRecord = async (request: NextRequest) => {
  const { id } = await request.json();
  const response = await deleteReocrd(id);
  return NextResponse.json(response);
};

const parseInstallment = (installment: string, price: string, date: string) => {
  if (installment.length === 0) {
    return { isInstallment: false };
  } else if (installment === "일시불") {
    return { isInstallment: false };
  } else if (installment.length > 0) {
    const number = parseInt(installment.match(/(\d+)개월/)![1]);
    return {
      isInstallment: true,
      installmentPeriod: number,
      installmentAmount: Math.ceil(parseInt(price) / number),
      firstPaymentDate: date,
    };
  }
};
