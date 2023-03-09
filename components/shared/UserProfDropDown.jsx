import React from "react";
import { Button, Dropdown, Menu } from "antd";
import Styles from "/styles/scss/dashboard/CandidateDropDown.module.scss";
import Dots from "/public/assets/images/svgs/threedot-icon.svg";
import DotsDark from "/public/assets/images/svgs/dark/threedot-icon.svg";
import Approve from "/public/assets/images/svgs/approve-icon.svg";
import Suspend from "/public/assets/images/svgs/suspend-icon.svg";
import ApproveDark from "/public/assets/images/svgs/dark/approve-icon.svg";
import SuspendDark from "/public/assets/images/svgs/dark/suspend-icon.svg";
export default function UserProfDropDown({
  theme,
  data,
  setStatus,
  myTranslateUserProfile = {},
}) {
  const menu = (
    <Menu style={{ width: 120, height: 66 }}>
      <Menu.Item
        onClick={() =>
          setStatus((prev) => {
            return { ...prev, status: "approved", id: data?.id };
          })
        }
      >
        <div className="flex justify-center items-center">
          <span className="flex items-center pr-2">
            {theme ? <Approve /> : <ApproveDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            {myTranslateUserProfile["approve"]?.title}
          </span>
        </div>
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          setStatus((prev) => {
            return { ...prev, status: "suspended", id: data?.id };
          })
        }
      >
        <div className="flex justify-center items-center">
          <span className="flex items-center pr-2">
            {theme ? <Suspend /> : <SuspendDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            {myTranslateUserProfile["suspend"]?.title}
          </span>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow={false}>
      <Button className={Styles.buttonDropDown}>
        {theme ? <Dots /> : <DotsDark />}
      </Button>
    </Dropdown>
  );
}
