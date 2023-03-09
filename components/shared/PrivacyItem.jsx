import React from "react";
import CheckBoxItem from "./form/CheckboxItem";
import Styles from "/styles/scss/dashboard/NotifContent.module.scss";
export default function PrivacyItem({
  theme,
  text,
  value,
  onChange,
  setPrivacyActive,
}) {
  return (
    <div
      className={`mb-1.5 privacy-item ${
        theme ? Styles.lightPrivacyWrapper : Styles.darkPrivacyWrapper
      }`}
    >
      <div className="flex w-full md:px-10 px-2">
        <div className="md:w-1/2 w-3/4 flex items-center">
          <p className={theme ? Styles.lightItemText : Styles.darkItemText}>
            {text}
          </p>
        </div>
        <div className="md:w-1/2 w-1/4 flex justify-end">
          <div className="flex justify-center items-center mb-1 pl-5">
            <CheckBoxItem
              onChange={() => {
                setPrivacyActive(true);
                onChange();
              }}
              value={value}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
