import React from "react";
import { Form } from "antd";
import Styles from "/styles/scss/dashboard/RadioCustome.module.scss";
export default function RadioCustome({ label, name, theme, defaultChecked }) {
  console.log("defaultChecked", defaultChecked);
  return (
    <Form.Check
      defaultChecked={defaultChecked}
      className={theme ? Styles.wrapperLight : Styles.wrapperDark}
      type="radio"
      inline
      label={label}
      name={name}
    />
  );
}
