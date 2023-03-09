import React from "react";
import { Button, Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/ResumeSignup.module.scss";
export default function StepButton({ icon, title, text }) {
  return (
    <Button className={Styles.lightButtonStep}>
      <div>
        <div className="flex justify-center">{icon}</div>
        <div>
          <p className={Styles.lightTitle}>{title}</p>
        </div>
        <div>
          <p className={Styles.lightText}>{text}</p>
        </div>
      </div>
    </Button>
  );
}
