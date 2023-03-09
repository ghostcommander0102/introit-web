import React from "react";
import { Button, Modal, Col, Row, Input, Popconfirm } from "antd";
import DividerItem from "./DividerItem";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/AddSocial.module.scss";
import SocialInput from "./form/SocialInput";
import Edit from "../../public/assets/images/svgs/edit-resume-icon.svg";
import EditDark from "../../public/assets/images/svgs/dark/edit-resume-icon.svg";
import Delete from "../../public/assets/images/svgs/delete-resume-icon.svg";
import DeleteDark from "../../public/assets/images/svgs/dark/delete-resume-icon.svg";
import ImageProvider from "providers/ImageProvider";
export default function AddSocialModal({
  visible,
  handleClose,
  theme,
  socialsRecil,
  handleCreateSocial,
  socialsInputs,
  setSocialsInputs,
  setSingleSocialInputs,
  singleSocialInput,
  handleDeleteSocial,
  handleGetSingleSocial,
  handleUpdateSocial,
  disabledButton,
  myProfileTranslate = {},
}) {
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
      <Row className="md:mx-10 mx-0 py-10 md:px-10 px-2">
        <Col span={24} className="mb-3">
          <DividerItem
            content={myProfileTranslate["social-link"]?.title}
            theme={theme}
          />
        </Col>
        {socialsInputs?.length >= 5 ? null : (
          <Col span={24}>
            <SocialInput
              myProfileTranslate={myProfileTranslate}
              disabledButton={disabledButton}
              theme={theme}
              setSocialsInputs={setSocialsInputs}
              handleCreateSocial={handleCreateSocial}
              option={socialsRecil}
              singleSocialInput={singleSocialInput}
              setSingleSocialInputs={setSingleSocialInputs}
            />
          </Col>
        )}
        <Col span={24}>
          <Row>
            {socialsInputs?.map((item, key) => {
              return (
                <Col key={key} span={24} className={Styles.master}>
                  <div
                    className={theme ? Styles.lightWrapper : Styles.darkWrapper}
                  >
                    <div className="flex justify-center w-full">
                      <div className={Styles.name}>
                        <ImageProvider
                          width={20}
                          height={20}
                          src={item?.icon}
                        />
                      </div>
                      <div className="w-full pl-5">
                        <Input
                          disabled={item.disabled}
                          value={item.username}
                          className={
                            theme ? Styles.lightInput : Styles.darkInput
                          }
                          onChange={(e) =>
                            setSocialsInputs((prev) => {
                              const indexItem = prev.findIndex(
                                (prop) => prop.id == item.id
                              );
                              const target = prev[indexItem];
                              target.username = e.target.value;
                              prev[indexItem] = target;
                              return [...prev];
                            })
                          }
                        />
                      </div>
                    </div>
                    {item.isUpdated ? (
                      <div className="flex">
                        <Button
                          onClick={() => handleUpdateSocial(item.id)}
                          className={Styles.buttonSave}
                        >
                          {myProfileTranslate["save"]?.title}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex pr-3">
                        <div className="flex items-center">
                          <Button
                            onClick={() => handleGetSingleSocial(item.id)}
                            className={Styles.button}
                          >
                            {theme ? <Edit /> : <EditDark />}
                          </Button>
                        </div>
                        <div className="flex items-center">
                          <Popconfirm
                            title={
                              myProfileTranslate[
                                "are-you-sure-to-delete-this-item"
                              ]?.title
                            }
                            okText={myProfileTranslate["yes"]?.title}
                            cancelText={myProfileTranslate["no"]?.title}
                            onCancel={() => {}}
                            onConfirm={() => handleDeleteSocial(item.id)}
                          >
                            <Button className={Styles.button}>
                              {theme ? <Delete /> : <DeleteDark />}
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}
