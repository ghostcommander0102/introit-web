import React from "react";
import ImageProvider from "/providers/ImageProvider";
import Styles from "/styles/scss/dashboard/UserWitting.module.scss";
import AvatarHolder from "/public/assets/images/svgs/avatar-placeholde.svg";
import AvatarHolderDark from "/public/assets/images/svgs/dark/avatar-placeholde.svg";
import { isEmpty } from "lodash";
export default function AvatarWitting({ imgValue, cv, theme }) {
  return (
    <div
      className={Styles.wrapper}
      style={{
        backgroundImage: imgValue,
      }}
    >
      {/* "/images/avatar_placeholder.png" */}
      <div className={theme ? Styles.lightWrapperImg : Styles.darkWrapperImg}>
        {!isEmpty(cv?.avatar) ? (
          <ImageProvider
            objectFit="responsive"
            className={Styles.img}
            width={123}
            height={123}
            src={cv?.avatar}
          />
        ) : (
          <div className={Styles.wrapperPlaceHolder}>
            {theme ? <AvatarHolder /> : <AvatarHolderDark />}
          </div>
        )}
      </div>
    </div>
  );
}
