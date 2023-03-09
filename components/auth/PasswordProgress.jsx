import React from "react";
import { Progress } from "antd";
export default function PasswordProgress({ now }) {
  return (
    <div className="progress-password">
      <Progress
        strokeWidth={6}
        strokeColor={
          now == 5
            ? "#f37070"
            : now == 60
            ? "#fbb03b"
            : now == 90
            ? "#15c0ab"
            : "#15c0ab"
        }
        percent={now}
        showInfo={false}
        trailColor={"#8C95A4"}
      />
    </div>
  );
}
