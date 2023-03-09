import React from "react";
import { Col, Row } from "antd";
import JobsCard from "./JobsCard";
export default function ContentJobs({ theme }) {
  return (
    <Row className="mt-3">
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={12} className="my-3 px-2">
        <JobsCard theme={theme} />
      </Col>
    </Row>
  );
}
