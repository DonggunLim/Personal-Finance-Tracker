"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleSigninButton() {
  return (
    <button
      className="flex justify-center items-center border-2 border-black 
    w-60 p-2 rounded-md"
      onClick={() => {
        signIn("google", { callbackUrl: "/" });
      }}
    >
      <Image
        alt="google-logo"
        src="/images/googleLogo.svg"
        width={24}
        height={24}
      />
      <p className="font-bold">Google</p>
    </button>
  );
}
