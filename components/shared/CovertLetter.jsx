import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/CovertLetter.module.scss";
import PencilButton from "./PencilButton";
import WhitePencil from "/public/assets/images/svgs/pencil.svg";
import WhiteGray from "/public/assets/images/svgs/dark/pencil-gray.svg";
import CoverModal from "./CoverModal";
import htmlRenderer from "utils/htmlRenderer";

export default function CovertLetter({
  theme,
  description,
  setDescription,
  myProfileTranslate = {},
  edit,
  coverVisible,
  setCoverVisible,
  handleChangeDescription,
}) {
  return (
    <Row className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
      <Col md={{ span: 24 }} span={24} className="mb-2">
        <div className="flex justify-between items-center pt-4">
          <div>
            <span className={theme ? Styles.lightText : Styles.darkText}>
              {myProfileTranslate["cover-letter"]?.title}
            </span>
          </div>
          {edit ? (
            <div>
              <PencilButton
                theme={theme}
                isLight={true}
                icon={theme ? <WhitePencil /> : <WhiteGray />}
                onClick={() => setCoverVisible(true)}
              />
            </div>
          ) : null}
        </div>
      </Col>
      <Col span={24}>
        <div
          className={theme ? Styles.lightWrapperText : Styles.darkWrapperText}
        >
          {htmlRenderer(description)}
        </div>
      </Col>
      <CoverModal
        theme={theme}
        setDescription={setDescription}
        translator={myProfileTranslate}
        visible={coverVisible}
        value={description}
        onClick={handleChangeDescription}
        handleClose={() => setCoverVisible(false)}
      />
    </Row>
  );
}
