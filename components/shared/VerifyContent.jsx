import React, { forwardRef, useEffect, useRef } from "react";
import Link from "next/link";
import { Input, Form, Button } from "antd";
import Styles from "/styles/scss/dashboard/Login.module.scss";
import MiniLogo from "/public/assets/images/svgs/auth-logo.svg";
import MiniLogoDark from "/public/assets/images/svgs/dark/auth-logo.svg";
import FormItem from "./form/FormItem";
import Wrapper from "components/auth/Wrapper";
import VerifyStyle from "/styles/scss/dashboard/VerifyInput.module.scss";
export default function VerifyContent({
  theme,
  handleVerify,
  inputs,
  setInputs,
  disabledButton,
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
  // define useEffect
  //***************************
  useEffect(() => {
    if (
      !inputs.one &&
      !inputs.two &&
      !inputs.three &&
      !inputs.four &&
      !inputs.five
    ) {
      ref1.current.focus();
    } else if (
      inputs.one &&
      !inputs.two &&
      !inputs.three &&
      !inputs.four &&
      !inputs.five
    ) {
      ref2.current.focus();
    } else if (
      inputs.one &&
      inputs.two &&
      !inputs.three &&
      !inputs.four &&
      !inputs.five
    ) {
      ref3.current.focus();
    } else if (
      inputs.one &&
      inputs.two &&
      inputs.three &&
      !inputs.four &&
      !inputs.five
    ) {
      ref4.current.focus();
    } else if (
      inputs.one &&
      inputs.two &&
      inputs.three &&
      inputs.four &&
      !inputs.five
    ) {
      ref5.current.focus();
    } else if (
      inputs.one &&
      inputs.two &&
      inputs.three &&
      inputs.four &&
      inputs.five
    ) {
      ref6.current.focus();
    }
  }, [inputs]);
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
  return (
    <div className={`${Styles.masterWrapper}`}>
      <div className="flex justify-center mb-4">
        <Link href="https://introit.io/">
          <a>{theme ? <MiniLogo /> : <MiniLogoDark />}</a>
        </Link>
      </div>
      <Wrapper page="verify" height="100%" theme={theme}>
        <FormItem onFinish={handleVerify}>
          <div>
            <div>
              <div className="flex justify-center mt-4">
                <p
                  className={
                    theme ? VerifyStyle.lightText : VerifyStyle.darkText
                  }
                >
                  Enter code
                </p>
              </div>
              <div className="flex  px-0">
                <InputVerify
                  value={inputs.one}
                  onChange={setInputs}
                  name="one"
                  current={1}
                  ref={ref1}
                />
                <InputVerify
                  value={inputs.two}
                  onChange={setInputs}
                  name="two"
                  current={2}
                  ref={ref2}
                />
                <InputVerify
                  value={inputs.three}
                  onChange={setInputs}
                  name="three"
                  current={3}
                  ref={ref3}
                />
                <InputVerify
                  value={inputs.four}
                  onChange={setInputs}
                  name="four"
                  current={4}
                  ref={ref4}
                />
                <InputVerify
                  value={inputs.five}
                  onChange={setInputs}
                  name="five"
                  current={5}
                  ref={ref5}
                />
                <InputVerify
                  value={inputs.six}
                  onChange={setInputs}
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
                  Please type in the code displayed on your <br />
                  authenticator app from your device
                </p>
              </div>
              <div className="flex justify-center items-center pb-4">
                <div>
                  <Button
                    className={Styles.button}
                    disabled={disabledButton}
                    htmlType="submit"
                  >
                    VERIFY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FormItem>
      </Wrapper>
    </div>
  );
}
