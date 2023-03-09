import { Button } from "antd";
import React from "react";
import Plus from "/public/assets/images/svgs/plus-button.svg";
import PlusDark from "/public/assets/images/svgs/dark/plus-button.svg";
import Styles from "/styles/scss/dashboard/ButtonWithPlus.module.scss";
export default function ButtonWithPlus({
  text = "Create a new Company",
  theme,
  onClick,
}) {
  return (
    <Button
      onClick={onClick}
      className={theme ? Styles.lightButton : Styles.darkButton}
    >
      <span className="pr-3">{text}</span>
      <span className="flex">{theme ? <Plus /> : <PlusDark />}</span>
    </Button>
  );
}
