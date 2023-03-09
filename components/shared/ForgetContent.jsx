import React from "react";
import Link from "next/link";
import { Button, Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/Login.module.scss";
import MiniLogo from "/public/assets/images/svgs/auth-logo.svg";
import MiniLogoDark from "/public/assets/images/svgs/dark/auth-logo.svg";
import Message from "/public/assets/images/svgs/reset-pass-icon.svg";
import MessageDark from "/public/assets/images/svgs/dark/reset-pass-icon.svg";
import FormItem from "./form/FormItem";
import Wrapper from "components/auth/Wrapper";
import { isEmpty } from "lodash";
import AuthEmail from "./form/AuthEmail";
import CheckBoxItem from "./form/CheckboxItem";
export default function ForgetContent({
  theme,
  inputs,
  setInputs,
  handleForgot,
  errors,
  disabledButton,
}) {
  return (
    <div className={`${Styles.masterWrapper}`}>
      <div className="flex justify-center mb-4">
        <Link href="https://introit.io/">
          <a>{theme ? <MiniLogo /> : <MiniLogoDark />}</a>
        </Link>
      </div>
      <Wrapper page="forget" height="100%" theme={theme}>
        <FormItem onFinish={handleForgot}>
          <div>
            <div>
              <AuthEmail
                isWrong={!isEmpty(errors?.email) ? true : false}
                help={errors?.email}
                value={inputs.email}
                onChange={setInputs}
                label="Email"
                placeholder=""
                icon={theme ? <Message /> : <MessageDark />}
                hasIcon={true}
                theme={theme}
                name="email"
              />
              <div className="flex justify-between items-center mt-10">
                <div className="pl-10 pt-4">
                  <CheckBoxItem
                    // isWrong={!isEmpty(errors?.remember_me) ? true : false}
                    // help={errors?.remember_me}
                    theme={theme}
                    // value={inputs.remember_me}
                    // setInputs={setInputs}
                    // onChange={(e) => {
                    //   setInputs((prev) => {
                    //     return {
                    //       ...prev,
                    //       [e.target.name]: e.target.checked,
                    //     };
                    //   });
                    // }}
                    label="REMEMBER"
                    name="remember_me"
                  />
                </div>
                <div>
                  <Button
                    style={{ width: 160 }}
                    htmlType="submit"
                    disabled={disabledButton}
                    className={Styles.button}
                  >
                    REST PASSWORTD
                  </Button>
                </div>
              </div>
              <div className="pt-8">
                <p
                  className={
                    theme
                      ? Styles.lightWrapperForgetContent
                      : Styles.darkWrapperForgetContent
                  }
                >
                  INSERT YOUR EMAIL ADDRESS TO REST YOUR PASSWORD OR BACK TO
                  <Link href="/login">
                    <a
                      className={`pl-2 ${
                        theme
                          ? Styles.lightForgetContent
                          : Styles.darkForgetContent
                      }`}
                    >
                      LOGIN
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </FormItem>
      </Wrapper>
    </div>
  );
}
