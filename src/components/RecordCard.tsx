import { Record, formatPriceToCurrency } from "@/utilities/common";

type Props = {
  record: Record;
};

const paymentItems = [
  { icon: "💰", title: "현금" },
  { icon: "💳", title: "카드" },
];
const tagItems = [
  { icon: "🍲", title: "음식" },
  { icon: "🛍️", title: "쇼핑" },
  { icon: "🏠", title: "주거" },
  { icon: "🚗", title: "교통" },
  { icon: "🎉", title: "오락" },
  { icon: "📚", title: "교육" },
  { icon: "🩺", title: "의료" },
  { icon: "✈️", title: "여행" },
  { icon: "📱", title: "통신" },
  { icon: "🔌", title: "공과금" },
  { icon: "💼", title: "직업" },
  { icon: "🍼", title: "육아" },
  { icon: "🐾", title: "반려동물" },
  { icon: "🎁", title: "선물" },
  { icon: "🏦", title: "저축" },
  { icon: "💡", title: "기타" },
];

export default function RecordCard({ record }: Props) {
  const { price, description, paymentMethod, tag } = record;
  const payment_icon = paymentItems.filter((i) => i.title == paymentMethod)[0]
    .icon;
  const tag_icon = tagItems.filter((i) => i.title == tag)[0].icon;

  return (
    <div className="box flex justify-between mb-2">
      <div className="pl-4 py-2">
        <p className="text-xs font-medium">{description}</p>
        <div className="flex gap-2 mt-2">
          <p className="input">
            <span>{payment_icon}</span>
            {paymentMethod}
          </p>
          <p className="input">
            <span>{tag_icon}</span>
            {tag}
          </p>
        </div>
      </div>
      <div className="text-xl font-bold">
        <p>{formatPriceToCurrency(price)}원</p>
      </div>
    </div>
  );
}
