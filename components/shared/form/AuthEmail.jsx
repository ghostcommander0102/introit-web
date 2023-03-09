import React, { useState } from "react";
import { Input, Form } from "antd";
import Styles from "/styles/scss/dashboard/AuthEmail.module.scss";
import Error from "../Error";
export default function AuthEmail({
  theme,
  value,
  onChange = () => {},
  label,
  name,
  isWrong = false,
  help,
  icon,
  hasIcon = false,
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
      validateStatus={isWrong ? "error" : ""}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <Input
          onBlur={onBlur}
          onFocus={onFocus}
          type="email"
          name={name}
          className={
            theme
              ? hasIcon
                ? Styles.lightInputSuf
                : Styles.lightInput
              : hasIcon
              ? Styles.darkInputSuf
              : Styles.darkInput
          }
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
