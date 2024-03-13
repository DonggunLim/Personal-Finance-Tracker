import { client } from "./sanity";

type AuthUser = {
  id: string;
  username: string;
  email: string;
  image: string;
};

export const addUser = ({ id, username, email, image }: AuthUser) => {
  return client //
    .createIfNotExists({
      _id: id,
      _type: "user",
      username,
      email,
      image,
      fixedIncome: "",
      dailySpendingLimit: "",
    });
};
