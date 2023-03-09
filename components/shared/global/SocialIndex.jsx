import React from "react";
import SettingSocialContent from "./SocialContent";
import SocialModal from "./SocialModal";
export default function SocialIndex({
  handleShowCreateModal,
  globalSettingTranslate,
  theme,
  socials,
  setSocialsInputs,
  socialsInputs,
  handleCreateSocial,
  handleDeleteSocial,
  handleShowSocial,
  handleUpdateSocial,
  errors,
  setVisible,
  visible,
  isUpdatedSocial,
  handleChangeTab,
  tab,
}) {
  return (
    <>
      <SettingSocialContent
        tab={tab}
        handleChangeTab={handleChangeTab}
        handleShowCreateModal={handleShowCreateModal}
        globalSettingTranslate={globalSettingTranslate}
        theme={theme}
        socials={socials}
        setSocialsInputs={setSocialsInputs}
        socialsInputs={socialsInputs}
        handleCreateSocial={handleCreateSocial}
        handleDeleteSocial={handleDeleteSocial}
        handleShowSocial={handleShowSocial}
        handleUpdateSocial={handleUpdateSocial}
        errors={errors}
      />
      <SocialModal
        handleClose={() => setVisible(false)}
        theme={theme}
        visible={visible}
        globalSettingTranslate={globalSettingTranslate}
        setSocialsInputs={setSocialsInputs}
        socialsInputs={socialsInputs}
        errors={errors}
        isUpdatedSocial={isUpdatedSocial}
        onFinish={isUpdatedSocial ? handleUpdateSocial : handleCreateSocial}
      />
    </>
  );
}
