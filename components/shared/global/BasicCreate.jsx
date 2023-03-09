import React from "react";
import { Input, Form, Button, Spin } from "antd";
import Styles from "/styles/scss/dashboard/BasicCreate.module.scss";
import SaveIcon from "../../../public/assets/images/svgs/save-icon.svg";
import Error from "../Error";
export default function BasicCreate({
  placeholder,
  theme,
  disabledButton,
  handleAddBasic,
  setBasicInputs,
  basicInputs,
  isWrong,
  help,
}) {
  return (
    <Form.Item className="wrapper-social-input">
      <Input.Group compact>
        <Form.Item
          validateStatus={isWrong ? "error" : null}
          help={isWrong ? <Error text={help} /> : null}
          noStyle
        >
          <Input
            onChange={(e) =>
              setBasicInputs((prev) => {
                return { ...prev, basic: e.target.value };
              })
            }
            value={basicInputs.basic}
            className={theme ? Styles.lightInput : Styles.darkInput}
            placeholder={placeholder}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            disabled={disabledButton}
            onClick={handleAddBasic}
            className={Styles.button}
          >
            {disabledButton ? (
              <Spin />
            ) : (
              <div className="flex justify-center">
                <SaveIcon />
              </div>
            )}
          </Button>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  );
}
