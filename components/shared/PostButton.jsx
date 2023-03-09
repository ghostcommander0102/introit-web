import React from "react";
import Styles from "/styles/scss/dashboard/PostJob.module.scss";
import Plus from "/public/assets/images/svgs/plus-post-icon.svg";
export default function PostButton({ onClick, styles, text, icon = <Plus /> }) {
  return (
    <button style={styles} onClick={onClick} className={Styles.button}>
      <span className="md:block hidden">{icon}</span>
      <span className="md:pl-2 pl-0">{text}</span>
    </button>
  );
}
