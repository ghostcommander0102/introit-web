import React from "react";
import { Button, Dropdown, Menu } from "antd";
import Styles from "/styles/scss/dashboard/CandidateDropDown.module.scss";
import Dots from "/public/assets/images/svgs/threedot-icon.svg";
import DotsDark from "/public/assets/images/svgs/dark/threedot-icon.svg";
import Approve from "/public/assets/images/svgs/approve-icon.svg";
import Edit from "/public/assets/images/svgs/edit-icon.svg";
import Delete from "/public/assets/images/svgs/delete-icon.svg";
import Suspend from "/public/assets/images/svgs/suspend-icon.svg";
import ApproveDark from "/public/assets/images/svgs/dark/approve-icon.svg";
import EditDark from "/public/assets/images/svgs/dark/edit-icon.svg";
import DeleteDark from "/public/assets/images/svgs/dark/delete-icon.svg";
import SuspendDark from "/public/assets/images/svgs/dark/suspend-icon.svg";
export default function CandidateDropDown({ theme }) {
  const menu = (
    <Menu style={{ width: 100, height: 100 }}>
      <Menu.Item>
        <div className="flex justify-between items-center">
          <span className="flex items-center pt-1.5">
            {theme ? <Approve /> : <ApproveDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            Approve
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="flex justify-between items-center">
          <span className="flex items-center pt-1.5">
            {theme ? <Edit /> : <EditDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            Edit
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="flex justify-between items-center">
          <span className="flex items-center pt-1.5">
            {theme ? <Suspend /> : <SuspendDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            Suspend
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="flex justify-between items-center">
          <span className="flex items-center pt-1.5">
            {theme ? <Delete /> : <DeleteDark />}
          </span>
          <span className={theme ? Styles.textLight : Styles.textDark}>
            Disable
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
