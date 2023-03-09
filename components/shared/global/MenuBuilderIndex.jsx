import React from "react";
import MenuBuilderContent from "./MenuBuilderContent";
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
    <MenuBuilderContent
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
  );
}
