import { tagItems } from "@/data/data";
import { TagSummary } from "@/types/common";
import { Record } from "@/types/record";
import { formatPriceToCurrency, orderByTag } from "@/utilities/common";
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
      <p className="mb-1 text-xs font-medium">🏆가장 많이 사용한 태그(지출)</p>
      <ul className="box">
        {rankByTag.map(({ tag, count, total_price }, index) => (
          <li
            className="flex items-center justify-between rounded-lg px-1 py-2 hover:bg-neutral-100"
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
