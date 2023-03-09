import React, { useEffect, useState } from "react";
import ButtonTabBar from "components/shared/ButtonTabBar";
import Authenticated from "layouts/Authenticated";
import Authorization from "layouts/Authorization";
import UserLayout from "layouts/UserLayout";
import Styles from "/styles/scss/common/Pages.module.scss";
import { useRecoilState } from "recoil";
import { Theme } from "atoms/Theme";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { GlobalSettings } from "atoms/translate/GlobalSettings";
import { http } from "utils/http";
import RolesIndex from "components/shared/global/RolesIndex";
import { Role } from "atoms/Role";
import { Errors } from "atoms/Errors";
import SocialIndex from "components/shared/global/SocialIndex";
import { Social } from "atoms/global/Social";
import Progress from "components/shared/Progress";
import TranslationIndex from "components/shared/global/TranslationIndex";
import { LanguageList } from "atoms/translate/LanguageList";
import { TranslateSection } from "atoms/global/TranslateSection";
import { LanguagesList } from "atoms/LanguagesList";
import BasicIndex from "components/shared/global/BasicIndex";
import { Country } from "atoms/global/Country";
import { Currency } from "atoms/global/Currency";
import { Languages } from "atoms/global/Languages";
import MenuBuilderIndex from "components/shared/global/MenuBuilderIndex";
export default function Index() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define recoil state
  //***************************
  const [theme] = useRecoilState(Theme);
  const [role, setRole] = useRecoilState(Role);
  const [errors, setErrors] = useRecoilState(Errors);
  const [percentageInputs, setPercentageInputs] = useState();
  const [socials, setSocials] = useRecoilState(Social);
  const [countries, setCountries] = useRecoilState(Country);
  const [currency, setCurrency] = useRecoilState(Currency);
  const [languages, setLanguages] = useRecoilState(Languages);
  const [languagesList, setLanguageList] = useRecoilState(LanguagesList);
  const [translateSection, setTranslateSection] =
    useRecoilState(TranslateSection);
  const [languageTranslateList, setLanguageTranslateList] =
    useRecoilState(LanguageList);
  const [globalSettingTranslate, setGlobalSettingTranslate] =
    useRecoilState(GlobalSettings);
  //***************************
  // define state
  //***************************
  const [tab, setTab] = useState(1);
  const [translateTarget, setTranslateTarget] = useState("");
  const [visibleRole, setVisibleRole] = useState(false);
  const [, setIsCreateRole] = useState(false);
  const [inputsRole, setInputsRole] = useState({ name: "" });
  const [isEditRole, setIsEditRole] = useState(false);
  const [editId, setEditId] = useState("");
  const [visible, setVisible] = useState(false);
  const [isUpdatedSocial, setIsUpdatedSocial] = useState(false);
  const [translateIsCraete, setTranslateIsCreate] = useState(false);
  const [translateInputs, setTranslateInputs] = useState([]);
  const [translationId, setTranslationId] = useState(null);
  const [socialsInputs, setSocialsInputs] = useState({
    title: null,
    website: null,
    icon: null,
  });
  const [translateSetting, setTranslateSetting] = useState({
    transalteTo: null,
    category: "basic",
    section: null,
    sectionName: "",
  });
  const [countryModal, setCountryModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [countryInputs, setCountryInputs] = useState({
    name: null,
    code: null,
    flag: null,
    prefix: null,
  });
  const [currnecyInputs, setCurrencyInputs] = useState({
    title: null,
    code: null,
    symbol: null,
    name: null,
  });
  const [languagesInputs, setLanguagesInputs] = useState({
    code: null,
    title: null,
    isRtl: null,
  });
  const [isUpdatedCountry, setIsUpdatedCountry] = useState(false);
  const [isUpdatedCurrency, setIsUpdatedCurrency] = useState(false);
  const [isUpdatedLanguages, setIsUpdateLanguages] = useState(false);
  const [languagesModal, setLanguagesModal] = useState(false);
  const [basicTitle, setBasicTitle] = useState(undefined);
  const [basicInputs, setBasicInputs] = useState({ basic: "" });
  const [gendersInputs, setGendersInputs] = useState();
  const [salaryInputs, setSalaryInputs] = useState();
  const [securityQuestionInputs, setsecurityQuestionInputs] = useState();
  const [academicInputs, setAcademicInputs] = useState();
  const [skillsInputs, setSkillsInputs] = useState();
  const [languageLevelInputs, setLanguageLevelInputs] = useState();
  const [drivingInputs, setDrivingInputs] = useState();
  const [languageCertificateInputs, setLnaguageCertificateInputs] = useState();
  const [industryInputs, setIndustryInputs] = useState();
  const [nationalityInputs, setNationalityInputs] = useState();
  const [employmentInputs, setEmploymentInputs] = useState();
  const [timeZoneInputs, setTimeZoneInputs] = useState();
  //***************************
  // define function
  //***************************

  // start public function

  const handleChangeTab = (tab) => {
    setTab(tab);
    setTranslateIsCreate(false);
  };

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

  // end public funciton

  // Start Role
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

  const handleChangeRouteRole = (id) => {
    router.replace({
      pathname: `/global-setting/accesses/[id]`,
      query: { id: id },
    });
  };
  // End Role

  // Start Social

  const handleShowCreateModal = () => {
    setVisible(true);
    setSocialsInputs({
      title: null,
      website: null,
      icon: null,
    });
  };

  const handleGetSoicalList = () => {
    http().SocialsSetting(
      ({ data }) => {
        if (data.status == 1) {
          setSocials(data.socials);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateSocial = () => {
    const form = new FormData();
    form.append("website", socialsInputs.website);
    form.append("title", socialsInputs.title);
    form.append("icon", socialsInputs.icon);
    http().SocialsCreateSetting(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSoicalList();
          setVisible(false);
          setSocialsInputs({
            title: null,
            website: null,
            icon: null,
          });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      form,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowSocial = (id) => {
    http().SocialsShowSetting(
      ({ data }) => {
        if (data.status == 1) {
          setSocialsInputs((prev) => {
            return {
              ...prev,
              title: data?.social?.title,
              website: data?.social?.website,
              id: data?.social?.id,
            };
          });
          setVisible(true);
          setIsUpdatedSocial(true);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateSocial = () => {
    const form = new FormData();
    form.append("website", socialsInputs.website);
    form.append("title", socialsInputs.title);
    if (socialsInputs.icon != null) {
      form.append("icon", socialsInputs.icon);
    }
    http().SocialsUpdateSetting(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdatedSocial(false);
          toast({ message: data.message, type: "success" });
          handleGetSoicalList();
          setVisible(false);
          setSocialsInputs({
            title: null,
            website: null,
            icon: null,
          });
        }
      },
      form,
      socialsInputs?.id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeleteSocial = (id) => {
    http().SocialsDeleteSetting(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSoicalList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Social

  // Start Percentage

  const handleGetPercentageList = () => {
    http().PercentageList(
      ({ data }) => {
        if (data.status == 1) {
          setPercentage(data?.percentage[0]);
          setPercentageInputs(data?.percentage[0]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handelUpdatePercentage = () => {
    http().PercentageUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleChangePercentageProf();
        }
        if (data.status == -1) {
          toast({ message: data.error, type: "error" });
        }
      },
      percentageInputs,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChangePercentageProf = () => {
    http().Percentage(
      ({ data }) => {
        setPercentageProf(data?.percentage);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Percentage

  // Start Translate
  const handleShowModalVisible = () => {
    setVisible(true);
    setTranslationId(null);
  };
  const handleCloseTranslate = () => {
    setTab(1);
  };
  const handleGetLanguageList = () => {
    http().LanguagesList(
      ({ data }) => {
        if (data?.status == 1) {
          const array = [];
          data?.list?.map((item) => {
            if (item?.isOnList == false)
              array.push({ label: item?.title, value: item?.id });
          });
          setLanguageList(array);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetTranslateLangList = () => {
    http().LanguagesTranslate(
      ({ data }) => {
        if (data?.status == 1) {
          const array = [];
          data?.list.map((item) => {
            array.push({ ...item, label: item?.title, value: item?.id });
          });
          setLanguageTranslateList(array);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetTableTranslate = () => {
    http().TranslateTable(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              value: item?.id,
              label: item.title,
            });
          });
          setTranslateSection(custome);
        }
      },
      translateSetting.category,
      (err) => {
        console.log("err", err);
      }
    );
  };
  const handleGetSingleTable = () => {
    http().TranslateTableSingle(
      ({ data }) => {
        if (data.status == 1) {
          setTranslateInputs(data?.list);
        }
        if (data?.status == 0) {
          setErrors(data?.errors);
        } else {
          setErrors([]);
        }
      },
      {
        language: translateSetting.transalteTo,
        section: translateSetting.section,
      },
      (err) => {
        console.log("err", err);
      }
    );
  };
  const handleTranslate = () => {
    const fields = [];
    translateInputs.map((item) => {
      if (!isEmpty(item?.translation)) fields.push(item);
    });
    http().TranslateEdit(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data?.message });
        }
      },
      {
        languageId: translateSetting.transalteTo,
        domain: translateSetting?.category,
        slug: translateSetting?.sectionName?.toLowerCase().split(" ").join("-"),
        fields: fields,
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleLiveLanguage = (id) => {
    http().LiveLanguage(
      ({ data }) => {
        if (data.status == 1) {
          handleGetTranslateLangList();
          toast({ type: "success", message: data?.message });
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  const handleDeletTranslate = (id) => {
    http().LiveLanguageDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetTranslateLangList();
          toast({ type: "success", message: data?.message });
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleAddLanguage = () => {
    http().ListLanguage(
      ({ data }) => {
        if (data?.status == 1) {
          handleGetTranslateLangList();
          setVisible(false);
        }
      },
      translationId,
      (err) => {
        console.log("err", err);
      }
    );
  };
  // End Translate

  // Start Basic Info
  //*************************** Start genders
  const handleGetGenders = () => {
    http().GendersLang(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setGendersInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateGenders = () => {
    http().GendersCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetGenders();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowGenders = (id) => {
    const array = [...gendersInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setGendersInputs(array);
  };
  const handleChangeGenderItem = (e, id) => {
    const val = e.target.value;
    const array = [...gendersInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setGendersInputs(array);
  };
  const handleUpdateGender = () => {
    const array = [...gendersInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().GendersUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setGendersInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteGender = (id) => {
    http().GendersDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetGenders();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End genders

  //*************************** Start Salary Period

  const handleGetSalary = () => {
    http().Salary(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setSalaryInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateSalary = () => {
    console.log("hi");
    http().SalaryCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSalary();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowSalary = (id) => {
    const array = [...salaryInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setSalaryInputs(array);
  };
  const handleChangeSalaryItem = (e, id) => {
    const val = e.target.value;
    const array = [...salaryInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setSalaryInputs(array);
  };
  const handleUpdateSalary = () => {
    const array = [...salaryInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().SalaryUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setSalaryInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteSalary = (id) => {
    http().SalaryDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSalary();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  //*************************** End Salary Period

  //*************************** Start security questions
  const handleGetSecurityQuestionsList = () => {
    http().SecurityQuestions(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setsecurityQuestionInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateSecurityQuestions = () => {
    http().SecurityQuestionsCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSecurityQuestionsList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowSecurityQuestions = (id) => {
    const array = [...securityQuestionInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setsecurityQuestionInputs(array);
  };
  const handleChangeSecurityQuestionsItem = (e, id) => {
    const val = e.target.value;
    const array = [...securityQuestionInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setsecurityQuestionInputs(array);
  };
  const handleUpdateSecurityQuestions = () => {
    const array = [...securityQuestionInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().SecurityQuestionsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setsecurityQuestionInputs(array);
        }
      },
      { question_english: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteSecurityQuestions = (id) => {
    http().SecurityQuestionsDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetSecurityQuestionsList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End security questions

  //*************************** Start Academic

  const handleGetAcademicList = () => {
    http().AcademicLevels(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setAcademicInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateAcademic = () => {
    http().AcademicCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetAcademicList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowAcademic = (id) => {
    const array = [...academicInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setAcademicInputs(array);
  };
  const handleChangeAcademicItem = (e, id) => {
    const val = e.target.value;
    const array = [...academicInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setAcademicInputs(array);
  };
  const handleUpdateAcademic = () => {
    const array = [...academicInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().AcademicUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setAcademicInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteAcademic = (id) => {
    http().AcademicDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetAcademicList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Academic

  //*************************** Start Domination

  const handleGetDominationList = () => {
    http().Skills(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setSkillsInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateDomination = () => {
    http().SkillsSettingCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDominationList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowDomination = (id) => {
    const array = [...skillsInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setSkillsInputs(array);
  };
  const handleChangeDominationItem = (e, id) => {
    const val = e.target.value;
    const array = [...skillsInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setSkillsInputs(array);
  };
  const handleUpdateDomination = () => {
    const array = [...skillsInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().SkillsSettingUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setSkillsInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteDomination = (id) => {
    http().SkillsSettingDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDominationList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  //*************************** End Domination

  //*************************** Start Language Level

  const handleGetLanguageLevelList = () => {
    http().LanguageLevel(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setLanguageLevelInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateLanguageLevel = () => {
    http().LanguageLevelCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetLanguageLevelList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowLanguageLevel = (id) => {
    const array = [...languageLevelInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setLanguageLevelInputs(array);
  };
  const handleChangeLanguageLevelItem = (e, id) => {
    const val = e.target.value;
    const array = [...languageLevelInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setLanguageLevelInputs(array);
  };
  const handleUpdateLanguageLevel = () => {
    const array = [...languageLevelInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().LanguageLevelUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setLanguageLevelInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteLanguageLevel = (id) => {
    http().LanguageLevelDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetLanguageLevelList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  //*************************** End Language Level

  //*************************** Start Language Certificates

  const handleGetCertificatesList = () => {
    http().LanguageCertificates(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setLnaguageCertificateInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateCertificates = () => {
    http().LanguageCertificatesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDrivingLicensesList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowCertificates = (id) => {
    const array = [...languageCertificateInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setLnaguageCertificateInputs(array);
  };
  const handleChangeCertificatesItem = (e, id) => {
    const val = e.target.value;
    const array = [...languageCertificateInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setLnaguageCertificateInputs(array);
  };
  const handleUpdateCertificates = () => {
    const array = [...languageCertificateInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().LanguageCertificatesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setLnaguageCertificateInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteCertificates = (id) => {
    http().LanguageCertificatesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDrivingLicensesList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  //*************************** End Language Certificates

  //*************************** Start Industry

  const handleGetIndustryList = () => {
    http().Industries(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setIndustryInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateIndustry = () => {
    http().IndustriesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetIndustryList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowIndustry = (id) => {
    const array = [...industryInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setIndustryInputs(array);
  };
  const handleChangeIndustryItem = (e, id) => {
    const val = e.target.value;
    const array = [...industryInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setIndustryInputs(array);
  };
  const handleUpdateIndustry = () => {
    const array = [...industryInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().IndustriesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setIndustryInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteIndustry = (id) => {
    http().IndustriesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetIndustryList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  //*************************** End Industry

  //*************************** Start Nationality
  const handleGetNationalityList = () => {
    http().Nationalities(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setNationalityInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateNationality = () => {
    http().NationalitiesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetNationalityList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowNationality = (id) => {
    const array = [...nationalityInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setNationalityInputs(array);
  };
  const handleChangeNationalityItem = (e, id) => {
    const val = e.target.value;
    const array = [...nationalityInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setNationalityInputs(array);
  };
  const handleUpdateNationality = () => {
    const array = [...nationalityInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().NationalitiesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setNationalityInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteNationality = (id) => {
    http().NationalitiesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetNationalityList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Nationality

  //*************************** Start Languages

  const handleShowLanguagesModal = () => {
    setLanguagesModal(true);
    setIsUpdateLanguages(false);
    setLanguagesInputs({ title: null, code: null, isRtl: null });
  };
  const handleGetLanguagesList = () => {
    http().LanguagesList(
      ({ data }) => {
        if (data.status == 1) {
          setLanguages(data?.list);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateLanguages = () => {
    http().LanguagesSettingCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetLanguagesList();
          setLanguagesInputs({ title: null, code: null, isRtl: null });
          setLanguagesModal(false);
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: languagesInputs.title,
        code: languagesInputs.code,
        isRtl: languagesInputs.isRtl,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowLanguages = (id) => {
    http().LanguagesSettingShow(
      ({ data }) => {
        if (data.status == 1) {
          setLanguagesInputs((prev) => {
            return {
              ...prev,
              id: data?.item?.id,
              isRtl: data?.item?.isRtl,
              title: data?.item?.title,
              code: data?.item?.code,
            };
          });
          setLanguagesModal(true);
          setIsUpdateLanguages(true);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  const handleUpdateLanguages = () => {
    http().LanguagesSettingUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          setLanguagesInputs({ title: null, code: null, isRtl: null });
          setLanguagesModal(false);
          setIsUpdateLanguages(false);
          handleGetLanguagesList();
        }
      },
      {
        title: languagesInputs.title,
        code: languagesInputs.code,
        isRtl: languagesInputs.isRtl,
        id: languagesInputs?.id,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteLanguages = (id) => {
    http().LanguagesSettingDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetLanguagesList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Languages

  //*************************** Start Driving Licenses
  const handleGetDrivingLicensesList = () => {
    http().DrivingLicenses(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setDrivingInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateDrivingLicenses = () => {
    http().DrivingLicensesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDrivingLicensesList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowDrivingLicenses = (id) => {
    const array = [...drivingInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setDrivingInputs(array);
  };
  const handleChangeDrivingLicensesItem = (e, id) => {
    const val = e.target.value;
    const array = [...drivingInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setDrivingInputs(array);
  };
  const handleUpdateDrivingLicenses = () => {
    const array = [...drivingInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().DrivingLicensesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setDrivingInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteDrivingLicenses = (id) => {
    http().DrivingLicensesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetDrivingLicensesList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Driving Licenses

  //*************************** Start Employment Types
  const handleGetEmploymentList = () => {
    http().EmploymentListLang(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setEmploymentInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateEmployment = () => {
    http().EmploymentCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetEmploymentList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowEmployment = (id) => {
    const array = [...employmentInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setEmploymentInputs(array);
  };
  const handleChangeEmploymentItem = (e, id) => {
    const val = e.target.value;
    const array = [...employmentInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setEmploymentInputs(array);
  };
  const handleUpdateEmployment = () => {
    const array = [...employmentInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().EmploymentUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setEmploymentInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteEmployment = (id) => {
    http().EmploymentDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetEmploymentList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Employment Types

  //*************************** Start Time Zone
  const handleGetTimeZoneList = () => {
    http().TimeZoneListLang(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              id: item?.id,
              title: item?.title,
              isUpdated: false,
              isDisabled: true,
            });
          });
          setTimeZoneInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateTimeZone = () => {
    http().TimeZoneCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetTimeZoneList();
          setBasicInputs({ basic: "" });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        title: basicInputs.basic,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowTimeZone = (id) => {
    const array = [...timeZoneInputs];
    array.map((item) => {
      item.isUpdated = false;
      item.isDisabled = true;
    });
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.isUpdated = true;
    target.isDisabled = false;
    array[indexTarget] = target;
    setTimeZoneInputs(array);
  };
  const handleChangeTimeZoneItem = (e, id) => {
    const val = e.target.value;
    const array = [...timeZoneInputs];
    const indexTarget = array.findIndex((item) => item.id == id);
    const target = array[indexTarget];
    target.title = val;
    array[indexTarget] = target;
    setTimeZoneInputs(array);
  };
  const handleUpdateTimeZone = () => {
    const array = [...timeZoneInputs];
    const target = array.filter((item) => item.isUpdated == true)[0];
    http().TimeZoneUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          array.map((item) => {
            item.isUpdated = false;
            item.isDisabled = true;
          });
          setTimeZoneInputs(array);
        }
      },
      { title: target.title, id: target.id },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteTimeZone = (id) => {
    http().TimeZoneDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetTimeZoneList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  //*************************** End Time Zone

  // Start Country

  const handleShowCountryForm = () => {
    setIsUpdatedCountry(false);
    setCountryModal(true);
    setCountryInputs({
      name: null,
      code: null,
      flag: null,
      prefix: null,
    });
  };
  const handleGetCountryList = () => {
    http().Countries(
      ({ data }) => {
        if (data.status == 1) {
          setCountries(data?.list);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateCountry = () => {
    const form = new FormData();
    form.append("title", countryInputs.name);
    form.append("code", countryInputs.code);
    form.append("prefix", countryInputs.prefix);
    form.append("flag", countryInputs.flag);
    http().CountriesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetCountryList();
          setCountryInputs({
            name: null,
            code: null,
            flag: null,
            prefix: null,
          });
          setCountryModal(false);
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      form,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowCountry = (id) => {
    http().CountriesShow(
      ({ data }) => {
        if (data.status == 1) {
          console.log("data", data);
          setCountryInputs((prev) => {
            return {
              ...prev,
              title: data?.item?.title,
              name: data?.item?.title,
              code: data?.item?.code,
              prefix: data?.item?.prefix,
              id: data?.item?.id,
            };
          });
          setIsUpdatedCountry(true);
          setCountryModal(true);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  const handleUpdateCountry = () => {
    const form = new FormData();
    form.append("title", countryInputs.title);
    form.append("name", countryInputs.title);
    form.append("code", countryInputs.code);
    form.append("prefix", countryInputs.prefix);
    form.append("flag", countryInputs.flag);
    http().CountriesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetCountryList();
          setCountryModal(false);
          setIsUpdatedCountry(false);
          setCountryInputs({
            name: null,
            code: null,
            flag: null,
            prefix: null,
          });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      form,
      countryInputs.id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteCountry = (id) => {
    http().CountriesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetCountryList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Country

  // Start Currency
  const handleShowCurrencyForm = () => {
    setIsUpdatedCurrency(false);
    setCurrencyModal(true);
    setCurrencyInputs({
      name: null,
      code: null,
      title_english: null,
      symbol: null,
    });
  };
  const handleGetCurrenciesList = () => {
    http().currencies(
      ({ data }) => {
        if (data.status == 1) {
          setCurrency(data?.list);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateCurrencies = () => {
    http().CurrenciesCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetCurrenciesList();
          setCurrencyModal(false);
          setCurrencyInputs({
            name: null,
            code: null,
            title: null,
            symbol: null,
          });
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        name: currnecyInputs.name,
        code: currnecyInputs.code,
        symbol: currnecyInputs.symbol,
        title: currnecyInputs.name,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleShowCurrencies = (id) => {
    http().CurrenciesShow(
      ({ data }) => {
        if (data.status == 1) {
          setCurrencyInputs({
            name: data?.item?.title,
            code: data?.item?.code,
            title: data?.item?.title,
            symbol: data?.item?.symbol,
            id: data?.item?.id,
          });
          setIsUpdatedCurrency(true);
          setCurrencyModal(true);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateCurrencies = () => {
    http().CurrenciesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          setIsUpdatedCurrency(false);
          setCurrencyInputs({
            name: null,
            code: null,
            title_english: null,
            symbol: null,
          });
          handleGetCurrenciesList();
          setCurrencyModal(false);
        }
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
      },
      {
        id: currnecyInputs?.id,
        name: currnecyInputs?.title,
        code: currnecyInputs?.code,
        title: currnecyInputs?.title,
        symbol: currnecyInputs?.symbol,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelDeleteCurrencies = (id) => {
    http().CurrenciesDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetCurrenciesList();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Currency

  // End Basic Info

  //***************************
  // define useEffect
  //***************************

  useEffect(async () => {
    await Promise.all([
      handleGetRoleList(),
      handleGetTranslateLayout(),
      handleGetSoicalList(),
      handleGetTranslateLangList(),
      handleGetLanguageList(),
      handleGetGenders(),
      handleGetSecurityQuestionsList(),
      handleGetAcademicList(),
      handleGetDominationList(),
      handleGetLanguageLevelList(),
      handleGetDrivingLicensesList(),
      handleGetCertificatesList(),
      handleGetIndustryList(),
      handleGetNationalityList(),
      handleGetLanguagesList(),
      handleGetEmploymentList(),
      handleGetTimeZoneList(),
      handleGetCountryList(),
      handleGetCurrenciesList(),
      handleGetSalary(),
    ]).finally(() => {
      console.log("finally");
    });
  }, []);

  useEffect(() => {
    handleGetTableTranslate();
  }, [translateSetting.category]);
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
  console.log("tab", tab);
  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout
        subSidebarContent={
          <div
            className={
              theme.light ? Styles.lightResumeWrapper : Styles.darkResumeWrapper
            }
          >
            <div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={tab == 1 ? 1 : tab == 6 ? 6 : 1}
                  tab={tab}
                  handleChangeTab={() => handleChangeTab(1)}
                  active={tab == 1 || tab == 6}
                  lightIcon={""}
                  darkIcon={""}
                  activeLightIcon={""}
                  activeDarkIcon={""}
                  text={globalSettingTranslate["accesses"]?.title}
                />
              </div>
              <div className="pt-2">
                <ButtonTabBar
                  theme={theme.light}
                  current={2}
                  tab={tab}
                  handleChangeTab={() => handleChangeTab(2)}
                  active={tab == 2}
                  lightIcon={""}
                  darkIcon={""}
                  activeLightIcon={""}
                  activeDarkIcon={""}
                  text={globalSettingTranslate["social-media"]?.title}
                />
              </div>
              <div className="pt-2">
                <ButtonTabBar
                  theme={theme.light}
                  current={3}
                  tab={tab}
                  handleChangeTab={() => handleChangeTab(3)}
                  active={tab == 3}
                  lightIcon={""}
                  darkIcon={""}
                  activeLightIcon={""}
                  activeDarkIcon={""}
                  text={globalSettingTranslate["profile-progress"]?.title}
                />
              </div>
              <div className="pt-2">
                <ButtonTabBar
                  theme={theme.light}
                  current={4}
                  tab={tab}
                  handleChangeTab={() => handleChangeTab(4)}
                  active={tab == 4}
                  lightIcon={""}
                  darkIcon={""}
                  activeLightIcon={""}
                  activeDarkIcon={""}
                  text={globalSettingTranslate["translation"]?.title}
                />
              </div>
              <div className="pt-2">
                <ButtonTabBar
                  theme={theme.light}
                  current={5}
                  tab={tab}
                  handleChangeTab={() => handleChangeTab(5)}
                  active={tab == 5}
                  lightIcon={""}
                  darkIcon={""}
                  activeLightIcon={""}
                  activeDarkIcon={""}
                  text={globalSettingTranslate["basic-info"]?.title}
                />
              </div>
            </div>
          </div>
        }
        hasSubSidebar={true}
        hasRadius={false}
        title="global setting"
      >
        <Authorization>
          {tab == 1 ? (
            <RolesIndex
              router={router}
              tab={tab}
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
              handleChangeTab={handleChangeTab}
            />
          ) : tab == 2 ? (
            <SocialIndex
              tab={tab}
              handleShowCreateModal={handleShowCreateModal}
              globalSettingTranslate={globalSettingTranslate}
              theme={theme?.light}
              socials={socials}
              setSocialsInputs={setSocialsInputs}
              socialsInputs={socialsInputs}
              handleCreateSocial={handleCreateSocial}
              handleDeleteSocial={handleDeleteSocial}
              handleShowSocial={handleShowSocial}
              handleUpdateSocial={handleUpdateSocial}
              errors={errors}
              setVisible={setVisible}
              visible={visible}
              isUpdatedSocial={isUpdatedSocial}
              handleChangeTab={handleChangeTab}
            />
          ) : tab == 3 ? (
            <Progress
              tab={tab}
              theme={theme.light}
              globalSettingTranslate={globalSettingTranslate}
              handleChangeTab={handleChangeTab}
              percentageInputs={percentageInputs}
              setPercentageInputs={setPercentageInputs}
              handelUpdatePercentage={handelUpdatePercentage}
            />
          ) : tab == 4 ? (
            <TranslationIndex
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
              theme={theme?.light}
              globalSettingTranslate={globalSettingTranslate}
              handleCloseTranslate={handleCloseTranslate}
              errors={errors}
              handleShowModalVisible={handleShowModalVisible}
              translationId={translationId}
              setTranslationId={setTranslationId}
              visible={visible}
              setVisible={setVisible}
              handleAddLanguage={handleAddLanguage}
            />
          ) : tab == 5 ? (
            <BasicIndex
              tab={tab}
              handleChangeTab={handleChangeTab}
              gendersInputs={gendersInputs}
              globalSettingTranslate={globalSettingTranslate}
              basicTitle={basicTitle}
              setBasicTitle={setBasicTitle}
              theme={theme?.light}
              handleCreateGenders={handleCreateGenders}
              setBasicInputs={setBasicInputs}
              basicInputs={basicInputs}
              errors={errors}
              handelDeleteGender={handelDeleteGender}
              handleShowGenders={handleShowGenders}
              handleChangeGenderItem={handleChangeGenderItem}
              handleUpdateGender={handleUpdateGender}
              securityQuestionInputs={securityQuestionInputs}
              handelDeleteSecurityQuestions={handelDeleteSecurityQuestions}
              handleCreateSecurityQuestions={handleCreateSecurityQuestions}
              handleShowSecurityQuestions={handleShowSecurityQuestions}
              handleChangeSecurityQuestionsItem={
                handleChangeSecurityQuestionsItem
              }
              handleUpdateSecurityQuestions={handleUpdateSecurityQuestions}
              academicInputs={academicInputs}
              handleCreateAcademic={handleCreateAcademic}
              handleShowAcademic={handleShowAcademic}
              handleChangeAcademicItem={handleChangeAcademicItem}
              handleUpdateAcademic={handleUpdateAcademic}
              handelDeleteAcademic={handelDeleteAcademic}
              skillsInputs={skillsInputs}
              handleCreateDomination={handleCreateDomination}
              handleShowDomination={handleShowDomination}
              handleChangeDominationItem={handleChangeDominationItem}
              handleUpdateDomination={handleUpdateDomination}
              handelDeleteDomination={handelDeleteDomination}
              languageLevelInputs={languageLevelInputs}
              handleCreateLanguageLevel={handleCreateLanguageLevel}
              handleShowLanguageLevel={handleShowLanguageLevel}
              handleChangeLanguageLevelItem={handleChangeLanguageLevelItem}
              handleUpdateLanguageLevel={handleUpdateLanguageLevel}
              handelDeleteLanguageLevel={handelDeleteLanguageLevel}
              drivingInputs={drivingInputs}
              handleCreateDrivingLicenses={handleCreateDrivingLicenses}
              handleShowDrivingLicenses={handleShowDrivingLicenses}
              handleChangeDrivingLicensesItem={handleChangeDrivingLicensesItem}
              handleUpdateDrivingLicenses={handleUpdateDrivingLicenses}
              handelDeleteDrivingLicenses={handelDeleteDrivingLicenses}
              languageCertificateInputs={languageCertificateInputs}
              handleCreateCertificates={handleCreateCertificates}
              handleShowCertificates={handleShowCertificates}
              handleChangeCertificatesItem={handleChangeCertificatesItem}
              handleUpdateCertificates={handleUpdateCertificates}
              handelDeleteCertificates={handelDeleteCertificates}
              industryInputs={industryInputs}
              handleCreateIndustry={handleCreateIndustry}
              handleShowIndustry={handleShowIndustry}
              handleChangeIndustryItem={handleChangeIndustryItem}
              handleUpdateIndustry={handleUpdateIndustry}
              handelDeleteIndustry={handelDeleteIndustry}
              nationalityInputs={nationalityInputs}
              handleCreateNationality={handleCreateNationality}
              handleShowNationality={handleShowNationality}
              handleChangeNationalityItem={handleChangeNationalityItem}
              handleUpdateNationality={handleUpdateNationality}
              handelDeleteNationality={handelDeleteNationality}
              languagesInputs={languagesInputs}
              handleCreateLanguages={handleCreateLanguages}
              handleShowLanguages={handleShowLanguages}
              handleUpdateLanguages={handleUpdateLanguages}
              handelDeleteLanguages={handelDeleteLanguages}
              employmentInputs={employmentInputs}
              handleCreateEmployment={handleCreateEmployment}
              handleShowEmployment={handleShowEmployment}
              handleChangeEmploymentItem={handleChangeEmploymentItem}
              handleUpdateEmployment={handleUpdateEmployment}
              handelDeleteEmployment={handelDeleteEmployment}
              timeZoneInputs={timeZoneInputs}
              handleCreateTimeZone={handleCreateTimeZone}
              handleShowTimeZone={handleShowTimeZone}
              handleChangeTimeZoneItem={handleChangeTimeZoneItem}
              handleUpdateTimeZone={handleUpdateTimeZone}
              handelDeleteTimeZone={handelDeleteTimeZone}
              countries={countries}
              handleShowCountryForm={handleShowCountryForm}
              handelDeleteCountry={handelDeleteCountry}
              handleShowCountry={handleShowCountry}
              currency={currency}
              handleShowCurrencies={handleShowCurrencies}
              handelDeleteCurrencies={handelDeleteCurrencies}
              handleShowCurrencyForm={handleShowCurrencyForm}
              languages={languages}
              handleShowLanguagesModal={handleShowLanguagesModal}
              setCountryModal={setCountryModal}
              countryModal={countryModal}
              countryInputs={countryInputs}
              handleUpdateCountry={handleUpdateCountry}
              handleCreateCountry={handleCreateCountry}
              setCountryInputs={setCountryInputs}
              setCurrencyModal={setCurrencyModal}
              currencyModal={currencyModal}
              currnecyInputs={currnecyInputs}
              setCurrencyInputs={setCurrencyInputs}
              handleUpdateCurrencies={handleUpdateCurrencies}
              handleCreateCurrencies={handleCreateCurrencies}
              languagesModal={languagesModal}
              setLanguagesModal={setLanguagesModal}
              setLanguagesInputs={setLanguagesInputs}
              isUpdatedCountry={isUpdatedCountry}
              isUpdatedCurrency={isUpdatedCurrency}
              isUpdatedLanguages={isUpdatedLanguages}
              salaryInputs={salaryInputs}
              handleCreateSalary={handleCreateSalary}
              handleShowSalary={handleShowSalary}
              handleChangeSalaryItem={handleChangeSalaryItem}
              handleUpdateSalary={handleUpdateSalary}
              handelDeleteSalary={handelDeleteSalary}
            />
          ) : tab == 6 ? (
            <MenuBuilderIndex
              router={router}
              tab={tab}
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
              handleChangeTab={handleChangeTab}
            />
          ) : null}
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
