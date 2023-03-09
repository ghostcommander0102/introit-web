import React from "react";
import Link from "next/link";
import { Button } from "antd";
import MiniLogo from "/public/assets/images/svgs/auth-logo.svg";
import MiniLogoDark from "/public/assets/images/svgs/dark/auth-logo.svg";
import Facebook from "/public/assets/images/svgs/facebook-auth-icon.svg";
import Google from "/public/assets/images/svgs/google-auth-icon.svg";
import Linkedin from "/public/assets/images/svgs/linkedin-auth-icon.svg";
import Email from "/public/assets/images/svgs/email.svg";
import EmailDark from "/public/assets/images/svgs/dark/email.svg";
import Styles from "/styles/scss/dashboard/Login.module.scss";
import Social from "../auth/Social";
import FormItem from "./form/FormItem";
import CheckBoxItem from "./form/CheckboxItem";
import Wrapper from "components/auth/Wrapper";
import { isEmpty } from "lodash";
import AuthEmail from "./form/AuthEmail";
import AuthPassword from "./form/AuthPassword";
export default function LoginContent({
  theme,
  handleLogin,
  inputs,
  setInputs,
  publicUrl,
  errors,
  disabledButton,
}) {
  return (
    <div className={Styles.masterWrapper}>
      <div className="mt-10"></div>
      <Wrapper page="login" theme={theme}>
        <div>
          <div className="flex justify-between">
            <div className="flex justify-center">
              <p className={theme ? Styles.lightHeader : Styles.darkHeader}>
                Login with
              </p>
            </div>
            <div className="flex">
              <div>
                <Link href={`${publicUrl}/auth/login/google`}>
                  <a>
                    <Social icon={<Google />} />
                  </a>
                </Link>
              </div>
              <div className="px-8">
                <Link href={`${publicUrl}/auth/login/linkedin`}>
                  <a>
                    <Social icon={<Linkedin />} />
                  </a>
                </Link>
              </div>
              <div>
                <Link href={`${publicUrl}/auth/login/facebook`}>
                  <a>
                    <Social icon={<Facebook />} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p
            className={`text-center py-4 ${
              theme ? Styles.textLight : Styles.textDark
            }`}
          >
            OR
          </p>
        </div>
        <FormItem onFinish={handleLogin}>
          <div>
            <div>
              <AuthEmail
                icon={theme ? <Email /> : <EmailDark />}
                hasIcon={true}
                isWrong={!isEmpty(errors?.email) ? true : false}
                help={errors?.email}
                value={inputs.email}
                label="YOUR EMAIL"
                placeholder=""
                type="email"
                theme={theme}
                onChange={setInputs}
                name="email"
                maxWidth="18.125rem"
                isLogin={true}
              />
              <AuthPassword
                isWrong={!isEmpty(errors?.password) ? true : false}
                help={errors?.password}
                value={inputs.password}
                onChange={setInputs}
                label="PASSWORD"
                placeholder
                theme={theme}
                name="password"
              />
              <div className="flex justify-between items-center pt-4">
                <div className="w-1/2 flex justify-center items-center mt-4">
                  <CheckBoxItem
                    isWrong={!isEmpty(errors?.remember_me) ? true : false}
                    help={errors?.remember_me}
                    theme={theme}
                    value={inputs.remember_me}
                    setInputs={setInputs}
                    onChange={(e) => {
                      setInputs((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.checked,
                        };
                      });
                    }}
                    label="REMEMBER"
                    name="remember_me"
                  />
                </div>
                <div>
                  <Button
                    htmlType="submit"
                    disabled={disabledButton}
                    className={Styles.button}
                  >
                    Login
                  </Button>
                </div>
              </div>
              <div className={`${Styles.wrapperSubmit} pt-4`}>
                <Link href="/signup">
                  <a className={theme ? Styles.signupLight : Styles.signupDark}>
                    SIGN UP
                  </a>
                </Link>
                <Link href="/password/forget">
                  <a className={theme ? Styles.forgetLight : Styles.forgetDark}>
                    FORGOT PASSWORD
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </FormItem>
      </Wrapper>
    </div>
  );
}
