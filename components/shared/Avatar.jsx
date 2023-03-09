import React from "react";
import ImageProvider from "/providers/ImageProvider";
import Styles from "/styles/scss/dashboard/SidebarProfile.module.scss";
import Pencil from "/public/assets/images/svgs/pencil-icon.svg";
import PencilDark from "/public/assets/images/svgs/dark/pencil-icon.svg";
import { isEmpty } from "lodash";
import PencilButton from "./PencilButton";
import { Progress } from "antd";

export default function Avatar({
  imgValue,
  handleOpenProf,
  handleOpenBanner,
  currentUser,
  theme,
  edit,
  percentage = 30,
}) {
  return (
    <div
      className={Styles.wrapper}
      style={{
        backgroundImage: imgValue,
      }}
    >
      <div className={theme ? Styles.lightWrapperImg : Styles.darkWrapperImg}>
        <Progress
          className={"avatar-progress-prof"}
          type="circle"
          strokeColor="#6ACCE5"
          trailColor={theme ? "#ced2df" : "#555777"}
          percent={5}
          strokeWidth={5}
          format={() => {
            return (
              <div>
                {!isEmpty(currentUser?.avatar) ? (
                  <ImageProvider
                    objectFit="responsive"
                    className={Styles.img}
                    width={"100%"}
                    height={"100%"}
                    src={currentUser?.avatar}
                  />
                ) : (
                  <div className={Styles.wrapperPlaceHolder}>
                    {currentUser?.givenName && currentUser?.givenName[0]}
                    {currentUser?.familyName && currentUser?.familyName[0]}
                  </div>
                )}
              </div>
            );
          }}
        />{" "}
        {edit ? (
          <div className={Styles.wrapperAvatar}>
            <PencilButton
              theme={theme}
              isLight={false}
              onClick={handleOpenProf}
              icon={theme ? <Pencil /> : <PencilDark />}
            />
          </div>
        ) : null}
      </div>
      {edit ? (
        <div className={Styles.editBack}>
          <PencilButton
            theme={theme}
            isLight={false}
            onClick={handleOpenBanner}
            icon={theme ? <Pencil /> : <PencilDark />}
          />
        </div>
      ) : null}
    </div>
  );
}
