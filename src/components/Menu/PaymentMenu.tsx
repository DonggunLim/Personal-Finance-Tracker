import DropdownMenu from "./DropdownMenu";

type Props = {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    fieldName: string
  ) => void;
};

export default function PaymentMenu({ handleChange }: Props) {
  const items = [
    { icon: "💰", title: "현금" },
    { icon: "💳", title: "카드" },
  ];

  return (
    <div className="flex justify-start py-1 px-2 rounded-md w-20">
      <DropdownMenu
        items={items}
        placeholder="지불방식"
        fieldName="paymentMethod"
        handleChange={handleChange}
      />
    </div>
  );
}
