import React from "react";
import { Form } from "antd";
import Error from "../Error";
import Style from "/styles/scss/dashboard/CheckboxItemRev.module.scss";
export default function CheckBoxItemRev({
  label,
  checked,
  onChange = () => {},
  name,
  theme,
  isWrong = false,
  help,
}) {
  return (
    <Form.Item className="mb-0">
      <label className={Style.container}>
        <input
          checked={checked}
          name={name}
          onChange={onChange}
          type="checkbox"
        />
        <span
          className={theme ? Style.lightCheckmark : Style.darkCheckmark}
        ></span>
        <span
          className={`${theme ? Style.lightLabel : Style.darkLabel} reposition`}
        >
          {label}
        </span>
      </label>
      {isWrong ? <Error text={help} /> : null}
    </Form.Item>
  );
}
