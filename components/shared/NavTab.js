import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import NavTabContent from "./NavTabContent";
import RadioCustome from "./RadioCustome";
import SaveButton from "./SaveButton";
import Styles from "/styles/scss/dashboard/NavTab.module.scss";
import Delete from "/public/assets/images/svgs/delete-icon.svg";
import DeleteDark from "/public/assets/images/svgs/dark/delete-icon.svg";
import CheckBoxItem from "./form/CheckboxItem";
import SelectItem from "./form/SelectItem";
import LineInput from "./LineInput";
import InputItem from "./form/TextItem";
export default function NavTab({ theme, setModalTab }) {
  const textStyles = {
    fontWeight: 400,
    fontSize: 14,
    color: theme ? "#6E7191" : "#F2F2F8",
  };
  const [tab, setTab] = useState(1);
  const Button = ({ text, onClick, active = false }) => {
    return (
      <Button
        type="button"
        onClick={onClick}
        className={`${theme ? Styles.button : Styles.buttonDark} ${
          active ? Styles.buttonActive : ""
        }`}
      >
        {text}
      </Button>
    );
  };
  return (
    <Row className="px-10 mx-4">
      <Col span={24}>
        <p className={theme ? Styles.textBold : Styles.textBoldDark}>
          Screening questions
        </p>
        <p className={theme ? Styles.text : Styles.textDark}>
          Add a pre-written or custom question from the following categories.
        </p>
      </Col>
      <Col span={24}>
        <Button
          active={tab == 1 ? true : false}
          onClick={() => setTab(1)}
          text="Availibility"
        />
        <Button
          active={tab == 2 ? true : false}
          onClick={() => setTab(2)}
          text="Education"
        />
        <Button
          active={tab == 3 ? true : false}
          onClick={() => setTab(3)}
          text="Licenses & Certificate"
        />
        <Button
          active={tab == 4 ? true : false}
          onClick={() => setTab(4)}
          text="Skills & Knowladge"
        />
        <Button
          active={tab == 5 ? true : false}
          onClick={() => setTab(5)}
          text="Location"
        />
        <Button
          active={tab == 6 ? true : false}
          onClick={() => setTab(6)}
          text="Other Information"
        />
      </Col>
      <Col span={24}>
        {tab == 1 ? (
          <NavTabContent theme={theme}>
            <div>
              <div className="flex justify-end">
                <button
                  type="button"
                  style={{ border: 0, background: "transparent" }}
                >
                  {theme ? <Delete /> : <DeleteDark />}
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p style={textStyles}>
                    We must fill this position urgently. Can you start
                    immediately?
                  </p>
                </div>
                <RadioCustome
                  defaultChecked={false}
                  theme={theme}
                  name="grop1"
                  label="YES"
                />
                <RadioCustome
                  defaultChecked={true}
                  theme={theme}
                  name="grop1"
                  label="NO"
                />
              </div>
              <div className="flex justify-end">
                <CheckBoxItem
                  styles={{ fontSize: 9, paddingTop: 3 }}
                  theme={theme}
                  label="Must-have qualification"
                  name="remember_me"
                />
              </div>
            </div>
          </NavTabContent>
        ) : tab == 2 ? (
          <NavTabContent theme={theme}>
            <div>
              <div className="flex justify-end">
                <button
                  type="button"
                  style={{ border: 0, background: "transparent" }}
                >
                  {theme ? <Delete /> : <DeleteDark />}
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p style={textStyles} className="flex">
                    <span>Have you completed the</span>
                    <SelectItem
                      theme={theme}
                      placeholder="Select the Education level"
                      options={options}
                    />
                    <span style={{ position: "relative", left: "-20px" }}>
                      or higher?
                    </span>
                  </p>
                </div>
                <RadioCustome theme={theme} name="grop1" label="YES" />
                <RadioCustome
                  defaultChecked={true}
                  theme={theme}
                  name="grop1"
                  label="NO"
                />
              </div>
              <div className="flex justify-end">
                <CheckBoxItem
                  styles={{ fontSize: 9, paddingTop: 3 }}
                  theme={theme}
                  label="Must-have qualification"
                  name="remember_me"
                />
              </div>
            </div>
          </NavTabContent>
        ) : tab == 3 ? (
          <NavTabContent theme={theme}>
            <div>
              <div className="flex justify-end">
                <button
                  type="button"
                  style={{ border: 0, background: "transparent" }}
                >
                  {theme ? <Delete /> : <DeleteDark />}
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p style={textStyles}>
                    Do you have a valid driver's license?
                  </p>
                </div>
                <div className="flex justify-between w-25">
                  <RadioCustome theme={theme} name="grop1" label="YES" />
                  <RadioCustome
                    checked={true}
                    theme={theme}
                    name="grop1"
                    label="NO"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <CheckBoxItem
                  styles={{ fontSize: 9, paddingTop: 3 }}
                  theme={theme}
                  label="Must-have qualification"
                  name="remember_me"
                />
              </div>
            </div>
          </NavTabContent>
        ) : tab == 4 ? (
          <NavTabContent theme={theme}>
            <div>
              <div className="flex justify-end">
                <button
                  type="button"
                  style={{ border: 0, background: "transparent" }}
                >
                  {theme ? <Delete /> : <DeleteDark />}
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <div style={textStyles} className="flex">
                    <span>
                      How many years of work experience do you have using
                    </span>
                    <SelectItem
                      border={false}
                      theme={theme}
                      placeholder="Tool or Technology"
                      showLabel={false}
                      column={false}
                      background="#f2f2f8"
                      paddingLeft={0}
                      margin={false}
                      customeStyle={{
                        marginTop: -16,
                        height: 54,
                      }}
                      minWidth={190}
                    />
                    <span style={{ position: "relative", left: "-20px" }}>
                      ?
                    </span>
                    <LineInput />
                  </div>
                </div>
                <div>
                  <CheckBoxItem theme={theme} name="remember_me" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <div style={textStyles} className="flex">
                    <span>How many years of</span>
                    <SelectItem
                      border={false}
                      theme={theme}
                      placeholder="Industy"
                      showLabel={false}
                      column={false}
                      background="#f2f2f8"
                      paddingLeft={0}
                      margin={false}
                      customeStyle={{
                        marginTop: -16,
                        height: 54,
                      }}
                      minWidth={115}
                      widthContainer={110}
                    />
                    <span style={{ position: "relative", left: "-20px" }}>
                      experience do you currently have?
                    </span>
                    <LineInput />
                  </div>
                </div>
                <div>
                  <CheckBoxItem theme={theme} name="remember_me" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <div style={textStyles} className="flex">
                    <span>What is your level of proficiency in </span>
                    <SelectItem
                      border={false}
                      theme={theme}
                      placeholder="Language"
                      showLabel={false}
                      column={false}
                      background="#f2f2f8"
                      paddingLeft={0}
                      margin={false}
                      customeStyle={{
                        marginTop: -16,
                        height: 54,
                      }}
                      minWidth={130}
                      widthContainer={105}
                    />
                    <div
                      style={{ position: "relative", left: "0px" }}
                      className="flex"
                    >
                      <span>?</span>
                      <SelectItem
                        border={false}
                        theme={theme}
                        placeholder="proficiency"
                        showLabel={false}
                        column={false}
                        background="#f2f2f8"
                        paddingLeft={0}
                        margin={false}
                        customeStyle={{
                          marginTop: -16,
                          height: 54,
                        }}
                        minWidth={135}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <CheckBoxItem theme={theme} name="remember_me" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div style={textStyles} className="flex">
                  <span>How many years of</span>
                  <SelectItem
                    border={false}
                    theme={theme}
                    placeholder="Job Function"
                    showLabel={false}
                    column={false}
                    background="#f2f2f8"
                    paddingLeft={0}
                    margin={false}
                    customeStyle={{
                      marginTop: -16,
                      height: 54,
                    }}
                    minWidth={150}
                    widthContainer={140}
                  />
                  <span style={{ position: "relative", left: "-20px" }}>
                    experience do you currently have?
                  </span>
                  <LineInput />
                </div>
                <div>
                  <CheckBoxItem theme={theme} name="remember_me" />
                </div>
              </div>
            </div>
          </NavTabContent>
        ) : tab == 5 ? (
          <Row className="w-100">
            <Col md={6}>
              <SelectItem
                border={false}
                theme={theme}
                placeholder="United States"
                showLabel={true}
                label="Country"
                column={true}
                background="#f2f2f8"
                paddingLeft={0}
                margin={false}
                customeStyle={{
                  marginTop: 7,
                  height: 54,
                }}
              />
            </Col>
            <Col md={6}>
              <SelectItem
                border={false}
                theme={theme}
                placeholder="Select State"
                showLabel={true}
                label="State"
                column={true}
                background="#f2f2f8"
                paddingLeft={0}
                margin={false}
                customeStyle={{
                  marginTop: 7,
                  height: 54,
                }}
              />
            </Col>
            <Col span={24} className="mt-3">
              <InputItem
                label="Street Address"
                type="text"
                placeholder="Street Address"
                theme={theme}
              />
            </Col>
          </Row>
        ) : null}
      </Col>
      <Col span={24} className="mt-5 flex justify-end">
        <SaveButton
          theme={theme}
          onClickLeft={() => setModalTab("3")}
          onClickRight={() => {}}
          leftText="Back step"
          rightText="Submit"
        />
      </Col>
    </Row>
  );
}
