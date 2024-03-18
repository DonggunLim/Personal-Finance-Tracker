import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";
import Records from "@/components/Records";
import UserSetForm from "@/components/UserSetForm";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 grid grid-cols-[2fr_7fr_3fr] gap-16">
      <div className="mt-12"></div>
      <div className="mt-12">
        <ExpenseForm />
        <Records />
      </div>
      <div className="mt-12">
        <UserSetForm />
      </div>
    </main>
  );
}
