import React from "react";
import Styles from "/styles/scss/dashboard/GrayWrapper.module.scss";
export default function GrayWrapper({ children }) {
  return <div className={Styles.wrapper}>{children}</div>;
}
