import { DatePicker, Form } from "antd";
import React, { useState } from "react";
import Styles from "/styles/scss/dashboard/TextItem.module.scss";
import Calender from "/public/assets/images/svgs/calender-icon.svg";
import CalenderDark from "/public/assets/images/svgs/dark/calender-icon.svg";
import ArrowLeft from "/public/assets/images/svgs/prev-icon.svg";
import ArrowRight from "/public/assets/images/svgs/next-icon.svg";
import Error from "../Error";
export default function RangePicker({
  theme,
  dateFormat = "MMM , YYYY",
  onChange,
  isWrong1 = false,
  isWrong2 = false,
  help1,
  help2,
  currentState,
  value,
  myResumeTranslate,
}) {
  //***************************
  // Define State
  //***************************
  const [active, setActive] = useState(false);
  //***************************
  // Define Custome Styles
  //***************************
  const labelStyle = {
    zIndex: 1,
    pointerEvents: "none",
    transition: "0.2s ease all",
    transform: "translate(0, 2rem) scale(1)",
    marginLeft: 10,
  };
  const floatingLabel = {
    transform: "translate(0, -0.3rem) scale(1)",
    marginLeft: 0,
  };
  //***************************
  // Define function
  //***************************
  const onBlur = () => {
    setActive(false);
  };
  const onFocus = () => {
    setActive(true);
  };
  return (
    <Form.Item className={`relative ${isWrong1 || isWrong2 ? "mb-0" : ""}`}>
      {/* <div className="flex mb-1">
        <div className="w-1/2">
          <span className={theme ? Styles.lightLabel : Styles.darkLabel}>
            {myResumeTranslate["date-from"]?.title} *
          </span>
        </div>
        <div className="w-1/2 flex justify-between items-end">
          <span className={theme ? Styles.lightLabel : Styles.darkLabel}>
            {myResumeTranslate["date-to"]?.title} *
          </span>
        </div>
      </div> */}
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <DatePicker.RangePicker
          placeholder={["", ""]}
          picker="month"
          disabledDate={(current) => {
            return current && current.valueOf() > Date.now();
          }}
          disabled={[false, currentState?.present]}
          allowClear={false}
          size="small"
          dropdownClassName="custome-datepicker"
          superNextIcon={<ArrowRight />}
          superPrevIcon={<ArrowLeft />}
          suffixIcon={theme ? <Calender /> : <CalenderDark />}
          format={dateFormat}
          status={isWrong1 || isWrong2 ? "error" : ""}
          value={value}
          className={currentState?.present ? "present-range" : ""}
          separator={<span className="pl-4"></span>}
          onCalendarChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <div className="flex">
          <span
            className={theme ? Styles.lightLabel : Styles.darkLabel}
            style={active || value[0] ? floatingLabel : labelStyle}
          >
            {myResumeTranslate["date-from"]?.title}
          </span>
          <span
            className={theme ? Styles.lightLabel : Styles.darkLabel}
            style={active || value[1] ? floatingLabel : labelStyle}
          >
            {myResumeTranslate["date-to"]?.title}
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">{isWrong1 ? <Error text={help1} /> : null}</div>
        <div className="w-1/2">{isWrong2 ? <Error text={help2} /> : null}</div>
      </div>
    </Form.Item>
  );
}
