import React from "react";
import Styles from "/styles/scss/cvs/CvPages.module.scss";
export default function CvLayout({ wrapper, children, cvTheme }) {
  switch (wrapper) {
    case "cv1":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv1}
        >
          {children}
        </div>
      );
    case "cv2":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv2}
        >
          {children}
        </div>
      );
    case "cv3":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv3}
        >
          {children}
        </div>
      );
    case "cv4":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv3}
        >
          {children}
        </div>
      );
    case "cv5":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv5}
        >
          {children}
        </div>
      );
    case "cv6":
      return (
        <div
          style={{
            backgroundColor: cvTheme?.backGroundColor,
            fontFamily: cvTheme?.font,
          }}
          className={Styles.wrapperCv5}
        >
          {children}
        </div>
      );
    default:
      null;
  }
}
