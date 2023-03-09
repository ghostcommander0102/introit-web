import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/Deacticvation.module.scss";
import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
import DividerItem from "./DividerItem";
import AvatarHolder from "/public/assets/images/svgs/avatar-placeholde.svg";
import AvatarHolderDark from "/public/assets/images/svgs/dark/avatar-placeholde.svg";
import Sad from "/public/assets/images/svgs/sad.svg";
import SadDark from "/public/assets/images/svgs/dark/sad.svg";
import ResumeButton from "./ResumeButton";
export default function Deacticvation({
  theme,
  currentUser,
  handleDeActiveAccount,
  mySettingsTranslate,
}) {
  return (
    <Row className="md:px-2 md:pt-5">
      <Col span={24} className="md:pt-10 pt-4 md:my-10">
        <div className="text-center">
          <p className={theme ? Styles.lightHeader : Styles.darkHeader}>
            <span className="pr-4"> {theme ? <Sad /> : <SadDark />}</span>
            {mySettingsTranslate["we-are-waiting-for-you"]?.title}
          </p>
        </div>
      </Col>
      <Col className="flex justify-end md:pr-10" md={{ span: 12 }} span={24}>
        <div
          style={{
            backgroundImage: !isEmpty(currentUser)
              ? `url(${currentUser?.banner})`
              : theme
              ? "url(/assets/images/svgs/back-profile-icon.svg)"
              : "url(/assets/images/svgs/dark/back-profile-icon.svg)",
          }}
          className={Styles.banner}
        >
          <div
            className={theme ? Styles.lightWrapperImg : Styles.darkWrapperImg}
          >
            {!isEmpty(currentUser?.avatar) ? (
              <ImageProvider
                objectFit="cover"
                width={100}
                height={100}
                src={currentUser?.avatar}
              />
            ) : (
              <div className={Styles.wrapperPlaceHolder}>
                {currentUser?.givenName && currentUser?.givenName[0]}
                {currentUser?.familyName && currentUser?.familyName[0]}
              </div>
            )}
          </div>
        </div>
      </Col>
      <Col
        md={{ span: 12 }}
        span={24}
        className="pt-4 md:text-left text-center"
      >
        <div>
          <p className={theme ? Styles.lightName : Styles.darkName}>
            {currentUser?.givenName + " " + currentUser?.familyName}
          </p>
          <p className={theme ? Styles.lightJobTittle : Styles.darkJobTittle}>
            {currentUser?.jobTitle}
          </p>
          <p className={theme ? Styles.lightDes : Styles.darkDes}>
            <span className="pr-1">
              {mySettingsTranslate["deactivating-your-account"]?.title}
            </span>
            {
              mySettingsTranslate[
                "means-that-no-one-will-see-your-resume-or-profile-until-you-come-back"
              ]?.title
            }
          </p>
        </div>
      </Col>
      <Col span={24} className="flex justify-center pt-10 mt-5">
        <p className={theme ? Styles.lightNote : Styles.darkNote}>
          {
            mySettingsTranslate[
              "note-that-you-can-reactivate-your-account-at-any-time-and-your-data-will-not-be-deleted"
            ]?.title
          }
        </p>
      </Col>
      <ResumeButton
        theme={theme}
        leftText={mySettingsTranslate["cancel"]?.title}
        rightText={mySettingsTranslate["continue"]?.title}
        onClickRight={handleDeActiveAccount}
      />
    </Row>
  );
}
