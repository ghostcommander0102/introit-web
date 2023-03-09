import React, { useState } from "react";
import { Form, Select } from "antd";
import Styles from "/styles/scss/dashboard/SelectItem.module.scss";
import ColorPicker from "/public/assets/images/svgs/color-picker.svg";
import { isEmpty } from "lodash";
export default function ColorSelect({
  label,
  options,
  theme,
  placeholder,
  onChange,
  defaultValue,
  disabled,
}) {
  return (
    <Form.Item
      colon={false}
      labelAlign="left"
      label={
        <label className={theme ? Styles.lightLabel : Styles.darkLabel}>
          {label}
        </label>
      }
    >
      <Select
        disabled={disabled}
        className="cvs-select"
        showSearch={true}
        suffixIcon={<ColorPicker />}
        placeholder={placeholder}
        onChange={onChange}
        value={defaultValue}
      >
        {!isEmpty(options)
          ? options.map((item, index) => {
              return (
                <Select.Option key={index} value={item.value}>
                  <div className="flex">
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: item.label,
                        borderRadius: "50%",
                        border: "1px solid #6E7191",
                      }}
                    ></div>
                    <span
                      style={{ color: "#6E7191" }}
                      className="uppercase pl-2.5"
                    >
                      {item.label}
                    </span>
                  </div>
                </Select.Option>
              );
            })
          : null}
      </Select>
    </Form.Item>
  );
}
