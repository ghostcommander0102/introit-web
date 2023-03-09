import React from "react";
import { Row, Col, Button } from "antd";
import ShareDark from "/public/assets/images/svgs/dark/share.svg";
import ShareLight from "/public/assets/images/svgs/share.svg";
import Setting from "/public/assets/images/svgs/setting.svg";
import SettingDark from "/public/assets/images/svgs/dark/setting.svg";
import ButtonHeader from "../shared/ButtonHeader";
import PostButton from "components/shared/PostButton";
import CreateResume from "/public/assets/images/svgs/create-resume.svg";
import ProfilePercentage from "components/shared/ProfilePercentage";
import Styles from "/styles/scss/dashboard/Sidebar.module.scss";
import ImageProvider from "providers/ImageProvider";
import { isEmpty } from "lodash";
import LogoMini from "/public/assets/images/svgs/logo-mobile-icon.svg";
import LogoMiniDark from "/public/assets/images/svgs/dark/logo-mobile-icon.svg";
import Menu from "/public/assets/images/svgs/menu-icon.svg";
import MenuDark from "/public/assets/images/svgs/dark/menu-icon.svg";
import Dots from "/public/assets/images/svgs/dot.svg";
import DotsDark from "/public/assets/images/svgs/dark/dot.svg";

export default function UserHeader({
  theme,
  handleSetting,
  handleInvitationCodeModal,
  layoutTranslate,
  percentage,
  currentUser,
  handleLogOut,
  setSidebarDrawer,
  setHeaderDrawerr,
  router,
}) {
  return (
    <Row
      className={`${
        theme ? Styles.lightHeader : Styles.darkHeader
      } py-4 w-full`}
    >
      <Col span={24} className="px-0">
        <div
          style={{ width: "100%", height: 32 }}
          className="flex md:justify-end justify-between items-center px-2"
        >
          <div className="md:hidden flex">
            <div onClick={() => setSidebarDrawer(true)}>
              {theme ? <Menu /> : <MenuDark />}
            </div>
            <div className="pl-4">
              {theme ? <LogoMini /> : <LogoMiniDark />}
            </div>
          </div>
          <div className="flex">
            <div className="pr-2">
              <PostButton
                onClick={() => router.push("/profile/resume")}
                icon={<CreateResume />}
                text={layoutTranslate["create-resume"]?.title}
              />
            </div>
            <div className="md:block hidden">
              <ButtonHeader
                theme={theme}
                onClick={handleInvitationCodeModal}
                icon={theme ? <ShareLight /> : <ShareDark />}
              />
            </div>
            <div className="md:block hidden">
              <ButtonHeader
                theme={theme}
                onClick={handleSetting}
                icon={theme ? <Setting /> : <SettingDark />}
              />
            </div>
            <div className="pl-2.5">
              <ProfilePercentage
                theme={theme}
                handleLogOut={handleLogOut}
                layoutTranslate={layoutTranslate}
                percentage={percentage}
                currentUser={currentUser}
              >
                <div
                  className={
                    theme ? Styles.lightUserAvator : Styles.darkUserAvator
                  }
                >
                  {!isEmpty(currentUser?.avatar) ? (
                    <ImageProvider
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      src={currentUser?.avatar}
                      alt=""
                    />
                  ) : (
                    <div className={Styles.wrapperPlaceHolder}>
                      {currentUser?.givenName[0] +
                        " " +
                        currentUser?.familyName[0]}
                    </div>
                  )}
                </div>
              </ProfilePercentage>
            </div>
            <div className="md:hidden flex items-center">
              <Button
                onClick={() => setHeaderDrawerr(true)}
                className={Styles.button}
              >
                {theme ? <Dots /> : <DotsDark />}
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
