import React, { useState } from "react";
import { Col, Row, Select } from "antd";
import Styles from "/styles/scss/dashboard/PerPage.module.scss";
import ArrowButton from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
export default function PerPage({
  setInputsTake,
  inputstake,
  setInputsPage,
  setInputsSkip,
  translator = {},
  theme,
}) {
  // ***************************
  // Define State
  // ***************************
  const [open, setOpen] = useState(false);
  return (
    <Row>
      <Col span={24}>
        <div className="flex">
          <span className={theme ? Styles.lightText : Styles.darkText}>
            {translator["result-per-page"]?.title} :
          </span>
          <div className="wrapper-perpage">
            <Select
              onDropdownVisibleChange={(type) =>
                type ? setOpen(true) : setOpen(false)
              }
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              suffixIcon={open ? <ArrowUp /> : <ArrowButton />}
              value={inputstake?.take}
              style={{ width: 60 }}
              onChange={(value) => {
                setInputsTake((prev) => {
                  return { ...prev, take: value };
                });
                setInputsPage((prev) => {
                  return { ...prev, current: 1 };
                });
                setInputsSkip((prev) => {
                  return { ...prev, skip: 0 };
                });
              }}
            >
              <Select.Option key={0} value={5}>
                5
              </Select.Option>
              <Select.Option key={1} value={24}>
                24
              </Select.Option>
              <Select.Option key={2} value={48}>
                48
              </Select.Option>
              <Select.Option key={3} value={96}>
                96
              </Select.Option>
            </Select>
          </div>
        </div>
      </Col>
    </Row>
  );
}
