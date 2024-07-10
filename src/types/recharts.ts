import { ReactText } from "react";
import { LegendProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

export interface CustomPayload extends Payload {
  payload?: {
    strokeDasharray: ReactText;
    value?: any;
    percentage?: number;
    tag?: string;
    total_price?: number;
    [key: string]: any;
  };
  color?: string;
}
