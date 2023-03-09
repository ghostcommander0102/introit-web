import React from "react";
import ColorIcon from "/public/assets/images/svgs/tint-color.svg";
import { BlockPicker } from "react-color";
import Styles from "/styles/scss/dashboard/TintColor.module.scss";
import { Button } from "antd";
import Color from "./Color";
export default function TintColor({
  showPicker,
  handleColorPicker,
  handleShowColorPicker,
  color,
  theme,
  setColor,
}) {
  return (
    <div>
      <div className="flex justify-center">
        <Color onClick={() => setColor("#D9D9D9")} color="#D9D9D9" />
        <Color onClick={() => setColor("#F37070")} color="#F37070" />
        <Color onClick={() => setColor("#15C0AB")} color="#15C0AB" />
        <Color onClick={() => setColor("#555777")} color="#555777" />
        <div className="relative">
          <Button className={Styles.button} onClick={handleShowColorPicker}>
            <ColorIcon />
          </Button>
          {showPicker ? (
            <div className={Styles.wrapper}>
              <BlockPicker color={color} onChangeComplete={handleColorPicker} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center">
        <p className={theme ? Styles.lightText : Styles.darkText}>
          Select your CV template
        </p>
      </div>
    </div>
  );
}
