// @ts-ignore
import { PureComponent } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, LabelList } from "recharts";

interface DataPoint {
  month: string;
  uv: number;
}

const data: DataPoint[] = [
  { month: "Янв", uv: 0 },
  { month: "Фев", uv: 0 },
  { month: "Мар", uv: 0 },
  { month: "Апр", uv: 0 },
  { month: "Май", uv: 0 },
  { month: "Июн", uv: 0 },
  { month: "Июл", uv: 0 },
  { month: "Авг", uv: 1 },
  { month: "Сен", uv: 0 },
  { month: "Окт", uv: 0 },
  { month: "Ноя", uv: 0 },
  { month: "Дек", uv: 0 },
];

export default class BasicBars extends PureComponent {
  render() {
    return (
      <ResponsiveContainer height={250}>
        <BarChart data={data} barCategoryGap="5%">
          <XAxis
            dataKey="month"
            tick={{
              fill: "black",
              fontSize: 14,
              fontFamily: "Geologica, Arial, sans-serif",
            }}
            stroke="none"
            axisLine={false}
          />
          {/* <Tooltip /> */}
          <Bar dataKey="uv" fill="#E2E4E7" radius={[10, 10, 10, 10]}>
            <LabelList
              dataKey="uv"
              position="insideTop"
              fill="#000"
              fontSize={12}
              offset={10}
              fontFamily="Geologica, Arial, sans-serif"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
