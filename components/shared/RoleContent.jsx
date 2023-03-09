import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/RoleContent.module.scss";
import MiniLogo from "/public/assets/images/svgs/role-logo-icon.svg";
import MiniLogoDark from "/public/assets/images/svgs/dark/role-logo-icon.svg";
import Link from "next/link";
export default function RoleContent({
  theme,
  handleMouseEnter,
  handleMouseOut,
  handleSetRole,
  enter,
}) {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            enter == 1
              ? theme
                ? "url(/assets/images/svgs/role-job-icon.svg)"
                : "url(/assets/images/svgs/dark/role-job-icon.svg)"
              : enter == 2
              ? theme
                ? "url(/assets/images/svgs/role-recruiter-icon.svg)"
                : "url(/assets/images/svgs/dark/role-recruiter-icon.svg)"
              : enter == 3
              ? theme
                ? "url(/assets/images/svgs/role-product-icon.svg)"
                : "url(/assets/images/svgs/dark/role-product-icon.svg)"
              : theme
              ? "url(/assets/images/svgs/role-job-icon.svg)"
              : "url(/assets/images/svgs/dark/role-job-icon.svg)",
        }}
        className={Styles.wrapper}
      ></div>
      <div className={Styles.content}>
        <Row>
          <Col span={24}>
            <div className={Styles.wrapperLogo}>
              <Link href="https://introit.io/">
                <a>{theme ? <MiniLogo /> : <MiniLogoDark />}</a>
              </Link>
            </div>
          </Col>
          <Col className="my-3" span={24}>
            <button
              onClick={() => handleSetRole(5)}
              onMouseOut={handleMouseOut}
              onMouseEnter={() => handleMouseEnter(1)}
              className={`${enter == 1 ? Styles.active : ""} ${
                theme ? Styles.buttonLight : Styles.buttonDark
              }`}
            >
              I'm looking for a job
            </button>
          </Col>
          <Col span={24} className="my-3">
            <button
              onClick={() => handleSetRole(3)}
              onMouseOut={handleMouseOut}
              onMouseEnter={() => handleMouseEnter(2)}
              className={`${enter == 2 ? Styles.active : ""} ${
                theme ? Styles.buttonLight : Styles.buttonDark
              }`}
            >
              I am a Recruiter
            </button>
          </Col>
          <Col md={24} className="my-3">
            <button
              onClick={() => handleSetRole(6)}
              onMouseOut={handleMouseOut}
              onMouseEnter={() => handleMouseEnter(3)}
              className={`${enter == 3 ? Styles.active : ""} ${
                theme ? Styles.buttonLight : Styles.buttonDark
              }`}
            >
              I'm curious about your product
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
