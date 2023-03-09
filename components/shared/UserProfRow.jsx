import React from "react";
import { Tooltip } from "antd";
import ImageProvider from "providers/ImageProvider";
import Styles from "/styles/scss/dashboard/UserProfRow.module.scss";
import Favorite from "/public/assets/images/svgs/favorite-icon.svg";
import FavoriteDark from "/public/assets/images/svgs/dark/favorite-icon.svg";
import Arrow from "/public/assets/images/svgs/arrow-table.svg";
import ArrowDark from "/public/assets/images/svgs/dark/arrow-table.svg";
import UserProfDropDown from "./UserProfDropDown";
import Avatar from "/public/assets/images/svgs/avatar.svg";
import AvatarDark from "/public/assets/images/svgs/dark/avatar.svg";
import Link from "next/link";
import { isEmpty } from "lodash";
import Liked from "/public/assets/images/svgs/liked-icon.svg";
export default function UserProfRow({
  userProf,
  theme,
  setStatus,
  myTranslateUserProfile,
  handleLiked,
}) {
  {
    return userProf?.users.map((item, index) => {
      return (
        <div
          key={index}
          className={theme ? Styles.lightRowBody : Styles.darkRowBody}
        >
          <div
            style={{ width: "20%" }}
            className="flex justify-start items-center"
          >
            <div className="flex items-center">
              {item?.avatar != null ? (
                <div className={Styles.wrapperAvatar}>
                  <ImageProvider width={35} height={35} src={item?.avatar} />
                </div>
              ) : (
                <div
                  className={
                    theme
                      ? Styles.lightWrapperPlaceHolder
                      : Styles.darkWrapperPlaceHolder
                  }
                >
                  {theme ? <Avatar /> : <AvatarDark />}
                </div>
              )}
            </div>
            <div className="flex flex-col pl-5 items-start">
              <div>
                <p className={theme ? Styles.lightName : Styles.darkName}>
                  {item?.givenName + " " + item?.familyName}
                </p>
              </div>
              <div>
                <p
                  className={theme ? Styles.lightJobTitle : Styles.darkJobTitle}
                >
                  {item?.jobTitle}
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center"
            style={{ width: "30%" }}
          >
            <span
              className={theme ? Styles.lightLanguage : Styles.darkLanguage}
            >
              {!isEmpty(item?.userLanguages)
                ? item?.userLanguages?.map((prop, index) => {
                    if (
                      item?.userLanguages[item?.userLanguages?.length - 1]
                        ?.language.id != prop?.language?.id
                    )
                      return prop?.language?.title?.slice(0, 2).concat(",");
                    else return prop?.language?.title?.slice(0, 2);
                  })
                : myTranslateUserProfile["unknown"]?.title}
            </span>
          </div>
          <div
            className="flex justify-center items-center"
            style={{ width: "30%" }}
          >
            <div>
              <div className="flex items-center">
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  {!isEmpty(item?.residentCountry?.flagId) ? (
                    <ImageProvider
                      layout="responsive"
                      width="100%"
                      height="100%"
                      src={`/assets/images/svgs/flags/${item?.residentCountry?.code}.svg`}
                    />
                  ) : (
                    <div
                      className={theme ? Styles.lightEmpty : Styles.darkEmpty}
                    ></div>
                  )}
                </span>
                <span
                  className={theme ? Styles.lightCountry : Styles.darkCountry}
                >
                  {item?.residentCountry?.title ||
                    myTranslateUserProfile["unknown"]?.title}
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center"
            style={{ width: "12%" }}
          >
            {item?.status == "approved" ? (
              <Tooltip title={myTranslateUserProfile["approved"]?.title}>
                <div className={Styles.statusApprove}></div>
              </Tooltip>
            ) : item?.status == "disabled" ? (
              <Tooltip title={myTranslateUserProfile["disabled"]?.title}>
                <div className={Styles.statusDisabled}></div>
              </Tooltip>
            ) : item?.status == "suspended" ? (
              <Tooltip title={myTranslateUserProfile["suspended"]?.title}>
                <div className={Styles.statusSuspend}></div>
              </Tooltip>
            ) : item?.status == "viewed" ? (
              <Tooltip title={myTranslateUserProfile["viewed"]?.title}>
                <div className={Styles.statusViewed}></div>
              </Tooltip>
            ) : null}
            <span
              onClick={() => handleLiked(item?.id)}
              className={Styles.favorite}
            >
              {item?.isLiked ? (
                <Liked />
              ) : theme ? (
                <Favorite />
              ) : (
                <FavoriteDark />
              )}
            </span>
          </div>
          <div
            className="flex justify-center items-center"
            style={{ width: "8%" }}
          >
            <div className="flex">
              <UserProfDropDown
                setStatus={setStatus}
                data={item}
                theme={theme}
                myTranslateUserProfile={myTranslateUserProfile}
              />
              <div className="pl-10">
                <Link href={`/profile/user-profile/${item.id}`}>
                  <a>{theme ? <Arrow /> : <ArrowDark />}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
