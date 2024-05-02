import {
  PriceSummary,
  Record,
  formatPriceToCurrency,
  orderByPrice,
} from "@/utilities/common";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
};

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

export default function ExpenditureRank({ records }: Props) {
  const [rankByPrice, setRankByPrice] = useState<PriceSummary[]>([]);

  useEffect(() => {
    setRankByPrice(orderByPrice(records));
  }, [records]);

  return (
    <div>
      <p className="text-xs font-medium mb-1">😂가장 큰 지출</p>
      <ul className="box">
        {rankByPrice.map(({ tag, description, price }, index) => (
          <li
            className="flex gap-2 justify-between items-center py-2 px-1
           hover:bg-neutral-100 rounded-lg"
            key={index}
          >
            <div className="flex items-center">
              <p className="font-bold text-sm">{index + 1}</p>
              <p className="mx-1 text-xs font-bold whitespace-nowrap">
                {formatPriceToCurrency(price)}원
              </p>
              <p className="truncate">{description}</p>
            </div>
            <p className="whitespace-nowrap">
              {tagItems.filter((t) => t.title === tag)[0].icon}
              {tag}
            </p>
          </li>
        ))}
        {rankByPrice.length === 0 && (
          <p className="text-sm font-bold text-gray-200">기록이 부족합니다.</p>
        )}
      </ul>
    </div>
  );
}
