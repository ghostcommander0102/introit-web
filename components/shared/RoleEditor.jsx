import React from "react";
import { Button } from "antd";
import Styles from "/styles/scss/dashboard/RoleEditor.module.scss";
import Pen from "/public/assets/images/svgs/pen-editor.svg";
import PenDark from "/public/assets/images/svgs/dark/pen-editor.svg";
export default function RoleEditor({ theme, text, onClick, height }) {
  return (
    <div
      style={{ height: height }}
      className={theme ? Styles.lightWrapper : Styles.darkWrapper}
    >
      <p className={theme ? Styles.lightText : Styles.darkText}>{text}</p>
      <Button onClick={onClick} className={Styles.button}>
        {theme ? <Pen /> : <PenDark />}
      </Button>
    </div>
  );
}
