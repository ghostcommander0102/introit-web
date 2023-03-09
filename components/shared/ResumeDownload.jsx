import React from "react";
import { Button } from "antd";
import Styles from "../../styles/scss/dashboard/ResumeDownload.module.scss";
import Download from "/public/assets/images/svgs/download.svg";
export default function ResumeDownload() {
  return (
    <Button className={Styles.wrapper}>
      <Download />
    </Button>
  );
}
