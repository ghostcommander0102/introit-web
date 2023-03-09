import React from "react";
import { Button } from "antd";
import Styles from "/styles/scss/dashboard/PermissionButton.module.scss";
export default function PermissionButton({ text, theme, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={theme ? Styles.lightButton : Styles.darkButton}
    >
      {text}
    </Button>
  );
}
