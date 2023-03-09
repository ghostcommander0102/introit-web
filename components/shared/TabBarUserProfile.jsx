import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import ButtonTabBar from "./ButtonTabBar";
import ChangeProfile from "./SidebarProfile";
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
import Eye from "/public/assets/images/svgs/eye-icon.svg";
import MarginTop from "./MarginTop";
import Resume from "/public/assets/images/svgs/user-resume.svg";
import ResumeActive from "/public/assets/images/svgs/user-resume-active.svg";
import ResumeDark from "/public/assets/images/svgs/dark/user-resume.svg";
import ResumeActiveDark from "/public/assets/images/svgs/dark/user-resume-active.svg";
import Jobs from "/public/assets/images/svgs/user-jobs.svg";
import JobsActive from "/public/assets/images/svgs/user-jobs-active.svg";
import JobsDark from "/public/assets/images/svgs/dark/user-jobs.svg";
import JobsActiveDark from "/public/assets/images/svgs/dark/user-jobs-active.svg";
import Access from "/public/assets/images/svgs/access.svg";
import AccessActive from "/public/assets/images/svgs/access-active.svg";
import AccessDark from "/public/assets/images/svgs/dark/access.svg";
import AccessActiveDark from "/public/assets/images/svgs/dark/access-active.svg";
import BreadcrumbItem from "./BreadcrumbItem";
import HeaderAccess from "./HeaderAccess";
import RowAccess from "./RowAccess";
import { isEmpty } from "lodash";
import Link from "next/link";
import FormItem from "./form/FormItem";
import DividerItem from "./DividerItem";
import SelectItem from "./form/SelectItem";
import TextItem from "./form/TextItem";
import EmailItem from "./form/EmailItem";
import DateItem from "./form/DateItem";
import AddressItem from "./form/AddressItem";
import SaveButton from "./SaveButton";
import PhoneItem from "./form/PhoneItem";
import moment from "moment";
import ContentWrapper from "./ContentWrapper";
import NumberItem from "./form/NumberItem";
import SwitchItem from "./form/SwitchItem";
import PasswordItem from "./form/PasswordItem";
export default function TabBarUserProfile({
  user,
  theme,
  tab,
  handleChangeTab,
  access,
  handleEditPermission,
  academicLevels,
  countries,
  nationalities,
  questions,
  industries,
  currencies,
  InfoRecoil,
  setInputsInfo,
  inputsInfo,
  updatePersonalInfo,
  addresses,
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
  YourUserProfileTranslate,
}) {
  return (
    <Row className="mt-2 px-10 pt-5">
      <Col span={24} className="mb-5">
        <BreadcrumbItem>
          <Breadcrumb.Item>
            <Link href="/profile/user-profile">
              <span
                className={
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {YourUserProfileTranslate["user-profile"]?.title}
              </span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className={
                theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
              }
            >
              {user?.givenName + " " + user?.familyName}
            </span>
          </Breadcrumb.Item>
        </BreadcrumbItem>
      </Col>
      <Col
        lg={{ span: 8 }}
        md={{ span: 12 }}
        span={24}
        className="md:pr-2.5 pr-0"
      >
        <ChangeProfile currentUser={user} theme={theme} />
        <MarginTop marginTop={80} />
        <ButtonTabBar
          theme={theme}
          current={1}
          handleChangeTab={() => handleChangeTab(1)}
          active={tab == 1}
          lightIcon={<Profile />}
          darkIcon={<ProfileDark />}
          activeLightIcon={<ProfileActive />}
          activeDarkIcon={<ProfileActiveDark />}
          text={YourUserProfileTranslate["personal-infromation"]?.title}
        />
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
          text={YourUserProfileTranslate["other-information"]?.title}
        />
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
          text={YourUserProfileTranslate["security-and-login"]?.title}
        />
        <ButtonTabBar
          theme={theme}
          current={4}
          tab={tab}
          handleChangeTab={() => handleChangeTab(4)}
          active={tab == 4}
          lightIcon={<Resume />}
          darkIcon={<ResumeDark />}
          activeLightIcon={<ResumeActive />}
          activeDarkIcon={<ResumeActiveDark />}
          text={YourUserProfileTranslate["resume"]?.title}
        />
        <ButtonTabBar
          theme={theme}
          current={5}
          tab={tab}
          handleChangeTab={() => handleChangeTab(5)}
          active={tab == 5}
          lightIcon={<Jobs />}
          darkIcon={<JobsDark />}
          activeLightIcon={<JobsActive />}
          activeDarkIcon={<JobsActiveDark />}
          text={YourUserProfileTranslate["applied-jobs"]?.title}
        />
        <ButtonTabBar
          theme={theme}
          current={6}
          tab={tab}
          handleChangeTab={() => handleChangeTab(6)}
          active={tab == 6}
          lightIcon={<Access />}
          darkIcon={<AccessDark />}
          activeLightIcon={<AccessActive />}
          activeDarkIcon={<AccessActiveDark />}
          text={YourUserProfileTranslate["access"]?.title}
        />
      </Col>
      <Col md={{ span: 16 }} span={24} className="md:pl-5 pl-0">
        <ContentWrapper marginLeft={0} marginRight={0} theme={theme}>
          {tab == 1 ? (
            <FormItem onFinish={updatePersonalInfo}>
              <Row>
                <Col md={{ span: 24 }} className="mb-3">
                  <DividerItem
                    theme={theme}
                    content={
                      YourUserProfileTranslate["personal-infromation"]?.title
                    }
                  />
                </Col>
                <Col
                  lg={{ span: 4 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:mt-0 mt-3 md:pr-2.5 pr-0"
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
                    placeholder=""
                    options={gendersRecoil}
                    label={YourUserProfileTranslate["gender"]?.title}
                  />
                </Col>
                <Col
                  lg={{ span: 10 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:px-2.5 px-0"
                >
                  <TextItem
                    isWrong={!isEmpty(errors?.firstName) ? true : false}
                    help={errors?.firstName}
                    name="firstName"
                    onChange={setInputsInfo}
                    label={YourUserProfileTranslate["first-name"]?.title}
                    type="text"
                    placeholder={
                      !isEmpty(inputsInfo?.firstName)
                        ? inputsInfo?.firstName
                        : null
                    }
                    theme={theme}
                    value={inputsInfo?.firstName}
                  />
                </Col>
                <Col
                  lg={{ span: 10 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
                >
                  <TextItem
                    isWrong={!isEmpty(errors?.lastName) ? true : false}
                    help={errors?.lastName}
                    name="lastName"
                    onChange={setInputsInfo}
                    label={YourUserProfileTranslate["last-name"]?.title}
                    type="text"
                    placeholder={
                      !isEmpty(inputsInfo?.lastName)
                        ? inputsInfo?.lastName
                        : null
                    }
                    theme={theme}
                    value={inputsInfo?.lastName}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pr-2.5 pr-0"
                >
                  <EmailItem
                    isWrong={!isEmpty(errors?.email) ? true : false}
                    help={errors?.email}
                    disabled={true}
                    name="email"
                    theme={theme}
                    label={YourUserProfileTranslate["email"]?.title}
                    type="email"
                    value={InfoRecoil?.email}
                    verifyed={true}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
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
                      !isEmpty(inputsInfo?.phone) ? inputsInfo?.phone : "Phone"
                    }
                    verifyed={InfoRecoil?.isPhoneVerified}
                    hasphone={!isEmpty(InfoRecoil?.phone) ? true : false}
                    handleSendSms={handleSendSms}
                    translator={YourUserProfileTranslate}
                    label={YourUserProfileTranslate["phone"]?.title}
                    theme={theme}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="relative lg:pr-2.5 pr-0"
                >
                  <DateItem
                    label={YourUserProfileTranslate["date-of-birth"]?.title}
                    isWrong={!isEmpty(errors?.dateOfBirth) ? true : false}
                    help={errors?.dateOfBirth}
                    value={inputsInfo?.dateOfBirth || moment()}
                    theme={theme}
                    onChange={(value) => {
                      setInputsInfo((prev) => {
                        return { ...prev, dateOfBirth: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:mt-0 mt-3 lg:pl-2.5 pl-0"
                >
                  <SelectItem
                    isWrong={!isEmpty(errors?.countryId) ? true : false}
                    help={errors?.countryId}
                    onChange={(item) => {
                      setInputsInfo((prev) => {
                        return { ...prev, countryId: item };
                      });
                    }}
                    defaultValue={
                      !isEmpty(inputsInfo) ? inputsInfo?.countryId : null
                    }
                    theme={theme}
                    placeholder=""
                    options={countries}
                    label={YourUserProfileTranslate["place-of-birth"]?.title}
                  />
                </Col>
                <Col md={{ span: 24 }} span={24} className="mt-0">
                  <AddressItem
                    value={inputsInfo?.streetAddress}
                    onChange={(value) =>
                      setInputsInfo((prev) => {
                        return { ...prev, streetAddress: value };
                      })
                    }
                    placeholder={inputsInfo?.streetAddress}
                    name="streetAddress"
                    theme={theme}
                    label={YourUserProfileTranslate["street-address"]?.title}
                    addresses={addresses}
                  />
                </Col>
                {/*start desktop  */}
                <Col
                  md={{ span: 24 }}
                  span={24}
                  className="mt-5 lg:flex justify-end hidden"
                >
                  <SaveButton
                    disabledButton={disabledButton}
                    theme={theme}
                    type="submit"
                    leftText={YourUserProfileTranslate["cancel"]?.title}
                    rightText={YourUserProfileTranslate["save"]?.title}
                  />
                </Col>
                {/*start desktop  */}
              </Row>
            </FormItem>
          ) : tab == 2 ? (
            <FormItem onFinish={updateOtherInfo}>
              <Row>
                <Col md={{ span: 24 }} span={24} className="mb-3">
                  <DividerItem
                    theme={theme}
                    content={
                      YourUserProfileTranslate["other-information"]?.title
                    }
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pr-2.5 pr-0"
                >
                  <TextItem
                    isWrong={!isEmpty(errors?.jobTitle) ? true : false}
                    help={errors?.jobTitle}
                    value={inputsOther?.jobTitle}
                    name="jobTitle"
                    label={YourUserProfileTranslate["job-title"]?.title}
                    type="text"
                    placeholder={
                      !isEmpty(inputsOther) ? inputsOther?.jobTitle : null
                    }
                    theme={theme}
                    onChange={setInputsOther}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
                >
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
                    label={YourUserProfileTranslate["nationality"]?.title}
                    onChange={(value) => {
                      setInputsOther((prev) => {
                        return { ...prev, nationalityId: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pr-2.5 pr-0"
                >
                  <SelectItem
                    isWrong={!isEmpty(errors?.academicLevelId) ? true : false}
                    help={errors?.academicLevelId}
                    defaultValue={
                      !isEmpty(inputsOther)
                        ? inputsOther?.academicLevelId
                        : null
                    }
                    name="academicLevelId"
                    theme={theme}
                    placeholder=""
                    options={academicLevels}
                    label={YourUserProfileTranslate["academic-level"]?.title}
                    onChange={(value) => {
                      setInputsOther((prev) => {
                        return { ...prev, academicLevelId: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
                >
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
                    label={YourUserProfileTranslate["industry"]?.title}
                    onChange={(value) => {
                      setInputsOther((prev) => {
                        return { ...prev, industryId: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pr-2.5 pr-0"
                >
                  <SelectItem
                    isWrong={!isEmpty(errors?.currencyId) ? true : false}
                    help={errors?.currencyId}
                    defaultValue={
                      !isEmpty(inputsOther) ? inputsOther?.currencyId : null
                    }
                    theme={theme}
                    placeholder=""
                    options={currencies}
                    label={YourUserProfileTranslate["salary-currency"]?.title}
                    onChange={(value) => {
                      setInputsOther((prev) => {
                        return { ...prev, currencyId: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:px-2.5 px-0"
                >
                  <NumberItem
                    name="minSalary"
                    isWrong={!isEmpty(errors?.minSalary) ? true : false}
                    help={errors?.minSalary}
                    value={inputsOther?.minSalary}
                    theme={theme}
                    placeholder="0.000"
                    label={YourUserProfileTranslate["from"]?.title}
                    onChange={(value) =>
                      setInputsOther((prev) => {
                        return { ...prev, minSalary: value };
                      })
                    }
                  />
                </Col>
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
                >
                  <NumberItem
                    name="maxSalary"
                    isWrong={!isEmpty(errors?.maxSalary) ? true : false}
                    help={errors?.maxSalary}
                    value={inputsOther?.maxSalary}
                    theme={theme}
                    placeholder="0.000"
                    options={currencies}
                    label={YourUserProfileTranslate["to"]?.title}
                    onChange={(value) =>
                      setInputsOther((prev) => {
                        return { ...prev, maxSalary: value };
                      })
                    }
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pr-2.5 pr-0"
                >
                  <SelectItem
                    isWrong={!isEmpty(errors?.drivingLicenseId) ? true : false}
                    help={errors?.drivingLicenseId}
                    defaultValue={
                      !isEmpty(inputsOther)
                        ? inputsOther?.drivingLicenseId
                        : null
                    }
                    theme={theme}
                    placeholder=""
                    options={drivingRecoil}
                    label={YourUserProfileTranslate["driving-license"]?.title}
                    onChange={(value) => {
                      setInputsOther((prev) => {
                        return { ...prev, drivingLicenseId: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="lg:pl-2.5 pl-0"
                >
                  <TextItem
                    isWrong={!isEmpty(errors?.website) ? true : false}
                    help={errors?.website}
                    value={inputsOther?.website}
                    name="website"
                    label={YourUserProfileTranslate["website"]?.title}
                    type="text"
                    placeholder={
                      !isEmpty(inputsOther) ? inputsOther?.website : null
                    }
                    theme={theme}
                    onChange={setInputsOther}
                  />
                </Col>
                {/* start desktop */}
                <Col
                  md={{ span: 24 }}
                  span={24}
                  className="mt-5 lg:flex justify-end hidden"
                >
                  <SaveButton
                    disabledButton={disabledButton}
                    theme={theme}
                    leftText={YourUserProfileTranslate["cancel"]?.title}
                    rightText={YourUserProfileTranslate["save"]?.title}
                    type="submit"
                  />
                </Col>
                {/* end desktop */}
              </Row>
            </FormItem>
          ) : tab == 3 ? (
            <FormItem customeForm={true} onFinish={updateSecurityInfo}>
              <Row>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="mb-3"
                >
                  <DividerItem
                    theme={theme}
                    content={
                      YourUserProfileTranslate["security-and-login"]?.title
                    }
                  />
                </Col>
                <Col md={{ span: 24 }} span={24}>
                  <PasswordItem
                    isWrong={!isEmpty(errors?.oldPassword) ? true : false}
                    help={errors?.oldPassword}
                    name="oldPassword"
                    onChange={setInputsSecurity}
                    label={YourUserProfileTranslate["old-password"]?.title}
                    type="password"
                    placeholder="*********"
                    icon={<Eye />}
                    theme={theme}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="md:pr-2.5 pr-0"
                >
                  <PasswordItem
                    isWrong={!isEmpty(errors?.newPassword) ? true : false}
                    help={errors?.newPassword}
                    name="newPassword"
                    onChange={setInputsSecurity}
                    label={YourUserProfileTranslate["new-password"]?.title}
                    type="password"
                    placeholder="*********"
                    icon={<Eye />}
                    theme={theme}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="md:pl-2.5 pl-0"
                >
                  <PasswordItem
                    isWrong={!isEmpty(errors?.confirmPassowrd) ? true : false}
                    help={errors?.confirmPassowrd}
                    name="confirmPassowrd"
                    onChange={setInputsSecurity}
                    label={
                      YourUserProfileTranslate["confirm-new-password"]?.title
                    }
                    type="password"
                    placeholder="*********"
                    icon={<Eye />}
                    theme={theme}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
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
                    label={YourUserProfileTranslate["question-no-1"]?.title}
                    theme={theme}
                    onChange={(value) => {
                      setInputsSecurity((prev) => {
                        return { ...prev, question1Id: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
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
                    label={YourUserProfileTranslate["answer"]?.title}
                    type="text"
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
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
                    label={YourUserProfileTranslate["question-no-2"]?.title}
                    theme={theme}
                    onChange={(value) => {
                      setInputsSecurity((prev) => {
                        return { ...prev, question2Id: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
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
                    label={YourUserProfileTranslate["answer"]?.title}
                    type="text"
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
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
                    label={YourUserProfileTranslate["question-no-3"]?.title}
                    theme={theme}
                    onChange={(value) => {
                      setInputsSecurity((prev) => {
                        return { ...prev, question3Id: value };
                      });
                    }}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 24 }}
                  span={24}
                  className="md:pl-2.5 pl-0"
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
                    label={YourUserProfileTranslate["answer"]?.title}
                    type="text"
                  />
                </Col>
                {/* start  desktop */}
                <Col
                  md={{ span: 24 }}
                  span={24}
                  className="mt-5 lg:flex justify-end hidden"
                >
                  <SaveButton
                    disabledButton={disabledButton}
                    theme={theme}
                    leftText={YourUserProfileTranslate["cancel"]?.title}
                    rightText={YourUserProfileTranslate["save"]?.title}
                    type="submit"
                  />
                </Col>
                {/* start  desktop */}
              </Row>
            </FormItem>
          ) : tab == 6 ? (
            <Col span={24} className="md:mt-0 mt-4 md:pl-2.5 pl-0">
              {!isEmpty(access)
                ? access.map((item, index) => {
                    return (
                      <Row key={index} className="mb-10 pb-10">
                        <Col span={24}>
                          <HeaderAccess
                            translator={YourUserProfileTranslate}
                            data={item}
                            theme={theme}
                          />
                        </Col>
                        {!isEmpty(item?.modules)
                          ? item?.modules.map((prop, key) => {
                              return (
                                <Col key={key} span={24} className="mt-3">
                                  <RowAccess
                                    translator={YourUserProfileTranslate}
                                    handleEditPermission={handleEditPermission}
                                    data={prop}
                                    theme={theme}
                                    bgGray={true}
                                  />
                                </Col>
                              );
                            })
                          : null}
                      </Row>
                    );
                  })
                : null}
            </Col>
          ) : null}
        </ContentWrapper>
      </Col>
    </Row>
  );
}
