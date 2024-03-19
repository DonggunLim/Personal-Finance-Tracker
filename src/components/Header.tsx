import Link from "next/link";
import SignOutButton from "./Buttons/SignOutButton";
import UserInfo from "./UserInfo";

export default function Header() {
  return (
    <header className="w-full h-12 bg-white sticky top-0 shadow-sm ">
      <div className="max-w-6xl h-full m-auto px-4 flex items-center justify-end">
        <ul className="flex gap-2">
          <li className="text-sm font-bold flex items-center hover:text-purple-400 cursor-pointer">
            <Link href="/">홈</Link>
          </li>
          <li className="text-sm font-bold flex items-center hover:text-purple-400 cursor-pointer">
            <Link href="/report">리포트</Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
        <UserInfo />
      </div>
    </header>
  );
}
