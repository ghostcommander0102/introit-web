import { Form, Input } from "antd";
import React, { useState } from "react";
import Styles from "/styles/scss/dashboard/AreaItem.module.scss";
export default function AreaItem({
  theme,
  name,
  onChange,
  disabled,
  label,
  value,
  coverLetter = false,
  rows = 5,
  autoSize,
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
    <Form.Item colon={false} labelAlign="left">
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <Input.TextArea
          value={value}
          rows={rows}
          className={theme ? Styles.lightArea : Styles.darkArea}
          style={{
            backgroundColor: coverLetter ? (!theme ? "#232230" : "") : "",
          }}
          autoSize={autoSize}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          onChange={(e) => {
            onChange((prev) => {
              return {
                ...prev,
                [e.target.name]: e.target.value,
              };
            });
          }}
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
