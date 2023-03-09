import React, { forwardRef, useEffect, useRef } from "react";
import { Button, Form, Input, Modal } from "antd";
import CustomeButton from "./CustomeButton";
import FormItem from "./form/FormItem";
import Close from "/public/assets/images/svgs/close-icon.svg";
import Styles from "/styles/scss/dashboard/Modal.module.scss";
import VerifyStyle from "/styles/scss/dashboard/VerifyContent.module.scss";
export default function VerifyPhoneModal({
  visible,
  theme,
  handleClose,
  inputsPhone,
  setInputsPhone,
  disabledButton,
  handleVerifyPhone,
  myProfileTranslate = {},
}) {
  //***************************
  // define reference
  //***************************
  const ref1 = useRef(false);
  const ref2 = useRef(false);
  const ref3 = useRef(false);
  const ref4 = useRef(false);
  const ref5 = useRef(false);
  const ref6 = useRef(false);
  //***************************
  //***************************
  // define component
  //***************************
  const InputVerify = forwardRef(({ name, onChange, value }, ref) => {
    return (
      <Form.Item className="mb-3 mx-auto">
        <Input
          pattern="[0-9]*"
          type="number"
          value={value}
          name={name}
          onChange={(e) =>
            onChange((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            })
          }
          ref={ref}
          maxLength={1}
          className={theme ? VerifyStyle.lightInput : VerifyStyle.darkInput}
        />
      </Form.Item>
    );
  });
  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    if (ref1.current) ref1.current.focus();
  }, [inputsPhone, visible]);
  useEffect(() => {
    if (
      !inputsPhone.one &&
      !inputsPhone.two &&
      !inputsPhone.three &&
      !inputsPhone.four &&
      !inputsPhone.five
    ) {
      if (ref1.current) ref1.current.focus();
    } else if (
      inputsPhone.one &&
      !inputsPhone.two &&
      !inputsPhone.three &&
      !inputsPhone.four &&
      !inputsPhone.five
    ) {
      if (ref2.current) ref2.current.focus();
    } else if (
      inputsPhone.one &&
      inputsPhone.two &&
      !inputsPhone.three &&
      !inputsPhone.four &&
      !inputsPhone.five
    ) {
      if (ref3.current) ref3.current.focus();
    } else if (
      inputsPhone.one &&
      inputsPhone.two &&
      inputsPhone.three &&
      !inputsPhone.four &&
      !inputsPhone.five
    ) {
      if (ref4.current) ref4.current.focus();
    } else if (
      inputsPhone.one &&
      inputsPhone.two &&
      inputsPhone.three &&
      inputsPhone.four &&
      !inputsPhone.five
    ) {
      if (ref5.current) ref5.current.focus();
    } else if (
      inputsPhone.one &&
      inputsPhone.two &&
      inputsPhone.three &&
      inputsPhone.four &&
      inputsPhone.five
    ) {
      if (ref6.current) ref6.current.focus();
    }
  }, [inputsPhone]);
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={900}
    >
      <div className="md:block hidden">
        <Button
          onClick={handleClose}
          className={theme ? Styles.lightClose : Styles.darkClose}
        >
          <Close />
        </Button>
      </div>
      <div className="md:hidden block">
        <Button onClick={handleClose} className={Styles.mobileClose}>
          <Close />
        </Button>
      </div>
      <div className="">
        <FormItem onFinish={handleVerifyPhone}>
          <div>
            <div>
              <div className="flex justify-center md:mt-4 mt-10">
                <p
                  className={
                    theme ? VerifyStyle.lightText : VerifyStyle.darkText
                  }
                >
                  {myProfileTranslate["enter-code"]?.title}
                </p>
              </div>
              <div className={VerifyStyle.wrapperInput}>
                <InputVerify
                  value={inputsPhone?.one}
                  onChange={setInputsPhone}
                  name="one"
                  current={1}
                  ref={ref1}
                />
                <InputVerify
                  value={inputsPhone?.two}
                  onChange={setInputsPhone}
                  name="two"
                  current={2}
                  ref={ref2}
                />
                <InputVerify
                  value={inputsPhone?.three}
                  onChange={setInputsPhone}
                  name="three"
                  current={3}
                  ref={ref3}
                />
                <InputVerify
                  value={inputsPhone?.four}
                  onChange={setInputsPhone}
                  name="four"
                  current={4}
                  ref={ref4}
                />
                <InputVerify
                  value={inputsPhone?.five}
                  onChange={setInputsPhone}
                  name="five"
                  current={5}
                  ref={ref5}
                />
                <InputVerify
                  value={inputsPhone?.six}
                  onChange={setInputsPhone}
                  name="six"
                  current={6}
                  ref={ref6}
                />
              </div>
              <div className="flex justify-center py-3">
                <p
                  className={
                    theme
                      ? VerifyStyle.lightLittletext
                      : VerifyStyle.darkLittleText
                  }
                >
                  {
                    myProfileTranslate[
                      "please-enter-the-code-you-just-received-via-sms-here"
                    ]?.title
                  }
                </p>
              </div>
              <div className="flex justify-center items-center pb-4">
                <div>
                  <CustomeButton
                    disabledButton={disabledButton}
                    type="save"
                    text={myProfileTranslate["save"]?.title}
                    theme={theme}
                    buttonType="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </FormItem>
      </div>
    </Modal>
  );
}
