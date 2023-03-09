import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ButtonTabBar from "./ButtonTabBar";
import Profile from "/public/assets/images/svgs/user2-icon.svg";
import ProfileActive from "/public/assets/images/svgs/user2-active-icon.svg";
import ProfileDark from "/public/assets/images/svgs/dark/user1-icon.svg";
import ProfileActiveDark from "/public/assets/images/svgs/dark/user2-active-icon.svg";
import Resuem from "/public/assets/images/svgs/resume.svg";
import ResumeActive from "/public/assets/images/svgs/resume-active.svg";
import ResumeDark from "/public/assets/images/svgs/dark/resume.svg";
import ResumeActiveDark from "/public/assets/images/svgs/dark/resume-active.svg";
import Info from "/public/assets/images/svgs/personal-info-icon.svg";
import InfoActive from "/public/assets/images/svgs/personal-info-active.svg";
import InfoDark from "/public/assets/images/svgs/dark/personal-info-icon.svg";
import InfoActiveDark from "/public/assets/images/svgs/dark/personal-info-active.svg";
export default function ProgressTabSlider({
  tab,
  handleChangeTab,
  theme,
  globalSettingTranslate,
}) {
  const [swiper, setSwiper] = useState(null);
  const slideTo = () => swiper.slideTo(tab - 1);
  useEffect(() => {
    if (swiper != null) slideTo();
  }, [swiper, tab]);
  return (
    <Swiper
      onSwiper={setSwiper}
      modules={[Navigation, Autoplay]}
      slidesPerView={1.6}
      breakpoints={{
        1280: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        540: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
      }}
      autoplay={false}
      loop={false}
    >
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={1}
          tab={tab}
          handleChangeTab={() => handleChangeTab(1)}
          active={tab == 1}
          lightIcon={<Profile />}
          darkIcon={<ProfileDark />}
          activeLightIcon={<ProfileActive />}
          activeDarkIcon={<ProfileActiveDark />}
          text={globalSettingTranslate["personal-infromation"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={2}
          tab={tab}
          handleChangeTab={() => handleChangeTab(2)}
          active={tab == 2}
          lightIcon={<Info />}
          darkIcon={<InfoDark />}
          activeLightIcon={<InfoActive />}
          activeDarkIcon={<InfoActiveDark />}
          text={globalSettingTranslate["other-information"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={3}
          tab={tab}
          handleChangeTab={() => handleChangeTab(3)}
          active={tab == 3}
          lightIcon={<Resuem />}
          darkIcon={<ResumeDark />}
          activeLightIcon={<ResumeActive />}
          activeDarkIcon={<ResumeActiveDark />}
          text={globalSettingTranslate["resume"]?.title}
        />
      </SwiperSlide>
    </Swiper>
  );
}
