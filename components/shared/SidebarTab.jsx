import Link from "next/link";
import React from "react";
import { Row, Col } from "antd";
import Styles from "/styles/scss/dashboard/Sidebar.module.scss";

export default function SidebarTab({ icon, title, active, theme, href = "" }) {
  return (
    <Row>
      <Col span={24} className="cursor-pointer">
        <Link href={href}>
          <div
            className={`${
              theme
                ? active
                  ? Styles.lightActive
                  : ""
                : active
                ? Styles.darkActive
                : ""
            } 
            ${Styles.tab}`}
          >
            <div className="flex justify-center items-center pl-4">
              <div>{icon}</div>
            </div>
            <div className="pl-6">
              <p
                style={{ fontWeight: active ? 700 : "" }}
                className={`${theme ? Styles.lightTitle : Styles.darkTitle} ${
                  active ? Styles.activeTitle : null
                }`}
              >
                {title}
              </p>
            </div>
          </div>
        </Link>
      </Col>
    </Row>
  );
}
