import React from "react";
import { Button, Col, Popconfirm, Row } from "antd";
import Styles from "/styles/scss/dashboard/QuartetItem.module.scss";
import Edit from "/public/assets/images/svgs/edit-resume-icon.svg";
import EditDark from "/public/assets/images/svgs/dark/edit-resume-icon.svg";
import Delete from "/public/assets/images/svgs/delete-resume-icon.svg";
import DeleteDark from "/public/assets/images/svgs/dark/delete-resume-icon.svg";
import Sort from "/public/assets/images/svgs/sort.svg";
import SortDark from "/public/assets/images/svgs/dark/sort.svg";
export default function QuartetItem({
  title,
  date,
  location,
  detail,
  theme,
  edit,
  deleted,
  translator = {},
}) {
  return (
    <Row className={Styles.master}>
      <Col span={24} className="md:block hidden">
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
          <div className="w-1/2">
            <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
              {title}
            </p>
            <p className={theme ? Styles.lightBody : Styles.darkBody}>{date}</p>
            <p className={theme ? Styles.lightBody : Styles.darkBody}>
              {detail}
            </p>
          </div>
          <div className="w-1/2 flex justify-between">
            <div className="flex justify-center items-center">
              <p className={theme ? Styles.lightBody : Styles.darkBody}>
                {location}
              </p>
            </div>
            <div>
              <Button onClick={edit} className={Styles.Button}>
                {theme ? <Edit /> : <EditDark />}
              </Button>
              <Button className={Styles.Button}>
                {theme ? <Sort /> : <SortDark />}
              </Button>
              <Popconfirm
                title={translator["are-you-sure-to-delete-this-item"]?.title}
                okText={translator["yes"]?.title}
                cancelText={translator["no"]?.title}
                onCancel={() => {}}
                onConfirm={deleted}
              >
                <Button className={Styles.Button}>
                  {theme ? <Delete /> : <DeleteDark />}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Col>
      <Col span={24} className="md:hidden block">
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
          <div className="w-2/3">
            <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
              {title}
            </p>
            <p className={theme ? Styles.lightBody : Styles.darkBody}>{date}</p>
            <p className={theme ? Styles.lightBody : Styles.darkBody}>
              {detail}
            </p>
            <p className={theme ? Styles.lightBody : Styles.darkBody}>
              {location}
            </p>
          </div>
          <div className="w-1/3 flex justify-between">
            <div>
              <Button onClick={edit} className={Styles.Button}>
                {theme ? <Edit /> : <EditDark />}
              </Button>
              <Button className={Styles.Button}>
                {theme ? <Sort /> : <SortDark />}
              </Button>

              <Popconfirm
                title={translator["are-you-sure-to-delete-this-item"]?.title}
                okText={translator["yes"]?.title}
                cancelText={translator["no"]?.title}
                onCancel={() => {}}
                onConfirm={deleted}
              >
                <Button className={Styles.Button}>
                  {theme ? <Delete /> : <DeleteDark />}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
