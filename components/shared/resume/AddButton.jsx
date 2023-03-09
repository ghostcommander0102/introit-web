import { Button } from "antd";
import React from "react";
import Styles from "/styles/scss/dashboard/Accordion.module.scss";
import Plus from "/public/assets/images/svgs/plus-accordion.svg";
export default function AddButton({ theme, onClick }) {
  return (
    <Button
      onClick={onClick}
      className={theme ? Styles.lightButton : Styles.darkButton}
    >
      <span> Add new</span>
      <span className="pl-2">
        <Plus />
      </span>
    </Button>
  );
}
