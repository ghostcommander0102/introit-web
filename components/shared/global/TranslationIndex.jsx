import React from "react";
import TransalteList from "../TranslateList";
import TranslationModal from "./TranslationModal";
export default function TranslationIndex({
  handleDeletTranslate,
  handleLiveLanguage,
  translateTarget,
  setTranslateTarget,
  setTranslateIsCreate,
  translateIsCraete,
  languageTranslateList,
  languagesList,
  setTranslateSetting,
  translateSetting,
  translateSection,
  translateInputs,
  setTranslateInputs,
  handleTranslate,
  theme,
  globalSettingTranslate,
  handleCloseTranslate,
  errors,
  handleChangeTab,
  handleShowModalVisible,
  translationId,
  setTranslationId,
  visible,
  setVisible,
  handleAddLanguage,
  tab,
}) {
  return (
    <>
      <TransalteList
        tab={tab}
        handleChangeTab={handleChangeTab}
        handleDeletTranslate={handleDeletTranslate}
        handleLiveLanguage={handleLiveLanguage}
        translateTarget={translateTarget}
        setTranslateTarget={setTranslateTarget}
        setTranslateIsCreate={setTranslateIsCreate}
        translateIsCraete={translateIsCraete}
        languageTranslateList={languageTranslateList}
        languagesList={languagesList}
        setTranslateSetting={setTranslateSetting}
        translateSetting={translateSetting}
        translateSection={translateSection}
        translateInputs={translateInputs}
        setTranslateInputs={setTranslateInputs}
        handleTranslate={handleTranslate}
        theme={theme}
        globalSettingTranslate={globalSettingTranslate}
        handleCloseTranslate={handleCloseTranslate}
        errors={errors}
        handleShowModalVisible={handleShowModalVisible}
      />
      <TranslationModal
        theme={theme}
        translationId={translationId}
        setTranslationId={setTranslationId}
        visible={visible}
        languagesList={languagesList}
        handleClose={() => setVisible(false)}
        globalSettingTranslate={globalSettingTranslate}
        onFinish={handleAddLanguage}
      />
    </>
  );
}
