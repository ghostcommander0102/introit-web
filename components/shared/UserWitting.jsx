import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserWitting.module.scss";
import { isEmpty } from "lodash";
import AvatarWitting from "./AvatarWitting";
import MarginTop from "./MarginTop";
import ImageProvider from "providers/ImageProvider";
import Phone from "public/assets/images/svgs/user/phone.svg";
import PhoneDark from "public/assets/images/svgs/user/phone-dark.svg";
import Email from "public/assets/images/svgs/user/email.svg";
import EmailDark from "public/assets/images/svgs/user/email-dark.svg";
import Academic from "public/assets/images/svgs/user/academic-level.svg";
import AcademicDark from "public/assets/images/svgs/user/academic-level-dark.svg";
import Driving from "public/assets/images/svgs/user/driving.svg";
import DrivingDark from "public/assets/images/svgs/user/driving-dark.svg";
import Location from "public/assets/images/svgs/user/location.svg";
import LocationDark from "public/assets/images/svgs/user/location-dark.svg";
import Website from "public/assets/images/svgs/user/website.svg";
import WebsiteDark from "public/assets/images/svgs/user/website-dark.svg";
import Salary from "public/assets/images/svgs/user/salary.svg";
import SalaryDark from "public/assets/images/svgs/user/salary-dark.svg";
import Nationality from "public/assets/images/svgs/user/nationality.svg";
import NationalityDark from "public/assets/images/svgs/user/nationality-dark.svg";
import Gender from "public/assets/images/svgs/user/gender.svg";
import GenderDark from "public/assets/images/svgs/user/gender-dark.svg";
import Industry from "public/assets/images/svgs/user/industry.svg";
import IndustryDark from "public/assets/images/svgs/user/industry-dark.svg";
import Birthday from "public/assets/images/svgs/user/birthday.svg";
import BirthdayDark from "public/assets/images/svgs/user/birthday-dark.svg";
import Placebirth from "public/assets/images/svgs/user/placebirth.svg";
import PlacebirthDark from "public/assets/images/svgs/user/placebirth-dark.svg";
import moment from "moment";
export default function UserWitting({ theme, cv, userTranslate }) {
  console.log("cv?.banner", cv?.banner);
  //***************************
  // define state
  //***************************
  const imgValue = !isEmpty(cv?.banner)
    ? `url(${cv?.banner})`
    : theme
    ? "url(/assets/images/svgs/back-profile-icon.svg)"
    : "url(/assets/images/svgs/dark/back-profile-icon.svg)";
  return (
    <Row
      className={theme ? Styles.lightWrapperSidebar : Styles.darkWrapperSidebar}
    >
      <Col md={{ span: 6 }} span={24}>
        <AvatarWitting imgValue={imgValue} cv={cv} theme={cv} />
        <Col span={24}>
          <MarginTop marginTop={72} />
        </Col>
        <Row>
          <Col span={24} className="px-2">
            <p className={theme ? Styles.lightFullName : Styles.darkFullName}>
              {cv?.givenName + " " + cv?.familyName}
            </p>
            <p className={theme ? Styles.lightJobTitle : Styles.darkJobTitle}>
              {cv?.jobTitle}
            </p>
          </Col>
          <Col span={18} className="flex justify-between px-4 mx-auto pt-8">
            {cv?.userSocials?.map((item, index) => {
              return (
                <div key={index}>
                  <a href={item?.username} target="_blank">
                    <ImageProvider
                      width={24}
                      height={24}
                      src={item?.social?.icon}
                    />
                  </a>
                </div>
              );
            })}
          </Col>
        </Row>
      </Col>
      <Col md={{ span: 18 }} span={24} className="pl-6 md:pb-0 pb-2">
        <Col span={24}>
          <MarginTop marginTop={72} />
        </Col>
        <Row>
          <Col span={24} className="md:px-4 px-2">
            <Row>
              <Col md={{ span: 12 }} span={24}>
                {!isEmpty(cv?.phone) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Phone /> : <PhoneDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["phone-number"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            <a href={`tel:${cv?.phone}`}>{cv?.phone}</a>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.drivingLicense?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Driving /> : <DrivingDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["driving-license"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.drivingLicense?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                <Row>
                  <Col span={24}>
                    <div className="flex items-center pt-4">
                      <div className="pr-4">
                        {theme ? <Salary /> : <SalaryDark />}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={
                            theme ? Styles.lightTitle : Styles.darkTitle
                          }
                        >
                          {userTranslate["salary-range"]?.title}
                        </span>
                        <span
                          className={theme ? Styles.lightBody : Styles.darkBody}
                        >
                          {!isEmpty(cv?.minSalary)
                            ? "$ " + cv?.minSalary + " - "
                            : null}{" "}
                          {!isEmpty(cv?.maxSalary)
                            ? cv?.maxSalary +
                              " " +
                              userTranslate["monthly"]?.title
                            : null}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
                {!isEmpty(cv?.industry?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Industry /> : <IndustryDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["industry"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.industry?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.degree?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Academic /> : <AcademicDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["academic-level"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.degree?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.gender?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Gender /> : <GenderDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["gender"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.gender?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>
              <Col md={{ span: 12 }} span={24}>
                {!isEmpty(cv?.email) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Email /> : <EmailDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["email"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            <a href={`mailto:${cv?.email}`}>{cv?.email}</a>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.streetAddress) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Location /> : <LocationDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["address"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.streetAddress}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.nationality?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Nationality /> : <NationalityDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["nationality"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.nationality?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.dateOfBirth) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Birthday /> : <BirthdayDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["date-of-birth"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {moment(cv?.dateOfBirth).format("MMM DD, YYYY")}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.website) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Website /> : <WebsiteDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["website"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            <a href={cv?.website} target="_blank">
                              {cv?.website}
                            </a>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                {!isEmpty(cv?.residentCountry?.title) ? (
                  <Row>
                    <Col span={24}>
                      <div className="flex items-center pt-4">
                        <div className="pr-4">
                          {theme ? <Placebirth /> : <PlacebirthDark />}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={
                              theme ? Styles.lightTitle : Styles.darkTitle
                            }
                          >
                            {userTranslate["place-of-birth"]?.title}
                          </span>
                          <span
                            className={
                              theme ? Styles.lightBody : Styles.darkBody
                            }
                          >
                            {cv?.residentCountry?.title}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
