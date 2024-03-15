"use client";

import { useState } from "react";
import PaymentMenu from "./Menu/PaymentMenu";
import TagMenu from "./Menu/TagMenu";
import { formatPriceToCurrency } from "@/utilities/common";
import AddIconButton from "./Buttons/AddIconButton";

type FormEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement>;

export type ExpenseFormData = {
  date: string;
  price: string;
  paymentMethod: string;
  tag: string;
  description: string;
};

const InitialFormData = {
  date: "",
  price: "",
  paymentMethod: "",
  tag: "",
  description: "",
};

export default function ExpenseForm() {
  const [formKey, setFormKey] = useState(0);
  const [formData, setFormData] = useState<ExpenseFormData>(InitialFormData);

  const handleChange = (e: FormEvent, fieldName: string) => {
    let value: string;

    if (e.type === "click") {
      value = (e.currentTarget as HTMLButtonElement).dataset.title ?? "";
    } else {
      value = (e.target as HTMLInputElement).value;
    }

    if (fieldName === "price") value = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/records", {
      method: "POST",
      body: JSON.stringify(formData),
    }) //
      .then((res) => {
        if (res.ok) console.log("formSubmit complited");
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setFormData(InitialFormData);
        setFormKey(formKey + 1);
      });
  };

  return (
    <form
      className="box flex flex-wrap justify-between  items-center mt-8"
      key={formKey}
      onSubmit={handleSubmit}
    >
      <div className="input w-36">
        <input
          type="date"
          className="w-full outline-none bg-neutral-100"
          value={formData.date}
          onChange={(e) => handleChange(e, "date")}
        />
      </div>
      <div className="input w-28">
        <input
          className="w-full outline-none text-end bg-neutral-100"
          placeholder="-"
          value={formatPriceToCurrency(formData.price)}
          onChange={(e) => handleChange(e, "price")}
        />
        <span>원</span>
      </div>
      <PaymentMenu handleChange={handleChange} />
      <TagMenu handleChange={handleChange} />
      <div className="input w-36">
        <input
          placeholder="내용"
          type="text"
          className="w-full outline-none bg-neutral-100"
          onChange={(e) => handleChange(e, "description")}
        />
      </div>
      <AddIconButton />
    </form>
  );
}
