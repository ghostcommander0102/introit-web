import React from "react";
import { Input, Form } from "antd";
import Styles from "/styles/scss/dashboard/TextItemAdmin.module.scss";
import Error from "../../Error";
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
  heigth,
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
        style={{ height: heigth }}
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
        placeholder={placeholder}
        suffix={icon}
      />
    </Form.Item>
  );
}
