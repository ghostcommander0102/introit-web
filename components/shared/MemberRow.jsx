import React from "react";
import { Tooltip } from "antd";
import ImageProvider from "providers/ImageProvider";
import Styles from "/styles/scss/dashboard/MemberRow.module.scss";
import { isEmpty } from "lodash";
import CheckBoxItem from "./form/CheckboxItem";
import Avatar from "/public/assets/images/svgs/avatar.svg";
import AvatarDark from "/public/assets/images/svgs/dark/avatar.svg";
export default function MemberRow({
  members,
  theme,
  handleChangeRoleChecked,
  myRoleTranslate,
}) {
  return members?.map((item, index) => {
    return (
      <div
        key={index}
        className={theme ? Styles.lightRowBody : Styles.darkRowBody}
      >
        <div
          style={{ width: "10%" }}
          className="flex justify-start items-center"
        >
          <div className="flex mb-1">
            <CheckBoxItem
              theme={theme}
              value={item.checked}
              defaultChecked={false}
              onChange={() => handleChangeRoleChecked(item.id)}
            />
          </div>
        </div>
        <div
          style={{ width: "30%" }}
          className="flex justify-start items-center"
        >
          <div className="flex items-center">
            {item?.avatar != null ? (
              <div className={Styles.wrapperAvatar}>
                <ImageProvider width={35} height={35} src={item?.avatar} />
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'theme ? "#F2F2F8" : "#2E3042" ',
                }}
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
          <div className="flex flex-col  items-start pl-5">
            <div>
              <p className={theme ? Styles.lightName : Styles.darkName}>
                {item?.givenName + " " + item?.familyName}
              </p>
            </div>
            <div>
              <p className={theme ? Styles.lightJobTitle : Styles.darkJobTitle}>
                {item?.jobTitle}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center items-center"
          style={{ width: "20%" }}
        >
          <span className={theme ? Styles.lightLanguage : Styles.darkLanguage}>
            {!isEmpty(item?.userLanguages)
              ? item?.userLanguages?.map((prop, index) => {
                  if (
                    item?.userLanguages[item?.userLanguages?.length - 1]
                      ?.language.id != prop?.language?.id
                  )
                    return prop?.language?.title?.slice(0, 2).concat(",");
                  else return prop?.language?.title?.slice(0, 2);
                })
              : myRoleTranslate["unknown"]?.title}
          </span>
        </div>
        <div
          className="flex justify-center items-center"
          style={{ width: "20%" }}
        >
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
          <span className={theme ? Styles.lightCountry : Styles.darkCountry}>
            {item?.residentCountry?.title || myRoleTranslate["unknown"]?.title}
          </span>
        </div>
      </div>
    );
  });
}
