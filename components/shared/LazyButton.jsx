import React from "react";
import Styles from "/styles/scss/dashboard/CandidateCard.module.scss";
import Lazy from "/public/assets/images/svgs/lazy-icon.svg";
import CustomeButton from "./CustomeButton";
export default function LazyButton({ theme, handleClickSeeMore, userProf }) {
  return (
    <div
      className={`wrapper-candi-card ${
        theme ? Styles.wrapperLight : Styles.wrapperDark
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="pt-5">
          <Lazy />
        </div>
        <div>
          <p className={Styles.seeMore}>
            +{userProf?.results - userProf?.users?.length} more people
          </p>
        </div>
        <div className="mt-5">
          <CustomeButton
            hasAnime={false}
            disabledButton={userProf?.users?.length == userProf?.results}
            onClick={handleClickSeeMore}
            hoverable={true}
            customeClass="button-hoverable-custome"
            styles={{
              height: "36px",
              width: 123,
              backgroundColor: theme ? "#F2F2F8" : "#292A3A",
              color: theme ? "#6E7191" : "#F2F2F8",
            }}
            text="See more"
          />
        </div>
      </div>
    </div>
  );
}
