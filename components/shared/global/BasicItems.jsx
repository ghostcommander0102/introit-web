import React from "react";
import { Button, Col, Popconfirm, Row } from "antd";
import Styles from "/styles/scss/dashboard/BasicItem.module.scss";
import Pen from "/public/assets/images/svgs/basic-pen.svg";
import PenDark from "/public/assets/images/svgs/dark/basic-pen.svg";
import Trash from "/public/assets/images/svgs/basic-trash.svg";
import TrashDark from "/public/assets/images/svgs/dark/basic-trash.svg";
export default function BasicItems({ theme, data, deleted, show, translator }) {
  return (
    <Row>
      <Col span={24}>
        <div className={theme ? Styles.wrapperLight : Styles.wrapperDark}>
          <div className="w-full flex items-center justify-between pr-2 pl-4">
            <div className="flex justify-between items-center">
              <div>
                <span>{data?.title}</span>
              </div>
            </div>
            <div className="flex">
              <div>
                <Button onClick={show} className={Styles.button}>
                  {theme ? <Pen /> : <PenDark />}
                </Button>
              </div>
              <div>
                <Popconfirm
                  title={translator["are-you-sure-to-delete-this-item"]?.title}
                  okText={translator["yes"]?.title}
                  cancelText={translator["no"]?.title}
                  onCancel={() => {}}
                  onConfirm={deleted}
                >
                  <Button className={Styles.button}>
                    {theme ? <Trash /> : <TrashDark />}
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
