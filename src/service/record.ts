import { client } from "./sanity";
import { FormData } from "@/components/ExpenseFormModal";

export const AddRecord = (userId: string, formData: FormData) => {
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
    .fetch(query);
};

export const getRecordByDate = (
  userId: string,
  startDate: string,
  endDate: string
) => {
  const query = `*[_type == "record" && author->_id == "${userId}" 
  && date >= "${startDate}" && date < "${endDate}"]`;

  return client //
    .fetch(query);
};

export const updateRecord = (id: string, formdata: FormData) => {
  return client //
    .patch(id)
    .set(formdata)
    .commit();
};
