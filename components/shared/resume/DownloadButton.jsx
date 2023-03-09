import React from "react";
import { Button, Spin } from "antd";
import Styles from "/styles/scss/dashboard/ResumeEditor.module.scss";
import moment from "moment";
export default function DownloadButton({ disabled, onClick, cvTarget, cv }) {
  return (
    <Button onClick={onClick} disabled={disabled} className={Styles.download}>
      {disabled ? <Spin /> : "Download resume"}
    </Button>
  );
  // return (
  //   <a
  //     download={`${moment()}.pdf`}
  //     href={`http://app.introit.io/api/pdf?targetCv=${
  //       cvTarget.name + "-" + cvTarget.style
  //     }&targetEmail=${cv?.email}`}
  //   >
  //     <Button disabled={disabled} className={Styles.download}>
  //       {disabled ? <Spin /> : "Download resume"}
  //     </Button>
  //   </a>
  // );
}
