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
import Lock from "/public/assets/images/svgs/lock-icon.svg";
import LockActive from "/public/assets/images/svgs/lock-active-icon.svg";
import LockDark from "/public/assets/images/svgs/dark/lock-icon.svg";
import LockActiveDark from "/public/assets/images/svgs/dark/lock-active-icon.svg";
import Info from "/public/assets/images/svgs/personal-info-icon.svg";
import InfoActive from "/public/assets/images/svgs/personal-info-active.svg";
import InfoDark from "/public/assets/images/svgs/dark/personal-info-icon.svg";
import InfoActiveDark from "/public/assets/images/svgs/dark/personal-info-active.svg";
export default function ProfileTabSlider({ tab, handleChangeTab, theme }) {
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
          spaceBetween: 30,
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
          text="Personal Infromation"
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
          text="Other Information"
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={3}
          tab={tab}
          handleChangeTab={() => handleChangeTab(3)}
          active={tab == 3}
          lightIcon={<Lock />}
          darkIcon={<LockDark />}
          activeLightIcon={<LockActive />}
          activeDarkIcon={<LockActiveDark />}
          text="Security and Login"
        />
      </SwiperSlide>
    </Swiper>
  );
}
