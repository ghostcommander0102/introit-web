import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Experience({ city, description, title, date, theme }) {
  return (
    <Row
      className={`py-6 md:px-8 px-2 ${
        theme ? Styles.lightRow : Styles.darkRow
      }`}
    >
      <Col span={24}>
        <div className="md:block hidden">
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
          <div className="pt-6">
            <p className={theme ? Styles.lightText : Styles.darkText}>
              {description}
            </p>
          </div>
        </div>
        <div className="md:hidden block">
          <div className="flex flex-col justify-start">
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
          </div>
          <div className="flex flex-col justify-betweenx">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {city}
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
