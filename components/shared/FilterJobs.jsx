import React from "react";
import { Col, Row, Form, Input } from "antd";
import Styles from "/styles/scss/dashboard/FilterCandi.module.scss";
import Search from "/public/assets/images/svgs/search-candy-icon.svg";
import Sort from "/public/assets/images/svgs/sortable-icon.svg";
import SortDark from "/public/assets/images/svgs/dark/sortable-icon.svg";
import Arrow from "/public/assets/images/svgs/arrow-button-job-icon.svg";
import ArrowDark from "/public/assets/images/svgs/dark/arrow-button-job-icon.svg";
import DividerItem from "./DividerItem";
import FilterButton from "./FilterButton";
export default function FilterJobs({ theme, handleShow }) {
  const styles = {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: theme ? "#6E7191" : "#F2F2F8",
    border: 0,
    backgroundColor: "transparent",
  };
  return (
    <Row className="pt-3 md:px-4  px-1">
      <Col span={12} className="flex items-center">
        <DividerItem theme={theme} content="Mange Jobs" />
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
      <Col span={12} className="mt-5 pt-2">
        <div className="flex items-start justify-end">
          <button style={styles}>
            Manage - Game Developer {theme ? <Arrow /> : <ArrowDark />}
          </button>
        </div>
      </Col>
    </Row>
  );
}
