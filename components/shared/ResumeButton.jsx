import { Button } from "antd";
import React from "react";
import Styles from "../../styles/scss/dashboard/ResumeButton.module.scss";
export default function ResumeButton({
  type = "button",
  onClickLeft,
  onClickRight,
  theme,
  leftText,
  rightText,
}) {
  return (
    <div className={Styles.wrapper}>
      <Button
        className={theme ? Styles.lightCancel : Styles.darkCancel}
        htmlType={type}
        onClick={onClickLeft}
      >
        {leftText}
      </Button>
      <Button className={Styles.save} htmlType={type} onClick={onClickRight}>
        {rightText}
      </Button>
    </div>
  );
}
