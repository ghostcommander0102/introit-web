import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ButtonTabBar from "./ButtonTabBar";
import General from "/public/assets/images/svgs/general.svg";
import GeneralActive from "/public/assets/images/svgs/general-active.svg";
import GeneralDark from "/public/assets/images/svgs/dark/general.svg";
import GeneralActiveDark from "/public/assets/images/svgs/dark/general-active.svg";
import Notif from "/public/assets/images/svgs/notif.svg";
import NotifActive from "/public/assets/images/svgs/notif-active.svg";
import NotifDark from "/public/assets/images/svgs/dark/notif.svg";
import NotifActiveDark from "/public/assets/images/svgs/dark/notif-active.svg";
import Privacy from "/public/assets/images/svgs/privacy.svg";
import PrivacyActive from "/public/assets/images/svgs/privacy-active.svg";
import PrivacyDark from "/public/assets/images/svgs/dark/privacy.svg";
import PrivacyActiveDark from "/public/assets/images/svgs/dark/privacy-active.svg";
import Account from "/public/assets/images/svgs/account-mangement.svg";
import AccountActive from "/public/assets/images/svgs/account-mangement-active.svg";
import AccountDark from "/public/assets/images/svgs/dark/account-mangement.svg";
import AccountActiveDark from "/public/assets/images/svgs/dark/account-mangement-active.svg";
export default function SettingsTabSlider({
  tab,
  handleChangeTab,
  theme,
  mySettingsTranslate,
}) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1.9}
      breakpoints={{
        1280: {
          slidesPerView: 1.9,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 1.9,
          spaceBetween: 20,
        },
        720: {
          slidesPerView: 1.9,
          spaceBetween: 20,
        },
        540: {
          slidesPerView: 1.9,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1.9,
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
          lightIcon={<General />}
          darkIcon={<GeneralDark />}
          activeLightIcon={<GeneralActive />}
          activeDarkIcon={<GeneralActiveDark />}
          text={mySettingsTranslate["general"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={2}
          tab={tab}
          handleChangeTab={() => handleChangeTab(2)}
          active={tab == 2}
          lightIcon={<Notif />}
          darkIcon={<NotifDark />}
          activeLightIcon={<NotifActive />}
          activeDarkIcon={<NotifActiveDark />}
          text={mySettingsTranslate["notifications"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={3}
          tab={tab}
          handleChangeTab={() => handleChangeTab(3)}
          active={tab == 3}
          lightIcon={<Privacy />}
          darkIcon={<PrivacyDark />}
          activeLightIcon={<PrivacyActive />}
          activeDarkIcon={<PrivacyActiveDark />}
          text={mySettingsTranslate["notifications"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={4}
          tab={tab}
          handleChangeTab={() => handleChangeTab(4)}
          active={tab == 4}
          lightIcon={<Account />}
          darkIcon={<AccountDark />}
          activeLightIcon={<AccountActive />}
          activeDarkIcon={<AccountActiveDark />}
          text={
            mySettingsTranslate["account-management"]?.title.substr(0, 12) +
            "..."
          }
        />
      </SwiperSlide>
    </Swiper>
  );
}
