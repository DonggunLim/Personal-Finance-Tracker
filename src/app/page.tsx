import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ExpenseForm from "@/components/ExpenseForm";
import Records from "@/components/Records";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="max-w-2xl px-2 py-4">
        <ExpenseForm />
        <Records />
      </div>
    </main>
  );
}
