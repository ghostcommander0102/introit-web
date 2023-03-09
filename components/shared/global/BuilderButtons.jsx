import React, { useState } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import Styles from "../../../styles/scss/dashboard/BuilderButton.module.scss";
import Attention from "public/assets/images/svgs/attention.svg";
export default function BuilderButton({ theme }) {
  const [active, setActive] = useState(1);
  return (
    <Row>
      <Col span={24}>
        <div className={theme ? Styles.lightWrapper : Styles.lightWrapper}>
          <div className="flex justify-between">
            <div className="w-1/2">
              <Button
                className={
                  active == 1
                    ? Styles.activeButton
                    : theme
                    ? Styles.lightButton
                    : Styles.darkButton
                }
                onClick={() => setActive(1)}
              >
                Sidebar
              </Button>
            </div>
            <div className="w-1/2 flex justify-end">
              <Button
                onClick={() => setActive(2)}
                className={
                  active == 2
                    ? Styles.activeButton
                    : theme
                    ? Styles.lightButton
                    : Styles.darkButton
                }
              >
                Header
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col span={24} className="pt-4 px-8">
        <div className="flex justify-between">
          <div>
            <p className={theme ? Styles.lightText : Styles.darkText}>
              Sidebar <span>items for</span> Admin
            </p>
          </div>
          <div className="flex">
            <Tooltip title="Select if you wish to hide on Desktop">
              <div className="pr-4 flex">
                <p>Desktop</p> <Attention />
              </div>
            </Tooltip>
            <Tooltip title="Select if you wish to hide on Mobile">
              <div className="pr-4 flex">
                <p>Mobile</p> <Attention />
              </div>
            </Tooltip>
            <Tooltip title="Select if you wish to hide on Tablet">
              <div className="flex">
                <p>Tablet </p>
                <Attention />
              </div>
            </Tooltip>
          </div>
        </div>
      </Col>
    </Row>
  );
}
