import React, { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonTabBar from "../ButtonTabBar";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
export default function GlobalTabSlider({
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
          lightIcon={""}
          darkIcon={""}
          activeLightIcon={""}
          activeDarkIcon={""}
          text={globalSettingTranslate["accesses"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={2}
          tab={tab}
          handleChangeTab={() => handleChangeTab(2)}
          active={tab == 2}
          lightIcon={""}
          darkIcon={""}
          activeLightIcon={""}
          activeDarkIcon={""}
          text={globalSettingTranslate["social-media"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={3}
          tab={tab}
          handleChangeTab={() => handleChangeTab(3)}
          active={tab == 3}
          lightIcon={""}
          darkIcon={""}
          activeLightIcon={""}
          activeDarkIcon={""}
          text={globalSettingTranslate["profile-progress"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={4}
          tab={tab}
          handleChangeTab={() => handleChangeTab(4)}
          active={tab == 4}
          lightIcon={""}
          darkIcon={""}
          activeLightIcon={""}
          activeDarkIcon={""}
          text={globalSettingTranslate["translation"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={5}
          tab={tab}
          handleChangeTab={() => handleChangeTab(5)}
          active={tab == 5}
          lightIcon={""}
          darkIcon={""}
          activeLightIcon={""}
          activeDarkIcon={""}
          text={globalSettingTranslate["basic-info"]?.title}
        />
      </SwiperSlide>
    </Swiper>
  );
}
