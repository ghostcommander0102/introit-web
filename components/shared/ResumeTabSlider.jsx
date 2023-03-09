import React, { useEffect, useState } from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ButtonTabBar from "./ButtonTabBar";
import EducationIcon from "/public/assets/images/svgs/education-resume-icon.svg";
import EducationActiveIcon from "/public/assets/images/svgs/education-active-icon.svg";
import EducationDarkIcon from "/public/assets/images/svgs/dark/education-resume-icon.svg";
import EducationActiveDarkIcon from "/public/assets/images/svgs/dark/education-active-icon.svg";
import ExperienceIcon from "/public/assets/images/svgs/experience-icon.svg";
import ExperienceActiveIcon from "/public/assets/images/svgs/experience-active-icon.svg";
import ExperienceDarkIcon from "/public/assets/images/svgs/dark/experience-icon.svg";
import ExperienceActiveDarkIcon from "/public/assets/images/svgs/dark/experience-active-icon.svg";
import SkillIocn from "/public/assets/images/svgs/skill-icon.svg";
import SkillActiveIocn from "/public/assets/images/svgs/skill-active-icon.svg";
import SkillDarkIocn from "/public/assets/images/svgs/dark/skill-icon.svg";
import SkillActiveDarkIocn from "/public/assets/images/svgs/dark/skill-active-icon.svg";
import LanguageIcon from "/public/assets/images/svgs/language-icon.svg";
import LanguageActiveIcon from "/public/assets/images/svgs/language-active-icon.svg";
import LanguageDarkIcon from "/public/assets/images/svgs/dark/language-icon.svg";
import LanguageActiveDarkIcon from "/public/assets/images/svgs/dark/language-active-icon.svg";
import ExpertiseIcon from "/public/assets/images/svgs/expertise.icon.svg";
import ExpertiseActiveIcon from "/public/assets/images/svgs/expertise-active-icon.svg";
import ExpertiseDarkIcon from "/public/assets/images/svgs/dark/expertise.icon.svg";
import ExpertiseActiveDarkIcon from "/public/assets/images/svgs/dark/expertise-active-icon.svg";
import PortfolioIcon from "/public/assets/images/svgs/portfolio-icon.svg";
import PortfolioActiveIcon from "/public/assets/images/svgs/portfolio-active-icon.svg";
import PortfolioDarkIcon from "/public/assets/images/svgs/dark/portfolio-icon.svg";
import PortfolioActiveDarkIcon from "/public/assets/images/svgs/dark/portfolio-active-icon.svg";
import CurricularIcon from "/public/assets/images/svgs/extra-curricular-icon.svg";
import CurricularActiveIcon from "/public/assets/images/svgs/extra-curricular-active-icon.svg";
import CurricularDarkIcon from "/public/assets/images/svgs/dark/extra-curricular-icon.svg";
import CurricularActiveDarkIcon from "/public/assets/images/svgs/dark/extra-curricular-active-icon.svg";
import CoursesIcon from "/public/assets/images/svgs/courses-icon.svg";
import CoursesActiveIcon from "/public/assets/images/svgs/courses-active-icon.svg";
import CoursesDarkIcon from "/public/assets/images/svgs/dark/courses-icon.svg";
import CoursesActiveDarkIcon from "/public/assets/images/svgs/dark/courses-active-icon.svg";
import InternshipsIcon from "/public/assets/images/svgs/internships-icon.svg";
import InternshipsActiveIcon from "/public/assets/images/svgs/internships-active-icon.svg";
import InternshipsDarkIcon from "/public/assets/images/svgs/dark/internships-icon.svg";
import InternshipsActiveDarkIcon from "/public/assets/images/svgs/dark/internships-active-icon.svg";
import ReferencesIcon from "/public/assets/images/svgs/references-icon.svg";
import ReferencesActiveIcon from "/public/assets/images/svgs/references-active-icon.svg";
import ReferencesDarkIcon from "/public/assets/images/svgs/dark/references-icon.svg";
import ReferencesActiveDarkIcon from "/public/assets/images/svgs/dark/references-active-icon.svg";
import HobbiesIcon from "/public/assets/images/svgs/hobbies-icon.svg";
import HobbiesActiveIcon from "/public/assets/images/svgs/hobbies-active-icon.svg";
import HobbiesDarkIcon from "/public/assets/images/svgs/dark/hobbies-icon.svg";
import HobbiesActiveDarkIcon from "/public/assets/images/svgs/dark/hobbies-active-icon.svg";
import AdditionalIcon from "/public/assets/images/svgs/additional-icon.svg";
import AdditionalActiveIcon from "/public/assets/images/svgs/additional-active-icon.svg";
import AdditionalDarkIcon from "/public/assets/images/svgs/dark/additional-icon.svg";
import AdditionalActiveDarkIcon from "/public/assets/images/svgs/dark/additional-active-icon.svg";
import PublicationsIcon from "/public/assets/images/svgs/publications-icon.svg";
import PublicationsActiveIcon from "/public/assets/images/svgs/publications-active-icon.svg";
import PublicationsDarkIcon from "/public/assets/images/svgs/dark/publications-icon.svg";
import PublicationsActiveDarkIcon from "/public/assets/images/svgs/dark/publications-active-icon.svg";
import HonorsIcon from "/public/assets/images/svgs/honors-icon.svg";
import HonorsActiveIcon from "/public/assets/images/svgs/honors-active-icon.svg";
import HonorsDarkIcon from "/public/assets/images/svgs/dark/honors-icon.svg";
import HonorsActiveDarkIcon from "/public/assets/images/svgs/dark/honors-active-icon.svg";
import { isEmpty, toInteger } from "lodash";
export default function ResuemTabSlider({
  tab,
  handleChangeTab,
  theme,
  myResumeTranslate,
  education,
  experiences,
  skills,
  languages,
  expertises,
  portfolios,
  extra,
  courses,
  internships,
  references,
  currentUser,
  awards,
}) {
  const [swiper, setSwiper] = useState(null);
  const slideTo = () => swiper.slideTo(toInteger(tab) - 2);
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
          current={"2"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("2")}
          active={tab == "2"}
          lightIcon={<EducationIcon />}
          darkIcon={<EducationDarkIcon />}
          activeLightIcon={<EducationActiveIcon />}
          activeDarkIcon={<EducationActiveDarkIcon />}
          text={myResumeTranslate["education"]?.title}
          verifyed={education?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"3"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("3")}
          active={tab == "3"}
          lightIcon={<ExperienceIcon />}
          darkIcon={<ExperienceDarkIcon />}
          activeLightIcon={<ExperienceActiveIcon />}
          activeDarkIcon={<ExperienceActiveDarkIcon />}
          text={myResumeTranslate["experience"]?.title}
          verifyed={experiences?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"4"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("4")}
          active={tab == "4"}
          lightIcon={<SkillIocn />}
          darkIcon={<SkillDarkIocn />}
          activeLightIcon={<SkillActiveIocn />}
          activeDarkIcon={<SkillActiveDarkIocn />}
          text={myResumeTranslate["skills"]?.title}
          verifyed={skills?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"5"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("5")}
          active={tab == "5"}
          lightIcon={<LanguageIcon />}
          darkIcon={<LanguageDarkIcon />}
          activeLightIcon={<LanguageActiveIcon />}
          activeDarkIcon={<LanguageActiveDarkIcon />}
          text={myResumeTranslate["languages"]?.title}
          verifyed={languages?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"6"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("6")}
          active={tab == "6"}
          lightIcon={<ExpertiseIcon />}
          darkIcon={<ExpertiseDarkIcon />}
          activeLightIcon={<ExpertiseActiveIcon />}
          activeDarkIcon={<ExpertiseActiveDarkIcon />}
          text={myResumeTranslate["expertise"]?.title}
          verifyed={expertises?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"7"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("7")}
          active={tab == "7"}
          lightIcon={<PortfolioIcon />}
          darkIcon={<PortfolioDarkIcon />}
          activeLightIcon={<PortfolioActiveIcon />}
          activeDarkIcon={<PortfolioActiveDarkIcon />}
          text={myResumeTranslate["portfolio"]?.title}
          verifyed={portfolios?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <ButtonTabBar
          theme={theme}
          current={"8"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("8")}
          active={tab == "8"}
          lightIcon={<CurricularIcon />}
          darkIcon={<CurricularDarkIcon />}
          activeLightIcon={<CurricularActiveIcon />}
          activeDarkIcon={<CurricularActiveDarkIcon />}
          text={
            myResumeTranslate["extra-curricular-activities"]?.title.substr(
              0,
              17
            ) + "..."
          }
          verifyed={extra?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"9"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("9")}
          active={tab == "9"}
          lightIcon={<CoursesIcon />}
          darkIcon={<CoursesDarkIcon />}
          activeLightIcon={<CoursesActiveIcon />}
          activeDarkIcon={<CoursesActiveDarkIcon />}
          text={myResumeTranslate["courses"]?.title}
          verifyed={courses?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"10"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("10")}
          active={tab == "10"}
          lightIcon={<InternshipsIcon />}
          darkIcon={<InternshipsDarkIcon />}
          activeLightIcon={<InternshipsActiveIcon />}
          activeDarkIcon={<InternshipsActiveDarkIcon />}
          text={myResumeTranslate["internships"]?.title}
          verifyed={internships?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"11"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("11")}
          active={tab == "11"}
          lightIcon={<ReferencesIcon />}
          darkIcon={<ReferencesDarkIcon />}
          activeLightIcon={<ReferencesActiveIcon />}
          activeDarkIcon={<ReferencesActiveDarkIcon />}
          text={myResumeTranslate["references"]?.title}
          verifyed={references?.length > 0}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"12"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("12")}
          active={tab == "12"}
          lightIcon={<HobbiesIcon />}
          darkIcon={<HobbiesDarkIcon />}
          activeLightIcon={<HobbiesActiveIcon />}
          activeDarkIcon={<HobbiesActiveDarkIcon />}
          text={myResumeTranslate["hobbies"]?.title}
          verifyed={!isEmpty(currentUser?.hobbies)}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"13"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("13")}
          active={tab == "13"}
          lightIcon={<AdditionalIcon />}
          darkIcon={<AdditionalDarkIcon />}
          activeLightIcon={<AdditionalActiveIcon />}
          activeDarkIcon={<AdditionalActiveDarkIcon />}
          text={
            myResumeTranslate["additional-information"]?.title.substr(0, 17) +
            "..."
          }
          verifyed={!isEmpty(currentUser?.additionalInfo)}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"14"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("14")}
          active={tab == "14"}
          lightIcon={<PublicationsIcon />}
          darkIcon={<PublicationsDarkIcon />}
          activeLightIcon={<PublicationsActiveIcon />}
          activeDarkIcon={<PublicationsActiveDarkIcon />}
          text={myResumeTranslate["publications"]?.title}
          verifyed={!isEmpty(currentUser?.publications)}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ButtonTabBar
          theme={theme}
          current={"15"}
          tab={tab}
          handleChangeTab={() => handleChangeTab("15")}
          active={tab == "15"}
          lightIcon={<HonorsIcon />}
          darkIcon={<HonorsDarkIcon />}
          activeLightIcon={<HonorsActiveIcon />}
          activeDarkIcon={<HonorsActiveDarkIcon />}
          text={myResumeTranslate["honors-and-awards"]?.title}
          verifyed={awards?.length > 0}
        />
      </SwiperSlide>
    </Swiper>
  );
}
