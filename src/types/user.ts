import { AuthUser } from "@/service/user";

export type SanityUser = AuthUser & {
  fixedIncome: string;
  dailySpendingLimit: string;
};
