import React from "react";
import { Col, Modal, Row, Button } from "antd";
import SelectItem from "./form/SelectItem";
import CustomeButton from "./CustomeButton";
import Close from "/public/assets/images/svgs/close-icon.svg";
import Styles from "/styles/scss/dashboard/Modal.module.scss";
export default function CandiModal({ visible, handleClose, theme }) {
  //***************************
  // define state
  //***************************
  const optionsTitle = [{ value: "Job Title", label: "Job Title" }];
  const optionsLang = [{ value: "German", label: "German" }];
  const optionsLevel = [{ value: "Bachelors", label: "Bachelors" }];
  const optionsIndustry = [{ value: "Industry", label: "Industry" }];
  const optionsSalary = [{ value: "Salary Range", label: "Salary Range" }];
  const optionsLocation = [{ value: "Location", label: "Location" }];
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={900}
    >
      <Button
        className={theme ? Styles.closeLight : Styles.closeDark}
        onClick={handleClose}
      >
        <Close />
      </Button>
      <Row className="mt-5 container-custome px-10 pb-10">
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            placeholder="Job Title"
            options={optionsTitle}
            showLabel={true}
            label="Job Title"
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
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            placeholder="Language"
            options={optionsLang}
            showLabel={true}
            label="Language"
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
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            options={optionsLevel}
            showLabel={true}
            placeholder="Academic Level"
            label="Academic Level"
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
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            placeholder="Industry"
            options={optionsIndustry}
            showLabel={true}
            label="Industry"
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
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            placeholder="Salary Range"
            options={optionsSalary}
            showLabel={true}
            label="Salary Range"
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
        <Col span={12} className="px-3">
          <SelectItem
            border={false}
            theme={theme}
            placeholder="Location"
            options={optionsLocation}
            showLabel={true}
            label="Location"
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
      </Row>
      <Row className="mt-5 px-10">
        <Col span={24} className="flex justify-between px-3">
          <CustomeButton
            styles={{
              color: "#6E7191",
              backgroundColor: theme ? "#F2F2F8" : "#292A3A",
            }}
            onClick={handleClose}
            text="Reset All"
          />
          <CustomeButton
            onClick={handleClose}
            styles={{ color: "#F2F2F8", backgroundColor: "#3869FF" }}
            text="Show 57 Results"
          />
        </Col>
      </Row>
    </Modal>
  );
}
