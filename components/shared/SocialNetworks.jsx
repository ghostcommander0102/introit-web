import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/CovertLetter.module.scss";
import ImageProvider from "providers/ImageProvider";
import WhitePencil from "/public/assets/images/svgs/pencil.svg";
import PencilButton from "./PencilButton";
export default function SocialNetworks({
  theme,
  handleShow,
  socialsInputs = [],
  myProfileTranslate = {},
  edit,
}) {
  return (
    <Row className="h-full">
      <Col span={24} className="w-full">
        <div
          className={
            theme ? Styles.lightWrapperSocial : Styles.darkWrapperSocial
          }
        >
          <div className="flex justify-between">
            <span className={theme ? Styles.lightText : Styles.darkText}>
              {myProfileTranslate["social-networks"]?.title}
            </span>
            {edit ? (
              <PencilButton
                theme={theme}
                isLight={true}
                icon={<WhitePencil />}
                onClick={handleShow}
              />
            ) : null}
          </div>
          <div className="flex justify-between pt-4">
            {socialsInputs.map((item, index) => {
              if (edit) {
                return (
                  <a key={index} target="_blank" className="" href={item.link}>
                    <span>
                      <ImageProvider src={item.icon} width={20} height={20} />
                    </span>
                  </a>
                );
              } else {
                return (
                  <a key={index} target="_blank" className="" href={item.url}>
                    <span>
                      <ImageProvider
                        src={item?.social?.icon}
                        width={20}
                        height={20}
                      />
                    </span>
                  </a>
                );
              }
            })}
          </div>
        </div>
      </Col>
    </Row>
  );
}
