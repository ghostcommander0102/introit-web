import React, { useState } from "react";
import { Col, Menu, Row } from "antd";

const { SubMenu } = Menu;
import ArrowButton from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { CurrnetRoutes } from "atoms/CurrnetRoutes";
export default function MenuProfile({
  currentRoute,
  items,
  sidebarMini,
  title,
  icon,
}) {
  const [open, setOpen] = useRecoilState(CurrnetRoutes);
  return (
    <Row>
      <Col
        span={24}
        className={`${
          sidebarMini ? "wrapper-side-menu-mini" : "wrapper-side-menu"
        } ${currentRoute ? "active-wrapperside" : "deactive-wrapperside"}`}
      >
        <Menu
          onOpenChange={(keys) => setOpen(keys[0] == "1")}
          expandIcon={open ? <ArrowUp /> : <ArrowButton />}
          mode="inline"
        >
          <SubMenu
            key="1"
            icon={<span className="pl-4.5 w-3/12">{icon}</span>}
            title={
              <span className={sidebarMini ? "hidden w-9/12" : "w-9/12"}>
                {title}
              </span>
            }
          >
            {items?.map((item, index) => {
              return (
                <Menu.Item
                  className={item.active ? "ant-menu-item-selected" : ""}
                  key={index}
                >
                  <Link href={item.href}>{item?.name}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        </Menu>
      </Col>
    </Row>
  );
}
