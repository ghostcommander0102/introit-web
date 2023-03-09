import React from "react";
import Styles from "/styles/scss/dashboard/UserWitting.module.scss";
export default function Seprator({ theme }) {
  return (
    <div className={theme ? Styles.lightUnderline : Styles.darkUnderline}></div>
  );
}
