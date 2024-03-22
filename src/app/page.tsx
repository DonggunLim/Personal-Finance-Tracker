import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import MainPage from "@/components/MainPage";
import { convertDateToYYYYMMDD } from "@/utilities/common";
import { headers } from "next/headers";
import Header from "@/components/Header";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const { data, cachedKey } = await getInitialRecords();

  return (
    <>
      <Header />
      <MainPage initialRecords={data} cachedKey={cachedKey} />
    </>
  );
}

async function getInitialRecords() {
  const date: string = convertDateToYYYYMMDD(new Date());
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/records/${date}`,
    {
      method: "GET",
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("failed to initialRecords");
  }

  const data = await res.json();
  return { data, cachedKey: date };
}
