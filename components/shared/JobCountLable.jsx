import React from "react";
import Circle from "/styles/scss/dashboard/OverViewCircle.module.scss";
export default function JobCountLable({
  title,
  color,
  theme,
  isMargin = true,
}) {
  return (
    <div
      className={`flex justify-center content-center ${isMargin ? "mt-3" : ""}`}
    >
      <span
        style={{ backgroundColor: color }}
        className={Circle.wrapper}
      ></span>
      <span className={theme ? Circle.textLight : Circle.textDark}>
        {title}
      </span>
    </div>
  );
}
