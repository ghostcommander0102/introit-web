import React from "react";
import { Form } from "antd";
import Error from "../Error";
import Style from "/styles/scss/dashboard/CheckboxItem.module.scss";
export default function CheckBoxItem({
  label,
  styles,
  value,
  onChange = () => {},
  name,
  theme,
  isWrong = false,
  help,
  defaultChecked,
  disabled,
  margin,
}) {
  return (
    <Form.Item style={{ margin: margin }} className="mb-0">
      <label className={Style.container}>
        <span
          style={{ color: theme ? "#6E7191" : "#F2F2F8", ...styles }}
          className={Style.lable}
        >
          {label}
        </span>
        <input
          disabled={disabled}
          checked={value}
          defaultChecked={defaultChecked}
          name={name}
          onChange={onChange}
          type="checkbox"
        />
        <span
          className={theme ? Style.lightCheckmark : Style.darkCheckmark}
        ></span>
      </label>
      {isWrong ? <Error text={help} /> : null}
    </Form.Item>
  );
}
