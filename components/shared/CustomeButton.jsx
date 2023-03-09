import React from "react";
import { Button, Spin } from "antd";
import Styles from "/styles/scss/dashboard/CustomeButton.module.scss";

export default function CustomeButton({
  text,
  buttonType = "button",
  onClick,
  disabledButton,
  hasAnime = true,
}) {
  return (
    <Button
      disabled={disabledButton}
      onClick={onClick}
      htmlType={buttonType}
      className={Styles.btnSave}
    >
      {disabledButton ? hasAnime ? <Spin /> : text : text}
    </Button>
  );
}
