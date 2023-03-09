import React from "react";
import { Col, Row } from "antd";
import SelectItem from "./form/SelectItem";
export default function ProfileSelect({ theme }) {
  const namesOptions = [
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "EUR", label: "EUR" },
  ];
  return (
    <Row className="mt-4">
      <Col span={24}>
        <SelectItem
          label="Currency"
          defaultValue={namesOptions}
          options={namesOptions}
          isSearchable={false}
          theme={theme}
          minWidth={80}
        />
      </Col>
    </Row>
  );
}
