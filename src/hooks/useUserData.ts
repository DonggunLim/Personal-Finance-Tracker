"use client";

import { SanityUser } from "@/types/user";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [userData, setUserdata] = useState<SanityUser>({
    id: "",
    name: "",
    email: "",
    image: "",
    fixedIncome: "",
    dailySpendingLimit: "",
  });
  const manageUserData = (data: SanityUser) => setUserdata(data);

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setUserdata(res[0]))
      .catch((error) =>
        console.error("There was an error fetching user data!", error),
      );
  }, []);

  return { userData, manageUserData };
};
