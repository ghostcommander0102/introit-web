import React from "react";
import { Button, Col, Row } from "antd";
import Dashboard from "/public/assets/images/svgs/dashboard-b.svg";
import Eye from "/public/assets/images/svgs/eye-b.svg";
import Plus from "/public/assets/images/svgs/plus-b.svg";
import CheckBoxItem from "../form/CheckboxItem";
import Styles from "../../../styles/scss/dashboard/BuilderButton.module.scss";
export default function Menu() {
  return (
    <Row>
      <Col span={24}>
        <div className={Styles.menuWrapper}>
          <div className="flex items-center">
            <div>
              <Dashboard />
            </div>
            <div className="pl-10">
              <p className="mb-0">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="pr-10 flex items-center">
              <div className="pr-10">
                <Button className={Styles.button}>
                  <Eye />
                </Button>
              </div>
              <div className="pr-10">
                <Button className={Styles.button}>
                  <Plus />
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="pr-6">
                <CheckBoxItem />
              </div>
              <div className="pr-6">
                <CheckBoxItem />
              </div>
              <div>
                <CheckBoxItem />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
