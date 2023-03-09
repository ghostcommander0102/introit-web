import React, { useEffect, useState } from "react";
import { AutoComplete, Form } from "antd";
import Styles from "/styles/scss/dashboard/TextItem.module.scss";
import Error from "../Error";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
export default function AddressItem({
  value,
  onChange,
  theme,
  label,
  isWrong,
  help,
  name,
  address,
  disabled,
}) {
  const {
    ready,
    setValue,
    suggestions: { data },
  } = usePlacesAutocomplete();

  if (!ready) return null;
  return (
    <Inner
      value={value}
      onChange={onChange}
      theme={theme}
      label={label}
      isWrong={isWrong}
      help={help}
      name={name}
      address={address}
      disabled={disabled}
      setValue={setValue}
      data={data}
    />
  );
}

function Inner({
  onChange,
  theme,
  label,
  isWrong,
  help,
  value,
  name,
  disabled,
  setValue,
  data,
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
      validateStatus={isWrong ? "error" : null}
      help={isWrong ? <Error text={help} /> : null}
      colon={false}
      labelAlign="left"
      style={{ width: "100%", marginTop: 8 }}
    >
      <div style={{ display: "flex", flexFlow: "column-reverse" }}>
        <AutoComplete
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          onChange={(value) => {
            onChange((prev) => {
              return { ...prev, [name]: value };
            });
            setValue(value);
          }}
          options={data?.map((item) => {
            return { value: item.description };
          })}
          value={value}
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
