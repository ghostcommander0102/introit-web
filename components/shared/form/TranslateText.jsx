import React from "react";
import { Input, Form } from "antd";
import Styles from "/styles/scss/dashboard/TextItemAdmin.module.scss";
import Error from "../Error";
export default function TranslateText({
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
}) {
  return (
    <Form.Item
      validateStatus={isWrong ? "error" : null}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      label={
        label ? (
          <label
            style={{ width: widthLabel }}
            className={theme ? Styles.lightLabel : Styles.darkLabel}
          >
            {label}
          </label>
        ) : null
      }
      style={{ width: "100%" }}
    >
      <Input
        disabled={disabled}
        type="text"
        name={name}
        className={theme ? Styles.lightInput : Styles.darkInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        suffix={icon}
      />
    </Form.Item>
  );
}
