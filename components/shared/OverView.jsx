import React from "react";
import { Col, Row } from "antd";
import ChartItem from "./ChartItem";
import SelectItem from "./form/SelectItem";
import DividerItem from "./DividerItem";
import JobCountLable from "./JobCountLable";
import MarginTop from "./MarginTop";
import Circle from "/styles/scss/dashboard/OverViewCircle.module.scss";
export default function OverView({ theme }) {
  return (
    <Col span={24} className="mt-5 md:px-2 px-0">
      <Row className="md:px-4  px-2">
        <Col md={{ span: 18 }} span={12} className="my-auto">
          <DividerItem theme={theme} content="Overview" />
        </Col>
        <Col md={{ span: 6 }} span={12} className="flex justify-end">
          <SelectItem
            margin={0}
            theme={theme}
            showLabel={false}
            defaultValue={[]}
            options={[]}
            isSearchable={false}
            height="41.6px"
            hasBorder={true}
            width={140}
          />
        </Col>
      </Row>
      <MarginTop marginTop={30} />
      <Row className="px-2">
        <Col lg={{ span: 18 }} span={24}>
          <ChartItem theme={theme} />
        </Col>
        <Col lg={{ span: 6 }} span={24}>
          <div className="flex flex-col justify-center text-center">
            <span
              className={theme ? Circle.headCountLight : Circle.headCountDark}
            >
              37
            </span>
            <span
              className={
                theme ? Circle.headCountDownLight : Circle.headCountDownDark
              }
            >
              Total Applied Jobs
            </span>
            <div>
              <JobCountLable
                theme={theme}
                color="#685AD3"
                title="Applied Jobs"
              />
              <JobCountLable
                theme={theme}
                color="#3869FF"
                title="Favorite Jobs"
              />
              <JobCountLable theme={theme} color="$warn" title="Job Alerts" />
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
}
