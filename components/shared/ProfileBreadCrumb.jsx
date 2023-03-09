import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
export default function ProfileBreaCrumb({
  theme,
  myProfileTranslate = {},
  tab,
  handleChangeTab,
}) {
  return (
    <Row className="pb-4 md:hidden block">
      <Col span={24}>
        <BreadcrumbItem>
          <Breadcrumb.Item onClick={() => {}}>
            <Link href="/">
              <a>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {myProfileTranslate["dashboard"]?.title}
                </span>
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
            <span
              className={
                theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
              }
            >
              {myProfileTranslate["profile"]?.title}
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className={
                theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
              }
            >
              {tab == 1
                ? myProfileTranslate["personal-infromation"]?.title
                : tab == 2
                ? myProfileTranslate["other-information"]?.title
                : tab == 3
                ? myProfileTranslate["security-and-login"]?.title
                : null}
            </span>
          </Breadcrumb.Item>
        </BreadcrumbItem>
      </Col>
    </Row>
  );
}
