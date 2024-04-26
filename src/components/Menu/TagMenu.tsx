import DropdownMenu from "./DropdownMenu";

type Props = {
  onChange: (value: string, fieldName: string) => void;
};

export default function TagMenu({ onChange }: Props) {
  const items = [
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

  return (
    <div className="flex justify-start py-1 px-2 rounded-md w-20">
      <DropdownMenu
        items={items}
        placeholder="태그"
        fieldName="tag"
        onChange={onChange}
      />
    </div>
  );
}
