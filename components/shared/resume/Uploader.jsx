import { Button, Upload } from "antd";
import React from "react";
import Styles from "/styles/scss/dashboard/Uploader.module.scss";
import UploadIcon from "/public/assets/images/svgs/portfolio-upload-icon.svg";
export default function Uploader({ fileList, setFilelist, text }) {
  return (
    <Upload
      fileList={fileList}
      multiple={true}
      showUploadList={false}
      className={Styles.wrapper}
      onChange={({ fileList }) => setFilelist(fileList)}
    >
      <Button className={Styles.button}>
        <UploadIcon />
        <span className="pl-2"> {text}</span>
      </Button>
    </Upload>
  );
}
