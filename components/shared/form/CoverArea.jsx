import { Form, Input } from "antd";
import React from "react";
import Styles from "/styles/scss/dashboard/CoverArea.module.scss";
export default function CoverArea({ theme, name, onChange, disabled, value }) {
  return (
    <Form.Item className="cover-letter" colon={false} labelAlign="left">
      <Input.TextArea
        value={value}
        rows={5}
        className={theme ? Styles.lightArea : Styles.darkArea}
        disabled={disabled}
        name={name}
        autoSize={{ maxRows: 5 }}
        onChange={(e) => {
          onChange((prev) => {
            return {
              ...prev,
              [e.target.name]: e.target.value,
            };
          });
        }}
      />
    </Form.Item>
  );
}
