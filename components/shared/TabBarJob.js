import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/TabBarJob.module.scss";
export default function TabBarJob({ filteTab, handleFilterTab, theme }) {
  return (
    <Row className="mb-5">
      <Col md={12} className="px-4">
        <Row className={theme ? Styles.wrapperLight : Styles.wrapperDark}>
          <Col md={3} className="text-center">
            <button
              onClick={() => {
                handleFilterTab(1);
              }}
              className={`${theme ? Styles.buttonLight : Styles.buttonDark} ${
                filteTab == 1 ? Styles.active : ""
              }`}
            >
              Applicants (115)
            </button>
          </Col>
          <Col md={3} className="text-center">
            <button
              onClick={() => {
                handleFilterTab(2);
              }}
              className={`${theme ? Styles.buttonLight : Styles.buttonDark} ${
                filteTab == 2 ? Styles.active : ""
              }`}
            >
              Shortlisted for Interview (0)
            </button>
          </Col>
          <Col md={3} className="text-center">
            <button
              onClick={() => {
                handleFilterTab(3);
              }}
              className={`${theme ? Styles.buttonLight : Styles.buttonDark} ${
                filteTab == 3 ? Styles.active : ""
              }`}
            >
              Rejected (0)
            </button>
          </Col>
          <Col md={3} className="text-center">
            <button
              onClick={() => {
                handleFilterTab(4);
              }}
              className={`${theme ? Styles.buttonLight : Styles.buttonDark} ${
                filteTab == 4 ? Styles.active : ""
              }`}
            >
              Insta Match (0)
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
