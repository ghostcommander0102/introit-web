import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ButtonTabBar from "./ButtonTabBar";
import DashboardIcon from "/public/assets/images/svgs/dashboard-icon.svg";
import DashboardActiveIcon from "/public/assets/images/svgs/active/dashboard-icon.svg";
import DashboardDarkIcon from "/public/assets/images/svgs/dark/dashboard-icon.svg";
import DashboardActiveDarkIocn from "/public/assets/images/svgs/active/dark/dashboard-icon.svg";
import MessageIcon from "/public/assets/images/svgs/email2-icon.svg";
import MessageDarkIcon from "/public/assets/images/svgs/dark/message-icon.svg";
import Support from "/public/assets/images/svgs/question2-icon.svg";
import SupportDark from "/public/assets/images/svgs/dark/support-icon.svg";
import Job from "/public/assets/images/svgs/skill2-icon.svg";
import JobActive from "/public/assets/images/svgs/active/mange-job-icon.svg";
import JobDark from "/public/assets/images/svgs/dark/job-icon.svg";
import JobActiveDark from "/public/assets/images/svgs/active/dark/mange-job-icon.svg";
import Company from "/public/assets/images/svgs/companyy-icon.svg";
import CompanyActive from "/public/assets/images/svgs/companyy-active-icon.svg";
import CompanyDark from "/public/assets/images/svgs/dark/companyy-icon.svg";
import Access from "/public/assets/images/svgs/access.svg";
import AccessActive from "/public/assets/images/svgs/access-active.svg";
import AccessDark from "/public/assets/images/svgs/dark/access.svg";
import AccessActiveDark from "/public/assets/images/svgs/dark/access-active.svg";
import Blog from "/public/assets/images/svgs/blog-icon.svg";
import BlogDark from "/public/assets/images/svgs/dark/blog-icon.svg";
import Profile from "/public/assets/images/svgs/user2-icon.svg";
import ProfileActive from "/public/assets/images/svgs/user2-active-icon.svg";
import ProfileDark from "/public/assets/images/svgs/dark/user1-icon.svg";
import ProfileActiveDark from "/public/assets/images/svgs/dark/user2-active-icon.svg";
import Projects from "/public/assets/images/svgs/projects-icon.svg";
import ProjectsDark from "/public/assets/images/svgs/dark/projects-icon.svg";
export default function PermissionTabSlider({
  handlePermissionTab,
  theme,
  permissionTab,
  globalSettingTranslate,
}) {
  const [swiper, setSwiper] = useState(null);
  const slideTo = () =>
    swiper?.slideTo(
      permissionTab == "Dashboard"
        ? 0
        : permissionTab == "Profile"
        ? 1
        : permissionTab == "Company"
        ? 2
        : permissionTab == "Jobs"
        ? 3
        : permissionTab == "Projects"
        ? 4
        : permissionTab == "Blog"
        ? 5
        : permissionTab == "Global Settings"
        ? 6
        : permissionTab == "Messages"
        ? 7
        : permissionTab == "Support"
        ? 8
        : null
    );
  useEffect(() => {
    if (swiper != null) slideTo();
  }, [swiper, permissionTab]);
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
          current={"Dashboard"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Dashboard")}
          active={permissionTab == "Dashboard"}
          lightIcon={<DashboardIcon />}
          darkIcon={<DashboardDarkIcon />}
          activeLightIcon={<DashboardActiveIcon />}
          activeDarkIcon={<DashboardActiveDarkIocn />}
          text={globalSettingTranslate["dashboard"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Profile"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Profile")}
          active={permissionTab == "Profile"}
          lightIcon={<Profile />}
          darkIcon={<ProfileDark />}
          activeLightIcon={<ProfileActive />}
          activeDarkIcon={<ProfileActiveDark />}
          text={globalSettingTranslate["profile"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Company"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Company")}
          active={permissionTab == "Company"}
          lightIcon={<Company />}
          darkIcon={<CompanyDark />}
          activeLightIcon={<CompanyActive />}
          activeDarkIcon={<DashboardActiveDarkIocn />}
          text={globalSettingTranslate["companies"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Jobs"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Jobs")}
          active={permissionTab == "Jobs"}
          lightIcon={<Job />}
          darkIcon={<JobDark />}
          activeLightIcon={<JobActive />}
          activeDarkIcon={<JobActiveDark />}
          text={globalSettingTranslate["jobs"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Projects"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Projects")}
          active={permissionTab == "Projects"}
          lightIcon={<Projects />}
          darkIcon={<ProjectsDark />}
          activeLightIcon={<JobActive />}
          activeDarkIcon={<JobActiveDark />}
          text={globalSettingTranslate["projects"]?.title}
        />
      </SwiperSlide>

      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Blog"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Blog")}
          active={permissionTab == "Blog"}
          lightIcon={<Blog />}
          darkIcon={<BlogDark />}
          activeLightIcon={<JobActive />}
          activeDarkIcon={<JobActiveDark />}
          text={globalSettingTranslate["blog"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Global Settings"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Global Settings")}
          active={permissionTab == "Global Settings"}
          lightIcon={<Access />}
          darkIcon={<AccessDark />}
          activeLightIcon={<AccessActive />}
          activeDarkIcon={<AccessActiveDark />}
          text={globalSettingTranslate["global-setting"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Messages"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Messages")}
          active={permissionTab == "Messages"}
          lightIcon={<MessageIcon />}
          darkIcon={<MessageDarkIcon />}
          activeLightIcon={<AccessActive />}
          activeDarkIcon={<AccessActiveDark />}
          text={globalSettingTranslate["messages"]?.title}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"Support"}
          tab={permissionTab}
          handleChangeTab={() => handlePermissionTab("Support")}
          active={permissionTab == "Support"}
          lightIcon={<Support />}
          darkIcon={<SupportDark />}
          activeLightIcon={<AccessActive />}
          activeDarkIcon={<AccessActiveDark />}
          text={globalSettingTranslate["support"]?.title}
        />
      </SwiperSlide>
    </Swiper>
  );
}
