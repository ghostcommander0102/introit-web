import React, { useState } from "react";
import Styles from "/styles/scss/dashboard/SelectItem.module.scss";
import { Form, Select } from "antd";
import ArrowDown from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowDownDark from "/public/assets/images/svgs/dark/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
import ArrowUpDark from "/public/assets/images/svgs/dark/arrow-up-icon.svg";
import { isEmpty } from "lodash";
import Error from "../Error";
export default function SelectItem({
  onChange,
  isWrong,
  help,
  label,
  theme,
  defaultValue = null,
  width = "100%",
  hasBorder = false,
  height,
  options = [],
  margin,
  inAdmin = false,
}) {
  //***************************
  // define state
  //***************************
  //***************************
  // Define State
  //***************************
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
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
  };
  return (
    <Form.Item
      validateStatus={isWrong ? "error" : ""}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      style={{ height: height, margin: margin, marginTop: 8 }}
      className={hasBorder ? "select-border" : ""}
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <Select
          className={inAdmin ? "custome-wrapper" : null}
          showSearch={true}
          onDropdownVisibleChange={(type) =>
            type ? setOpen(true) : setOpen(false)
          }
          suffixIcon={
            open ? (
              theme ? (
                <ArrowUp />
              ) : (
                <ArrowUpDark />
              )
            ) : theme ? (
              <ArrowDown />
            ) : (
              <ArrowDownDark />
            )
          }
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          style={{ width: width }}
          filterOption={(input, option) =>
            option?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
          }
          value={defaultValue}
        >
          {!isEmpty(options)
            ? options.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        <span
          className={theme ? Styles.lightLabel : Styles.darkLabel}
          style={active || defaultValue ? floatingLabel : labelStyle}
        >
          {label}
        </span>
      </div>
    </Form.Item>
  );
}
