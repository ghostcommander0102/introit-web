import React from "react";
import Styles from "/styles/scss/dashboard/Switch.module.scss";
export default function SwitchItem({
  label,
  onChange,
  disabled,
  checked,
  theme,
}) {
  return (
    <div className="flex md:justify-end justify-between w-full md:pb-0 pb-4">
      <span className={`mr-4 ${theme ? Styles.lightLabel : Styles.darkLabel}`}>
        {label}
      </span>
      <label className={theme ? Styles.lightSwitch : Styles.darkSwitch}>
        <input
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          type="checkbox"
        />
        <span
          className={`${theme ? Styles.lightSlider : Styles.darkSlider} ${
            Styles.round
          }`}
        ></span>
      </label>
    </div>
  );
}
