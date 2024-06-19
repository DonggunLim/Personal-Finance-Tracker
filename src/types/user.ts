export type SanityUser = AuthUser & {
  fixedIncome: string;
  dailySpendingLimit: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image: string;
};
