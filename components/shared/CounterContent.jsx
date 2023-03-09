import React from "react";
import { Col, Row } from "antd";
import CardDashboard from "./CardDashboard";
import SkillIcon from "/public/assets/images/svgs/skill1-icon.svg";
import DotsIcon from "/public/assets/images/svgs/dot-icon.svg";
import Line1Icon from "/public/assets/images/svgs/line-icon.svg";
import Line2Icon from "/public/assets/images/svgs/line2-icon.svg";
import Line3Icon from "/public/assets/images/svgs/line3-icon.svg";
import HeartIcon from "/public/assets/images/svgs/heart-white-icon.svg";
import PackageIcon from "/public/assets/images/svgs/package-icon.svg";
import Company from "/public/assets/images/svgs/company-icon.svg";
export default function CounterContent({ theme }) {
  return (
    <Col span={24}>
      <Row>
        <Col span={24} className="mt-3">
          <Row>
            <Col className="px-4" lg={{ span: 6 }} md={{ span: 12 }} span={24}>
              <CardDashboard
                background="#4B4DED"
                leftIcon={<SkillIcon />}
                rightIcon={<DotsIcon />}
                counter={207}
                text={"Users"}
                vectorIcon={<Line1Icon />}
              />
            </Col>
            <Col className="px-4" lg={{ span: 6 }} md={{ span: 12 }} span={24}>
              <CardDashboard
                background="#6ACCE5"
                leftIcon={<HeartIcon />}
                rightIcon={<DotsIcon />}
                counter={13}
                text={"Favorite Jobs"}
                vectorIcon={<Line2Icon />}
              />
            </Col>
            <Col className="px-4" lg={{ span: 6 }} md={{ span: 12 }} span={24}>
              <CardDashboard
                background="#FBB03B"
                leftIcon={<Company />}
                rightIcon={<DotsIcon />}
                counter={37}
                text={"Job Alerts"}
                vectorIcon={<Line3Icon />}
              />
            </Col>
            <Col className="px-4" lg={{ span: 6 }} md={{ span: 12 }} span={24}>
              <CardDashboard
                background="#15C0AB"
                leftIcon={<PackageIcon />}
                rightIcon={<DotsIcon />}
                counter={207}
                text={"Applied Jobs"}
                vectorIcon={<Line1Icon />}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
