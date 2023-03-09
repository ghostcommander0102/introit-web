import Wrapper from "components/auth/Wrapper";
import Link from "next/link";
import React from "react";
import { Row, Col, Button } from "antd";
import CheckBoxItem from "./form/CheckboxItem";
import FormItem from "./form/FormItem";
import Facebook from "/public/assets/images/svgs/facebook-auth-icon.svg";
import Google from "/public/assets/images/svgs/google-auth-icon.svg";
import Linkedin from "/public/assets/images/svgs/linkedin-auth-icon.svg";
import Styles from "/styles/scss/dashboard/Login.module.scss";
import Social from "components/auth/Social";
import { isEmpty } from "lodash";
import AuthText from "./form/AuthText";
import AuthEmail from "./form/AuthEmail";
import AuthPassword from "./form/AuthPassword";
export default function SignUpContent({
  theme,
  inputs,
  setInputs,
  publicUrl,
  handleRegister,
  errors,
  disabledButton,
  currentUser,
}) {
  return (
    <div className={`${Styles.masterWrapper}`}>
      <div className="mt-10"></div>
      <Wrapper page="signup" theme={theme}>
        <FormItem onFinish={handleRegister}>
          <Row>
            <Col span={24} className="mb-10">
              <div
                className={`${Styles.socialSignUp} flex mx-auto md:justify-center justify-between`}
              >
                <div className="pr-0 flex items-center">
                  <p className={theme ? Styles.lightHeader : Styles.darkHeader}>
                    SIGN UP WITH
                  </p>
                </div>
                <div className="flex">
                  <div className="md:px-3 px-2">
                    <Link href={`${publicUrl}/auth/login/google`}>
                      <a>
                        <Social icon={<Google />} />
                      </a>
                    </Link>
                  </div>
                  <div className="md:px-3 px-2">
                    <Link href={`${publicUrl}/auth/login/linkedin`}>
                      <a>
                        <Social icon={<Linkedin />} />
                      </a>
                    </Link>
                  </div>
                  <div className="md:px-3 px-2">
                    <Link href={`${publicUrl}/auth/login/facebook`}>
                      <a>
                        <Social icon={<Facebook />} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }} className="md:pr-2.5 pr-0 mt-4">
              <div>
                <AuthText
                  isWrong={!isEmpty(errors?.givenName) ? true : false}
                  help={errors?.givenName}
                  value={inputs.givenName}
                  label="Name"
                  placeholder="Your name"
                  theme={theme}
                  onChange={setInputs}
                  name="givenName"
                  currentUser={currentUser}
                />
              </div>
              <AuthText
                isWrong={!isEmpty(errors?.familyName) ? true : false}
                help={errors?.familyName}
                value={inputs.familyName}
                label="Last Name"
                placeholder="Your Last Name"
                theme={theme}
                onChange={setInputs}
                name="familyName"
              />
              <AuthEmail
                isWrong={!isEmpty(errors?.email) ? true : false}
                help={errors?.email}
                value={inputs.email}
                label="Email"
                placeholder="Your email"
                theme={theme}
                onChange={setInputs}
                name="email"
              />
              {currentUser?.provider == "local" ||
              currentUser?.user == "empty" ? (
                <AuthPassword
                  isWrong={!isEmpty(errors?.password) ? true : false}
                  help={errors?.password}
                  value={inputs.password}
                  onChange={setInputs}
                  label="Password"
                  placeholder="*********"
                  theme={theme}
                  name="password"
                />
              ) : null}
              <div className="pt-4 text-center">
                <p
                  className={
                    theme
                      ? Styles.wrapperLoginLink
                      : Styles.wrapperLoginLinkDark
                  }
                >
                  <Link href="/login">Already have an account?</Link>
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }} className="md:pl-10  pt-10 mt-2">
              <Row className="md:pl-6">
                <Col span={24}>
                  <div className="pb-md-2">
                    <div className="md:block hidden">
                      <p className={theme ? Styles.textLight : Styles.textDark}>
                        By clicking on the confirmation button, you accept
                        <br />
                        our
                      </p>
                    </div>
                    <div className="md:hidden block">
                      <p className={theme ? Styles.textLight : Styles.textDark}>
                        By clicking on the confirmation button, <br /> you
                        accept our
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="pt-6" span={24}>
                  <CheckBoxItem
                    margin={0}
                    isWrong={!isEmpty(errors?.general) ? true : false}
                    help={errors?.general}
                    theme={theme}
                    value={inputs.general}
                    onChange={(e) => {
                      setInputs((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.checked,
                        };
                      });
                    }}
                    label={
                      <p
                        className={
                          theme
                            ? Styles.wrapperRuleLight
                            : Styles.wrapperRuleDark
                        }
                      >
                        General terms and conditions
                      </p>
                    }
                    name="general"
                  />
                </Col>
                <Col className="pt-4" span={24}>
                  <CheckBoxItem
                    margin={0}
                    isWrong={!isEmpty(errors?.privacy) ? true : false}
                    help={errors?.privacy}
                    theme={theme}
                    value={inputs.privacy}
                    onChange={(e) => {
                      setInputs((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.checked,
                        };
                      });
                    }}
                    label={
                      <p
                        className={
                          theme
                            ? Styles.wrapperRuleLight
                            : Styles.wrapperRuleDark
                        }
                      >
                        Privacy Policy
                      </p>
                    }
                    name="privacy"
                  />
                </Col>
                <Col className="pt-4" span={24}>
                  <CheckBoxItem
                    margin={0}
                    isWrong={!isEmpty(errors?.gdpr) ? true : false}
                    help={errors?.gdpr}
                    theme={theme}
                    value={inputs.gdpr}
                    onChange={(e) => {
                      setInputs((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.checked,
                        };
                      });
                    }}
                    label={
                      <p
                        className={
                          theme
                            ? Styles.wrapperRuleLight
                            : Styles.wrapperRuleDark
                        }
                      >
                        GDPR agreement
                      </p>
                    }
                    name="gdpr"
                  />
                </Col>
                <Col span={24} className="mt-4">
                  <Button
                    className={Styles.button}
                    htmlType="submit"
                    disabled={disabledButton}
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormItem>
      </Wrapper>
    </div>
  );
}
