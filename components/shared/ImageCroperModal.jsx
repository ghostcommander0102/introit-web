import React, { useCallback, useState } from "react";
import { Button, Slider, Upload, Modal, Row, Col, Spin } from "antd";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Cropper from "react-easy-crop";
import Close from "/public/assets/images/svgs/close-icon.svg";
import UploadIcon from "/public/assets/images/svgs/upload-icon.svg";
import UploadDarkIcon from "/public/assets/images/svgs/dark/upload-icon.svg";
import Dragger from "antd/lib/upload/Dragger";
import EmptyPerson from "/public/assets/images/svgs/empty-person-icon.svg";
import EmptyPersonDark from "/public/assets/images/svgs/dark/empty-person-icon.svg";
import Styles from "/styles/scss/dashboard/ImageCroper.module.scss";
import getCroppedImg from "/utils/GenerateCropImage";
import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
export default function ImageCroperModal({
  disabledButton,
  visible = true,
  handleClose,
  theme,
  handleChangeAvatar,
  yourImage,
  setYourImage,
  setStep,
  step,
  zoom,
  setZoom,
  rotate,
  setRotate,
  currentUser = {},
  isProf,
  myProfileTranslate = {},
}) {
  //***************************
  // define useState
  //***************************
  const [crop, setCrop] = useState({ x: 10, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const marks = {
    "-45": "-45°",
    "-30": "-30°",
    "-15": "-15°",
    "+0": "0°",
    "+15": "+15°",
    "+30": "+30°",
    "+45": "+45°",
  };

  //***************************
  // define function
  //***************************
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const handlePreview = async (file) => {
    const image = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    setYourImage(await image);
    setStep(2);
  };
  const handleDecreaseRotate = () => {
    // setRotate(rotate - 90);
  };
  const handleIncreaseRotate = () => {
    // setRotate(rotate + 90);
  };
  const handleChangeRotate = (value) => {
    setRotate(value);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        yourImage,
        croppedAreaPixels,
        rotate
      );
      handleChangeAvatar(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={900}
    >
      <div className="md:block hidden">
        <Button
          onClick={handleClose}
          className={theme ? ModalStyles.lightClose : ModalStyles.darkClose}
        >
          <Close />
        </Button>
      </div>
      <div className="md:hidden block">
        <Button onClick={handleClose} className={ModalStyles.mobileClose}>
          <Close />
        </Button>
      </div>
      {step == 1 ? (
        <Row className="px-5 pt-5">
          <Col md={{ span: 24 }} span={24}>
            <Dragger
              className={theme ? Styles.lightWrapper : Styles.darkWrapper}
              showUploadList={false}
              onChange={({ file }) => handlePreview(file.originFileObj)}
            >
              <div className="pt-10 flex justify-center">
                {isProf == "banner" ? (
                  theme ? (
                    <EmptyPerson />
                  ) : (
                    <EmptyPersonDark />
                  )
                ) : isEmpty(currentUser?.avatar) ? (
                  <div className={Styles.wrapperPlaceHolder}>
                    {currentUser?.givenName && currentUser?.givenName[0]}
                    {currentUser?.familyName && currentUser?.familyName[0]}
                  </div>
                ) : (
                  <div className={Styles.imgWrapper}>
                    <ImageProvider
                      src={currentUser?.avatar}
                      width={120}
                      height={120}
                    />
                  </div>
                )}
              </div>
              <p
                className={`${
                  theme ? Styles.lightText : Styles.darkText
                } py-10`}
              >
                {myProfileTranslate["drag-and-drop-or-select-a-photo"]?.title}
              </p>
              <Button className={Styles.button}>
                {myProfileTranslate["choose-image"]?.title}
              </Button>
              <p
                className={`${
                  theme ? Styles.lightText : Styles.darkText
                } py-10`}
              >
                {myProfileTranslate["supported-formats:-jpeg-and-png"]?.title}
              </p>
            </Dragger>
          </Col>
        </Row>
      ) : step == 2 ? (
        <Row className="md:pt-5 pt-3">
          <Col
            md={{ span: 24 }}
            span={24}
            className={`md:mb-4 mb-2 text-center ${
              theme ? Styles.lightText : Styles.darkText
            }`}
          >
            <p>{myProfileTranslate["drag-to-reposition-photo"]?.title}</p>
          </Col>
          <Col md={{ span: 24 }} span={24}>
            <div className="flex justify-center px-5">
              <Cropper
                zoomWithScroll={false}
                style={{
                  containerStyle: {
                    position: "relative",
                    width: isProf == "banner" ? 390 : 290,
                    height: 290,
                    border: "2px solid #C6C2DE",
                    borderRadius: 8,
                  },
                  cropAreaStyle: {
                    color: "rgb(195, 194 ,194,49%)",
                  },
                  mediaStyle: {
                    width: "100%",
                  },
                }}
                aspect={isProf == "banner" ? 4 / 2 : 2 / 2}
                image={yourImage}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                rotation={rotate}
              />
            </div>
          </Col>
          <Col
            md={{ span: 12 }}
            className={`mx-auto mt-3 md:px-0 px-2 ${Styles.wrapperRotation}`}
          >
            <p
              className={
                theme ? Styles.lightRotationText : Styles.darkRotationText
              }
            >
              {myProfileTranslate["straighten"]?.title}
            </p>
            <div className="flex w-100">
              {/* <Button
                onClick={() => handleDecreaseRotate()}
                className={
                  theme ? Styles.lightRotationButton : Styles.darkRotationButton
                }
              >
                <span>-90°</span>
                <span>{theme ? <RotationLeft /> : <RotationDarkLeft />}</span>
              </Button> */}
              <div className="w-full">
                <Slider
                  className="slider-croper"
                  tooltipVisible={false}
                  marks={marks}
                  step={1}
                  min={-45}
                  max={45}
                  included={false}
                  defaultValue={0}
                  onChange={(value) => handleChangeRotate(value)}
                />
              </div>
              {/* <Button
                onClick={() => handleIncreaseRotate()}
                className={
                  theme ? Styles.lightRotationButton : Styles.darkRotationButton
                }
              >
                <span>+90°</span>
                <span>{theme ? <RotationRight /> : <RotationDarkRight />}</span>
              </Button> */}
            </div>
          </Col>

          <div className={Styles.zoomWrapper}>
            <p className={theme ? Styles.lightTextZoom : Styles.darkTextZoom}>
              {myProfileTranslate["zoom"]?.title}
            </p>
            <span className={theme ? Styles.lightTop : Styles.darkTop}>1x</span>
            <span className={theme ? Styles.lightBottom : Styles.darkBottom}>
              3x
            </span>
            <Slider
              tooltipVisible={false}
              className="slider-vertical-croper"
              included={false}
              min={1}
              max={3}
              step="0.1"
              defaultValue={0}
              vertical={true}
              onChange={(val) => setZoom(val)}
            />
          </div>

          <Col
            md={{ span: 24 }}
            span={24}
            className="md:block hidden mt-4 px-5"
          >
            <div className="flex justify-center items-center">
              <Upload
                showUploadList={false}
                onChange={({ file }) => handlePreview(file.originFileObj)}
              >
                <Button
                  className={theme ? Styles.lightUpload : Styles.darkUpload}
                >
                  {myProfileTranslate["upload-new"]?.title}
                  <span className="pl-2">
                    {theme ? <UploadIcon /> : <UploadDarkIcon />}
                  </span>
                </Button>
              </Upload>
              <Button
                className={Styles.saveButton}
                disabled={disabledButton}
                onClick={showCroppedImage}
              >
                {disabledButton ? <Spin /> : myProfileTranslate["save"]?.title}
              </Button>
            </div>
          </Col>
        </Row>
      ) : null}
      <div
        className="md:hidden block"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Upload
          className="wrapper-image-croper w-full"
          showUploadList={false}
          onChange={({ file }) => handlePreview(file.originFileObj)}
        >
          <Button className={theme ? Styles.lightUpload : Styles.darkUpload}>
            {myProfileTranslate["upload-new"]?.title}
            <span className="pl-2">
              {theme ? <UploadIcon /> : <UploadDarkIcon />}
            </span>
          </Button>
        </Upload>
        <Button
          className={Styles.saveButton}
          disabled={disabledButton}
          onClick={showCroppedImage}
        >
          {disabledButton ? <Spin /> : myProfileTranslate["save"]?.title}
        </Button>
      </div>
    </Modal>
  );
}
