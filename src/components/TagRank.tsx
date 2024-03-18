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
      </ul>
    </div>
  );
}
