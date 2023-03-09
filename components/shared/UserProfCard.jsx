import React from "react";
import ImageProvider from "/providers/ImageProvider";
import Styles from "/styles/scss/dashboard/CandidateCard.module.scss";
import Industry from "/public/assets/images/svgs/industry-icon.svg";
import IndustryDark from "/public/assets/images/svgs/dark/industry-icon.svg";
import Favorite from "/public/assets/images/svgs/favorite-icon.svg";
import FavoriteDark from "/public/assets/images/svgs/dark/favorite-icon.svg";
import Liked from "/public/assets/images/svgs/liked-icon.svg";
import Lang from "/public/assets/images/svgs/lang-icon.svg";
import LangDark from "/public/assets/images/svgs/dark/lang-icon.svg";
import UserProfDropDown from "./UserProfDropDown";
import { isEmpty } from "lodash";
import { Button, Tooltip } from "antd";
import Dots from "/public/assets/images/svgs/threedot-icon.svg";
import DotsDark from "/public/assets/images/svgs/dark/threedot-icon.svg";
import Link from "next/link";
import Avatar from "/public/assets/images/svgs/avatar.svg";
import AvatarDark from "/public/assets/images/svgs/dark/avatar.svg";
export default function UserProfCard({
  theme,
  data,
  handleLiked,
  setDrawer,
  setDrawerId,
  setStatus,
  myTranslateUserProfile,
}) {
  return (
    <div className={theme ? Styles.wrapperLight : Styles.wrapperDark}>
      <div className="flex justify-between mt-2">
        <div className="flex">
          <div className={Styles.statusWrapper}>
            {data?.status == "approved" ? (
              <Tooltip title={myTranslateUserProfile["approved"]?.title}>
                <div className={Styles.statusApprove}></div>
              </Tooltip>
            ) : data?.status == "disabled" ? (
              <Tooltip title={myTranslateUserProfile["disabled"]?.title}>
                <div className={Styles.statusDisabled}></div>
              </Tooltip>
            ) : data?.status == "suspended" ? (
              <Tooltip title={myTranslateUserProfile["suspended"]?.title}>
                <div className={Styles.statusSuspend}></div>
              </Tooltip>
            ) : data?.status == "viewed" ? (
              <Tooltip title={myTranslateUserProfile["viewed"]?.title}>
                <div className={Styles.statusViewed}></div>
              </Tooltip>
            ) : null}
          </div>
          <div className={Styles.wrapperImg}>
            {!isEmpty(data?.avatar) ? (
              <ImageProvider width={48} height={48} src={data?.avatar} alt="" />
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
          <div className="flex flex-col ml-3 mt-1">
            <span className={theme ? Styles.titleLight : Styles.titleDark}>
              {data?.givenName + " " + data?.familyName}
            </span>
            <span
              className={theme ? Styles.subTitleLight : Styles.subTitleDark}
            >
              {data?.jobTitle || "-----"}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span onClick={handleLiked} style={{ cursor: "pointer" }}>
              {data?.isLiked ? (
                <Liked />
              ) : theme ? (
                <Favorite />
              ) : (
                <FavoriteDark />
              )}
            </span>
          </div>

          {/* Start DropDown Web */}
          <div className="pl-1.5 relative md:block hidden">
            <UserProfDropDown
              myTranslateUserProfile={myTranslateUserProfile}
              setStatus={setStatus}
              data={data}
              theme={theme}
            />
          </div>
          {/* End DropDown Web */}
          {/* Start Drawer Mobile */}
          <div className="md:hidden block">
            <Button
              className={theme ? Styles.lightDrawer : Styles.darkDrawer}
              onClick={() => {
                setDrawerId(data);
                setDrawer(true);
              }}
            >
              {theme ? <Dots /> : <DotsDark />}
            </Button>
          </div>
          {/* End Drawer Mobile */}
        </div>
      </div>
      <div className="pt-2">
        <div className="flex justify-between items-center mt-2">
          <div className="flex  items-center">
            <span className="flex">{theme ? <Lang /> : <LangDark />}</span>
            <span className={theme ? Styles.priceLight : Styles.priceDark}>
              {!isEmpty(data?.userLanguages)
                ? data?.userLanguages?.map((item) => {
                    if (
                      data?.userLanguages[data?.userLanguages.length - 1]
                        ?.language.id != item?.language?.id
                    )
                      return item?.language?.title?.slice(0, 2).concat(",");
                    else return item?.language?.title?.slice(0, 2);
                  })
                : myTranslateUserProfile["unknown"]?.title}
            </span>
          </div>
          <div className="flex items-center">
            <span className="flex">
              {theme ? <Industry /> : <IndustryDark />}
            </span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              {data?.industry?.title ||
                myTranslateUserProfile["unknown"]?.title}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {!isEmpty(data?.residentCountry?.flagId) ? (
                <ImageProvider
                  layout="responsive"
                  width="100%"
                  height="100%"
                  src={`/assets/images/svgs/flags/${data?.residentCountry?.code}.svg`}
                />
              ) : (
                <div
                  className={theme ? Styles.lightEmpty : Styles.darkEmpty}
                ></div>
              )}
            </span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              {data?.residentCountry?.title ||
                myTranslateUserProfile["unknown"]?.title}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="flex pt-2">
          {data?.socials?.map((item, index) => {
            return (
              <div className="flex" key={index}>
                <div className="px-1">
                  <a href={item?.link} target="_blank">
                    <ImageProvider width={13} height={13} src={item.icon} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Link
            href={{
              pathname: `/profile/user-profile/[id]`,
              query: {
                id: data?.id,
              },
            }}
          >
            <a>
              <Button
                className={theme ? Styles.lightButton : Styles.darkButton}
              >
                {myTranslateUserProfile["view-profile"]?.title}
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
