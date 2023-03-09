import React from "react";
import { Button } from "antd";
import Styles from "/styles/scss/dashboard/FilterButton.module.scss";

export default function FilterButton({
  onClick,
  theme,
  text = "Filters",
  icon,
  iconDark,
  inDrawer,
}) {
  return (
    <Button
      onClick={onClick}
      className={
        inDrawer
          ? theme
            ? Styles.lightButtonDrawer
            : Styles.darkButtonDrawer
          : theme
          ? Styles.lightButton
          : Styles.darkButton
      }
    >
      <div className={!inDrawer ? "md:block hidden" : ""}>
        <span className="pr-3">{text}</span>
      </div>
      {theme ? icon : iconDark}
    </Button>
  );
}
