import React from "react";
import ImageProvider from "/providers/ImageProvider";
import Styles from "/styles/scss/dashboard/CandidateCard.module.scss";
import Industry from "/public/assets/images/svgs/industry-icon.svg";
import IndustryDark from "/public/assets/images/svgs/dark/industry-icon.svg";
import Lang from "/public/assets/images/svgs/lang-icon.svg";
import LangDark from "/public/assets/images/svgs/dark/lang-icon.svg";
import { isEmpty } from "lodash";
import { Button, Col, Row, Tooltip } from "antd";
import Link from "next/link";
import Avatar from "/public/assets/images/svgs/avatar.svg";
import AvatarDark from "/public/assets/images/svgs/dark/avatar.svg";
import CheckBoxItem from "./form/CheckboxItem";
export default function MemberCard({
  theme,
  members,
  myRoleTranslate = {},
  handleChangeRoleChecked,
}) {
  return (
    <Row className="px-2">
      {members?.map((item, index) => {
        console.log("item", item);
        return (
          <Col key={index} span={24} className="pb-2">
            <div className={theme ? Styles.wrapperLight : Styles.wrapperDark}>
              <div className="flex justify-between mt-2">
                <div className="flex">
                  <div className={Styles.statusWrapper}>
                    {item?.status == "approved" ? (
                      <Tooltip title={myRoleTranslate["approved"]?.title}>
                        <div className={Styles.statusApprove}></div>
                      </Tooltip>
                    ) : item?.status == "disabled" ? (
                      <Tooltip title={myRoleTranslate["disabled"]?.title}>
                        <div className={Styles.statusDisabled}></div>
                      </Tooltip>
                    ) : item?.status == "suspended" ? (
                      <Tooltip title={myRoleTranslate["suspended"]?.title}>
                        <div className={Styles.statusSuspend}></div>
                      </Tooltip>
                    ) : item?.status == "viewed" ? (
                      <Tooltip title={myRoleTranslate["viewed"]?.title}>
                        <div className={Styles.statusViewed}></div>
                      </Tooltip>
                    ) : null}
                  </div>
                  <div className={Styles.wrapperImg}>
                    {!isEmpty(item?.avatar) ? (
                      <ImageProvider
                        width={48}
                        height={48}
                        src={item?.avatar}
                        alt=""
                      />
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
                    <span
                      className={theme ? Styles.titleLight : Styles.titleDark}
                    >
                      {item?.givenName + " " + item?.familyName}
                    </span>
                    <span
                      className={
                        theme ? Styles.subTitleLight : Styles.subTitleDark
                      }
                    >
                      {item?.jobTitle || "-----"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center mt-2">
                  <div className="flex  items-center">
                    <span className="flex">
                      {theme ? <Lang /> : <LangDark />}
                    </span>
                    <span
                      className={theme ? Styles.priceLight : Styles.priceDark}
                    >
                      {!isEmpty(item?.userLanguages)
                        ? item?.userLanguages?.map((item) => {
                            console.log("item lang", item);
                            if (
                              item?.userLanguages?.language[
                                item?.userLanguages?.length - 1
                              ]?.language.id != item?.language?.id
                            )
                              return item?.language?.title
                                ?.slice(0, 2)
                                .concat(",");
                            else return item?.language?.title?.slice(0, 2);
                          })
                        : myRoleTranslate["unknown"]?.title}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex">
                      {theme ? <Industry /> : <IndustryDark />}
                    </span>
                    <span
                      className={theme ? Styles.textLight : Styles.textDark}
                    >
                      {item?.industry?.title ||
                        myRoleTranslate["unknown"]?.title}
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
                      {!isEmpty(item?.residentCountry?.flagId) ? (
                        <ImageProvider
                          layout="responsive"
                          width="100%"
                          height="100%"
                          src={`/assets/images/svgs/flags/${item?.residentCountry?.code}.svg`}
                        />
                      ) : (
                        <div
                          className={
                            theme ? Styles.lightEmpty : Styles.darkEmpty
                          }
                        ></div>
                      )}
                    </span>
                    <span
                      className={theme ? Styles.textLight : Styles.textDark}
                    >
                      {item?.residentCountry?.title ||
                        myRoleTranslate["unknown"]?.title}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="flex pt-2">
                  <CheckBoxItem
                    theme={theme}
                    value={item.checked}
                    defaultChecked={false}
                    onChange={() => handleChangeRoleChecked(item.id)}
                  />
                </div>
                <div>
                  <Link
                    href={{
                      pathname: `/profile/user-profile/[id]`,
                      query: {
                        id: item?.id,
                      },
                    }}
                  >
                    <a>
                      <Button
                        className={
                          theme ? Styles.lightButton : Styles.darkButton
                        }
                      >
                        {myRoleTranslate["view-profile"]?.title}
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
