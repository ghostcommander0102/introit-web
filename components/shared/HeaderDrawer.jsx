import React from "react";
import { Drawer } from "antd";
import ButtonHeader from "./ButtonHeader";
import ShareDark from "/public/assets/images/svgs/dark/share.svg";
import ShareLight from "/public/assets/images/svgs/share.svg";
import Setting from "/public/assets/images/svgs/setting.svg";
import SettingDark from "/public/assets/images/svgs/dark/setting.svg";
import Close from "/public/assets/images/svgs/close-header.svg";
import Styles from "/styles/scss/dashboard/HeaderDrawer.module.scss";
export default function HeaderDrawer({
  visible,
  onClose,
  theme,
  handleInvitationCodeModal,
  handleSetting,
}) {
  return (
    <Drawer
      headerStyle={{ display: "none" }}
      className="header-drawer-mobile"
      placement="top"
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex justify-between px-2 pt-4">
        <div className="flex items-center">
          <ButtonHeader
            theme={theme}
            onClick={handleInvitationCodeModal}
            icon={theme ? <ShareLight /> : <ShareDark />}
          />

          <ButtonHeader
            theme={theme}
            onClick={handleSetting}
            icon={theme ? <Setting /> : <SettingDark />}
          />
        </div>
        <div className="flex items-center">
          <div
            className={theme ? Styles.lightSeprator : Styles.darkSeprator}
          ></div>
          <div className="pl-8 " onClick={onClose}>
            {theme ? <Close /> : <Close />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
