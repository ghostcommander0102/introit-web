import React from "react";
import RoleModal from "./RoleModal";
import SettingRoleContent from "./SettingRoleContent";
export default function RolesIndex({
  handleOpenRoleModal,
  globalSettingTranslate,
  handleOpenRoleModalEdit,
  isEditRole,
  role,
  visibleRole,
  handleCloseRoleModal,
  theme,
  handleCreateRole,
  inputsRole,
  setInputsRole,
  handleEditRole,
  errors,
  handleDeleteRole,
  handleSetDefaultRole,
  handleChangeRouteRole,
  handleChangeTab,
  tab,
  router,
}) {
  return (
    <>
      <SettingRoleContent
        tab={tab}
        router={router}
        handleChangeTab={handleChangeTab}
        handleOpenRoleModal={handleOpenRoleModal}
        globalSettingTranslate={globalSettingTranslate}
        handleOpenRoleModalEdit={handleOpenRoleModalEdit}
        isEditRole={isEditRole}
        role={role}
        visibleRole={visibleRole}
        handleCloseRoleModal={handleCloseRoleModal}
        theme={theme}
        handleCreateRole={handleCreateRole}
        inputsRole={inputsRole}
        setInputsRole={setInputsRole}
        handleEditRole={handleEditRole}
        errors={errors}
        handleDeleteRole={handleDeleteRole}
        handleSetDefaultRole={handleSetDefaultRole}
        handleChangeRouteRole={handleChangeRouteRole}
      />
      <RoleModal
        globalSettingTranslate={globalSettingTranslate}
        isEditRole={isEditRole}
        handleEditRole={handleEditRole}
        errors={errors}
        handleCreateRole={handleCreateRole}
        inputsRole={inputsRole}
        setInputsRole={setInputsRole}
        theme={theme}
        visible={visibleRole}
        handleClose={handleCloseRoleModal}
      />
    </>
  );
}
