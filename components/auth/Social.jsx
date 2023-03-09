import React from "react";
import Styles from "/styles/scss/dashboard/Login.module.scss";
export default function Social({ icon, onClick }) {
  return (
    <button onClick={onClick} type="button" className={Styles.social}>
      {icon}
    </button>
  );
}
