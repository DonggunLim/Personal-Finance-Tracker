import { ExpenseFormData } from "@/components/ExpenseForm";
import { client } from "./sanity";
import { groupRecordsByDate } from "@/utilities/common";

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

export const getRecord = async (userId: string) => {
  const query = `*[_type == "record" && author->_id == "${userId}"]
   | order(date desc)`;

  return client //
    .fetch(query)
    .then(groupRecordsByDate);
};
