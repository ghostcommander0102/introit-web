import React from "react";
import { Button } from "antd";
import Plus from "/public/assets/images/svgs/plus-mobile.svg";
import PlusDark from "/public/assets/images/svgs/dark/plus-mobile.svg";
import Styles from "../../styles/scss/dashboard/HeadPlusButton.module.scss";
export default function HeadPlusButton({ theme, onClick }) {
  return (
    <Button onClick={onClick} className={Styles.wrapper}>
      {theme ? <Plus /> : <PlusDark />}
    </Button>
  );
}
