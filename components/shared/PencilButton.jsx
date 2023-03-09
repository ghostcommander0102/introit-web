import React from "react";
import { Button } from "antd";
import Styles from "../../styles/scss/dashboard/PencilButton.module.scss";
export default function PencilButton({ icon, onClick, theme, isLight = true }) {
  return (
    <Button
      className={
        theme
          ? isLight
            ? Styles.lightWrapperIsLight
            : Styles.lightWrapper
          : isLight
          ? Styles.darkWrapperIsLight
          : Styles.darkWrapper
      }
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
