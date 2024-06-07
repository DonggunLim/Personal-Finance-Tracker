import { tagItems } from "@/data/data";
import {
  Record,
  TagSummary,
  formatPriceToCurrency,
  orderByTag,
} from "@/utilities/common";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
};

export default function TagRank({ records }: Props) {
  const [rankByTag, setRankByTag] = useState<TagSummary[]>([]);

  useEffect(() => {
    setRankByTag(orderByTag(records));
  }, [records]);

  return (
    <div>
      <p className="text-xs font-medium mb-1">🏆가장 많이 사용한 태그(지출)</p>
      <ul className="box">
        {rankByTag.map(({ tag, count, total_price }, index) => (
          <li
            className="flex items-center justify-between py-2 px-1 hover:bg-neutral-100 rounded-lg"
            key={index}
          >
            <div className="flex">
              {tagItems.filter((t) => t.title === tag)[0].icon}
              <p>{tag}</p>
            </div>
            <div className="flex gap-2 font-bold">
              <div>{count}번 지출</div>
              <p>{formatPriceToCurrency(total_price.toString())}원</p>
            </div>
          </li>
        ))}
        {rankByTag.length === 0 && (
          <p className="text-sm font-bold text-gray-200">기록이 부족합니다.</p>
        )}
      </ul>
    </div>
  );
}
