import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/SidebarProfile.module.scss";
import { isEmpty } from "lodash";
import Avatar from "./Avatar";
import ButtonTabBar from "./ButtonTabBar";
import Profile from "/public/assets/images/svgs/user2-icon.svg";
import ProfileActive from "/public/assets/images/svgs/user2-active-icon.svg";
import ProfileDark from "/public/assets/images/svgs/dark/user1-icon.svg";
import ProfileActiveDark from "/public/assets/images/svgs/dark/user2-active-icon.svg";
import Info from "/public/assets/images/svgs/personal-info-icon.svg";
import InfoActive from "/public/assets/images/svgs/personal-info-active.svg";
import InfoDark from "/public/assets/images/svgs/dark/personal-info-icon.svg";
import InfoActiveDark from "/public/assets/images/svgs/dark/personal-info-active.svg";
import Lock from "/public/assets/images/svgs/lock-icon.svg";
import LockActive from "/public/assets/images/svgs/lock-active-icon.svg";
import LockDark from "/public/assets/images/svgs/dark/lock-icon.svg";
import LockActiveDark from "/public/assets/images/svgs/dark/lock-active-icon.svg";
import MarginTop from "./MarginTop";
export default function SidebarProfile({
  theme,
  handleOpenProf,
  handleOpenBanner,
  currentUser,
  tab,
  handleChangeTab,
  myProfileTranslate = {},
  edit,
}) {
  //***************************
  // define state
  //***************************
  const imgValue = !isEmpty(currentUser?.banner)
    ? `url(${currentUser?.banner})`
    : theme
    ? "url(/assets/images/svgs/back-profile-icon.svg)"
    : "url(/assets/images/svgs/dark/back-profile-icon.svg)";

  return (
    <Row
      className={theme ? Styles.lightWrapperSidebar : Styles.darkWrapperSidebar}
    >
      <Col span={24}>
        <Avatar
          edit={edit}
          handleOpenProf={handleOpenProf}
          handleOpenBanner={handleOpenBanner}
          imgValue={imgValue}
          currentUser={currentUser}
          theme={theme}
        />
      </Col>
      <Col span={24} className="md:block hidden">
        <MarginTop marginTop={48} />
      </Col>
      <Col span={24} className="md:block hidden">
        <ButtonTabBar
          theme={theme}
          current={1}
          tab={tab}
          handleChangeTab={() => handleChangeTab(1)}
          active={tab == 1}
          lightIcon={<Profile />}
          darkIcon={<ProfileDark />}
          activeLightIcon={<ProfileActive />}
          activeDarkIcon={<ProfileActiveDark />}
          text={myProfileTranslate["personal-infromation"]?.title}
        />
      </Col>
      <Col span={24} className="md:block hidden">
        <ButtonTabBar
          theme={theme}
          current={2}
          tab={tab}
          handleChangeTab={() => handleChangeTab(2)}
          active={tab == 2}
          lightIcon={<Info />}
          darkIcon={<InfoDark />}
          activeLightIcon={<InfoActive />}
          activeDarkIcon={<InfoActiveDark />}
          text={myProfileTranslate["other-information"]?.title}
        />
      </Col>
      <Col span={24} className="md:block hidden">
        <ButtonTabBar
          theme={theme}
          current={3}
          tab={tab}
          handleChangeTab={() => handleChangeTab(3)}
          active={tab == 3}
          lightIcon={<Lock />}
          darkIcon={<LockDark />}
          activeLightIcon={<LockActive />}
          activeDarkIcon={<LockActiveDark />}
          text={myProfileTranslate["security-and-login"]?.title}
        />
      </Col>
    </Row>
  );
}
