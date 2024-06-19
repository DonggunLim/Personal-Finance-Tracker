import { AuthUser } from "@/types/user";
import { client } from "./sanity";

export const getUser = (userId: string) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return client //
    .fetch(query);
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

export const updateUserinfo = (
  userId: string,
  updatedObject: { [title: string]: string },
) => {
  return client //
    .patch(userId)
    .set(updatedObject)
    .commit();
};
