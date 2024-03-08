import { getServerSession } from "next-auth";
import Avatar from "./Avatar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex justify-center items-center gap-2">
      <Avatar image={user?.image || ""} />
      <p>{user?.name}</p>
    </div>
  );
}
