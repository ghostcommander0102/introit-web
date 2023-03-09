import React from "react";
import { Button } from "antd";
import Styles from "../../styles/scss/dashboard/SidebarTabButton.module.scss";
export default function SidebarTabButton({
  icon,
  theme,
  active,
  title,
  onClick,
}) {
  return (
    <Button
      className={`${
        active ? (theme ? Styles.lightActive : Styles.darkActive) : ""
      } ${theme ? Styles.lightButton : Styles.lightButton}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className={theme ? Styles.lightText : Styles.darkText}>
        {title}
      </span>
    </Button>
  );
}
