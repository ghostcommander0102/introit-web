import React from "react";
import { Progress, Menu, Dropdown } from "antd";
import Link from "next/link";
import Styles from "styles/scss/dashboard/ProfilePercentage.module.scss";
export default function ProfilePercentage({
  children,
  percentage,
  layoutTranslate,
  handleLogOut,
  theme,
  currentUser,
}) {
  const items = currentUser?.menus?.filter(
    (item) => item?.slug == "profile"
  )[0];
  const menu = (
    <Menu
      items={[
        ...items?.modules?.map((item, index) => {
          if (item?.slug == "my-profile")
            return {
              key: "1",
              label: (
                <Link href="/profile">
                  <div
                    className={theme ? Styles.lightWrapper : Styles.darkWrapper}
                  >
                    <a>{layoutTranslate["profile"]?.title}</a>
                  </div>
                </Link>
              ),
            };
          if (item?.slug == "resume") {
            return {
              key: "2",
              label: (
                <Link href="/profile/resume">
                  <div
                    className={theme ? Styles.lightWrapper : Styles.darkWrapper}
                  >
                    <a>{layoutTranslate["resume"]?.title}</a>
                  </div>
                </Link>
              ),
            };
          }
          if (item?.slug == "user-profiles") {
            return {
              key: "3",
              label: (
                <Link href="/profile/user-profile">
                  <div
                    className={theme ? Styles.lightWrapper : Styles.darkWrapper}
                  >
                    <a>{layoutTranslate["user-profiles"]?.title}</a>
                  </div>
                </Link>
              ),
            };
          }
        }),
        ,
        {
          key: "4",
          label: (
            <div
              onClick={handleLogOut}
              className={theme ? Styles.lightWrapper : Styles.darkWrapper}
            >
              <a>{layoutTranslate["logout"]?.title}</a>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Progress
        className={"avatar-progress"}
        type="circle"
        strokeColor="#6ACCE5"
        trailColor={theme ? "#ced2df" : "#555777"}
        percent={percentage || 0}
        strokeWidth={13}
        format={() => children}
      />
    </Dropdown>
  );
}
// items={[
//   {
//     key: "1",
//     label: (
//       <Link href="/profile">
//         <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
//           <a>{layoutTranslate["profile"]?.title}</a>
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <Link href="/profile/resume">
//         <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
//           <a>{layoutTranslate["resume"]?.title}</a>
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: "3",
//     label: (
//       <Link href="/profile/user-profile">
//         <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
//           <a>{layoutTranslate["user-profiles"]?.title}</a>
//         </div>
//       </Link>
//     ),
//   },
//   {
//     key: "4",
//     label: (
//       <div
//         onClick={handleLogOut}
//         className={theme ? Styles.lightWrapper : Styles.darkWrapper}
//       >
//         <a>{layoutTranslate["logout"]?.title}</a>
//       </div>
//     ),
//   },
// ]}
