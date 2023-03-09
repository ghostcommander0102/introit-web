import React from "react";
import { Col } from "antd";
import Styles from "/styles/scss/dashboard/NotifContent.module.scss";
import CheckBoxItem from "./form/CheckboxItem";
export default function NotifItem({
  theme,
  title,
  inDash,
  InEmail,
  onDashChange = () => {},
  onEmailChange = () => {},
  setNotifActive,
}) {
  return (
    <Col span={24} className="md:px-0 mb-1.5 notif-item">
      <div
        className={theme ? Styles.lightNotifWrapper : Styles.darkNotifWrapper}
      >
        <div className="md:flex w-full md:px-10 px-2">
          <div className="md:w-1/2 w-full md:pt-0 pt-2 flex items-center">
            <p className={theme ? Styles.lightItemText : Styles.darkItemText}>
              {title}
            </p>
          </div>
          <div className="md:w-1/2 w-full flex md:justify-between justify-end">
            <div
              style={{ height: 20 }}
              className="flex md:w-min w-1/2  justify-center items-center md:pl-5"
            >
              <div className="flex md:mt-2.5 pl-2">
                <CheckBoxItem
                  onChange={() => {
                    onDashChange();
                    setNotifActive(true);
                  }}
                  value={inDash}
                  theme={theme}
                />
              </div>
            </div>
            <div
              style={{ height: 20 }}
              className="flex justify-center items-center"
            >
              <div className="flex md:mt-2.5 pl-2">
                <CheckBoxItem
                  onChange={() => {
                    onEmailChange();
                    setNotifActive(true);
                  }}
                  value={InEmail}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
