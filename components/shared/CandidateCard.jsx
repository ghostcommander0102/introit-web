import React from "react";
import CustomeButton from "./CustomeButton";
import ImageProvider from "/providers/ImageProvider";
import CandidateDropDown from "./CandidateDropDown";
import Styles from "/styles/scss/dashboard/CandidateCard.module.scss";
import FacebookMini from "/public/assets/images/svgs/facebook-mini-icon.svg";
import GoogleMini from "/public/assets/images/svgs/google-mini-icon.svg";
import LinkedinMini from "/public/assets/images/svgs/linkedin-mini-icon.svg";
import FacebookMiniDark from "/public/assets/images/svgs/dark/facebook-mini-icon.svg";
import GoogleMiniDark from "/public/assets/images/svgs/dark/google-mini-icon.svg";
import LinkedinMiniDark from "/public/assets/images/svgs/dark/linkedin-mini-icon.svg";
import Salary from "/public/assets/images/svgs/salary-icon.svg";
import SalaryDark from "/public/assets/images/svgs/dark/salary-icon.svg";
import Industry from "/public/assets/images/svgs/industry-icon.svg";
import IndustryDark from "/public/assets/images/svgs/dark/industry-icon.svg";
import Address from "/public/assets/images/svgs/address-icon.svg";
import AddressDark from "/public/assets/images/svgs/dark/address-icon.svg";
import Favorite from "/public/assets/images/svgs/favorite-icon.svg";
import FavoriteDark from "/public/assets/images/svgs/dark/favorite-icon.svg";
import Message from "/public/assets/images/svgs/message-icon.svg";
import MessageDark from "/public/assets/images/svgs/dark/message1-icon.svg";
export default function CandidateCard({ theme }) {
  return (
    <div
      className={`wrapper-candi-card ${
        theme ? Styles.wrapperLight : Styles.wrapperDark
      }`}
    >
      <div className="flex justify-between mt-2 px-2">
        <div className="flex">
          <div className={Styles.wrapperImg}>
            <ImageProvider
              width={44}
              height={44}
              src="/images/avatar_placeholder.png"
              alt=""
            />
          </div>
          <div className="flex flex-col ml-3 mt-1">
            <span className={theme ? Styles.titleLight : Styles.titleDark}>
              Muhammad Zahid
            </span>
            <span
              className={theme ? Styles.subTitleLight : Styles.subTitleDark}
            >
              UI/UX Designer
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span style={{ cursor: "pointer" }}>
              {theme ? <Favorite /> : <FavoriteDark />}
            </span>
          </div>
          <div>
            <span className="pl-2" style={{ cursor: "pointer" }}>
              {theme ? <Message /> : <MessageDark />}
            </span>
          </div>
          <div className="pl-1.5 relative" style={{ top: -2 }}>
            <CandidateDropDown theme={theme} />
          </div>
        </div>
      </div>
      <div
        className={theme ? Styles.seprateorLight : Styles.seprateorDark}
      ></div>
      <div className="px-2">
        <div className="flex mt-4 items-center">
          <span className="flex">{theme ? <Salary /> : <SalaryDark />}</span>
          <span className={theme ? Styles.priceLight : Styles.priceDark}>
            32,000 - 33,000 $
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <span className="flex">
              {theme ? <Industry /> : <IndustryDark />}
            </span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              Industry
            </span>
          </div>
          <div className="flex items-center">
            <span className="flex">
              {theme ? <Address /> : <AddressDark />}
            </span>
            <span className={theme ? Styles.textLight : Styles.textDark}>
              United States
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center  mt-4 px-2">
        <div className="flex pt-2">
          <div className="px-1">
            {theme ? <FacebookMini /> : <FacebookMiniDark />}
          </div>
          <div className="px-1">
            {theme ? <GoogleMini /> : <GoogleMiniDark />}
          </div>
          <div className="px-1">
            {theme ? <LinkedinMini /> : <LinkedinMiniDark />}
          </div>
        </div>
        <div>
          <CustomeButton
            hoverable={true}
            customeClass="button-hoverable-custome"
            styles={{
              height: "36px",
              width: 123,
              backgroundColor: theme ? "#F2F2F8" : "#292A3A",
              color: theme ? "#6E7191" : "#F2F2F8",
            }}
            text="View Profile"
          />
        </div>
      </div>
    </div>
  );
}
