import React from "react";
import Styles from "/styles/scss/dashboard/Login.module.scss";
export default function Wrapper({ children, theme, page }) {
  return (
    <div
      className={`${
        page == "signup"
          ? Styles.wrapperSignup
          : page == "login"
          ? Styles.wrapperLogin
          : page == "forget"
          ? Styles.wrapperForget
          : page == "reset"
          ? Styles.wrapperReset
          : page == "verify"
          ? Styles.wrapperVerify
          : null
      } ${theme ? Styles.wrapperLight : Styles.wrapperDark}`}
    >
      {children}
    </div>
  );
}
