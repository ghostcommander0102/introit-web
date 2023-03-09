import React from "react";
import Styles from "/styles/scss/dashboard/Error.module.scss";
import ErrorIcon from "/public/assets/images/svgs/error-icon.svg";
export default function Error({ text }) {
  return (
    <span className={Styles.wrapper}>
      <ErrorIcon />
      <span className="pl-2">{text}</span>
    </span>
  );
}
