import { ExpenseFormData } from "@/components/ExpenseForm";
import { client } from "./sanity";

export const AddRecord = (userId: string, formData: ExpenseFormData) => {
  const { date, price, paymentMethod, tag, description } = formData;

  return client //
    .create(
      {
        _type: "record",
        author: {
          _type: "reference",
          _ref: userId,
        },
        date,
        price,
        paymentMethod,
        tag,
        description,
      },
      { autoGenerateArrayKeys: true }
    );
};
