import React from "react";
import Styles from "/styles/scss/dashboard/ResumeSidebar.module.scss";
export default function DividerItem({ content, theme }) {
  return (
    <div className={theme ? Styles.lightDivider : Styles.darkDivider}>
      <p>{content}</p>
    </div>
  );
}
