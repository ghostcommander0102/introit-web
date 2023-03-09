import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Award({ title, date, theme, description }) {
  return (
    <Row
      className={`py-6 md:px-8 px-2 ${
        theme ? Styles.lightRow : Styles.darkRow
      }`}
    >
      <Col span={24}>
        <div className="md:block hidden">
          <div className="flex justify-between">
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
          <div className="pt-6">
            <p className={theme ? Styles.lightText : Styles.darkText}>
              {description}
            </p>
          </div>
        </div>
        <div className="md:hidden block">
          <div className="flex flex-col justify-between">
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
          <div className="pt-4">
            <p className={theme ? Styles.lightText : Styles.darkText}>
              {description}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
