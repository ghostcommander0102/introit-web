import React from "react";
import Plus from "/public/assets/images/svgs/plus-icon.svg";
import PlusDark from "/public/assets/images/svgs/dark/plus-icon.svg";
import Styles from "/styles/scss/dashboard/ButtonAddMore.module.scss";
import { Button } from "antd";
export default function ButtonAddMore({ onClick, theme, myResumeTranslate }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={theme ? Styles.lightButton : Styles.darkButton}
    >
      {theme ? <Plus /> : <PlusDark />}
      <span className="pl-3">{myResumeTranslate["add-more"]?.title}</span>
    </Button>
  );
}
