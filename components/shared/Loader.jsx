import React from "react";
import ImgLoader from "/public/assets/images/svgs/loader-icon.svg";
import PuffLoader from "react-spinners/PuffLoader";
import * as Spinner from "/styles/scss/dashboard/Loader.module.scss";
export default function Loader({ loading }) {
  return (
    <div className={Spinner.wrapper}>
      <PuffLoader color="#6e7191" loading={loading} size={150} />
      <div style={{ position: "absolute" }}>
        <ImgLoader />
      </div>
    </div>
  );
}
