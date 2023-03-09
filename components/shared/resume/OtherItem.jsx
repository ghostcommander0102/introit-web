import React from "react";
import { Col, Row } from "antd";
import DividerItem from "./DividerItem";
import Styles from "../../../styles/scss/dashboard/OtherItem.module.scss";
import ButtonOther from "./ButtonOther";
export default function OtherItem({ theme, existInputs, setExistInputs }) {
  return (
    <Row>
      <Col span={24} className="flex justify-center">
        <DividerItem content={"Other information"} theme={theme} />
      </Col>
      <Col span={24} className="flex justify-center">
        <p className={theme ? Styles.lightText : Styles.darkText}>
          You can add other items of your resume from the section below.
        </p>
      </Col>
      <Col span={24} className="flex flex-wrap">
        {existInputs["skill"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, skill: { exist: true, show: false } };
              })
            }
            text="Skill"
          />
        ) : null}
        {existInputs["language"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, language: { exist: true, show: false } };
              })
            }
            text="Languages"
          />
        ) : null}
        {existInputs["expertise"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, expertise: { exist: true, show: false } };
              })
            }
            text="Expertise"
          />
        ) : null}
        {existInputs["portfolio"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, portfolio: { exist: true, show: false } };
              })
            }
            text="Portfolio"
          />
        ) : null}
        {existInputs["extra"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, extra: { exist: true, show: false } };
              })
            }
            text="Extra-curricular Activities"
          />
        ) : null}
        {existInputs["courses"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, courses: { exist: true, show: false } };
              })
            }
            text="Courses"
          />
        ) : null}
        {existInputs["internship"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, skill: { exist: true, show: false } };
              })
            }
            text="Internships"
          />
        ) : null}
        {existInputs["reference"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, Internships: { exist: true, show: false } };
              })
            }
            text="References"
          />
        ) : null}
        {existInputs["hobbies"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, hobbies: { exist: true, show: false } };
              })
            }
            text="Hobbies"
          />
        ) : null}
        {existInputs["additionalInfo"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return {
                  ...prev,
                  additionalInfo: { exist: true, show: false },
                };
              })
            }
            text="Additional information"
          />
        ) : null}
        {existInputs["publications"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, publications: { exist: true, show: false } };
              })
            }
            text="Publications"
          />
        ) : null}
        {existInputs["award"].show ? (
          <ButtonOther
            onClick={() =>
              setExistInputs((prev) => {
                return { ...prev, award: { exist: true, show: false } };
              })
            }
            text="Honors & Awards"
          />
        ) : null}
      </Col>
    </Row>
  );
}
