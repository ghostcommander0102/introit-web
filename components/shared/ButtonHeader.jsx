import { Button } from "antd";
import React from "react";
import Styles from "/styles/scss/dashboard/Header.module.scss";
export default function ButtonHeader({ icon, onClick, theme }) {
  return (
    <Button
      onClick={onClick}
      className={theme ? Styles.lightHeaderButton : Styles.darkHeaderButton}
    >
      {icon}
    </Button>
  );
}
