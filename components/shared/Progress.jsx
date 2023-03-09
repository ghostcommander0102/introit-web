import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import ContentWrapper from "./ContentWrapper";
import FormItem from "./form/FormItem";
import PercentageText from "./form/PercentageText";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import Persent from "/public/assets/images/svgs/persent.svg";
import PersentDark from "/public/assets/images/svgs/dark/persent.svg";
import SaveButton from "./SaveButton";
import DividerItem from "./DividerItem";
import GlobalTabSlider from "./global/GlobalTabSlider";
export default function Progress({
  globalSettingTranslate,
  theme,
  tab,
  handleChangeTab,
  percentageInputs,
  setPercentageInputs,
  handelUpdatePercentage,
}) {
  return (
    <Row>
      <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
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
                  {globalSettingTranslate["dashboard"]?.title}
                </span>
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
            <span
              className={
                theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
              }
            >
              {globalSettingTranslate["global-setting"]?.title}
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => {}}>
            <span
              className={
                theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
              }
            >
              {globalSettingTranslate["profile-percentage"]?.title}
            </span>
          </Breadcrumb.Item>
        </BreadcrumbItem>
      </Col>
      <Col
        style={{ height: 50 }}
        span={24}
        className={`${
          theme ? Pages.lightWrapperSlider : Pages.darkWrapperSlider
        } md:hidden block px-4 py-2`}
      >
        <GlobalTabSlider
          tab={tab}
          handleChangeTab={handleChangeTab}
          theme={theme}
          globalSettingTranslate={globalSettingTranslate}
        />
      </Col>
      <ContentWrapper theme={theme}>
        <div className="wrapper-bread-setting md:hidden block">
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
                    {globalSettingTranslate["dashboard"]?.title}
                  </span>
                </a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {globalSettingTranslate["global-setting"]?.title}
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {globalSettingTranslate["profile-percentage"]?.title}
              </span>
            </Breadcrumb.Item>
          </BreadcrumbItem>
        </div>
        <Row className="md:pl-2">
          <Col span={24}>
            <DividerItem
              theme={theme}
              content={globalSettingTranslate["personal-infromation"]?.title}
            />
          </Col>
        </Row>
        <FormItem>
          <Row className="mt-5">
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["first-name"]?.title}
                name="firstName"
                onChange={setPercentageInputs}
                value={percentageInputs?.firstName}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["last-name"]?.title}
                name="lastName"
                onChange={setPercentageInputs}
                value={percentageInputs?.lastName}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["email"]?.title}
                name="email"
                onChange={setPercentageInputs}
                value={percentageInputs?.email}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["phone"]?.title}
                name="phone"
                onChange={setPercentageInputs}
                value={percentageInputs?.phone}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["profile-image"]?.title}
                name="profileImage"
                onChange={setPercentageInputs}
                value={percentageInputs?.profileImage}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["date-of-birth"]?.title}
                name="dateOfBirth"
                onChange={setPercentageInputs}
                value={percentageInputs?.dateOfBirth}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["country-of-residence"]?.title}
                name="country"
                onChange={setPercentageInputs}
                value={percentageInputs?.country}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["street-address"]?.title}
                name="address"
                onChange={setPercentageInputs}
                value={percentageInputs?.address}
              />
            </Col>
          </Row>
        </FormItem>
        <Row className="md:pl-2">
          <Col span={24}>
            <DividerItem
              theme={theme}
              content={globalSettingTranslate["other-information"]?.title}
            />
          </Col>
        </Row>
        <FormItem>
          <Row className="mt-5">
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["job-title"]?.title}
                name="jobTitle"
                onChange={setPercentageInputs}
                value={percentageInputs?.jobTitle}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["nationality"]?.title}
                name="nationality"
                onChange={setPercentageInputs}
                value={percentageInputs?.nationality}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["academic-level"]?.title}
                name="academicLevel"
                onChange={setPercentageInputs}
                value={percentageInputs?.academicLevel}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["industry"]?.title}
                name="industry"
                onChange={setPercentageInputs}
                value={percentageInputs?.industry}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["salary-currency"]?.title}
                name="currency"
                onChange={setPercentageInputs}
                value={percentageInputs?.currency}
              />
            </Col>
          </Row>
        </FormItem>
        <Row className="md:pl-2">
          <Col span={24}>
            <DividerItem
              theme={theme}
              content={globalSettingTranslate["resume"]?.title}
            />
          </Col>
        </Row>
        <FormItem>
          <Row className="mt-5">
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["about-me"]?.title}
                name="aboutMe"
                onChange={setPercentageInputs}
                value={percentageInputs?.aboutMe}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["education"]?.title}
                name="education"
                onChange={setPercentageInputs}
                value={percentageInputs?.education}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["experience"]?.title}
                name="experience"
                onChange={setPercentageInputs}
                value={percentageInputs?.experience}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["skills"]?.title}
                name="skills"
                onChange={setPercentageInputs}
                value={percentageInputs?.skills}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["languages"]?.title}
                name="languages"
                onChange={setPercentageInputs}
                value={percentageInputs?.languages}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["expertise"]?.title}
                name="expertise"
                onChange={setPercentageInputs}
                value={percentageInputs?.expertise}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["portfolio"]?.title}
                name="portfolio"
                onChange={setPercentageInputs}
                value={percentageInputs?.portfolio}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={
                  globalSettingTranslate["extra-curricular-activities"]?.title
                }
                name="extraCurriculam"
                onChange={setPercentageInputs}
                value={percentageInputs?.extraCurriculam}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["courses"]?.title}
                name="courses"
                onChange={setPercentageInputs}
                value={percentageInputs?.courses}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["internships"]?.title}
                name="interships"
                onChange={setPercentageInputs}
                value={percentageInputs?.interships}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["references"]?.title}
                name="references"
                onChange={setPercentageInputs}
                value={percentageInputs?.references}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["hobbies"]?.title}
                name="hobbies"
                onChange={setPercentageInputs}
                value={percentageInputs?.hobbies}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["additional-information"]?.title}
                name="additionalInfo"
                onChange={setPercentageInputs}
                value={percentageInputs?.additionalInfo}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pl-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["publications"]?.title}
                name="publications"
                onChange={setPercentageInputs}
                value={percentageInputs?.publications}
              />
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 12 }}
              span={12}
              className="md:px-2.5 pr-2.5"
            >
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["honors-and-awards"]?.title}
                name="awards"
                onChange={setPercentageInputs}
                value={percentageInputs?.awards}
              />
            </Col>
          </Row>
        </FormItem>

        <SaveButton
          theme={theme}
          onClick={handelUpdatePercentage}
          text={globalSettingTranslate["save"]?.title}
        />
      </ContentWrapper>
    </Row>
  );
}
