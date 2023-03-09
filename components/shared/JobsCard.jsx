import React from "react";
import CustomeButton from "./CustomeButton";
import Styles from "/styles/scss/dashboard/CandidateCard.module.scss";
import Education from "/public/assets/images/svgs/education-icon.svg";
import Clock from "/public/assets/images/svgs/date-icon.svg";
import User from "/public/assets/images/svgs/user12-icon.svg";
import Tick from "/public/assets/images/svgs/shield-tick-icon.svg";
import EducationDark from "/public/assets/images/svgs/dark/education-icon.svg";
import ClockDark from "/public/assets/images/svgs/dark/date-icon.svg";
import UserDark from "/public/assets/images/svgs/dark/user12-icon.svg";
import TickDark from "/public/assets/images/svgs/dark/shield-tick-icon.svg";
import Link from "next/link";
import JobsDropDown from "./JobsDropDown";
export default function JobsCard({ theme }) {
  return (
    <div
      style={{ height: 259 }}
      className={`wrapper-candi-card ${
        theme ? Styles.wrapperLight : Styles.wrapperDark
      }`}
    >
      <div className="flex justify-between mt-2">
        <div className="flex">
          <div className="flex flex-col ml-3 mt-1">
            <span
              className={`pb-2 ${theme ? Styles.titleLight : Styles.titleDark}`}
            >
              Game Developer
            </span>
            <span
              className={theme ? Styles.subTitleLight : Styles.subTitleDark}
            >
              United States
            </span>
          </div>
        </div>
        <div className="flex flex-col pr-1">
          <div className="flex">
            <div className="pt-1 pr-2">
              <span className={theme ? Styles.statusLight : Styles.statusDark}>
                Approved
              </span>
            </div>
            <div>
              <JobsDropDown theme={theme} />
            </div>
          </div>
          <div className="flex justify-end pr-2">
            <span className={`${theme ? Styles.timeLight : Styles.timeDark}`}>
              3 days ago
            </span>
          </div>
        </div>
      </div>
      <div className={Styles.seprateorJob}></div>
      <div className="px-2 mt-5">
        <div className="flex justify-between mt-8">
          <div className="w-1/2 flex items-center">
            <span className="flex">
              {theme ? <Education /> : <EducationDark />}
            </span>
            <span className={theme ? Styles.priceLight : Styles.priceDark}>
              Education Training
            </span>
          </div>
          <div className="w-1/2">
            <div className="flex pl-4 items-center">
              <span className="flex">{theme ? <Clock /> : <ClockDark />}</span>
              <span
                style={{ width: 110 }}
                className={theme ? Styles.textLight : Styles.textDark}
              >
                Jan 12, 2022
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <div className="flex w-1/2 items-center">
            <span className="flex">{theme ? <User /> : <UserDark />}</span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              <span>117</span> Applications
            </span>
          </div>
          <div className="flex w-1/2 pl-4 items-center">
            <span className="flex">{theme ? <Tick /> : <TickDark />}</span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              <span>3</span> Matches
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center  mt-6 px-2 pt-1">
        <div>
          <Link href="/jobs">
            <a>
              <CustomeButton
                hoverable={true}
                customeClass="button-hoverable-custome"
                styles={{
                  height: 36,
                  width: 140,
                  backgroundColor: theme ? "#F2F2F8" : "#292A3A",
                  color: theme ? "#6E7191" : "#F2F2F8",
                }}
                text="Manage"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
