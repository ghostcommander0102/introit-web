import { Col, Row } from "antd";
import React from "react";
import CancelButton from "../CancelButton";
import ContentWrapper from "../ContentWrapper";
import DividerItem from "../DividerItem";
import PercentageText from "../form/PercentageText";
import SaveButton from "../SaveButton";
import Persent from "/public/assets/images/svgs/persent.svg";
import PersentDark from "/public/assets/images/svgs/dark/persent.svg";
import Save from "/public/assets/images/svgs/save-role.svg";
import Draft from "/public/assets/images/svgs/draft-role.svg";
import DraftDark from "/public/assets/images/svgs/dark/draft-role.svg";
export default function SettingPercentageContent({
  theme,
  percentageInputs,
  setPercentageInputs,
  handelUpdatePercentage,
  globalSettingTranslate,
}) {
  return (
    <Row className="pb-10">
      <Col span={24}>
        <ContentWrapper marginLeft={0} marginRight={0} theme={theme}>
          <Row>
            <Col span={24} className="pl-2.5">
              <DividerItem
                fontWeight={400}
                content={
                  globalSettingTranslate["profile"]?.title +
                  " / " +
                  globalSettingTranslate["my-profile"]?.title +
                  " / " +
                  globalSettingTranslate["personal-information"]?.title
                }
                theme={theme}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["first-name"]?.title}
                name="firstName"
                onChange={setPercentageInputs}
                value={percentageInputs?.firstName}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["last-name"]?.title}
                name="lastName"
                onChange={setPercentageInputs}
                value={percentageInputs?.lastName}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["email"]?.title}
                name="email"
                onChange={setPercentageInputs}
                value={percentageInputs?.email}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["phone"]?.title}
                name="phone"
                onChange={setPercentageInputs}
                value={percentageInputs?.phone}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["profile-image"]?.title}
                name="profileImage"
                onChange={setPercentageInputs}
                value={percentageInputs?.profileImage}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["date-of-birth"]?.title}
                name="dateOfBirth"
                onChange={setPercentageInputs}
                value={percentageInputs?.dateOfBirth}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["country-of-residence"]?.title}
                name="country"
                onChange={setPercentageInputs}
                value={percentageInputs?.country}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
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
          <Row>
            <Col span={24} className="pl-2.5">
              <DividerItem
                fontWeight={400}
                content={
                  globalSettingTranslate["profile"]?.title +
                  " / " +
                  globalSettingTranslate["my-profile"]?.title +
                  " / " +
                  globalSettingTranslate["other-information"]?.title
                }
                theme={theme}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["job-title"]?.title}
                name="jobTitle"
                onChange={setPercentageInputs}
                value={percentageInputs?.jobTitle}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["nationality"]?.title}
                name="nationality"
                onChange={setPercentageInputs}
                value={percentageInputs?.nationality}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["academic-level"]?.title}
                name="academicLevel"
                onChange={setPercentageInputs}
                value={percentageInputs?.academicLevel}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["industry"]?.title}
                name="industry"
                onChange={setPercentageInputs}
                value={percentageInputs?.industry}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
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
          <Row>
            <Col span={24} className="pl-2.5">
              <DividerItem
                fontWeight={400}
                content={
                  globalSettingTranslate["profile"]?.title +
                  " / " +
                  globalSettingTranslate["resume"]?.title
                }
                theme={theme}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["about-me"]?.title}
                name="aboutMe"
                onChange={setPercentageInputs}
                value={percentageInputs?.aboutMe}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["education"]?.title}
                name="education"
                onChange={setPercentageInputs}
                value={percentageInputs?.education}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["experience"]?.title}
                name="experience"
                onChange={setPercentageInputs}
                value={percentageInputs?.experience}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["skills"]?.title}
                name="skills"
                onChange={setPercentageInputs}
                value={percentageInputs?.skills}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["languages"]?.title}
                name="languages"
                onChange={setPercentageInputs}
                value={percentageInputs?.languages}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["expertise"]?.title}
                name="expertise"
                onChange={setPercentageInputs}
                value={percentageInputs?.expertise}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["portfolio"]?.title}
                name="portfolio"
                onChange={setPercentageInputs}
                value={percentageInputs?.portfolio}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
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
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["courses"]?.title}
                name="courses"
                onChange={setPercentageInputs}
                value={percentageInputs?.courses}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["interships"]?.title}
                name="interships"
                onChange={setPercentageInputs}
                value={percentageInputs?.interships}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["references"]?.title}
                name="references"
                onChange={setPercentageInputs}
                value={percentageInputs?.references}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["hobbies"]?.title}
                name="hobbies"
                onChange={setPercentageInputs}
                value={percentageInputs?.hobbies}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["additional-information"]?.title}
                name="additionalInfo"
                onChange={setPercentageInputs}
                value={percentageInputs?.additionalInfo}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
              <PercentageText
                icon={theme ? <Persent /> : <PersentDark />}
                theme={theme}
                label={globalSettingTranslate["publications"]?.title}
                name="publications"
                onChange={setPercentageInputs}
                value={percentageInputs?.publications}
              />
            </Col>
            <Col span={6} className="md:px-2.5 px-0">
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
          <Row>
            <Col
              md={{ span: 24 }}
              span={24}
              className="mt-10 pt-10 pr-10 flex justify-end items-center"
            >
              <div className="pr-10 mr-10">
                <CancelButton
                  translator={globalSettingTranslate}
                  theme={theme}
                />
              </div>
              <SaveButton
                theme={theme}
                leftText={
                  <div className="flex items-center justify-center">
                    <span className="pr-1">
                      {theme ? <Draft /> : <DraftDark />}
                    </span>
                    {globalSettingTranslate["draft"]?.title}
                  </div>
                }
                onClickRight={handelUpdatePercentage}
                rightText={
                  <div className="flex items-center justify-center">
                    <span className="pr-1">
                      <Save />
                    </span>
                    {globalSettingTranslate["save"]?.title}
                  </div>
                }
                type="submit"
              />
            </Col>
          </Row>
        </ContentWrapper>
      </Col>
    </Row>
  );
}
