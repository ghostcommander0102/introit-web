import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Internships({ city, title, date, theme }) {
  return (
    <Row
      className={`py-6 md:px-8 px-2 ${
        theme ? Styles.lightRow : Styles.darkRow
      }`}
    >
      <Col span={24}>
        <div>
          <div className="flex justify-start">
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {city}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
