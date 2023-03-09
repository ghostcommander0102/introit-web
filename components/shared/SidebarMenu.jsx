import React from "react";
import { Col, Menu, Row } from "antd";
export default function SidebarMenu({ items, active }) {
  return (
    <Row>
      <Col span={24}>
        <Menu
          rootClassName={active ? "menu-sidebar-active" : "menu-sidebar"}
          expandIcon={<span></span>}
          mode="vertical"
          items={items}
        />
      </Col>
    </Row>
  );
}
