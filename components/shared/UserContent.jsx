import { Breadcrumb, Button, Col, Row } from "antd";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import PagesStyles from "/styles/scss/common/Pages.module.scss";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Link from "next/link";
import FilterSelect from "./form/admin/FilterSelect";
import Favorite from "/public/assets/images/svgs/favorite-icon.svg";
import FavoriteDark from "/public/assets/images/svgs/dark/favorite-icon.svg";
import Liked from "/public/assets/images/svgs/liked-icon.svg";
import FilterButton from "./FilterButton";
import Pen from "/public/assets/images/svgs/pen-user.svg";
import PenDark from "/public/assets/images/svgs/dark/pen-user.svg";
import AboutIcon from "/public/assets/images/svgs/user/about.svg";
import EducationIcon from "/public/assets/images/svgs/user/education.svg";
import ExperienceIcon from "/public/assets/images/svgs/user/experience.svg";
import SkillsIcon from "/public/assets/images/svgs/user/skill.svg";
import LanguagesIcon from "/public/assets/images/svgs/user/languages.svg";
import ExpertiseIcon from "/public/assets/images/svgs/user/expertise.svg";
import PortfolioIcon from "/public/assets/images/svgs/user/portfolio.svg";
import InternshipsIcon from "/public/assets/images/svgs/user/internships.svg";
import CoursesIcon from "/public/assets/images/svgs/user/courses.svg";
import ReferencesIcon from "/public/assets/images/svgs/user/references.svg";
import ExtraIcon from "/public/assets/images/svgs/user/extra.svg";
import HobbieIcon from "/public/assets/images/svgs/user/hobbie.svg";
import AdditionalIcon from "/public/assets/images/svgs/user/additional.svg";
import PublicationsIcon from "/public/assets/images/svgs/user/publications.svg";
import AwardsIcon from "/public/assets/images/svgs/user/awards.svg";
import MenuIcon from "/public/assets/images/svgs/menu-dot.svg";
import MenuDarkIcon from "/public/assets/images/svgs/dark/menu-dot.svg";
import DividerItem from "./user/DividerItem";
import Seprator from "./user/Seprator";
import GrayWrapper from "./GrayWrapper";
import UserWitting from "./UserWitting";
import MarginTop from "./MarginTop";
import Education from "./user/Education";
import { isEmpty } from "lodash";
import moment from "moment";
import Experience from "./user/Experience";
import Progress from "./user/Progress";
import Internships from "./user/Internships";
import Portfolio from "./user/Portfolio";
import Course from "./user/Course";
import References from "./user/References";
import Hobbie from "./user/Hobbie";
import Award from "./user/Award";
import About from "./user/About";
export default function UserContent({
  theme,
  userTranslate = {},
  cv,
  handleLiked,
  role,
  setRoleInputs,
  setStatusInputs,
  router,
  userId,
  setVisible,
}) {
  return (
    <Row>
      <div
        style={{ height: 77 }}
        className={`${
          theme
            ? PagesStyles.lightWrapperWhiteBread
            : PagesStyles.darkWrapperWhiteBread
        } md:block hidden`}
      >
        <Col className="p-4 md:block hidden" span={24}>
          <Row>
            <Col span={12}>
              <BreadcrumbItem>
                <Breadcrumb.Item onClick={() => {}}>
                  <Link href="/">
                    <a>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {userTranslate["dashboard"]?.title}
                      </span>
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => {}}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {userTranslate["profile"]?.title}
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => {}}>
                  <Link href="/profile/user-profile/">
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {userTranslate["user-profile"]?.title}
                    </span>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => {}}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightLast
                        : BreadcrumbStyles.darkLast
                    }
                  >
                    {cv?.givenName + " " + cv?.familyName}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </Col>
            <Col span={12}>
              <div className="flex items-center justify-end">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLiked(cv?.id)}
                  className="pr-4"
                >
                  {cv?.like ? (
                    <Liked />
                  ) : theme ? (
                    <Favorite />
                  ) : (
                    <FavoriteDark />
                  )}
                </div>
                <div className="pr-4">
                  <FilterSelect
                    onChange={(value) =>
                      setRoleInputs((prev) => {
                        return { ...prev, role: value };
                      })
                    }
                    theme={theme}
                    defaultValue={cv?.role}
                    options={role}
                  />
                </div>
                <div className="pr-2">
                  <FilterButton
                    onClick={() =>
                      router.push(`/profile/user-profile/edit/${userId}`)
                    }
                    icon={<Pen />}
                    iconDark={<PenDark />}
                    text={userTranslate["edit"]?.title}
                    theme={theme}
                  />
                </div>
                <div>
                  <FilterSelect
                    onChange={(value) =>
                      setStatusInputs((prev) => {
                        return { ...prev, status: value };
                      })
                    }
                    defaultValue={cv?.status}
                    theme={theme}
                    placeholder="status"
                    options={[
                      { label: "approved", value: "approved" },
                      { label: "suspended", value: "suspended" },
                    ]}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
      <GrayWrapper>
        <Row className="md:hidden block">
          <Col span={24}>
            <div className="flex justify-between items-center">
              <div className="wrapper-bread">
                <BreadcrumbItem>
                  <Breadcrumb.Item onClick={() => {}}>
                    <Link href="/">
                      <a>
                        <span
                          className={
                            theme
                              ? BreadcrumbStyles.lightItem
                              : BreadcrumbStyles.darkItem
                          }
                        >
                          {userTranslate["dashboard"]?.title}
                        </span>
                      </a>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => {}}>
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {userTranslate["profile"]?.title}
                    </span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => {}}>
                    <Link href="/profile/user-profile/">
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {userTranslate["user-profile"]?.title}
                      </span>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => {}}>
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightLast
                          : BreadcrumbStyles.darkLast
                      }
                    >
                      {cv?.givenName + " " + cv?.familyName}
                    </span>
                  </Breadcrumb.Item>
                </BreadcrumbItem>
              </div>
              <div className="flex items-center">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLiked(cv?.id)}
                  className="pr-4"
                >
                  {cv?.like ? (
                    <Liked />
                  ) : theme ? (
                    <Favorite />
                  ) : (
                    <FavoriteDark />
                  )}
                </div>
                <Button
                  onClick={() => setVisible(true)}
                  className={PagesStyles.menuDot}
                >
                  {theme ? <MenuIcon /> : <MenuDarkIcon />}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="md:px-2 pt-2">
            <UserWitting userTranslate={userTranslate} theme={theme} cv={cv} />
          </Col>
          <Col span={24}>
            <MarginTop marginTop={122} />
          </Col>
          <Col span={24} className="md:px-2">
            {!isEmpty(cv?.description) ? (
              <div>
                <DividerItem
                  theme={theme}
                  icon={<AboutIcon />}
                  title={userTranslate["about-me"]?.title}
                />
                <Seprator theme={theme} />
                <About theme={theme} text={cv?.description} />
              </div>
            ) : null}
            {!isEmpty(cv?.userEducations) ? (
              <div>
                <Row>
                  <Col span={24}>
                    <MarginTop marginTop={122} />
                  </Col>
                </Row>
                <DividerItem
                  theme={theme}
                  icon={<EducationIcon />}
                  title={userTranslate["education"]?.title}
                />
                <Seprator theme={theme} />
                <Row>
                  {!isEmpty(cv?.userEducations) ? (
                    <Col span={24}>
                      {cv?.userEducations?.map((item, index) => {
                        return (
                          <Education
                            theme={theme}
                            key={index}
                            city={
                              item?.country?.title + " " + item?.city?.title
                            }
                            degree={item?.degree?.title}
                            institute={item?.institute}
                            date={
                              moment(item?.fromDate).format("MMM YYYY") +
                              " - " +
                              moment(item?.toDate).format("MMM YYYY")
                            }
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                </Row>
              </div>
            ) : null}
            {!isEmpty(cv?.userExperiences) ? (
              <div>
                <Row>
                  <Col span={24}>
                    <MarginTop marginTop={122} />
                  </Col>
                </Row>
                <DividerItem
                  theme={theme}
                  icon={<ExperienceIcon />}
                  title={userTranslate["experience"]?.title}
                />
                <Seprator theme={theme} />
                <Row>
                  {!isEmpty(cv?.userExperiences) ? (
                    <Col span={24}>
                      {cv?.userExperiences?.map((item, index) => {
                        return (
                          <Experience
                            key={index}
                            theme={theme}
                            city={
                              item?.country?.title + " " + item?.city?.title
                            }
                            description={item?.description}
                            title={item?.title}
                            date={
                              moment(item?.fromDate).format("MMM YYYY") +
                              " - " +
                              moment(item?.toDate).format("MMM YYYY")
                            }
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                </Row>
              </div>
            ) : null}
            <Col span={24}>
              <MarginTop marginTop={96} />
            </Col>
            <Row>
              {!isEmpty(cv?.userSkils) ? (
                <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                  <DividerItem
                    theme={theme}
                    icon={<SkillsIcon />}
                    title={userTranslate["skills"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userSkils)
                      ? cv?.userSkils?.map((item, index) => {
                          return (
                            <Col span={24}>
                              <Progress
                                theme={theme}
                                text={item?.domination?.title}
                                title={item?.title}
                                percent={item?.percentage}
                                key={index}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
              <Col className="md:hidden block" span={24}>
                <MarginTop marginTop={96} />
              </Col>
              {!isEmpty(cv?.userLanguages) ? (
                <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                  <DividerItem
                    theme={theme}
                    icon={<LanguagesIcon />}
                    title={userTranslate["languages"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userLanguages)
                      ? cv?.userLanguages?.map((item, index) => {
                          return (
                            <Col span={24}>
                              <Progress
                                theme={theme}
                                text={item?.certificate?.title}
                                title={item?.language?.title}
                                percent={item?.percentage}
                                key={index}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
              <Col span={24}>
                <MarginTop marginTop={96} />
              </Col>
              {!isEmpty(cv?.userExpertises) ? (
                <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                  <DividerItem
                    theme={theme}
                    icon={<ExpertiseIcon />}
                    title={userTranslate["expertise"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userExpertises)
                      ? cv?.userExpertises?.map((item, index) => {
                          return (
                            <Col span={24}>
                              <Progress
                                theme={theme}
                                text={item?.domination?.title}
                                title={item?.title}
                                percent={item?.percentage}
                                key={index}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
              <Col className="md:hidden block" span={24}>
                <MarginTop marginTop={96} />
              </Col>
              {!isEmpty(cv?.userInterships) ? (
                <Col
                  md={{ span: 12 }}
                  span={24}
                  className="md:block hidden md:pl-2.5 pl-0"
                >
                  <DividerItem
                    theme={theme}
                    icon={<InternshipsIcon />}
                    title={userTranslate["internships"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userInterships)
                      ? cv?.userInterships?.map((item, index) => {
                          return (
                            <Col span={24}>
                              <Internships
                                key={index}
                                theme={theme}
                                city={
                                  item?.country?.title + " " + item?.city?.title
                                }
                                title={item?.title}
                                date={
                                  moment(item?.fromDate).format("MMM YYYY") +
                                  " - " +
                                  moment(item?.toDate).format("MMM YYYY")
                                }
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
            </Row>
          </Col>
          {!isEmpty(cv?.userPortfolios) ? (
            <Col span={24} className="md:px-2">
              <MarginTop marginTop={96} />
              <DividerItem
                theme={theme}
                icon={<PortfolioIcon />}
                title={userTranslate["portfolio"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.userPortfolios)
                  ? cv?.userPortfolios?.map((item, index) => {
                      return (
                        <Col span={24}>
                          <Portfolio
                            key={index}
                            theme={theme}
                            link={item?.link}
                            videoLink={item?.videoLink}
                            title={item?.title}
                            images={item?.images}
                          />
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </Col>
          ) : null}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          <Col span={24}>
            <Row className="md:px-2">
              {!isEmpty(cv?.userCourses) ? (
                <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                  <DividerItem
                    theme={theme}
                    icon={<CoursesIcon />}
                    title={userTranslate["courses"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userCourses)
                      ? cv?.userCourses?.map((item, index) => {
                          return (
                            <Col span={24} className="pb-5">
                              <Course
                                theme={theme}
                                title={item?.title}
                                date={
                                  moment(item?.fromDate).format("MMM YYYY") +
                                  " - " +
                                  moment(item?.toDate).format("MMM YYYY")
                                }
                                key={index}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
              {!isEmpty(cv?.userReferences) ? (
                <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                  <DividerItem
                    theme={theme}
                    icon={<ReferencesIcon />}
                    title={userTranslate["references"]?.title}
                  />
                  <Seprator theme={theme} />
                  <Row>
                    {!isEmpty(cv?.userReferences)
                      ? cv?.userReferences?.map((item, index) => {
                          return (
                            <Col span={24} className="pb-5">
                              <References
                                theme={theme}
                                email={item?.email}
                                company={item?.company}
                                phone={item?.phone}
                                title={item?.fullName}
                                key={index}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </Col>
              ) : null}
            </Row>
          </Col>
          {!isEmpty(cv?.userInterships) ? (
            <Col
              md={{ span: 12 }}
              span={24}
              className="md:hidden block md:pl-2.5 pl-0"
            >
              <DividerItem
                theme={theme}
                icon={<InternshipsIcon />}
                title={userTranslate["internships"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.userInterships)
                  ? cv?.userInterships?.map((item, index) => {
                      return (
                        <Col span={24}>
                          <Internships
                            key={index}
                            theme={theme}
                            city={
                              item?.country?.title + " " + item?.city?.title
                            }
                            title={item?.title}
                            date={
                              moment(item?.fromDate).format("MMM YYYY") +
                              " - " +
                              moment(item?.toDate).format("MMM YYYY")
                            }
                          />
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </Col>
          ) : null}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          {!isEmpty(cv?.userExtraActivities) ? (
            <Col span={24} className="px-2">
              <DividerItem
                theme={theme}
                icon={<ExtraIcon />}
                title={userTranslate["extra-curricular-activities"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.userExtraActivities) ? (
                  <Col span={24}>
                    {cv?.userExtraActivities?.map((item, index) => {
                      return (
                        <Experience
                          key={index}
                          theme={theme}
                          city={item?.country?.title + " " + item?.city?.title}
                          description={item?.description}
                          title={item?.title}
                          date={
                            moment(item?.fromDate).format("MMM YYYY") +
                            " - " +
                            moment(item?.toDate).format("MMM YYYY")
                          }
                        />
                      );
                    })}
                  </Col>
                ) : null}
              </Row>
            </Col>
          ) : null}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          {!isEmpty(cv?.hobbies) ? (
            <Col span={24} className="px-2">
              <DividerItem
                theme={theme}
                icon={<HobbieIcon />}
                title={userTranslate["hobbies"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.hobbies) ? (
                  <Col span={24}>
                    <Hobbie theme={theme} text={cv?.hobbies} />
                  </Col>
                ) : null}
              </Row>
            </Col>
          ) : null}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          {!isEmpty(cv?.additionalInfo) ? (
            <Col span={24} className="px-2">
              <DividerItem
                theme={theme}
                icon={<AdditionalIcon />}
                title={userTranslate["additional-information"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.additionalInfo) ? (
                  <Col span={24}>
                    <Hobbie theme={theme} text={cv?.additionalInfo} />
                  </Col>
                ) : null}
              </Row>
            </Col>
          ) : null}{" "}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          {!isEmpty(cv?.publications) ? (
            <Col span={24} className="px-2">
              <DividerItem
                theme={theme}
                icon={<PublicationsIcon />}
                title={userTranslate["publications"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.publications) ? (
                  <Col span={24}>
                    <Hobbie theme={theme} text={cv?.publications} />
                  </Col>
                ) : null}
              </Row>
            </Col>
          ) : null}
          <Col span={24}>
            <MarginTop marginTop={96} />
          </Col>
          {!isEmpty(cv?.userAwards) ? (
            <Col span={24} className="md:px-2">
              <DividerItem
                theme={theme}
                icon={<AwardsIcon />}
                title={userTranslate["honors-and-awards"]?.title}
              />
              <Seprator theme={theme} />
              <Row>
                {!isEmpty(cv?.userAwards) ? (
                  <Col span={24}>
                    {cv?.userAwards?.map((item, index) => {
                      return (
                        <Award
                          key={index}
                          theme={theme}
                          description={item?.description}
                          title={item?.title}
                          date={
                            moment(item?.fromDate).format("MMM YYYY") +
                            " - " +
                            moment(item?.toDate).format("MMM YYYY")
                          }
                        />
                      );
                    })}
                  </Col>
                ) : null}
              </Row>
            </Col>
          ) : null}
        </Row>
      </GrayWrapper>
    </Row>
  );
}
