import Link from "next/link";
import SignOutButton from "./Buttons/SignOutButton";
import UserInfo from "./UserInfo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-12 w-full bg-white shadow-sm">
      <div className="m-auto flex h-full max-w-6xl items-center justify-end px-4">
        <ul className="flex gap-2">
          <li className="flex cursor-pointer items-center text-sm font-bold hover:text-purple-400">
            <Link href="/">홈</Link>
          </li>
          <li className="flex cursor-pointer items-center text-sm font-bold hover:text-purple-400">
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
