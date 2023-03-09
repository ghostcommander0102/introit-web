import React from "react";
import Styles from "/styles/scss/dashboard/UserWitting.module.scss";
export default function DividerItem({ icon, title, theme }) {
  return (
    <div className="flex items-center">
      <div>{icon}</div>
      <div className="pl-4">
        <p className={theme ? Styles.lightDivider : Styles.darkDivider}>
          {title}
        </p>
      </div>
    </div>
  );
}
