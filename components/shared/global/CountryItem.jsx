import React from "react";
import { Button, Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/SocialItem.module.scss";
import Pen from "/public/assets/images/svgs/pen-social.svg";
import PenDark from "/public/assets/images/svgs/dark/pen-social.svg";
import Trash from "/public/assets/images/svgs/trash-icon.svg";
import TrashDark from "/public/assets/images/svgs/dark/trash-icon.svg";
import ImageProvider from "providers/ImageProvider";
export default function CountryItem({
  theme,
  data,
  handelDeleteCountry,
  handleShowCountry,
}) {
  return (
    <Row>
      <Col span={24}>
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
          <div className="flex justify-between items-center">
            <div
              style={{ height: 52 }}
              className="flex justify-start items-center w-2/4 px-5"
            >
              <div className={Styles.avatar}>
                <ImageProvider
                  layout="responsive"
                  width="100%"
                  height="100%"
                  src={
                    `/assets/images/svgs/flags/${data?.code}.svg` ||
                    "/images/avatar_placeholder.png"
                  }
                />
              </div>
              <div className="flex flex-col items-center pl-5">
                <span className={theme ? Styles.lightText : Styles.darkText}>
                  {data?.title}
                </span>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center ">
                <span className={theme ? Styles.lightText : Styles.darkText}>
                  {data?.prefix}
                </span>
              </div>
            </div>
            <div className="flex">
              <div>
                <Button onClick={handleShowCountry} className={Styles.button}>
                  {theme ? <Pen /> : <PenDark />}
                </Button>
              </div>
              <div>
                <Button onClick={handelDeleteCountry} className={Styles.button}>
                  {theme ? <Trash /> : <TrashDark />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
