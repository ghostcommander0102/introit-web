import React from "react";
import { Button } from "antd";
import Styles from "/styles/scss/dashboard/Modal.module.scss";
export default function ModalButton({
  leftText,
  rightText,
  leftClick,
  rightClick,
  theme,
}) {
  return (
    <div className={Styles.wrapper}>
      <Button
        className={theme ? Styles.lightLeft : Styles.darkLeft}
        onClick={leftClick}
      >
        {leftText}
      </Button>
      <Button
        className={theme ? Styles.lightRight : Styles.darkRight}
        onClick={rightClick}
      >
        {rightText}
      </Button>
    </div>
  );
}
