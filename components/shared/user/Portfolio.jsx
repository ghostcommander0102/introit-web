import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
import ImageProvider from "providers/ImageProvider";
import dynamic from "next/dynamic";
import Video from "/public/assets/images/svgs/user/video.svg";
import Image from "/public/assets/images/svgs/user/image.svg";
const CarouselItem = dynamic(() => import("../resume/CarouselItem"), {
  ssr: false,
});
export default function Portfolio({ images, title, videoLink, link, theme }) {
  return (
    <Row className="pt-5 md:px-10 px-0">
      <Col span={24}>
        <div className={Styles.bold}>
          <p className={theme ? Styles.lightBold : Styles.darkBold}>{title}</p>
        </div>
        <div className={Styles.carouselWrapper}>
          <CarouselItem
            responsive={{
              0: {
                items: 2,
              },
              768: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            }}
            center={true}
            loop={true}
          >
            {images?.map((item, index) => {
              return (
                <div key={index}>
                  <ImageProvider width={155} height={155} src={item} alt="" />
                </div>
              );
            })}
          </CarouselItem>
        </div>
        <div className="pt-4">
          <div className="flex items-center">
            <div>
              <Video />
            </div>
            <div className="pl-4">
              <p className={theme ? Styles.lightText : Styles.darkText}>
                {link}
              </p>
            </div>
          </div>
          <div className="flex items-center pt-2">
            <div>
              <Image />
            </div>
            <div className="pl-4">
              <p className={theme ? Styles.lightText : Styles.darkText}>
                {videoLink}
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
