import React from "react";
import { Form } from "antd";
export default function FormItem({
  children,
  onFinish = () => {},
  customeForm = false,
}) {
  return (
    <Form
      className={customeForm ? "change-style-validation" : ""}
      onFinish={onFinish}
      labelAlign="left"
      layout="vertical"
    >
      {children}
    </Form>
  );
}
