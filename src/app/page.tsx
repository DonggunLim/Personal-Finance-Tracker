import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="max-w-2xl mx-auto">
      <ExpenseForm />
    </main>
  );
}
