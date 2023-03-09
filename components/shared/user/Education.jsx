import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Education({ city, degree, institute, date, theme }) {
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
              {institute}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div className={theme ? Styles.lightTitle : Styles.darkTitle}>
              {degree}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {city}
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <div className="flex flex-col justify-between">
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {institute}
            </div>
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className={theme ? Styles.lightText : Styles.text}>{city}</div>
            <div className={theme ? Styles.lightTitle : Styles.darkTitle}>
              {degree}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
