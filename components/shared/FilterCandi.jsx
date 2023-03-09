import React from "react";
import { Col, Row, Form, Input } from "antd";
import Styles from "/styles/scss/dashboard/FilterCandi.module.scss";
import Search from "/public/assets/images/svgs/search-candy-icon.svg";
import Sort from "/public/assets/images/svgs/sortable-icon.svg";
import SortDark from "/public/assets/images/svgs/dark/sortable-icon.svg";
import DividerItem from "./DividerItem";
import FilterButton from "./FilterButton";
export default function FilterCandi({ theme, handleShow }) {
  return (
    <Row className="pt-3 md:px-4  px-1">
      <Col span={12} className="flex items-center">
        <DividerItem theme={theme} content="Liked Candidates" />
      </Col>
      <Col span={12} className="md:pl-5 pl-0">
        <div className="ps-md-2 ps-0">
          <div className="flex md:justify-end justify-center md:pl-5 pl-0 mt-md-0 mt-3">
            <div className="ml-3" style={{ marginTop: 6 }}>
              <FilterButton
                icon={<Sort />}
                iconDark={<SortDark />}
                text="Sort by"
                theme={theme}
              />
            </div>
            <div className="ml-3" style={{ marginTop: 6 }}>
              <FilterButton theme={theme} onClick={handleShow} />
            </div>
          </div>
        </div>
      </Col>
      <Col span={12} className="mt-5">
        <Form.Item>
          <Input
            prefix={theme ? <Search /> : <Search />}
            className={theme ? Styles.lightInput : Styles.darkInput}
            placeholder="Search for candidates..."
          />
        </Form.Item>
      </Col>
    </Row>
  );
}
