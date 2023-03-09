import React from "react";
import { Button, Spin } from "antd";
import Styles from "/styles/scss/dashboard/SaveButton.module.scss";
export default function SaveButton({
  text,
  onClick,
  type = "button",
  disabledButton,
}) {
  return (
    <div className={Styles.wrapper}>
      <Button
        disabled={disabledButton}
        htmlType={type}
        onClick={onClick}
        className={Styles.button}
      >
        {disabledButton ? <Spin /> : text}
      </Button>
    </div>
  );
}
