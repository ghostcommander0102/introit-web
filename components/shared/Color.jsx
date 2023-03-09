import { Button } from "antd";
import React from "react";
import Styles from "../../styles/scss/dashboard/Color.module.scss";
export default function Color({ color, onClick }) {
  return (
    <Button onClick={onClick} className={Styles.button}>
      <div className={Styles.wrapper} style={{ background: color }}></div>
    </Button>
  );
}
