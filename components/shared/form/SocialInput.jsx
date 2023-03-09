import React, { useState } from "react";
import { Input, Form, Select, Button, Spin } from "antd";
import Styles from "/styles/scss/dashboard/SocialInput.module.scss";
import ArrowButton from "/public/assets/images/svgs/arrow-down-icon.svg";
import ArrowUp from "/public/assets/images/svgs/arrow-up-icon.svg";
import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
export default function SocialInput({
  placeholder,
  option,
  handleCreateSocial,
  setSingleSocialInputs,
  singleSocialInput,
  theme,
  disabledButton,
  myProfileTranslate,
}) {
  //***************************
  // define state
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
  };
  return (
    <Form.Item className="wrapper-social-input mb-2">
      <Input.Group compact className="mt-2">
        <Form.Item style={{ border: 0 }}>
          <div style={{ display: "flex", flexFlow: "column-reverse" }}>
            <Select
              onBlur={onBlur}
              onFocus={onFocus}
              showSearch={true}
              onDropdownVisibleChange={(type) =>
                type ? setOpen(true) : setOpen(false)
              }
              suffixIcon={open ? <ArrowUp /> : <ArrowButton />}
              placeholder={placeholder}
              onChange={(value) =>
                setSingleSocialInputs((prev) => {
                  return { ...prev, socialId: value };
                })
              }
              style={{ minWidth: 120 }}
              filterOption={(input, option) =>
                option?.children[1]
                  ?.toLowerCase()
                  ?.indexOf(input.toLowerCase()) >= 0
              }
              value={singleSocialInput.socialId}
            >
              {!isEmpty(option)
                ? option.map((item, index) => {
                    return (
                      <Select.Option value={item.value} key={index}>
                        <span
                          className="pr-2"
                          style={{ position: "relative", top: 5 }}
                        >
                          <ImageProvider
                            width={20}
                            height={20}
                            src={item?.icon}
                          />
                        </span>
                        {item.label}
                      </Select.Option>
                    );
                  })
                : null}
            </Select>
            <span
              className={theme ? Styles.lightLabel : Styles.darkLabel}
              style={
                active || singleSocialInput.socialId
                  ? floatingLabel
                  : labelStyle
              }
            >
              {myProfileTranslate["add-new"]?.title}
            </span>
          </div>
        </Form.Item>
        <Form.Item noStyle>
          <Input
            style={{ marginTop: 19 }}
            onChange={(e) =>
              setSingleSocialInputs((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
            value={singleSocialInput.username}
            className={theme ? Styles.lightInput : Styles.darkInput}
            placeholder=""
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            disabled={disabledButton}
            onClick={handleCreateSocial}
            className={Styles.button}
          >
            {disabledButton ? (
              <Spin />
            ) : (
              <div className="flex justify-center">
                {myProfileTranslate["save"]?.title}
              </div>
            )}
          </Button>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  );
}
