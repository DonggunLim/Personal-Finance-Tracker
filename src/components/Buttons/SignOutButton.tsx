"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="text-sm font-bold flex flex-col items-center hover:text-purple-400"
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
