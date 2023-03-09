// import axios from "axios"
const axios = require("axios");

/* --------------------- axios instance ----------------------- */

function http() {
  const instance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API,
  });
  // set headers
  instance.defaults.headers.common["Accept"] = "application/json";
  instance.defaults.headers.contentType = "application/json";
  /* --------------------- axios instance ----------------------- */

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // if (error.response && error.response.status === 401) {
      //   cookie.remove("user");
      // }

      // if (error.response && error.response.status === 422) {
      //   if (error.response.data.errors);
      //   for (const [key, value] of Object.entries(error.response.data.errors)) {
      //     message.warning(value[0]);
      //   }
      // }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  let error_display = (data, status) => {
    if (!data) return;
    if (status >= 400 && status < 500) {
    }
  };

  /* --------------------- axios instance errors ----------------------- */
  function errors_handler(error) {
    if (!error && !error.response && !error.response.data) {
      return;
    }
    let errors = error?.response?.data;
    let status = error?.response?.status;
    switch (status) {
      case 400:
        //bad request
        error_display(errors, status);
        break;
      case 401:
        //unauthenticate
        break;
      case 403:
        //unauthenticate
        error_display(errors, status);
        break;
      case 410:
        //unauthenticate
        error_display(errors, status);
        break;
      case 422:
        //error validations
        error_display(errors, status);
        break;
      case 500:
        //server error
        error_display(errors, status);
        break;
    }
  }

  /* --------------------- axios instance ----------------------- */

  return {
    //***************************
    // Start Auth
    //***************************
    Login: (callback, data, errCB = undefined) => {
      return instance
        .post(`/auth/login/local`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Login2Fa: (callback, data, errCB = undefined) => {
      return instance
        .post(`/auth/login/2fa`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Logout: (callback, errCB = undefined) => {
      return instance
        .get(`/auth/logout`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Register: (callback, data, errCB = undefined) => {
      return instance
        .post(`/auth/register`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CurrentUser: (callback, errCB = undefined) => {
      return instance
        .get(`/auth/current`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Forgot: (callback, data, errCB = undefined) => {
      return instance
        .post(`/auth/password/forgot`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Token: (callback, data, errCB = undefined) => {
      return instance
        .get(`/auth/activation/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Reset: (callback, data, errCB = undefined) => {
      return instance
        .post(`/auth/password/reset`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End Auth
    //***************************

    //***************************
    // Start Settings
    //***************************
    AcademicLevels: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/academic-levels/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AcademicShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/academic-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AcademicCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/academic-level`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AcademicUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/academic-level/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AcademicDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/academic-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Industries: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/industries/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IndustriesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/industry/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IndustriesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/industry`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IndustriesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/industry/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IndustriesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/industry/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Nationalities: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/nationalities/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NationalitiesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/nationality/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NationalitiesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/nationality`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NationalitiesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/nationality/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NationalitiesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/nationality/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Countries: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/countries/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CountriesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/country/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CountriesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/country`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CountriesUpdate: (callback, data, id, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/country/${id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CountriesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/country/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    currencies: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/currencies/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CurrenciesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/currency/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CurrenciesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/currency`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CurrenciesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/currency/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CurrenciesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/currency/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityQuestions: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/security-questions/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityQuestionsShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/security-questions/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityQuestionsCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/security-question/`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityQuestionsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/global-settings/basic-info/edit/security-question/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityQuestionsDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/security-question/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsSetting: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/social-media/view/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsShowSetting: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/social-media/view/one/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsCreateSetting: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/social-media/create`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsUpdateSetting: (callback, data, id, errCB = undefined) => {
      return instance
        .put(`/global-settings/social-media/edit/${id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsDeleteSetting: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/social-media/delete/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Skills: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/domination-levels/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsSettingShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/domination-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsSettingCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/domination-level`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsSettingUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/global-settings/basic-info/edit/domination-level/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsSettingDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/domination-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageLevel: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/language-levels/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageLevelShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/language-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageLevelCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/language-level`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageLevelUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/language-level/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageLevelDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/language-level/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageCertificates: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/language-certificates/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageCertificatesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/language-certificate/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageCertificatesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/language-certificate`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageCertificatesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/global-settings/basic-info/edit/language-certificate/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguageCertificatesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(
          `/global-settings/basic-info/delete/language-certificate/${data.id}`
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesList: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/languages/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesSettingShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/language/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesSettingCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/language`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesSettingUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/language/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesSettingDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/language/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    MajorsList: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/academic-majors/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Genders: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/genders/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    GendersLang: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/genders/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    GendersShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/genders/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    GendersCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/gender`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    GendersUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/gender/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    GendersDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/gender/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Salary: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/salary-period/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SalaryCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/salary-period`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SalaryShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/salary-period/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SalaryUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/salary-period/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SalaryDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/salary-period/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DrivingLicenses: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/driving-licenses/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DrivingLicensesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/driving-license/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DrivingLicensesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/driving-license`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DrivingLicensesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/global-settings/basic-info/edit/driving-license/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DrivingLicensesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/driving-license/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    RoleList: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/roles/view/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    RoleCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/roles/create`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    RoleEdit: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/roles/edit/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    RoleDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/roles/delete/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DefaultRole: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/roles/edit/default/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    MemberRole: (callback, data, errCB = undefined) => {
      return instance
        .get(
          `/global-settings/roles/view/one/${data.roleId}/${data.skip}/${data.take}`
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    MemberList: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/roles/view/not-members/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    MemberRoleUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/roles/edit/add-members/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PermissionList: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/roles/view/permissions/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PermissionEdit: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/roles/create/permission`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PercentageList: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/percentage/view/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PercentageUpdate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/percentage/edit`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EmploymentListLang: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/employment-types/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EmploymentShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/employment-type/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EmploymentCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/employment-type`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EmploymentUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/global-settings/basic-info/edit/employment-type/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EmploymentDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/employment-type/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },

    TimeZoneListLang: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/timezones/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TimeZoneShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/timezones/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TimeZoneCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/global-settings/basic-info/create/timezone`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TimeZoneUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/basic-info/edit/timezone/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TimeZoneDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/global-settings/basic-info/delete/timezone/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesTranslate: (callback, errCB = undefined) => {
      return instance
        .get(`/global-settings/translation/view/languages/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TranslateTable: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/translation/view/sections/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TranslateTableSingle: (callback, data, errCB = undefined) => {
      return instance
        .get(
          `/global-settings/translation/view/section/${data?.language}/${data?.section}`
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TranslateEdit: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/translation/edit`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    TranslateLabel: (callback, data, errCB = undefined) => {
      return instance
        .get(`/global-settings/basic-info/view/labels/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LiveLanguage: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/translation/edit/language/live/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ListLanguage: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/translation/edit/language/add/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LiveLanguageDelete: (callback, data, errCB = undefined) => {
      return instance
        .put(`/global-settings/translation/edit/language/del/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NotifList: (callback, errCB = undefined) => {
      return instance
        .get(`/user-settings/user/view/notifications/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    NotifUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/user-settings/user/edit/notifications`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PrivacyList: (callback, errCB = undefined) => {
      return instance
        .get(`/user-settings/user/view/privacy/all`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PrivacyUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/user-settings/user/edit/privacy`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AccountDeActive: (callback, errCB = undefined) => {
      return instance
        .put(`/user-settings/user/edit/account/deactivation`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AccountDelete: (callback, errCB = undefined) => {
      return instance
        .put(`/user-settings/user/edit/account/delete`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Sidebar: (callback, errCB = undefined) => {
      return instance
        .put(`/user-settings/user/edit/sidebar`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End Settings
    //***************************

    //***************************
    // Start Profile
    //***************************
    Generate2fa: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/qr`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Enable2fa: (callback, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/2fa/enable`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Disable2fa: (callback, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/2fa/disable`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PersonalInformation: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/personal-information`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    OtherInformation: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/other-information`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SecurityInformation: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/security-information`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdatePersonalInformation: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/personal-information`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateOtherInformation: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/other-information`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateSecurityInformation: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/security-information`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SendSms: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/otp/send`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    VerifyPhone: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/my-profile/create/otp/verify`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Description: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/description`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DescriptionUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/description`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateAvatar: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/avatar`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    DeleteAvatar: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/my-profile/delete/avatar`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateBanner: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/banner`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsAll: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/socials`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/my-profile/create/social`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/social/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/my-profile/edit/social/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SocialsDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/my-profile/delete/social/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    InvitationCode: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/my-profile/create/invitation`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AccessList: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/access/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AccessEdit: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/user-profiles/create/access`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Percentage: (callback, errCB = undefined) => {
      return instance
        .get(`/profile/my-profile/view/percentage`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Cvs: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/cv/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CvDownload: (callback, data, errCB = undefined) => {
      return instance
        .get(`/pdf/download?view=${data.view}&mode=${data.mode}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End Profile
    //***************************

    //***************************
    // Start MapBox
    //***************************
    MapBox: (callback, data, config, errCB = undefined) => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return instance
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.target}.json?access_token=${data.token}&autocomplete=true`,
          { CancelToken: source.token }
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End MapBox
    //***************************

    //***************************
    // Start Settings
    //***************************
    UpdateTheme: (callback, data, errCB = undefined) => {
      return instance
        .put("/user-settings/user/edit/theme", data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateTimeZone: (callback, data, errCB = undefined) => {
      return instance
        .put("/user-settings/user/edit/timezone", data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateCurrnecy: (callback, data, errCB = undefined) => {
      return instance
        .put("/user-settings/user/edit/currency", data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateLanguage: (callback, data, errCB = undefined) => {
      return instance
        .put("/user-settings/user/edit/language", data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UpdateGridView: (callback, data, errCB = undefined) => {
      return instance
        .put("/user-settings/user/edit/gridview", data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End Settings
    //***************************

    //***************************
    // Start Reusme
    //***************************
    Progress: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/progress")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EducationAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/educations")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EducationShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/education/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EducationCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/education`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EducationUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/education/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    EducationDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/education/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExperiencesAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/experiences")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExperiencesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/experience/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExperiencesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/experience`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExperiencesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/experience/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExperiencesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/experience/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/skills")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/skill/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/skill`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/skill/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    SkillsDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/skill/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/languages")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/language/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/language`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/language/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    LanguagesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/language/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExpertisesAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/expertises")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExpertisesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/expertise/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExpertisesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/expertise`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExpertisesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/expertise/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExpertisesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/expertise/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/portfolios")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/portfolio/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/portfolio`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosUpdate: (callback, data, id, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/portfolio/${id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/portfolio/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PortfoliosImageDelete: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/profile/resume/edit/portfolio/${data.id}/delimage/${data.imageId}`
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExtraAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/extra-activities")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExtraShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/extra-activity/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExtraCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/extra-activity`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExtraUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/extra-activity/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ExtraDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/extra-activity/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IntershipsAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/interships")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IntershipsShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/intership/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IntershipsCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/intership`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IntershipsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/intership/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    IntershipsDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/intership/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ReferencesAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/references")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ReferencesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/reference/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ReferencesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/reference`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ReferencesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/reference/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    ReferencesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/reference/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    HobbiesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/hobbies`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    PublicationsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/publications`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AdditionalInfoUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/additional-info`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AwardsAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/awards")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AwardsShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/award/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AwardsCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/award`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AwardsUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/award/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    AwardsDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/award/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CoursesAll: (callback, errCB = undefined) => {
      return instance
        .get("/profile/resume/view/courses")
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CoursesShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/resume/view/course/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CoursesCreate: (callback, data, errCB = undefined) => {
      return instance
        .post(`/profile/resume/create/course`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CoursesUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/resume/edit/course/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    CoursesDelete: (callback, data, errCB = undefined) => {
      return instance
        .delete(`/profile/resume/delete/course/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End Reusme
    //***************************

    //***************************
    // Start User Profile
    //***************************
    UserProfAll: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/all/${data.skip}/${data.take}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserProfSearch: (callback, data, errCB = undefined) => {
      return instance
        .post(
          `/profile/user-profiles/view/search/${data.skip}/${data.take}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    Liked: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/user-profiles/edit/like/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserProfileShow: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/one/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserProfileStatus: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/user-profiles/edit/change-status/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserPersonalInfo: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/personal-information/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserPersonalInfoUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/profile/user-profiles/edit/personal-information/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserOtherInfo: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/other-information/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserOtherInfoUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(`/profile/user-profiles/edit/other-information/${data.id}`, data)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserSecurity: (callback, data, errCB = undefined) => {
      return instance
        .get(`/profile/user-profiles/view/security-information/${data}`)
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    UserSecurityUpdate: (callback, data, errCB = undefined) => {
      return instance
        .put(
          `/profile/user-profiles/edit/security-information/${data.id}`,
          data
        )
        .then(callback)
        .catch((err) => {
          if (errCB) errCB(err);
        });
    },
    //***************************
    // End User Profile
    //***************************
  };
}

module.exports.http = http;
