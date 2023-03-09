import React from "react";
import { Button } from "antd";
import Styles from "../../styles/scss/dashboard/HeadButton.module.scss";
export default function HeadButton({
  text,
  icon,
  onClick,
  theme,
  inGlobal = false,
}) {
  return (
    <Button
      onClick={onClick}
      className={
        inGlobal
          ? theme
            ? Styles.lightWrapperIn
            : Styles.darkWrapperIn
          : theme
          ? Styles.lightWrapper
          : Styles.darkWrapper
      }
    >
      <span>{text}</span>
      <span>{icon}</span>
    </Button>
  );
}
