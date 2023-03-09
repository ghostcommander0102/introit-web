import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
import React from "react";
import Styles from "/styles/scss/dashboard/ResumeSidebar.module.scss";
import Pen from "/public/assets/images/svgs/resume-pen.svg";
import Trash from "/public/assets/images/svgs/resume-trash.svg";
import Plus from "/public/assets/images/svgs/plus-social.svg";
import { Button, Col, Row } from "antd";
export default function Avatar({
  theme,
  currentUser,
  socialsInputs,
  setVisivle,
  handleOpenProf,
  handleDeleteAvatar,
  cv,
}) {
  return (
    <div
      className={theme ? Styles.lightAvatarWrapper : Styles.darkAvatarWrapper}
    >
      <Row className="w-full">
        <Col md={{ span: 4 }} span={6}>
          {" "}
          <div className={Styles.imgAvatar}>
            {!isEmpty(cv?.avatar) ? (
              <div className="avatar-resume">
                <div>
                  <ImageProvider
                    width={113}
                    height={113}
                    src={currentUser?.avatar || "/"}
                  />
                </div>
              </div>
            ) : (
              <div className={`avatar-resume ${Styles.emptyAvatar}`}>
                <p>
                  {currentUser?.givenName && currentUser?.givenName[0]}
                  {currentUser?.familyName && currentUser?.familyName[0]}
                </p>
              </div>
            )}
            <div className={`${Styles.wrapperButton} buttons`}>
              <div>
                <Button
                  onClick={handleOpenProf}
                  className={theme ? Styles.lightPen : Styles.darkPen}
                >
                  <Pen />
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleDeleteAvatar}
                  className={theme ? Styles.lightTrash : Styles.darkTrash}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={{ span: 20 }} span={18} className="flex justify-end items-end">
          <div
            className={
              theme ? Styles.lightWrapperSocial : Styles.darkWrapperSocial
            }
          >
            <div className="md:flex items-center">
              <div className="flex">
                {!isEmpty(socialsInputs)
                  ? socialsInputs?.map((item, index) => {
                      return (
                        <a
                          key={index}
                          target="_blank"
                          className="px-2"
                          href={item.link}
                        >
                          <span>
                            <ImageProvider
                              src={item.icon}
                              width={24}
                              height={24}
                            />
                          </span>
                        </a>
                      );
                    })
                  : null}
              </div>
              <div className="pl-2 md:pr-0 pr-2 flex justify-end">
                <Button
                  onClick={() => setVisivle(true)}
                  className={
                    theme ? Styles.lightSocialButton : Styles.darkSocialButton
                  }
                >
                  <span>
                    <Plus />
                  </span>
                  <span className="pl-2">Add social media</span>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
