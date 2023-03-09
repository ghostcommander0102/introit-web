import React from "react";
import Styles from "/styles/scss/dashboard/Lock.module.scss";
import Shield from "../../public/assets/images/svgs/shield.svg";
import { Button } from "antd";
export default function LockContent({ theme, router }) {
  console.log("theme", theme);
  return (
    <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
      <div className="flex justify-center">{<Shield />}</div>
      <p className={theme ? Styles.lightText : Styles.darkText}>
        You do not have access to this area !
      </p>
      <Button
        onClick={() => router.replace("/profile")}
        className={Styles.button}
      >
        Back to home
      </Button>
    </div>
  );
}
