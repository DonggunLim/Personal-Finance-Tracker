import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import MainPage from "@/components/MainPage";
import { convertDateToYYYYMMDD, getStartEndDate } from "@/utilities/common";
import Header from "@/components/Header";
import { getRecordByDate } from "@/service/record";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const { data, cachedKey } = await getInitialRecords(user.id);

  return (
    <>
      <Header />
      <MainPage initialRecords={data} cachedKey={cachedKey} />
    </>
  );
}

async function getInitialRecords(userId: string) {
  const date: string = convertDateToYYYYMMDD(new Date());

  const { startDate, endDate } = getStartEndDate(date);
  const data = await getRecordByDate(userId, startDate, endDate);

  return { data, cachedKey: date };
}
