import React, { useState } from "react";
import { Form, InputNumber } from "antd";
import Styles from "/styles/scss/dashboard/NumberItem.module.scss";
import Error from "../Error";
export default function NumberItem({
  theme,
  value,
  onChange = () => {},
  label,
  name,
  isWrong = false,
  help,
}) {
  //***************************
  // Define State
  //***************************
  const [active, setActive] = useState(false);
  //***************************
  // Define Custome Styles
  //***************************
  const labelStyle = {
    zIndex: 1,
    pointerEvents: "none",
    transition: "0.2s ease all",
    transform: "translate(0, 2.1rem) scale(1)",
    marginLeft: 10,
  };
  const floatingLabel = {
    transform: "translate(0, -0.3rem) scale(1)",
    marginLeft: 0,
  };
  //***************************
  // Define function
  //***************************
  const onBlur = () => {
    setActive(false);
  };
  const onFocus = () => {
    setActive(true);
  };
  return (
    <Form.Item
      validateStatus={isWrong ? "error" : null}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      style={{ width: "100%", marginTop: 8 }}
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <InputNumber
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          className={theme ? Styles.lightInput : Styles.darkInput}
          value={value}
          onChange={onChange}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          decimalSeparator="."
          controls={false}
        />
        <span
          className={theme ? Styles.lightLabel : Styles.darkLabel}
          style={active || value ? floatingLabel : labelStyle}
        >
          {label}
        </span>
      </div>
    </Form.Item>
  );
}
