import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function References({ email, company, phone, title, theme }) {
  return (
    <Row className="py-6 px-8">
      <Col span={24}>
        <div>
          <div>
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
          </div>
          <div className="pt-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {company}
            </div>
          </div>
          <div className="pt-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {email}
            </div>
          </div>
          <div className="pt-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {phone}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
