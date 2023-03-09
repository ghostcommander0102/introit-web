import React from "react";
import Styles from "/styles/scss/dashboard/ResumeSidebar.module.scss";
export default function Seprator({ theme }) {
  return (
    <div className={theme ? Styles.lightSeprator : Styles.darkSeprator}></div>
  );
}
