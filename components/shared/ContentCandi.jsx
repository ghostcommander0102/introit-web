import React from "react";
import { Col, Row } from "antd";
import CandidateCard from "./CandidateCard";
export default function ContentCandi({ theme }) {
  return (
    <Row className="mt-3">
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
      <Col xl={{ span: 8 }} lg={{ span: 12 }} span={24} className="my-3 px-2">
        <CandidateCard theme={theme} />
      </Col>
    </Row>
  );
}
