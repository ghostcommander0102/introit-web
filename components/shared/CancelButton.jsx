import { Button } from "antd";
import React from "react";
import Cancel from "/public/assets/images/svgs/cancel-role.svg";
import Styles from "/styles/scss/dashboard/CancelButton.module.scss";
export default function CancelButton({
  theme,
  hasText = true,
  onClick,
  translator = {},
}) {
  return (
    <Button
      onClick={onClick}
      className={theme ? Styles.lightButton : Styles.lightButton}
    >
      <span className="pr-2">
        <Cancel />
      </span>
      {hasText ? <span>{translator["cancel"]?.title}</span> : null}
    </Button>
  );
}
