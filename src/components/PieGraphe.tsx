import { TagSummary } from "@/utilities/common";
import { Cell, Pie, PieChart, Text } from "recharts";

type Props = {
  data: TagSummary[];
};

const renderLabel = (data: TagSummary[]) => {
  const LabelComponent = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <Text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}% ${
          tagItems.filter((t) => t.title === data[index].tag)[0].icon
        }${data[index].tag}`}
      </Text>
    );
  };

  return LabelComponent;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
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

export default function PieGraphe({ data }: Props) {
  const customizedLabel = renderLabel(data);

  return (
    <PieChart width={300} height={200}>
      <Pie
        data={data}
        cx={150}
        cy={100}
        labelLine={false}
        label={customizedLabel}
        outerRadius={80}
        fill="#ffffff"
        dataKey="count"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
