import React from "react";
import { Progress } from "antd";
export default function CustomeProgress({ now, theme }) {
  return (
    <div className="progress-resume">
      <Progress
        strokeColor="#4B4DED"
        trailColor={theme ? "#CED2DF" : "#555777"}
        showInfo={false}
        percent={now}
        strokeWidth={6}
      />
    </div>
  );
}
