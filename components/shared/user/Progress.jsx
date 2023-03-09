import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Progress({ text, title, percent, theme }) {
  return (
    <Row className="md:px-8 px-2 pt-5">
      <Col span={24}>
        <div>
          <div className="flex justify-between mb-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {title}
            </div>
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {text}
            </div>
          </div>
          <div
            className={
              theme ? Styles.lightWrapperProgress : Styles.darkWrapperProgress
            }
          >
            <div
              style={{ width: `${percent}%` }}
              className={theme ? Styles.lightProgress : Styles.darkProgress}
            ></div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
