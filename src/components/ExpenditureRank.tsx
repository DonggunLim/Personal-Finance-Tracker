import { tagItems } from "@/data/data";
import { PriceSummary } from "@/types/common";
import { Record } from "@/types/record";
import { formatPriceToCurrency, orderByPrice } from "@/utilities/common";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
};

export default function ExpenditureRank({ records }: Props) {
  const [rankByPrice, setRankByPrice] = useState<PriceSummary[]>([]);

  useEffect(() => {
    setRankByPrice(orderByPrice(records));
  }, [records]);

  return (
    <div>
      <p className="mb-1 text-xs font-medium">😂가장 큰 지출</p>
      <ul className="box">
        {rankByPrice.map(({ tag, description, price }, index) => (
          <li
            className="flex items-center justify-between gap-2 rounded-lg px-1 py-2 hover:bg-neutral-100"
            key={index}
          >
            <div className="flex items-center">
              <p className="text-sm font-bold">{index + 1}</p>
              <p className="mx-1 whitespace-nowrap text-xs font-bold">
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
