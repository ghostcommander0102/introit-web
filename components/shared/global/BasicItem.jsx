import React from "react";
import { Button, Col, Form, Input, Popconfirm, Row } from "antd";
import Styles from "/styles/scss/dashboard/BasicItem.module.scss";
import Pen from "/public/assets/images/svgs/basic-pen.svg";
import PenDark from "/public/assets/images/svgs/dark/basic-pen.svg";
import Trash from "/public/assets/images/svgs/basic-trash.svg";
import TrashDark from "/public/assets/images/svgs/dark/basic-trash.svg";
import SaveIcon from "../../../public/assets/images/svgs/save-icon.svg";
export default function BasicItem({
  theme,
  data,
  deleted,
  show,
  changed,
  updated,
  translator = {},
}) {
  return (
    <Row>
      <Col span={24}>
        <div className={theme ? Styles.wrapperLight : Styles.wrapperDark}>
          <div className="w-full">
            <Form.Item className="mb-0">
              <Input
                disabled={data.isDisabled}
                value={data?.title}
                className={theme ? Styles.inputLight : Styles.inputDark}
                onChange={changed}
              />
            </Form.Item>
          </div>
          {data?.isUpdated ? (
            <div className="flex">
              <Button onClick={updated} className={Styles.save}>
                {translator["save"]?.title}
                <span className={Styles.icon}>
                  <SaveIcon />
                </span>
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </Col>
    </Row>
  );
}
