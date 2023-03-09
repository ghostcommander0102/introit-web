import React from "react";
import { Button, Drawer } from "antd";
import Styles from "../../styles/scss/dashboard/UserProfDrawer.module.scss";
import Approve from "/public/assets/images/svgs/approve-icon.svg";
import ApproveDark from "/public/assets/images/svgs/dark/approve-icon.svg";
import Suspend from "/public/assets/images/svgs/suspend-icon.svg";
import SuspendDark from "/public/assets/images/svgs/dark/suspend-icon.svg";
export default function UserProfDrawer({
  visible = false,
  onClose,
  theme,
  drawerId,
  UserProfSuspend,
  UserProfUnsuspend,
  translator = {},
  setStatus,
}) {
  return (
    <Drawer
      headerStyle={{ display: "none" }}
      onClose={onClose}
      placement={"bottom"}
      visible={visible}
      className="mobile-drawer"
    >
      <div>
        <Button
          onClick={() => {
            setStatus((prev) => {
              return { ...prev, status: "approved", id: drawerId?.id };
            });
          }}
          className={theme ? Styles.lightButton : Styles.darkButton}
        >
          <span className="pr-6 flex items-center pt-1">
            {theme ? <Approve /> : <ApproveDark />}
          </span>
          {translator["approve"]?.title}
        </Button>
        <Button
          onClick={() => {
            setStatus((prev) => {
              return { ...prev, status: "suspended", id: drawerId?.id };
            });
          }}
          className={theme ? Styles.lightButton : Styles.darkButton}
        >
          <span className="pr-6 flex items-center pt-1">
            {theme ? <Suspend /> : <SuspendDark />}
          </span>
          {translator["suspend"]?.title}
        </Button>
      </div>
    </Drawer>
  );
}
