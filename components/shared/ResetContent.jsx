import React from "react";
import Link from "next/link";
import { Button } from "antd";
import Styles from "/styles/scss/dashboard/Login.module.scss";
import MiniLogo from "/public/assets/images/svgs/auth-logo.svg";
import MiniLogoDark from "/public/assets/images/svgs/dark/auth-logo.svg";
import FormItem from "./form/FormItem";
import Wrapper from "components/auth/Wrapper";
import PasswordProgress from "components/auth/PasswordProgress";
import { isEmpty } from "lodash";
import AuthPassword from "./form/AuthPassword";
import CheckBoxItem from "./form/CheckboxItem";
export default function ResetContent({
  theme,
  handleLogin,
  inputs,
  setInputs,
  strong,
  errors,
  handleResetPassword,
  disabledButton,
}) {
  return (
    <div className={`${Styles.masterWrapper}`}>
      <div className="flex justify-center mb-4">
        <Link href="https://techtalentshub.com">
          <a>{theme ? <MiniLogo /> : <MiniLogoDark />}</a>
        </Link>
      </div>
      <Wrapper page="reset" height="100%" theme={theme}>
        <FormItem handleLogin={handleLogin}>
          <div>
            <div className="mt-4">
              <div>
                <AuthPassword
                  isWrong={!isEmpty(errors?.newPassword) ? true : false}
                  help={errors?.newPassword}
                  value={inputs.password}
                  onChange={setInputs}
                  label="Password"
                  placeholder=""
                  theme={theme}
                  name="password"
                />
              </div>
              <PasswordProgress
                now={
                  strong <= 3
                    ? 5
                    : strong <= 6
                    ? 60
                    : strong <= 8
                    ? 90
                    : strong >= 8
                    ? 100
                    : ""
                }
              />
              <div className="mt-4">
                <AuthPassword
                  value={inputs.confirm_password}
                  onChange={setInputs}
                  label="Password"
                  placeholder=""
                  theme={theme}
                  name="confirm_password"
                />
              </div>
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
                    className={Styles.button}
                    htmlType="submit"
                    disabled={disabledButton}
                    onClick={handleResetPassword}
                  >
                    REST PASSWORTD
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
