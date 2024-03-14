import { getServerSession } from "next-auth";
import Avatar from "./Avatar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex justify-center items-center gap-2 px-2 py-1">
      <Avatar image={user?.image || ""} />
      <div className="font-medium text-xs">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
