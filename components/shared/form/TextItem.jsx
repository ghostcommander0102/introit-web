import React, { useState } from "react";
import { Input, Form } from "antd";
import Styles from "/styles/scss/dashboard/TextItem.module.scss";
import Error from "../Error";
export default function TextItem({
  placeholder,
  theme,
  value,
  onChange = () => {},
  label,
  name,
  isWrong = false,
  help,
  icon,
  widthLabel,
  disabled,
  prefix,
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
        <Input
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          type="text"
          name={name}
          className={theme ? Styles.lightInput : Styles.darkInput}
          value={value}
          onChange={(e) => {
            onChange((prev) => {
              return {
                ...prev,
                [e.target.name]: e.target.value,
              };
            });
          }}
          suffix={icon}
          prefix={prefix}
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
