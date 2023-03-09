import React from "react";
import { Button, Col, Popconfirm, Row } from "antd";
import Styles from "/styles/scss/dashboard/RoleItem.module.scss";
import Role from "/public/assets/images/svgs/role.svg";
import RoleDark from "/public/assets/images/svgs/dark/role.svg";
import Arrow from "/public/assets/images/svgs/role-arrow.svg";
import ArrowDark from "/public/assets/images/svgs/dark/role-arrow.svg";
import Trash from "/public/assets/images/svgs/basic-trash.svg";
import TrashDark from "/public/assets/images/svgs/dark/basic-trash.svg";
import Star from "/public/assets/images/svgs/star-role.svg";
import StarDark from "/public/assets/images/svgs/dark/star-role.svg";
import User from "/public/assets/images/svgs/user-role.svg";
import UserDark from "/public/assets/images/svgs/dark/user-role.svg";
import BlueStar from "/public/assets/images/svgs/blue-star.svg";
import MenuBuilder from "/public/assets/images/svgs/menu-builder.svg";
import MenuBuilderDark from "/public/assets/images/svgs/dark/menu-builder.svg";
import Link from "next/link";
export default function RoleItem({
  theme,
  data,
  handleDeleteRole,
  isDefaultRole,
  handleSetDefaultRole,
  handleChangeRouteRole,
  globalSettingTranslate,
  router,
  handleChangeTab,
}) {
  return (
    <Row className="w-full">
      <Col span={24} className="w-full">
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
          <div className="md:flex hidden justify-between items-center ">
            <div
              style={{ height: 50 }}
              className="flex lg:w-4/12 md:w-6/12 items-center px-5"
            >
              <div className="flex items-center">
                {theme ? <Role /> : <RoleDark />}
              </div>
              <div className="flex justify-between items-start pl-10 w-full">
                <div>
                  <span
                    className={
                      isDefaultRole
                        ? Styles.blueName
                        : theme
                        ? Styles.lightRole
                        : Styles.darkRole
                    }
                  >
                    {data?.title}
                  </span>
                </div>
                <div className="w-full flex justify-end">
                  <span
                    style={{ paddingLeft: 5, paddingTop: 1 }}
                    className={
                      isDefaultRole
                        ? Styles.blueItem
                        : theme
                        ? Styles.lightRoleName
                        : Styles.darkRoleName
                    }
                  >
                    {data?.members} {globalSettingTranslate["members"]?.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-6/12 justify-end flex">
              <div>
                <Button
                  onClick={handleSetDefaultRole}
                  className={Styles.button}
                >
                  {isDefaultRole ? (
                    <BlueStar />
                  ) : theme ? (
                    <Star />
                  ) : (
                    <StarDark />
                  )}
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleChangeRouteRole}
                  className={Styles.button}
                >
                  {theme ? <User /> : <UserDark />}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleChangeTab(6)}
                  className={Styles.button}
                >
                  {theme ? <MenuBuilder /> : <MenuBuilderDark />}
                </Button>
              </div>
              <div>
                <Popconfirm
                  onConfirm={handleDeleteRole}
                  okText={globalSettingTranslate["yes"]?.title}
                  cancelText={globalSettingTranslate["no"]?.title}
                  title={
                    globalSettingTranslate["are-you-sure-to-delete-this-role"]
                      ?.title
                  }
                >
                  <Button className={Styles.button}>
                    {theme ? <Trash /> : <TrashDark />}
                  </Button>
                </Popconfirm>
              </div>
              <div>
                <Link href={`/global-setting/accesses/permission/${data?.id}`}>
                  <Button className={Styles.button}>
                    {theme ? <Arrow /> : <ArrowDark />}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col">
            <div style={{ height: 50 }} className="flex w-12/12 items-center">
              <div className="flex items-center">
                {theme ? <Role /> : <RoleDark />}
              </div>
              <div className="flex justify-between items-start pl-5 w-full">
                <div>
                  <span
                    className={
                      isDefaultRole
                        ? Styles.blueName
                        : theme
                        ? Styles.lightRole
                        : Styles.darkRole
                    }
                  >
                    {data?.title}
                  </span>
                </div>
                <div className="w-full flex justify-end">
                  <span
                    style={{ paddingLeft: 5, paddingTop: 1 }}
                    className={
                      isDefaultRole
                        ? Styles.blueItem
                        : theme
                        ? Styles.lightRoleName
                        : Styles.darkRoleName
                    }
                  >
                    {data?.members} {globalSettingTranslate["members"]?.title}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-12/12  flex justify-between">
              <div>
                <Button
                  onClick={handleSetDefaultRole}
                  className={Styles.button}
                >
                  {isDefaultRole ? (
                    <BlueStar />
                  ) : theme ? (
                    <Star />
                  ) : (
                    <StarDark />
                  )}
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleChangeRouteRole}
                  className={Styles.button}
                >
                  {theme ? <User /> : <UserDark />}
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleChangeTab(6)}
                  className={Styles.button}
                >
                  {theme ? <MenuBuilder /> : <MenuBuilderDark />}
                </Button>
              </div>
              <div>
                <Popconfirm
                  onConfirm={handleDeleteRole}
                  okText={globalSettingTranslate["yes"]?.title}
                  cancelText={globalSettingTranslate["no"]?.title}
                  title={
                    globalSettingTranslate["are-you-sure-to-delete-this-role"]
                      ?.title
                  }
                >
                  <Button className={Styles.button}>
                    {theme ? <Trash /> : <TrashDark />}
                  </Button>
                </Popconfirm>
              </div>
              <div>
                <Link href={`/global-setting/accesses/permission/${data?.id}`}>
                  <Button className={Styles.button}>
                    {theme ? <Arrow /> : <ArrowDark />}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
