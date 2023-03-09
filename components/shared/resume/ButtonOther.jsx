import React from "react";
import { Button } from "antd";
import Plus from "../../../public/assets/images/svgs/other-plus.svg";
import Styles from "../../../styles/scss/dashboard/OtherItem.module.scss";
export default function ButtonOther({ text, onClick }) {
  return (
    <Button onClick={onClick} className={Styles.lightButton}>
      <span>{text}</span>
      <span className="pl-1.5">
        <Plus />
      </span>
    </Button>
  );
}
