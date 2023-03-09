import React, { useEffect, useState } from "react";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";
import Styles from "/styles/scss/dashboard/DateItem.module.scss";
import Calender from "/public/assets/images/svgs/calender-icon.svg";
import CalenderDark from "/public/assets/images/svgs/dark/calender-icon.svg";
import ArrowLeft from "/public/assets/images/svgs/prev-icon.svg";
import ArrowRight from "/public/assets/images/svgs/next-icon.svg";
import Error from "../Error";
export default function DateItem({
  theme,
  label = "Date of Birth",
  dateFormat = "MMM , YYYY",
  value = null,
  onChange,
  isWrong = false,
  help,
  picker = "month",
}) {
  //***************************
  // Define State
  //***************************
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  //***************************
  // Define Custome Styles
  //***************************
  const labelStyle = {
    zIndex: 1,
    pointerEvents: "none",
    transition: "0.2s ease all",
    transform: "translate(0, 2.1rem) scale(1)",
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
    setOpen(true);
  };

  return (
    <Form.Item
      validateStatus={isWrong ? "error" : ""}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      style={{ marginTop: 8 }}
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <DatePicker
          picker={picker}
          value={moment(value, "YYYY-MM-DD")}
          open={open}
          onBlur={onBlur}
          onFocus={onFocus}
          allowClear={false}
          suffixIcon={theme ? <Calender /> : <CalenderDark />}
          format={dateFormat}
          className={theme ? Styles.lightInput : Styles.darkInput}
          onChange={onChange}
          superNextIcon={<ArrowRight />}
          superPrevIcon={<ArrowLeft />}
          showToday={false}
          dropdownClassName="custome-datepicker"
          renderExtraFooter={() => {
            return (
              <Button onClick={() => setOpen(false)} className={Styles.setDate}>
                Set Date
              </Button>
            );
          }}
        />
        <span
          className={theme ? Styles.lightLabel : Styles.darkLabel}
          style={active || value ? floatingLabel : labelStyle}
        >
          {label}
        </span>
      </div>
    </Form.Item>
  );
}
