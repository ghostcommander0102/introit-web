import React, { useState } from "react";
import { Form, Select } from "antd";
import Styles from "/styles/scss/dashboard/SelectItem.module.scss";
import ArrowButton from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
import { isEmpty } from "lodash";
export default function ResumeSelect({
  label,
  options,
  theme,
  placeholder,
  onChange,
  defaultValue,
}) {
  const [open, setOpen] = useState(false);
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
        className="cvs-select"
        showSearch={true}
        onDropdownVisibleChange={(type) =>
          type ? setOpen(true) : setOpen(false)
        }
        suffixIcon={open ? <ArrowUp /> : <ArrowButton />}
        placeholder={placeholder}
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
