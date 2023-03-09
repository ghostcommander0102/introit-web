import React from "react";
import { Button, Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/Activation.module.scss";
import ImageBack from "/public/assets/images/svgs/activation/dart.svg";
import ImageDarkBack from "/public/assets/images/svgs/activation/dart-dark.svg";
export default function ActivationContent({
  theme,
  handleGoHome,
  handleGoLogin,
}) {
  return (
    <div>
      <div className={Styles.wrapper}>
        <div className={Styles.wrapperImg}>
          {theme ? <ImageBack /> : <ImageDarkBack />}
        </div>
        <div>
          <div>
            <p className={theme ? Styles.bigTextLight : Styles.bigTextDark}>
              Congratulations !!!!
            </p>
            <p className={theme ? Styles.litleTextLight : Styles.litleTextDark}>
              Your account has been activated
            </p>
          </div>
          <div>
            <Row className="relative" style={{ zIndex: 2 }}>
              <Col span={24} className="flex  justify-center">
                <div>
                  <Button
                    className={theme ? Styles.lightGrayBtn : Styles.darkGrayBtn}
                    onClick={handleGoHome}
                  >
                    Home
                  </Button>
                  <Button
                    className={theme ? Styles.lightSaveBtn : Styles.darkSaveBtn}
                    onClick={handleGoLogin}
                  >
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: theme
            ? "url(/assets/images/svgs/activation/right-top.svg)"
            : "url(/assets/images/svgs/activation/right-top-dark.svg)",
        }}
        className={Styles.rightTop}
      ></div>
      <div
        style={{
          backgroundImage: theme
            ? 'url("/assets/images/svgs/activation/left-top.svg")'
            : 'url("/assets/images/svgs/activation/left-top-dark.svg")',
        }}
        className={Styles.leftTop}
      ></div>
      <div
        style={{
          backgroundImage: theme
            ? 'url("/assets/images/svgs/activation/left-bottom.svg")'
            : 'url("/assets/images/svgs/activation/left-bottom-dark.svg")',
        }}
        className={Styles.leftBottom}
      ></div>
      <div
        style={{
          backgroundImage: theme
            ? 'url("/assets/images/svgs/activation/right-bottom.svg")'
            : 'url("/assets/images/svgs/activation/right-bottom-dark.svg")',
        }}
        className={Styles.rightBottom}
      ></div>
    </div>
  );
}
