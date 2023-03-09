import React from "react";
import { Button, Col, Row, Tabs } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import AddressItem from "../../form/AddressItem";
import AreaItem from "../../form/AreaItem";
import DateItem from "../../form/DateItem";
import EmailItem from "../../form/EmailItem";
import FormItem from "../../form/FormItem";
import NumberItem from "../../form/NumberItem";
import PhoneItem from "../../form/PhoneItem";
import SelectItem from "../../form/SelectItem";
import TextItem from "../../form/TextItem";
import MarginTop from "../../MarginTop";
import Avatar from "../Avatar";
import DividerItem from "../DividerItem";
import Seprator from "../Seprator";
import Arrow from "/public/assets/images/svgs/arrow-resume.svg";
import Styles from "/styles/scss/dashboard/ResumeSidebar.module.scss";
import Accordion from "../AddButton";
import CheckBoxItemRev from "../../form/CheckBoxItemRev";
import RangePicker from "../../form/RangePicker";
import QuartetItem from "../QuartetItem";
import BisectionItem from "../BisectionItem";
import TripletItem from "../TripletItem";
import Uploader from "../../resume/Uploader";
import dynamic from "next/dynamic";
import Trash from "/public/assets/images/svgs/portfolio-trash.svg";
import ImageProvider from "providers/ImageProvider";
import StylesPortfolio from "/styles/scss/dashboard/Portfolio.module.scss";
const CarouselItem = dynamic(() => import("../../resume/CarouselItem"), {
  ssr: false,
});
export default function ResumeSidebar({
  theme,
  progress,
  myResumeTranslate = {},
  currentUser,
  socialsInputs,
  setVisivle,
  handleOpenProf,
  errors,
  setInputsInfo,
  inputsInfo,
  InfoRecoil,
  handleSendSms,
  inputsOther,
  setInputsOther,
  nationalities,
  academicLevels,
  industries,
  currencies,
  drivingRecoil,
  description,
  setDescription,
  academicLevel,
  cv,
  filelist,
  setFilelist,
  setShowPreview,
}) {
  return (
    <div>
      <div
        className={
          theme ? Styles.lightProgressWrapper : Styles.darkProgressWrapper
        }
      >
        <div
          style={{ height: 52 }}
          className="flex justify-between items-center pl-4"
        >
          <p className={Styles.progressText}>
            {Math.trunc(progress)}% Completed
          </p>
          <Button
            onClick={() => setShowPreview(false)}
            className={theme ? Styles.lightBack : Styles.darkBack}
          >
            <span>
              <Arrow />
            </span>
            <span className="pl-4"> Close Preview</span>
          </Button>
        </div>
        <div
          style={{ width: progress + "%" }}
          className={Styles.progress}
        ></div>
      </div>
      <div className={Styles.wrapper}>
        <div className="wrapper-tabs">
          <Tabs className="md:px-10 px-2" defaultActiveKey="1">
            <Tabs.TabPane tab="Personal information" key="1">
              <FormItem>
                <Row>
                  <Col span={24}>
                    <DividerItem
                      content={myResumeTranslate["personal-information"]?.title}
                      theme={theme}
                    />
                  </Col>
                  <Col span={24}>
                    <Avatar
                      handleOpenProf={handleOpenProf}
                      setVisivle={setVisivle}
                      myResumeTranslate={myResumeTranslate}
                      socialsInputs={socialsInputs}
                      theme={theme}
                      currentUser={currentUser}
                    />
                  </Col>
                  <Col span={24} className="pt-4">
                    <DividerItem
                      content={myResumeTranslate["cover-letter"]?.title}
                      theme={theme}
                    />
                  </Col>
                  <Col span={24}>
                    <AreaItem
                      autoSize={true}
                      value={description?.description}
                      label={""}
                      theme={theme}
                      onChange={setDescription}
                      name="description"
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
                    <TextItem
                      isWrong={!isEmpty(errors?.firstName) ? true : false}
                      help={errors?.firstName}
                      name="firstName"
                      onChange={setInputsInfo}
                      label={myResumeTranslate["first-name"]?.title}
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
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
                    <TextItem
                      isWrong={!isEmpty(errors?.lastName) ? true : false}
                      help={errors?.lastName}
                      name="lastName"
                      onChange={setInputsInfo}
                      label={myResumeTranslate["last-name"]?.title}
                      type="text"
                      placeholder={
                        !isEmpty(inputsInfo?.lastName)
                          ? inputsInfo?.lastName
                          : null
                      }
                      theme={theme}
                      value={inputsInfo.lastName}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
                    <EmailItem
                      isWrong={!isEmpty(errors?.email) ? true : false}
                      help={errors?.email}
                      disabled={true}
                      name="email"
                      theme={theme}
                      label={myResumeTranslate["email"]?.title}
                      type="email"
                      value={InfoRecoil?.email}
                      verifyed={true}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
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
                      translator={myResumeTranslate}
                      label={myResumeTranslate["phone"]?.title}
                      theme={theme}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
                    <DateItem
                      picker="date"
                      dateFormat="MMM DD, YYYY"
                      label={myResumeTranslate["date-of-birth"]?.title}
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
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
                    <AddressItem
                      value={
                        !inputsInfo?.birth.includes("null")
                          ? inputsInfo.birth
                          : null
                      }
                      onChange={setInputsInfo}
                      theme={theme}
                      name="birth"
                      label={myResumeTranslate["place-of-birth"]?.title}
                    />
                  </Col>
                  <Col span={24}>
                    <AddressItem
                      value={inputsInfo?.streetAddress}
                      onChange={setInputsInfo}
                      theme={theme}
                      name="streetAddress"
                      label={myResumeTranslate["address"]?.title}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
                    <SelectItem
                      isWrong={!isEmpty(errors?.nationalityId) ? true : false}
                      help={errors?.nationalityId}
                      defaultValue={
                        !isEmpty(inputsOther)
                          ? inputsOther?.nationalityId
                          : null
                      }
                      name="nationalityId"
                      theme={theme}
                      placeholder=""
                      options={nationalities}
                      label={myResumeTranslate["nationality"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, nationalityId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
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
                      label={myResumeTranslate["academic-level"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, academicLevelId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
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
                      label={myResumeTranslate["industry"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, industryId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
                    <TextItem
                      isWrong={!isEmpty(errors?.jobTitle) ? true : false}
                      help={errors?.jobTitle}
                      value={inputsOther.jobTitle}
                      name="jobTitle"
                      label={myResumeTranslate["job-title"]?.title}
                      type="text"
                      placeholder={
                        !isEmpty(inputsOther) ? inputsOther?.jobTitle : null
                      }
                      theme={theme}
                      onChange={setInputsOther}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
                    <SelectItem
                      isWrong={
                        !isEmpty(errors?.drivingLicenseId) ? true : false
                      }
                      help={errors?.drivingLicenseId}
                      defaultValue={
                        !isEmpty(inputsOther)
                          ? inputsOther?.drivingLicenseId
                          : null
                      }
                      theme={theme}
                      placeholder=""
                      options={drivingRecoil}
                      label={myResumeTranslate["driving-license"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, drivingLicenseId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
                    <TextItem
                      isWrong={!isEmpty(errors?.website) ? true : false}
                      help={errors?.website}
                      value={inputsOther.website}
                      name="website"
                      label={myResumeTranslate["website"]?.title}
                      type="text"
                      placeholder={
                        !isEmpty(inputsOther) ? inputsOther?.website : null
                      }
                      theme={theme}
                      onChange={setInputsOther}
                    />
                  </Col>
                  <Col lg={{ span: 6 }} span={12} className="md:pr-2.5 pr-0">
                    <SelectItem
                      isWrong={!isEmpty(errors?.currencyId) ? true : false}
                      help={errors?.currencyId}
                      defaultValue={
                        !isEmpty(inputsOther) ? inputsOther?.currencyId : null
                      }
                      theme={theme}
                      placeholder=""
                      options={currencies}
                      label={myResumeTranslate["salary-currency"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, currencyId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col
                    lg={{ span: 6 }}
                    span={12}
                    className="lg:px-2.5 pl-2.5 px-0"
                  >
                    <SelectItem
                      isWrong={!isEmpty(errors?.currencyId) ? true : false}
                      help={errors?.currencyId}
                      defaultValue={""}
                      theme={theme}
                      placeholder=""
                      options={[]}
                      label={myResumeTranslate["salary-period"]?.title}
                      onChange={(value) => {
                        setInputsOther((prev) => {
                          return { ...prev, currencyId: value };
                        });
                      }}
                    />
                  </Col>
                  <Col
                    lg={{ span: 6 }}
                    span={12}
                    className="lg:px-2.5 pr-2.5 px-0"
                  >
                    <NumberItem
                      name="minSalary"
                      isWrong={!isEmpty(errors?.minSalary) ? true : false}
                      help={errors?.minSalary}
                      value={inputsOther?.minSalary}
                      theme={theme}
                      placeholder="0.000"
                      label={myResumeTranslate["salary-range-(from)"]?.title}
                      onChange={(value) =>
                        setInputsOther((prev) => {
                          return { ...prev, minSalary: value };
                        })
                      }
                    />
                  </Col>
                  <Col lg={{ span: 6 }} span={12} className="pl-2.5">
                    <NumberItem
                      name="maxSalary"
                      isWrong={!isEmpty(errors?.maxSalary) ? true : false}
                      help={errors?.maxSalary}
                      value={inputsOther?.maxSalary}
                      theme={theme}
                      placeholder="0.000"
                      options={currencies}
                      label={myResumeTranslate["salary-range-(to)"]?.title}
                      onChange={(value) =>
                        setInputsOther((prev) => {
                          return { ...prev, maxSalary: value };
                        })
                      }
                    />
                  </Col>
                </Row>
              </FormItem>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Education" key="2">
              <FormItem>
                <Row>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["education"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col span={12} className="md:pr-2.5 pr-0">
                          <TextItem
                            isWrong={!isEmpty(errors?.institute) ? true : false}
                            help={errors?.institute}
                            theme={theme}
                            label={`${myResumeTranslate["institute"]?.title} *`}
                            placeholder=""
                            name="institute"
                          />
                        </Col>
                        <Col span={12} className="md:pl-2.5 pl-0 pt-1.5">
                          <div className="absolute wrapper-check">
                            <CheckBoxItemRev
                              name="present"
                              theme={theme}
                              label={myResumeTranslate["present"]?.title}
                            />
                          </div>
                          <RangePicker
                            isWrong1={!isEmpty(errors?.fromDate) ? true : false}
                            isWrong2={!isEmpty(errors?.toDate) ? true : false}
                            help1={errors?.fromDate}
                            help2={errors?.toDate}
                            myResumeTranslate={myResumeTranslate}
                            theme={theme}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <SelectItem
                            isWrong={!isEmpty(errors?.degreeId) ? true : false}
                            help={errors?.degreeId}
                            theme={theme}
                            placeholder=""
                            options={academicLevel}
                            label={`${myResumeTranslate["present"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.major) ? true : false}
                            help={errors?.major}
                            name="major"
                            theme={theme}
                            placeholder=""
                            label={`${myResumeTranslate["major"]?.title} *`}
                          />
                        </Col>
                        <Col md={{ span: 12 }} span={24} className="mt-0">
                          <AddressItem
                            isWrong={!isEmpty(errors?.location) ? true : false}
                            help={errors?.location}
                            theme={theme}
                            name="location"
                            label={myResumeTranslate["location"]?.title}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userEducations) ? (
                    <Col span={24}>
                      {cv?.userEducations?.map((item, index) => {
                        return (
                          <QuartetItem
                            theme={theme}
                            title={item?.institute}
                            date={`
                        ${moment(item.fromDate).format("MMM YYYY")}  
                        ${moment(item.toDate).format("MMM YYYY")}
                        `}
                            location={
                              item.country?.title + " " + item.city?.title
                            }
                            detail={item?.degree?.title + " , " + item?.major}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                </Row>
              </FormItem>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Experience" key="3">
              <FormItem>
                <Row>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["experience"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col span={12} className="md:pr-2.5 pr-0">
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            type="text"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col span={12} className="md:pl-2.5 pl-0 pt-1.5">
                          <div className="absolute wrapper-check">
                            <CheckBoxItemRev
                              name="present"
                              theme={theme}
                              label={myResumeTranslate["present"]?.title}
                            />
                          </div>
                          <RangePicker
                            isWrong1={!isEmpty(errors?.fromDate) ? true : false}
                            isWrong2={!isEmpty(errors?.toDate) ? true : false}
                            help1={errors?.fromDate}
                            help2={errors?.toDate}
                            myResumeTranslate={myResumeTranslate}
                            theme={theme}
                          />
                        </Col>
                        <Col span={12} className="md:pr-2.5 pr-0">
                          <TextItem
                            isWrong={!isEmpty(errors?.institute) ? true : false}
                            help={errors?.institute}
                            theme={theme}
                            label={`${myResumeTranslate["institute"]?.title} *`}
                            placeholder=""
                            name="institute"
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <AddressItem
                            isWrong={!isEmpty(errors?.location) ? true : false}
                            help={errors?.location}
                            theme={theme}
                            name="location"
                            label={myResumeTranslate["city"]?.title}
                          />
                        </Col>
                        <Col span={12}>
                          <SelectItem
                            isWrong={
                              !isEmpty(errors?.employmentTypeId) ? true : false
                            }
                            help={errors?.employmentTypeId}
                            theme={theme}
                            placeholder=""
                            options={[]}
                            label={`${myResumeTranslate["employment-type"]?.title} *`}
                          />
                        </Col>
                        <Col span={24} className="">
                          <AreaItem
                            isWrong={
                              !isEmpty(errors?.description) ? true : false
                            }
                            help={errors?.description}
                            name="description"
                            hasCustomeBack={true}
                            theme={theme}
                            label={`${myResumeTranslate["description"]?.title} *`}
                            rows={3}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userExperiences) ? (
                    <Col span={24}>
                      {cv?.userExperiences?.map((item, index) => {
                        return (
                          <QuartetItem
                            theme={theme}
                            title={item?.title}
                            date={`
                        ${moment(item.fromDate).format("MMM YYYY")}  
                        ${moment(item.toDate).format("MMM YYYY")}
                        `}
                            location={
                              item.country?.title + " " + item.city?.title
                            }
                            detail={item?.institute}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                </Row>
              </FormItem>
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab="Other information">
              <FormItem>
                <Row>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["skills"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <SelectItem
                            isWrong={
                              !isEmpty(errors?.dominationId) ? true : false
                            }
                            help={errors?.dominationId}
                            theme={theme}
                            placeholder=""
                            options={[]}
                            label={`${myResumeTranslate["level"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={
                              !isEmpty(errors?.percentage) ? true : false
                            }
                            help={errors?.percentage}
                            name="percentage"
                            theme={theme}
                            label={`${myResumeTranslate["determine-the-percentage"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userSkils) ? (
                    <Col span={24}>
                      {cv?.userSkils?.map((item, index) => {
                        return (
                          <BisectionItem
                            theme={theme}
                            title={item?.title}
                            detail={item.domination.title}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["languages"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <SelectItem
                            isWrong={
                              !isEmpty(errors?.languageId) ? true : false
                            }
                            help={errors?.languageId}
                            theme={theme}
                            placeholder=""
                            options={[]}
                            label={myResumeTranslate["language"]?.title}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <SelectItem
                            isWrong={!isEmpty(errors?.levelId) ? true : false}
                            help={errors?.levelId}
                            theme={theme}
                            label={myResumeTranslate["level"]?.title}
                            options={[]}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <SelectItem
                            isWrong={
                              !isEmpty(errors?.certificateId) ? true : false
                            }
                            help={errors?.certificateId}
                            theme={theme}
                            label={myResumeTranslate["certificate"]?.title}
                            options={[]}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <TextItem
                            name="percentage"
                            isWrong={
                              !isEmpty(errors?.percentage) ? true : false
                            }
                            help={errors?.percentage}
                            type="text"
                            theme={theme}
                            label={
                              myResumeTranslate["determine-the-percentage"]
                                ?.title
                            }
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userLanguages) ? (
                    <Col span={24}>
                      {cv?.userLanguages?.map((item, index) => {
                        console.log(item);
                        return (
                          <TripletItem
                            theme={theme}
                            title={item.language?.title}
                            detail={item.level?.title}
                            level={item.certificate?.title}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["expertise"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            type="text"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <SelectItem
                            isWrong={
                              !isEmpty(errors?.dominationId) ? true : false
                            }
                            help={errors?.dominationId}
                            theme={theme}
                            placeholder=""
                            options={[]}
                            label={`${myResumeTranslate["level"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2 pl-0"
                        >
                          <TextItem
                            isWrong={
                              !isEmpty(errors?.percentage) ? true : false
                            }
                            help={errors?.percentage}
                            name="percentage"
                            type="text"
                            theme={theme}
                            label={`${myResumeTranslate["determine-the-percentage"]?.title} *`}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userExpertises) ? (
                    <Col span={24}>
                      {cv?.userExpertises?.map((item, index) => {
                        console.log("item expertise", item);
                        return (
                          <BisectionItem
                            theme={theme}
                            title={item?.title}
                            detail={item.domination?.title}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["portfolio"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col span={24}>
                          <div className="flex">
                            <TextItem
                              isWrong={!isEmpty(errors?.title) ? true : false}
                              help={errors?.title}
                              name="title"
                              theme={theme}
                              label={`${myResumeTranslate["title"]?.title} *`}
                              placeholder=""
                            />
                            <Uploader
                              text={myResumeTranslate["upload-image"]?.title}
                              setFilelist={setFilelist}
                              fileList={filelist}
                            />
                          </div>
                        </Col>
                        <Col span={24} className="text-center">
                          {!isEmpty(filelist) ? (
                            <CarouselItem>
                              {filelist?.map((item) => {
                                if (item?.originFileObj) {
                                  return (
                                    <div className={StylesPortfolio.wrapper}>
                                      <Button
                                        className={StylesPortfolio.button}
                                      >
                                        <Trash />
                                      </Button>
                                      <ImageProvider
                                        width={155}
                                        height={155}
                                        src={URL.createObjectURL(
                                          item.originFileObj
                                        )}
                                        alt=""
                                      />
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className={StylesPortfolio.wrapper}>
                                      <Button
                                        onClick={() =>
                                          handleDeletePortfolioImage(
                                            item?.imageId
                                          )
                                        }
                                        className={StylesPortfolio.button}
                                      >
                                        <Trash />
                                      </Button>
                                      <ImageProvider
                                        width={155}
                                        height={155}
                                        src={item?.imageLink}
                                        alt=""
                                      />
                                    </div>
                                  );
                                }
                              })}
                            </CarouselItem>
                          ) : null}
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="mt-3 md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.link) ? true : false}
                            help={errors?.link}
                            name="link"
                            theme={theme}
                            label={myResumeTranslate["link"]?.title}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="mt-3 md:pl-2.5 pl-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.videoLink) ? true : false}
                            help={errors?.videoLink}
                            name="videoLink"
                            theme={theme}
                            label={myResumeTranslate["video-link"]?.title}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userPortfolios) ? (
                    <Col span={24}>
                      {cv?.userPortfolios?.map((item, index) => {
                        return (
                          <BisectionItem
                            theme={theme}
                            title={item?.title}
                            detail={`${item?.images.length} images`}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={
                        myResumeTranslate["extra-curricular-activities"]?.title
                      }
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0 pt-1.5"
                        >
                          <div className="absolute wrapper-check">
                            <CheckBoxItemRev
                              name="present"
                              theme={theme}
                              label={`${myResumeTranslate["present"]?.title}`}
                            />
                          </div>
                          <RangePicker
                            isWrong1={!isEmpty(errors?.fromDate) ? true : false}
                            isWrong2={!isEmpty(errors?.toDate) ? true : false}
                            help1={errors?.fromDate}
                            help2={errors?.toDate}
                            theme={theme}
                            myResumeTranslate={myResumeTranslate}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.institute) ? true : false}
                            help={errors?.institute}
                            name="institute"
                            type="text"
                            theme={theme}
                            label={`${myResumeTranslate["institute"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <AddressItem
                            isWrong={!isEmpty(errors?.city) ? true : false}
                            help={errors?.city}
                            name="location"
                            theme={theme}
                            label={myResumeTranslate["city"]?.title}
                          />
                        </Col>
                        <Col span={24}>
                          <AreaItem
                            isWrong={
                              !isEmpty(errors?.description) ? true : false
                            }
                            name="description"
                            hasCustomeBack={true}
                            theme={theme}
                            label={`${myResumeTranslate["description"]?.title} *`}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userExtraActivities) ? (
                    <Col span={24}>
                      {cv?.userExtraActivities?.map((item, index) => {
                        return (
                          <TripletItem
                            level={`
                      ${moment(item.fromDate).format("MMM YYYY")}  
                      ${moment(item.toDate).format("MMM YYYY")}
                      `}
                            detail={
                              item.country?.title + " " + item.city?.title
                            }
                            theme={theme}
                            title={item?.title}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["courses"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.institute) ? true : false}
                            help={errors?.institute}
                            name="institute"
                            theme={theme}
                            label={`${myResumeTranslate["institute"]?.title} *`}
                          />
                        </Col>
                        <Col md={{ span: 12 }} span={24}>
                          <div className="absolute wrapper-check">
                            <CheckBoxItemRev
                              name="present"
                              theme={theme}
                              label={`${myResumeTranslate["present"]?.title}`}
                            />
                          </div>
                          <RangePicker
                            isWrong1={!isEmpty(errors?.fromDate) ? true : false}
                            isWrong2={!isEmpty(errors?.toDate) ? true : false}
                            help1={errors?.fromDate}
                            help2={errors?.toDate}
                            myResumeTranslate={myResumeTranslate}
                            theme={theme}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userCourses) ? (
                    <Col span={24}>
                      {cv?.userCourses?.map((item, index) => {
                        return (
                          <BisectionItem
                            detail={item?.institute}
                            theme={theme}
                            title={item?.title}
                            key={index}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["internships"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            theme={theme}
                            label={`${myResumeTranslate["title"]?.title} *`}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <div className="absolute wrapper-check">
                            <CheckBoxItemRev
                              name="present"
                              theme={theme}
                              label={`${myResumeTranslate["present"]?.title}`}
                            />
                          </div>
                          <RangePicker
                            isWrong1={!isEmpty(errors?.fromDate) ? true : false}
                            isWrong2={!isEmpty(errors?.toDate) ? true : false}
                            help1={errors?.fromDate}
                            help2={errors?.fromDate}
                            myResumeTranslate={myResumeTranslate}
                            theme={theme}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.employer) ? true : false}
                            help={errors?.employer}
                            name="employer"
                            label={`${myResumeTranslate["employer"]?.title}`}
                            theme={theme}
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <AddressItem
                            isResume={true}
                            isWrong={!isEmpty(errors?.city) ? true : false}
                            help={errors?.city}
                            name="location"
                            theme={theme}
                            label={myResumeTranslate["city"]?.title}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userInterships) ? (
                    <Col span={24}>
                      {cv?.userInterships?.map((item, index) => {
                        return (
                          <QuartetItem
                            title={item?.title}
                            date={`
                      ${moment(item.fromDate).format("MMM YYYY")}  
                      ${moment(item.toDate).format("MMM YYYY")}
                      `}
                            location={
                              item.country?.title + " " + item.city?.title
                            }
                            detail={item?.employer}
                            key={index}
                            theme={theme}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>{" "}
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["references"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.fullName) ? true : false}
                            help={errors?.fullName}
                            name="fullName"
                            theme={theme}
                            label={`${myResumeTranslate["referent's-full-name"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.company) ? true : false}
                            help={errors?.company}
                            name="company"
                            theme={theme}
                            label={`${myResumeTranslate["company"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <PhoneItem
                            isWrong={!isEmpty(errors?.phone) ? true : false}
                            help={errors?.phone}
                            label={`${myResumeTranslate["phone"]?.title} *`}
                            theme={theme}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <EmailItem
                            isWrong={!isEmpty(errors?.email) ? true : false}
                            help={errors?.email}
                            name="email"
                            theme={theme}
                            label={`${myResumeTranslate["email"]?.title} *`}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userReferences) ? (
                    <Col span={24}>
                      {cv?.userReferences?.map((item, index) => {
                        return (
                          <QuartetItem
                            title={item?.company}
                            date={item?.fullName}
                            location={item?.phone}
                            detail={item?.email}
                            key={index}
                            theme={theme}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Accordion
                      title={myResumeTranslate["honors-and-awards"]?.title}
                      theme={theme}
                    >
                      <Row className="pt-4">
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pr-2.5 pr-0"
                        >
                          <TextItem
                            isWrong={!isEmpty(errors?.title) ? true : false}
                            help={errors?.title}
                            name="title"
                            theme={theme}
                            label={`${myResumeTranslate["award-title"]?.title} *`}
                            placeholder=""
                          />
                        </Col>
                        <Col
                          md={{ span: 12 }}
                          span={24}
                          className="md:pl-2.5 pl-0"
                        >
                          <DateItem
                            picker="date"
                            dateFormat="MMM DD, YYYY"
                            label={myResumeTranslate["date-of-birth"]?.title}
                            isWrong={
                              !isEmpty(errors?.dateOfBirth) ? true : false
                            }
                            help={errors?.dateOfBirth}
                            value={moment()}
                            theme={theme}
                          />
                        </Col>
                        <Col span={24}>
                          <AreaItem
                            isWrong={
                              !isEmpty(errors?.description) ? true : false
                            }
                            help={errors?.description}
                            name="description"
                            hasCustomeBack={true}
                            theme={theme}
                            label={`${myResumeTranslate["description"]?.title} *`}
                          />
                        </Col>
                      </Row>
                    </Accordion>
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  {!isEmpty(cv?.userAwards) ? (
                    <Col span={24}>
                      {cv?.userAwards?.map((item, index) => {
                        return (
                          <BisectionItem
                            title={item?.title}
                            detail={moment(item.date).format("MMM YYYY")}
                            key={index}
                            theme={theme}
                          />
                        );
                      })}
                    </Col>
                  ) : null}
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <DividerItem
                    theme={theme}
                    content={myResumeTranslate["hobbies"]?.title}
                  />
                  <Col span={24}>
                    <MarginTop marginTop={24} />
                  </Col>
                  <Col span={24}>
                    <AreaItem
                      isWrong={!isEmpty(errors?.hobbies) ? true : false}
                      help={errors?.hobbies}
                      name="hobbies"
                      hasCustomeBack={true}
                      theme={theme}
                      label={myResumeTranslate["hobbies"]?.title}
                      placeholder=""
                    />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <DividerItem
                    theme={theme}
                    content={myResumeTranslate["additional-information"]?.title}
                  />
                  <Col span={24}>
                    <MarginTop marginTop={24} />
                  </Col>
                  <Col span={24}>
                    <AreaItem
                      isWrong={!isEmpty(errors?.hobbies) ? true : false}
                      help={errors?.hobbies}
                      name="hobbies"
                      hasCustomeBack={true}
                      theme={theme}
                      label={myResumeTranslate["additional-information"]?.title}
                      placeholder=""
                    />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <Col span={24}>
                    <Seprator theme={theme} />
                  </Col>
                  <Col span={24}>
                    <MarginTop marginTop={48} />
                  </Col>
                  <DividerItem
                    theme={theme}
                    content={myResumeTranslate["publications"]?.title}
                  />
                  <Col span={24}>
                    <MarginTop marginTop={24} />
                  </Col>
                  <Col span={24}>
                    <AreaItem
                      isWrong={!isEmpty(errors?.hobbies) ? true : false}
                      help={errors?.hobbies}
                      name="hobbies"
                      hasCustomeBack={true}
                      theme={theme}
                      label={myResumeTranslate["publications"]?.title}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </FormItem>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
