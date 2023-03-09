import React, { useState } from "react";
import Styles from "/styles/scss/dashboard/SelectItem.module.scss";
import { Form, Select } from "antd";
import ArrowDown from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowDownDark from "/public/assets/images/svgs/dark/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
import ArrowUpDark from "/public/assets/images/svgs/dark/arrow-up-icon.svg";
import { isEmpty } from "lodash";
import Error from "../../Error";
export default function FilterSelect({
  onChange,
  isWrong,
  help,
  label,
  theme,
  placeholder,
  defaultValue = null,
  width = "100%",
  hasBorder = false,
  height,
  options = [],
  margin,
}) {
  //***************************
  // define state
  //***************************
  const [open, setOpen] = useState(false);
  return (
    <Form.Item
      validateStatus={isWrong ? "error" : ""}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      label={
        <label className={theme ? Styles.lightLabel : Styles.darkLabel}>
          {label}
        </label>
      }
      style={{ height: height, margin: 0 }}
    >
      <Select
        className="filter-select"
        showSearch={false}
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
        placeholder={placeholder}
        onChange={onChange}
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
    </Form.Item>
  );
}
