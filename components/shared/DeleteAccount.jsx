import React from "react";
import { Button, Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/DeleteAccount.module.scss";
import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
import Think from "/public/assets/images/svgs/think.svg";
import ThinkDark from "/public/assets/images/svgs/dark/think.svg";
import ResumeButton from "./ResumeButton";
import AvatarHolderDark from "/public/assets/images/svgs/dark/avatar-placeholde.svg";
export default function DeleteAccount({
  theme,
  currentUser,
  handleAccountDelete,
  mySettingsTranslate,
}) {
  return (
    <Row className="md:px-2 md:pt-5">
      <Col span={24} className="md:pt-10 pt-4 md:my-10">
        <div className="text-center">
          <p className={theme ? Styles.lightHeader : Styles.darkHeader}>
            <span className="pr-4"> {theme ? <Think /> : <ThinkDark />}</span>
            {mySettingsTranslate["sorry-to-see-you-go"]?.title}
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
        className="pt-0 md:text-left text-center"
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
              {mySettingsTranslate["deleting-your-account"]?.title}
            </span>
            {
              mySettingsTranslate[
                "means-you-won't-be-able-to-get-your-resume-or-profile-back.-all-your-account-data-will-be-deleted."
              ]?.title
            }
          </p>
        </div>
      </Col>
      <Col span={24} className="flex justify-center pt-10 mt-5">
        <p className={theme ? Styles.lightNote : Styles.darkNote}>
          <span>caution :</span>
          {
            mySettingsTranslate[
              "kindley-note-that-the-permanent-deletion-of-your-data-from-our-system-can-take-up-to-30-days"
            ]?.title
          }
        </p>
      </Col>
      <ResumeButton
        theme={theme}
        leftText={mySettingsTranslate["cancel"]?.title}
        rightText={mySettingsTranslate["continue"]?.title}
        onClickRight={handleAccountDelete}
      />
    </Row>
  );
}
