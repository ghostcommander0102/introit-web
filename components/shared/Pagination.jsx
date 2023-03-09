import React from "react";
import { Button, Col, Row } from "antd";
import LeftArrow from "/public/assets/images/svgs/left-pagination-icon.svg";
import RightArrow from "/public/assets/images/svgs/right-pagination-icon.svg";
import Styles from "/styles/scss/dashboard/Pagination.module.scss";
export default function Pagination({
  handlePrevPage,
  handleNextPage,
  current,
  pages,
  translator = {},
  theme,
}) {
  return (
    <Row>
      <Col span={24}>
        <div className="flex">
          <div>
            <Button
              disabled={current <= 1}
              onClick={handlePrevPage}
              className={Styles.leftButton}
            >
              <LeftArrow />
            </Button>
          </div>
          <span className={theme ? Styles.lightPage : Styles.darkPage}>
            {current} {translator["of"]?.title} {pages}
          </span>
          <div>
            <Button
              disabled={pages <= current}
              onClick={handleNextPage}
              className={Styles.rightButton}
            >
              <RightArrow />
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
