import React from "react";
import { Button, Col, Row } from "antd";
import Sun from "/public/assets/images/svgs/dark/sun-icon.svg";
import Moon from "/public/assets/images/svgs/moon-icon.svg";
import Styles from "/styles/scss/dashboard/AuthHeader.module.scss";
import MiniLogo from "/public/assets/images/svgs/logo-signup-resume.svg";
import MiniLogoDark from "/public/assets/images/svgs/logo-signup-resume.svg";
import Link from "next/link";
export default function Header({ theme, handleChangeTheme }) {
  return (
    <div className={Styles.wrapper}>
      <Row>
        <Col span={12}>
          <Link href="https://introit.io/">
            <a>{theme ? <MiniLogo /> : <MiniLogoDark />}</a>
          </Link>
        </Col>
        {/* <Col span={24}>
          <div className="flex justify-end">
            <Button
              className={theme ? Styles.lightButton : Styles.darkButton}
              onClick={handleChangeTheme}
            >
              {theme ? <Moon /> : <Sun />}
            </Button>
          </div>
        </Col> */}
      </Row>
    </div>
  );
}
