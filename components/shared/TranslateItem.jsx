import React from "react";
import { Button, Col, Popconfirm, Row } from "antd";
import Styles from "/styles/scss/dashboard/TranslateItem.module.scss";
import Arrow from "/public/assets/images/svgs/role-arrow.svg";
import ArrowDark from "/public/assets/images/svgs/dark/role-arrow.svg";
import Verify from "/public/assets/images/svgs/verify-translate.svg";
import Suspend from "/public/assets/images/svgs/suspend.svg";
import SuspendDark from "/public/assets/images/svgs/dark/suspend.svg";
import Trash from "/public/assets/images/svgs/basic-trash.svg";
import TrashDark from "/public/assets/images/svgs/dark/basic-trash.svg";
export default function TranslateItem({
  data,
  setTranslateIsCreate,
  setTranslateTarget,
  theme,
  handleLiveLanguage,
  handleDeletTranslate,
  globalSettingTranslate,
}) {
  return (
    <Row className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
      <Col span={24} className="flex">
        <div className="md:flex hidden justify-between items-center w-full">
          <div className="flex w-1/2">
            <div className={Styles.flagWrapper}>
              <p className="mb-0">{data?.code}</p>
            </div>
            <div className="pl-4">
              <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                {data?.title}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-1/2">
            <div>
              <p className={theme ? Styles.lightCounter : Styles.darkCounter}>
                {data?.counter} Completed
              </p>
            </div>
            <div className="flex">
              <Popconfirm
                title={
                  globalSettingTranslate["are-you-sure-to-delete-this-item"]
                    ?.title
                }
                okText={globalSettingTranslate["yes"]?.title}
                cancelText={globalSettingTranslate["no"]?.title}
                onCancel={() => {}}
                onConfirm={handleDeletTranslate}
              >
                <Button className={Styles.button}>
                  {theme ? <Trash /> : <TrashDark />}
                </Button>
              </Popconfirm>
              <Button onClick={handleLiveLanguage} className={Styles.button}>
                {data?.isOnLine ? (
                  <Verify />
                ) : theme ? (
                  <Suspend />
                ) : (
                  <SuspendDark />
                )}
              </Button>
              <Button
                onClick={() => {
                  setTranslateIsCreate(true);
                  setTranslateTarget(data.id);
                }}
                className={Styles.button}
              >
                {theme ? <Arrow /> : <ArrowDark />}
              </Button>
            </div>
          </div>
        </div>
        <div className="md:hidden flex justify-between items-center w-full">
          <div className="flex items-center w-1/2">
            <div className={Styles.flagWrapper}>
              <p className="mb-0">{data?.code}</p>
            </div>
            <div className="flex flex-col pl-4">
              <div>
                <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                  {data?.title}
                </p>
              </div>{" "}
              <div>
                <p className={theme ? Styles.lightCounter : Styles.darkCounter}>
                  {data?.counter} Completed
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-end w-1/2">
            <div className="flex">
              <Popconfirm
                title={
                  globalSettingTranslate["are-you-sure-to-delete-this-item"]
                    ?.title
                }
                okText={globalSettingTranslate["yes"]?.title}
                cancelText={globalSettingTranslate["no"]?.title}
                onCancel={() => {}}
                onConfirm={handleDeletTranslate}
              >
                <Button className={Styles.button}>
                  {theme ? <Trash /> : <TrashDark />}
                </Button>
              </Popconfirm>
              <Button onClick={handleLiveLanguage} className={Styles.button}>
                {data?.isOnLine ? (
                  <Verify />
                ) : theme ? (
                  <Suspend />
                ) : (
                  <SuspendDark />
                )}
              </Button>
              <Button
                onClick={() => {
                  setTranslateIsCreate(true);
                  setTranslateTarget(data.id);
                }}
                className={Styles.button}
              >
                {theme ? <Arrow /> : <ArrowDark />}
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
