import React, { useState } from "react";
import { Input, Form } from "antd";
import Styles from "/styles/scss/dashboard/AuthEmail.module.scss";
import Error from "../Error";
import ImageProvider from "providers/ImageProvider";
import { isEmpty } from "lodash";
export default function AuthText({
  placeholder,
  theme,
  value,
  onChange = () => {},
  label,
  name,
  isWrong = false,
  help,
  icon,
  hasIcon = false,
  currentUser,
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
      style={{ width: "100%" }}
    >
      {!isEmpty(currentUser?.avatar) && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            overflow: "hidden",
            height: 45,
          }}
        >
          <ImageProvider
            src={currentUser?.avatar || "/"}
            width={45}
            height={45}
          />
        </div>
      )}
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <Input
          style={{ paddingLeft: currentUser?.avatar ? 54 : 10 }}
          type="text"
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
          onBlur={onBlur}
          onFocus={onFocus}
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
