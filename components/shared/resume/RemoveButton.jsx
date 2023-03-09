import React from "react";
import { Button } from "antd";
import Delete from "/public/assets/images/svgs/resume-delete.svg";
import Styles from "/styles/scss/dashboard/Accordion.module.scss";
export default function RemoveButton({ disabled, onClick }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={Styles.deleteButton}
    >
      <Delete />
    </Button>
  );
}
