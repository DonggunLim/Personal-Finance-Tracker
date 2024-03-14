import { client } from "./sanity";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export const addUser = ({ id, name, email, image }: AuthUser) => {
  return client //
    .createIfNotExists({
      _id: id,
      _type: "user",
      name,
      email,
      image,
      fixedIncome: "",
      dailySpendingLimit: "",
    });
};
