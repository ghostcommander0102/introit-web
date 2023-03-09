import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import ContentWrapper from "./ContentWrapper";
import TextItem from "./form/TextItem";
import SelectItem from "./form/SelectItem";
import Eye from "/public/assets/images/svgs/eye-icon.svg";
import PhoneItem from "./form/PhoneItem";
import DateItem from "./form/DateItem";
import SaveButton from "./SaveButton";
import FormItem from "./form/FormItem";
import SwitchItem from "./form/SwitchItem";
import EmailItem from "./form/EmailItem";
import PasswordItem from "./form/PasswordItem";
import { isEmpty } from "lodash";
import NumberItem from "./form/NumberItem";
import AddressItem from "./form/AddressItem";
import moment from "moment";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import CovertLetter from "./CovertLetter";
import SocialNetworks from "./SocialNetworks";
import SidebarProfile from "./SidebarProfile";
import ProfileBreaCrumb from "./ProfileBreadCrumb";
import ProfileTabSlider from "./ProfileTabSlider";
import Styles from "/styles/scss/common/Pages.module.scss";
import Link from "next/link";
export default function TabBarProfile({
  theme,
  tab,
  handleGenerateMultyAuth,
  handleDisableMultyAuth,
  academicLevels,
  nationalities,
  questions,
  industries,
  currencies,
  InfoRecoil,
  securityRecoil,
  setInputsInfo,
  inputsInfo,
  updatePersonalInfo,
  setInputsSecurity,
  inputsSecurity,
  inputsOther,
  setInputsOther,
  updateOtherInfo,
  errors,
  updateSecurityInfo,
  handleSendSms,
  disabledButton,
  drivingRecoil,
  gendersRecoil,
  myProfileTranslate,
  handleChangeTab,
  description,
  setDescription,
  handleChangeDescription,
  socialsInputs,
  handleShow,
  currentUser,
  handleOpenBanner,
  handleOpenProf,
  address,
  setCoverVisible,
  coverVisible,
}) {
  return (
    <div>
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
                    {myProfileTranslate["dashboard"]?.title}
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
                {myProfileTranslate["profile"]?.title}
              </span>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {tab == 1
                  ? myProfileTranslate["personal-infromation"]?.title
                  : tab == 2
                  ? myProfileTranslate["other-information"]?.title
                  : tab == 3
                  ? myProfileTranslate["security-and-login"]?.title
                  : null}
              </span>
            </Breadcrumb.Item>
          </BreadcrumbItem>
        </Col>
        <Col
          span={24}
          className={`${
            theme ? Styles.lightWrapperSlider : Styles.darkWrapperSlider
          } md:hidden block px-4 py-2`}
        >
          <ProfileTabSlider
            handleChangeTab={handleChangeTab}
            tab={tab}
            theme={theme}
          />
        </Col>
      </Row>
      <ContentWrapper theme={theme}>
        {tab == 1 ? (
          <FormItem onFinish={updatePersonalInfo}>
            <Row className="pt-0 md:pb-4 md:hidden block">
              <Col span={24}>
                <ProfileBreaCrumb
                  theme={theme}
                  myProfileTranslate={myProfileTranslate}
                  tab={tab}
                  handleChangeTab={handleChangeTab}
                />
              </Col>
            </Row>
            <Row className="md:p-2 p-0">
              <Col span={24} className="md:hidden block">
                <SidebarProfile
                  edit={true}
                  tab={tab}
                  handleChangeTab={handleChangeTab}
                  currentUser={currentUser}
                  handleOpenBanner={handleOpenBanner}
                  handleOpenProf={handleOpenProf}
                  myProfileTranslate={myProfileTranslate}
                  theme={theme}
                />
              </Col>
              <Col
                lg={{ span: 4 }}
                md={{ span: 4 }}
                span={24}
                className="md:mt-0 mt-3 md:pr-2.5 pr-0"
              >
                <SelectItem
                  isWrong={!isEmpty(errors?.genderId) ? true : false}
                  help={errors?.genderId}
                  onChange={(item) => {
                    setInputsInfo((prev) => {
                      return { ...prev, genderId: item };
                    });
                  }}
                  defaultValue={
                    !isEmpty(inputsInfo) ? inputsInfo?.genderId : null
                  }
                  theme={theme}
                  options={gendersRecoil}
                  label={myProfileTranslate["gender"]?.title}
                />
              </Col>
              <Col
                lg={{ span: 10 }}
                md={{ span: 10 }}
                span={24}
                className="md:px-2.5 px-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.firstName) ? true : false}
                  help={errors?.firstName}
                  name="firstName"
                  onChange={setInputsInfo}
                  label={myProfileTranslate["first-name"]?.title}
                  type="text"
                  placeholder={
                    !isEmpty(inputsInfo?.firstName)
                      ? inputsInfo?.firstName
                      : null
                  }
                  theme={theme}
                  value={inputsInfo.firstName}
                />
              </Col>
              <Col
                lg={{ span: 10 }}
                md={{ span: 10 }}
                span={24}
                className="md:pl-2.5 pl-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.lastName) ? true : false}
                  help={errors?.lastName}
                  name="lastName"
                  onChange={setInputsInfo}
                  label={myProfileTranslate["last-name"]?.title}
                  type="text"
                  placeholder={
                    !isEmpty(inputsInfo?.lastName) ? inputsInfo?.lastName : null
                  }
                  theme={theme}
                  value={inputsInfo.lastName}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                span={24}
                className="md:pr-2.5 pr-0"
              >
                <EmailItem
                  isWrong={!isEmpty(errors?.email) ? true : false}
                  help={errors?.email}
                  disabled={true}
                  name="email"
                  theme={theme}
                  label={myProfileTranslate["email"]?.title}
                  type="email"
                  value={InfoRecoil?.email}
                  verifyed={true}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                span={24}
                className="md:pl-2.5 pl-0"
              >
                <PhoneItem
                  isWrong={!isEmpty(errors?.phone) ? true : false}
                  help={errors?.phone}
                  value={inputsInfo?.phone}
                  onChange={(phone) => {
                    setInputsInfo((prev) => {
                      return { ...prev, phone: phone };
                    });
                  }}
                  placeholder={
                    !isEmpty(inputsInfo?.phone) ? inputsInfo?.phone : null
                  }
                  verifyed={InfoRecoil?.isPhoneVerified}
                  hasphone={!isEmpty(InfoRecoil?.phone) ? true : false}
                  handleSendSms={handleSendSms}
                  translator={myProfileTranslate}
                  label={myProfileTranslate["phone"]?.title}
                  theme={theme}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                span={24}
                className="relative md:pr-2.5 pr-0"
              >
                <DateItem
                  picker="date"
                  dateFormat="MMM DD, YYYY"
                  label={myProfileTranslate["date-of-birth"]?.title}
                  isWrong={!isEmpty(errors?.dateOfBirth) ? true : false}
                  help={errors?.dateOfBirth}
                  value={inputsInfo?.dateOfBirth || moment()}
                  theme={theme}
                  onChange={(value, valueString) => {
                    setInputsInfo((prev) => {
                      return { ...prev, dateOfBirth: value };
                    });
                  }}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                span={24}
                className="md:mt-0 mt-3 md:pl-2.5 pl-0"
              >
                <AddressItem
                  value={
                    !inputsInfo.birth.includes("null") ? inputsInfo.birth : null
                  }
                  onChange={setInputsInfo}
                  theme={theme}
                  name="birth"
                  label={myProfileTranslate["place-of-birth"]?.title}
                  address={address}
                />
              </Col>
              <Col md={{ span: 24 }} span={24}>
                <AddressItem
                  value={inputsInfo.streetAddress}
                  onChange={setInputsInfo}
                  theme={theme}
                  name="streetAddress"
                  label={myProfileTranslate["address"]?.title}
                  address={address}
                />
              </Col>
              <Col span={24} className="md:hidden block">
                <CovertLetter
                  setCoverVisible={setCoverVisible}
                  coverVisible={coverVisible}
                  edit={true}
                  myProfileTranslate={myProfileTranslate}
                  description={description.description}
                  setDescription={setDescription}
                  handleChangeDescription={handleChangeDescription}
                  theme={theme}
                />
              </Col>
              <Col span={24} className="pt-4  mb-5 md:hidden block">
                <SocialNetworks
                  edit={true}
                  myProfileTranslate={myProfileTranslate}
                  theme={theme}
                  socialsInputs={socialsInputs}
                  handleShow={handleShow}
                />
              </Col>
            </Row>
            <SaveButton
              disabledButton={disabledButton}
              theme={theme}
              type="submit"
              text={myProfileTranslate["save"]?.title}
            />
          </FormItem>
        ) : tab == 2 ? (
          <FormItem onFinish={updateOtherInfo}>
            <Row className="pt-0 md:pb-4 md:hidden block">
              <Col span={24}>
                <ProfileBreaCrumb
                  theme={theme}
                  myProfileTranslate={myProfileTranslate}
                  tab={tab}
                  handleChangeTab={handleChangeTab}
                />
              </Col>
            </Row>
            <Row className="md:p-2 p-0">
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <TextItem
                  isWrong={!isEmpty(errors?.jobTitle) ? true : false}
                  help={errors?.jobTitle}
                  value={inputsOther.jobTitle}
                  name="jobTitle"
                  label={myProfileTranslate["job-title"]?.title}
                  type="text"
                  placeholder={
                    !isEmpty(inputsOther) ? inputsOther?.jobTitle : null
                  }
                  theme={theme}
                  onChange={setInputsOther}
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.nationalityId) ? true : false}
                  help={errors?.nationalityId}
                  defaultValue={
                    !isEmpty(inputsOther) ? inputsOther?.nationalityId : null
                  }
                  name="nationalityId"
                  theme={theme}
                  placeholder=""
                  options={nationalities}
                  label={myProfileTranslate["nationality"]?.title}
                  onChange={(value) => {
                    setInputsOther((prev) => {
                      return { ...prev, nationalityId: value };
                    });
                  }}
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.academicLevelId) ? true : false}
                  help={errors?.academicLevelId}
                  defaultValue={
                    !isEmpty(inputsOther) ? inputsOther?.academicLevelId : null
                  }
                  name="academicLevelId"
                  theme={theme}
                  placeholder=""
                  options={academicLevels}
                  label={myProfileTranslate["academic-level"]?.title}
                  onChange={(value) => {
                    setInputsOther((prev) => {
                      return { ...prev, academicLevelId: value };
                    });
                  }}
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.industryId) ? true : false}
                  help={errors?.industryId}
                  defaultValue={
                    !isEmpty(inputsOther) ? inputsOther?.industryId : null
                  }
                  name="industryId"
                  theme={theme}
                  placeholder=""
                  options={industries}
                  label={myProfileTranslate["industry"]?.title}
                  onChange={(value) => {
                    setInputsOther((prev) => {
                      return { ...prev, industryId: value };
                    });
                  }}
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.currencyId) ? true : false}
                  help={errors?.currencyId}
                  defaultValue={
                    !isEmpty(inputsOther) ? inputsOther?.currencyId : null
                  }
                  theme={theme}
                  placeholder=""
                  options={currencies}
                  label={myProfileTranslate["salary-currency"]?.title}
                  onChange={(value) => {
                    setInputsOther((prev) => {
                      return { ...prev, currencyId: value };
                    });
                  }}
                />
              </Col>
              <Col md={{ span: 6 }} span={24} className="md:px-2.5 px-0">
                <NumberItem
                  name="minSalary"
                  isWrong={!isEmpty(errors?.minSalary) ? true : false}
                  help={errors?.minSalary}
                  value={inputsOther?.minSalary}
                  theme={theme}
                  placeholder="0.000"
                  label={myProfileTranslate["salary-range(from)"]?.title}
                  onChange={(value) =>
                    setInputsOther((prev) => {
                      return { ...prev, minSalary: value };
                    })
                  }
                />
              </Col>
              <Col md={{ span: 6 }} span={24} className="md:pl-2.5 pl-0">
                <NumberItem
                  name="maxSalary"
                  isWrong={!isEmpty(errors?.maxSalary) ? true : false}
                  help={errors?.maxSalary}
                  value={inputsOther?.maxSalary}
                  theme={theme}
                  placeholder="0.000"
                  options={currencies}
                  label={myProfileTranslate["salary-range(to)"]?.title}
                  onChange={(value) =>
                    setInputsOther((prev) => {
                      return { ...prev, maxSalary: value };
                    })
                  }
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.drivingLicenseId) ? true : false}
                  help={errors?.drivingLicenseId}
                  defaultValue={
                    !isEmpty(inputsOther) ? inputsOther?.drivingLicenseId : null
                  }
                  theme={theme}
                  placeholder=""
                  options={drivingRecoil}
                  label={myProfileTranslate["driving-license"]?.title}
                  onChange={(value) => {
                    setInputsOther((prev) => {
                      return { ...prev, drivingLicenseId: value };
                    });
                  }}
                />
              </Col>
              <Col
                md={{ span: 12 }}
                span={24}
                className="md:pl-2.5 pl-0 md:pb-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.website) ? true : false}
                  help={errors?.website}
                  value={inputsOther.website}
                  name="website"
                  label={myProfileTranslate["website"]?.title}
                  type="text"
                  placeholder={
                    !isEmpty(inputsOther) ? inputsOther?.website : null
                  }
                  theme={theme}
                  onChange={setInputsOther}
                />
              </Col>
            </Row>
            <SaveButton
              disabledButton={disabledButton}
              theme={theme}
              type="submit"
              text={myProfileTranslate["save"]?.title}
            />
          </FormItem>
        ) : tab == 3 ? (
          <FormItem customeForm={true} onFinish={updateSecurityInfo}>
            <Row className="pt-0 md:pb-4 md:hidden block">
              <Col span={24}>
                <ProfileBreaCrumb
                  theme={theme}
                  myProfileTranslate={myProfileTranslate}
                  tab={tab}
                  handleChangeTab={handleChangeTab}
                />
              </Col>
            </Row>
            <Row className="md:p-2">
              <Col md={{ span: 12, order: 0 }} order={1} span={24}>
                <PasswordItem
                  isWrong={!isEmpty(errors?.oldPassword) ? true : false}
                  help={errors?.oldPassword}
                  name="oldPassword"
                  onChange={setInputsSecurity}
                  label={myProfileTranslate["old-password"]?.title}
                  type="password"
                  placeholder="*********"
                  icon={<Eye />}
                  theme={theme}
                />
              </Col>
              <Col
                md={{ span: 12 }}
                span={24}
                className="flex justify-end  items-center"
              >
                {securityRecoil?.is2FAEnabled ? (
                  <SwitchItem
                    theme={theme}
                    checked={true}
                    onChange={handleDisableMultyAuth}
                    label={
                      myProfileTranslate["two-factor-authentication"]?.title
                    }
                  />
                ) : (
                  <SwitchItem
                    theme={theme}
                    checked={false}
                    onChange={handleGenerateMultyAuth}
                    label={
                      myProfileTranslate["two-factor-authentication"]?.title
                    }
                  />
                )}
              </Col>

              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pr-2.5 pr-0"
              >
                <PasswordItem
                  isWrong={!isEmpty(errors?.newPassword) ? true : false}
                  help={errors?.newPassword}
                  name="newPassword"
                  onChange={setInputsSecurity}
                  label={myProfileTranslate["new-password"]?.title}
                  type="password"
                  placeholder="*********"
                  icon={<Eye />}
                  theme={theme}
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pl-2.5 pl-0"
              >
                <PasswordItem
                  isWrong={!isEmpty(errors?.confirmPassowrd) ? true : false}
                  help={errors?.confirmPassowrd}
                  name="confirmPassowrd"
                  onChange={setInputsSecurity}
                  label={myProfileTranslate["confirm-new-password"]?.title}
                  type="password"
                  placeholder="*********"
                  icon={<Eye />}
                  theme={theme}
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pr-2.5 pr-0"
              >
                <SelectItem
                  isWrong={!isEmpty(errors?.question1Id) ? true : false}
                  help={errors?.question1Id}
                  defaultValue={
                    !isEmpty(inputsSecurity)
                      ? inputsSecurity?.question1Id
                      : null
                  }
                  placeholder=""
                  options={questions}
                  label={myProfileTranslate["question-no-1"]?.title}
                  theme={theme}
                  onChange={(value) => {
                    setInputsSecurity((prev) => {
                      return { ...prev, question1Id: value };
                    });
                  }}
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pl-2.5 pl-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.answer1) ? true : false}
                  help={errors?.answer1}
                  value={
                    !isEmpty(inputsSecurity) ? inputsSecurity?.answer1 : null
                  }
                  name="answer1"
                  onChange={setInputsSecurity}
                  theme={theme}
                  label={myProfileTranslate["answer"]?.title}
                  type="text"
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pr-2.5 pr-0"
              >
                <SelectItem
                  isWrong={!isEmpty(errors?.question2Id) ? true : false}
                  help={errors?.question2Id}
                  defaultValue={
                    !isEmpty(inputsSecurity)
                      ? inputsSecurity?.question2Id
                      : null
                  }
                  options={questions}
                  placeholder=""
                  label={myProfileTranslate["question-no-2"]?.title}
                  theme={theme}
                  onChange={(value) => {
                    setInputsSecurity((prev) => {
                      return { ...prev, question2Id: value };
                    });
                  }}
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pl-2.5 pl-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.answer2) ? true : false}
                  help={errors?.answer2}
                  value={
                    !isEmpty(inputsSecurity) ? inputsSecurity?.answer2 : null
                  }
                  name="answer2"
                  onChange={setInputsSecurity}
                  theme={theme}
                  label={myProfileTranslate["answer"]?.title}
                  type="text"
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pr-2.5 pr-0"
              >
                <SelectItem
                  isWrong={!isEmpty(errors?.question3Id) ? true : false}
                  help={errors?.question3Id}
                  defaultValue={
                    !isEmpty(inputsSecurity)
                      ? inputsSecurity?.question3Id
                      : null
                  }
                  options={questions}
                  placeholder=""
                  label={myProfileTranslate["question-no-3"]?.title}
                  theme={theme}
                  onChange={(value) => {
                    setInputsSecurity((prev) => {
                      return { ...prev, question3Id: value };
                    });
                  }}
                />
              </Col>
              <Col
                md={{ span: 12, order: 0 }}
                order={2}
                span={24}
                className="md:pl-2.5 pl-0 md:pb-0"
              >
                <TextItem
                  isWrong={!isEmpty(errors?.answer3) ? true : false}
                  help={errors?.answer3}
                  value={
                    !isEmpty(inputsSecurity) ? inputsSecurity?.answer3 : null
                  }
                  name="answer3"
                  onChange={setInputsSecurity}
                  theme={theme}
                  label={myProfileTranslate["answer"]?.title}
                  type="text"
                />
              </Col>
            </Row>
            <SaveButton
              disabledButton={disabledButton}
              theme={theme}
              type="submit"
              text={myProfileTranslate["save"]?.title}
            />
          </FormItem>
        ) : null}
      </ContentWrapper>
    </div>
  );
}
