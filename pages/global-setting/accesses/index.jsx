import React, { useState, useEffect } from "react";
import Authenticated from "layouts/Authenticated";
import UserLayout from "layouts/UserLayout";
import { Theme } from "atoms/Theme";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { http } from "utils/http";
import { Role } from "atoms/global/Role";
import useToast from "hooks/useToast";
import { Errors } from "atoms/Errors";
import { GlobalSettings } from "atoms/translate/GlobalSettings";
import SettingRoleContent from "components/shared/global/SettingRoleContent";
import RoleModal from "components/shared/global/RoleModal";
import Authorization from "layouts/Authorization";
export default function Index() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [role, setRole] = useRecoilState(Role);

  const [errors, setErrors] = useRecoilState(Errors);

  const [globalSettingTranslate, setGlobalSettingTranslate] =
    useRecoilState(GlobalSettings);
  //***************************
  // define state
  //***************************
  const [translateTarget] = useState("");
  const [visibleRole, setVisibleRole] = useState(false);
  const [, setIsCreateRole] = useState(false);
  const [inputsRole, setInputsRole] = useState({ name: "" });
  const [isEditRole, setIsEditRole] = useState(false);
  const [editId, setEditId] = useState("");
  const [translateSetting, setTranslateSetting] = useState({
    transalteTo: null,
    category: "basic",
    section: null,
    sectionName: "",
  });
  //***************************
  // define function
  //***************************

  const handleOpenRoleModalEdit = (id, name) => {
    setIsEditRole(true);
    setEditId(id);
    setVisibleRole(true);
    setInputsRole((prev) => {
      return { ...prev, name: name };
    });
  };
  const handleOpenRoleModal = () => {
    setVisibleRole(true);
    setInputsRole({ name: "" });
    setErrors([]);
    setIsEditRole(false);
    setEditId("");
  };
  const handleCloseRoleModal = () => {
    setVisibleRole(false);
  };

  // Start Role
  const handleSetDefaultRole = (id) => {
    http().DefaultRole(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleGetRoleList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetRoleList = () => {
    http().RoleList(
      ({ data }) => {
        if (data.status == 1) {
          setRole(data?.roles);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateRole = () => {
    http().RoleCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetRoleList();
          setErrors([]);
          handleCloseRoleModal();
        }
        if (data.status == -1) {
          toast({ message: data.message, type: "error" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        }
      },
      {
        title: inputsRole.name,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleEditRole = () => {
    http().RoleEdit(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetRoleList();
          setErrors([]);
          setIsEditRole(false);
          setEditId("");
          handleCloseRoleModal();
          setIsCreateRole(false);
        }
      },
      { id: editId, title: inputsRole.name },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeleteRole = (id) => {
    http().RoleDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetRoleList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Role

  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setGlobalSettingTranslate(obj);
      },
      51,
      (err) => {
        console.log(err);
      }
    );
  };

  //***************************
  // define useEffect
  //***************************
  const handleChangeRouteRole = (id) => {
    router.replace({
      pathname: `/global-setting/accesses/[id]`,
      query: { id: id },
    });
  };
  //***************************
  // define useEffect
  //***************************
  useEffect(async () => {
    await Promise.all([
      handleGetRoleList(),
      handleGetTranslateLayout(),
    ]).finally(() => {
      console.log("finally");
    });
  }, []);

  useEffect(() => {
    if (
      translateSetting.section != null &&
      translateSetting.transalteTo != null
    )
      handleGetSingleTable();
  }, [translateSetting.section, translateSetting.transalteTo]);

  useEffect(() => {
    setTranslateSetting((prev) => {
      return { ...prev, transalteTo: translateTarget };
    });
  }, [translateTarget]);
  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout hasSubSidebar={false} hasRadius={false} title="translation">
        <Authorization>
          <SettingRoleContent
            handleOpenRoleModal={handleOpenRoleModal}
            globalSettingTranslate={globalSettingTranslate}
            handleOpenRoleModalEdit={handleOpenRoleModalEdit}
            isEditRole={isEditRole}
            role={role}
            visibleRole={visibleRole}
            handleCloseRoleModal={handleCloseRoleModal}
            theme={theme?.light}
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
            theme={theme.light}
            visible={visibleRole}
            handleClose={handleCloseRoleModal}
          />
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
