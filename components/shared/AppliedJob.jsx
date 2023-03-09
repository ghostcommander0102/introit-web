import React from "react";
import { Col, Row } from "antd";
import SelectItem from "./form/SelectItem";
import DividerItem from "./DividerItem";
import MarginTop from "./MarginTop";
export default function AppliedJob({ theme }) {
  return (
    <Col span={24} className="mt-5 md:px-2 px-0">
      <Row className="md:px-4 px-2">
        <Col md={{ span: 18 }} span={12} className="my-auto">
          <DividerItem theme={theme} content="Recentely Applied" />
        </Col>
        <Col md={{ span: 6 }} span={12} className="flex justify-end">
          <SelectItem
            theme={theme}
            showLabel={false}
            defaultValue={[]}
            options={[]}
            isSearchable={false}
            height="41.6px"
            hasBorder={true}
            width={100}
            margin={0}
          />
        </Col>
      </Row>
      <MarginTop marginTop={30} />
      <p style={{ color: "#6E6191" }} className="m-0">
        No Applications found.
      </p>
    </Col>
  );
}
