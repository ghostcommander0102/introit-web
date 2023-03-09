import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Chart from "/styles/scss/dashboard/Chart.module.scss";

const data = [
  {
    name: "Jan",
    uv: 100,
    pv: 100,
    amt: 100,
  },
  {
    name: "Feb",
    uv: 100,
    pv: 100,
    amt: 100,
  },
  {
    name: "Mar",
    uv: 200,
    pv: 100,
    amt: 100,
  },
  {
    name: "Apr",
    uv: 120,
    pv: 100,
    amt: 100,
  },
  {
    name: "May",
    uv: 500,
    pv: 200,
    amt: 150,
  },
  {
    name: "Jun",
    uv: 100,
    pv: 360,
    amt: 180,
  },
  {
    name: "Jul",
    uv: 500,
    pv: 420,
    amt: 100,
  },
  {
    name: "Aug",
    uv: 100,
    pv: 180,
    amt: 180,
  },
  {
    name: "Sept",
    uv: 100,
    pv: 100,
    amt: 100,
  },
  {
    name: "Oct",
    uv: 100,
    pv: 250,
    amt: 250,
  },
  {
    name: "Nov",
    uv: 100,
    pv: 100,
    amt: 100,
  },
  {
    name: "Dec",
    uv: 100,
    pv: 130,
    amt: 150,
  },
];
const CustomTooltip = ({ active, payload, label, points, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div className={theme ? Chart.wrapper : Chart.wrapperDark}>
        <div className="flex">
          <div className={Chart.circle}>{label}</div>
          <div className="flex flex-col pl-3">
            <span className={Chart.count}>
              {payload[0].payload[payload[0].name]}
            </span>
            <span className={Chart.text}>Applied Jobs</span>
            <span className={Chart.shape}></span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default function ChartItem({ theme }) {
  const [posData, setposData] = useState(0);
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" interval="preserveStartEnd" />
          <YAxis />
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Line
            onMouseOver={(data) => {
              setposData(data);
            }}
            strokeWidth={4}
            activeDot={{
              r: 8,
              stroke: theme ? "white" : "#2E3042",
              strokeWidth: 5,
            }}
            type="monotone"
            dataKey="uv"
            stroke="#685AD3"
            fill="#685AD3"
          />
          <Line
            onMouseOver={(data) => {
              console.log("data2", data);
            }}
            strokeWidth={2}
            r={0}
            type="monotone"
            dataKey="pv"
            stroke="rgb(254,239,216)"
            fill="rgb(254,239,216)"
          />
          <Line
            onMouseOver={(data) => {
              console.log("data3", data);
            }}
            r={0}
            strokeWidth={2}
            type="monotone"
            dataKey="amt"
            stroke="rgb(225,245,250)"
            fill="rgb(225,245,250)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
