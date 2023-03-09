import React from "react";
import { Col, Drawer, Row } from "antd";
import FilterSelect from "../form/admin/FilterSelect";
import FilterButton from "../FilterButton";
import Pen from "/public/assets/images/svgs/pen-user.svg";
import PenDark from "/public/assets/images/svgs/dark/pen-user.svg";
export default function UserDrawer({
  visible,
  onClose,
  theme,
  router,
  cv,
  role,
  userTranslate,
  userId,
}) {
  return (
    <Drawer
      headerStyle={{ display: "none" }}
      placement="bottom"
      onClose={onClose}
      visible={visible}
      className="user-drawer"
      bodyStyle={{ padding: 0, backgroundColor: theme ? "#ffffff" : "#191a24" }}
    >
      <Row className="pt-2 px-2">
        <Col className="pr-2.5" span={8}>
          <FilterSelect
            onChange={(value) =>
              setRoleInputs((prev) => {
                return { ...prev, role: value };
              })
            }
            theme={theme}
            defaultValue={cv?.role}
            options={role}
          />
        </Col>
        <Col span={8}>
          <FilterSelect
            onChange={(value) =>
              setStatusInputs((prev) => {
                return { ...prev, status: value };
              })
            }
            defaultValue={cv?.status}
            theme={theme}
            placeholder="status"
            options={[
              { label: "approved", value: "approved" },
              { label: "suspended", value: "suspended" },
            ]}
          />
        </Col>
        <Col className="pl-2.5 pt-0.5" span={8}>
          <FilterButton
            inDrawer={true}
            onClick={() => router.push(`/profile/user-profile/edit/${userId}`)}
            icon={<Pen />}
            iconDark={<PenDark />}
            text={userTranslate["edit"]?.title}
            theme={theme}
          />
        </Col>
      </Row>
    </Drawer>
  );
}
