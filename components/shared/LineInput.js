import React from "react";
import Styles from "/styles/scss/dashboard/LineInput.module.scss";
export default function LineInput() {
  return (
    <div className="d-flex">
      <input maxLength={2} className={Styles.input} />
      <span className={Styles.text}>Year(s)</span>
    </div>
  );
}
