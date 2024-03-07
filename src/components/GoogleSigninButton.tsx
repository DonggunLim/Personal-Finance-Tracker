"use client";

import { signIn } from "next-auth/react";

export default function GoogleSigninButton() {
  return (
    <div>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        구글 계정으로 로그인
      </button>
    </div>
  );
}
