import React from "react";
import Styles from "/styles/scss/dashboard/ContentWrapper.module.scss";
export default function ContentWrapper({ theme, children }) {
  return (
    <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
      {children}
    </div>
  );
}
