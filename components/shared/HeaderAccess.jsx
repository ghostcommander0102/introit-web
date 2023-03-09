import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/Access.module.scss";
export default function HeaderAccess({ theme, data, translator }) {
  return (
    <Row className="pt-2">
      <Col span={24}>
        <div className="flex justify-between">
          <div className="flex w-1/4">
            <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
              {data?.title}
            </p>
            <p className={theme ? Styles.lightSubTitle : Styles.darkSubTitle}>
              {translator["access"]?.title}
            </p>
          </div>
          <div className="md:flex hidden w-3/4 justify-between item-center pl-5">
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["add-invite"]?.title}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["create"]?.title}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["view"]?.title}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["edit"]?.title}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["delete"]?.title}
              </p>
            </div>
            <div className="flex items-center">
              <p
                className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
              >
                {translator["approve"]?.title}
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
