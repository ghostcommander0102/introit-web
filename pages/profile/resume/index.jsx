import { useLoadScript } from "@react-google-maps/api";
import { Col, Row } from "antd";
import { AcademicLevels } from "atoms/AcademicLevels";
import { Currencies } from "atoms/Currencies";
import { CurrentUser } from "atoms/CurrentUser";
import { Cv } from "atoms/Cv";
import { Driving } from "atoms/Driving";
import { Errors } from "atoms/Errors";
import { Industries } from "atoms/Industries";
import { LanguageCertificate } from "atoms/LanguageCertificate";
import { LanguageLevel } from "atoms/LanguageLevel";
import { LanguagesList } from "atoms/LanguagesList";
import { Loading } from "atoms/Loading";
import { Nationalities } from "atoms/Nationalities";
import { OtherInfo } from "atoms/OtherInfo";
import { PersonalInfo } from "atoms/PersonalInfo";
import { EmploymentType } from "atoms/resume/EmploymentType";
import { SkillList } from "atoms/SkillList";
import { Socials } from "atoms/Socials";
import { Theme } from "atoms/Theme";
import { MyResume } from "atoms/translate/MyResume";
import AddSocialModal from "components/shared/AddSocialModal";
import ResumeSidebar from "components/shared/resume/ResumeSidebar";
import ResumeContent from "components/shared/resume/ReusmeContent";
import ThemeModal from "components/shared/resume/ThemeModal";
import ImageCroperModal from "components/shared/ImageCroperModal";
import VerifyPhoneModal from "components/shared/VerifyPhoneModal";
import useToast from "hooks/useToast";
import Authenticated from "layouts/Authenticated";
import Authorization from "layouts/Authorization";
import ResumeLayout from "layouts/ResumeLayout";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getGeocode } from "use-places-autocomplete";
import { http } from "utils/http";
import { Salary } from "atoms/Salary";
import axios from "axios";
import moment from "moment/moment";
const test = ["places"];
export default function Finall() {
  // ***************************
  // define hooks
  // ***************************
  const toast = useToast();
  const router = useRouter();
  // const isLoaded = "";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: test,
  });

  // ***************************
  // define RecoilState
  // ***************************
  const [theme] = useRecoilState(Theme);
  const [languagesList, setLanguagesList] = useRecoilState(LanguagesList);
  const [languageLevel, setLanguageLevel] = useRecoilState(LanguageLevel);
  const [languageCertificates, setLanguageCertificate] =
    useRecoilState(LanguageCertificate);
  const [academicLevel, setAcademicLevel] = useRecoilState(AcademicLevels);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
  const [skillsList, setSkillsList] = useRecoilState(SkillList);
  const [myResumeTranslate, setMyResumeTranslate] = useRecoilState(MyResume);
  const [, setLoading] = useRecoilState(Loading);
  const [socialsRecil, setSocialsRecil] = useRecoilState(Socials);
  const [InfoRecoil, setInfoRecoil] = useRecoilState(PersonalInfo);
  const [otherRecoil, setOtherRecoil] = useRecoilState(OtherInfo);
  const [nationalities, setNationalities] = useRecoilState(Nationalities);
  const [academicLevels, setAcademicLevels] = useRecoilState(AcademicLevels);
  const [industries, setIndustries] = useRecoilState(Industries);
  const [currencies, setCurrencies] = useRecoilState(Currencies);
  const [drivingRecoil, setDrivingRecoil] = useRecoilState(Driving);
  const [cv, setCv] = useRecoilState(Cv);
  const [errors, setErrors] = useRecoilState(Errors);
  const [salary, setSalary] = useRecoilState(Salary);
  const [employmentType, setEmploymentType] = useRecoilState(EmploymentType);
  // ***************************
  // define state
  // ***************************
  const [cvTarget, setCvTarget] = useState({
    name: "venice",
    style: "light",
  });
  const [blob, setBlob] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [uploaderLoader, setUploaderLoader] = useState(false);
  const [donwloadLoader, setDownloadLoader] = useState(false);
  const [modalTheme, setModalTheme] = useState(false);
  const [cvLoader, setCvLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisivle] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [socialsInputs, setSocialsInputs] = useState();
  const [isProf, setIsProf] = useState();
  const [profileShow, setProfileShow] = useState(false);
  const [step, setStep] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [croppedImage, setCroppedImage] = useState("");
  const [yourImage, setYourImage] = useState();
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [filelist, setFilelist] = useState([]);
  const [updateList, setIsUpdateList] = useState({
    education: { isUpdate: false },
    experience: { isUpdate: false },
    skill: { isUpdate: false },
    language: { isUpdate: false },
    expertise: { isUpdate: false },
    portfolio: { isUpdate: false },
    extra: { isUpdate: false },
    courses: { isUpdate: false },
    internship: { isUpdate: false },
    reference: { isUpdate: false },
    award: { isUpdate: false },
  });
  const [existInputs, setExistInputs] = useState({
    skill: { show: false, exist: false, deleted: false },
    language: { show: false, exist: false, deleted: false },
    expertise: { show: false, exist: false, deleted: false },
    portfolio: { show: false, exist: false, deleted: false },
    extra: { show: false, exist: false, deleted: false },
    courses: { show: false, exist: false, deleted: false },
    internship: { show: false, exist: false, deleted: false },
    reference: { show: false, exist: false, deleted: false },
    award: { show: false, exist: false, deleted: false },
    hobbies: { show: false, exist: false, deleted: false },
    publications: { show: false, exist: false, deleted: false },
    additionalInfo: { show: false, exist: false, deleted: false },
  });
  const [singleSocialInput, setSingleSocialInputs] = useState({
    socialId: "",
    username: "",
  });
  const [inputsInfo, setInputsInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    streetAddress: "",
    latitude: "",
    longitude: "",
    genderId: "",
    residentCountry: "",
    residentState: "",
    residentCity: "",
    birthCountry: "",
    birthCity: "",
    birthState: "",
    birth: "",
  });
  const [inputsOther, setInputsOther] = useState({
    jobTitle: "",
    nationalityId: "",
    academicLevelId: "",
    industryId: "",
    currencyId: "",
    minSalary: "",
    maxSalary: "",
    drivingLicenseId: "",
    website: "",
    salaryPeriodId: "",
  });
  const [inputsPhone, setInputsPhone] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [description, setDescription] = useState({
    description: "",
  });
  const [educationInputs, setEducationInputs] = useState({
    institute: "",
    fromDate: "",
    toDate: "",
    present: false,
    location: "",
    degreeId: "",
    major: "",
    city: "",
    country: "",
    state: "",
  });
  const [experiencesInputs, setExperiencesInputs] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    present: false,
    institute: "",
    location: "",
    description: "",
    employmentTypeId: "",
    country: "",
    state: "",
    city: "",
  });
  const [skillsInputs, setSkillsInputs] = useState({
    title: "",
    dominationId: "",
    percentage: "",
  });
  const [languageInputs, setLanguageInput] = useState({
    languageId: "",
    levelId: "",
    certificateId: "",
    percentage: "",
  });
  const [expertisesInputs, setExpertisesInput] = useState({
    title: "",
    dominationId: "",
    percentage: "",
  });
  const [portfolioInputs, setPortfolioInputs] = useState({
    title: "",
    link: "",
    videoLink: "",
  });
  const [extraInputs, setExtraInputs] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    present: false,
    institute: "",
    location: "",
    description: "",
    country: "",
    city: "",
    state: "",
  });
  const [coursesInputs, setCoursesInputs] = useState({
    institute: "",
    fromDate: "",
    toDate: "",
    present: false,
    title: "",
  });
  const [internshipsInputs, setInternshipsInputs] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    present: false,
    employer: "",
    location: "",
    description: "",
    city: "",
    country: "",
    state: "",
  });
  const [referencesInputs, setReferencesInputs] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
  });
  const [awardsInputs, setAwardsInputs] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [hobbiesInputs, setHobbiesInputs] = useState({
    hobbies: "",
  });
  const [additionalInputs, setAdditionalInputs] = useState({
    additionalInformation: "",
  });
  const [publicationsInputs, setPublicationsInputs] = useState({
    publications: "",
  });
  // ***************************
  // define function
  // ***************************

  // Start Public

  const handleShowCvType = (name, style) => {
    setCvTarget({
      name,
      style,
    });
  };

  const getCurrentUser = () => {
    http().CurrentUser(
      ({ data }) => {
        if (data.status == 1) {
          setCurrentUser(data.user);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleBack = () => {
    router.push("/profile");
  };
  // End Public

  // Start Progress
  const handleResumeProgress = () => {
    http().Progress(
      ({ data }) => {
        if (data.status == 1) {
          setProgress(data?.percent);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Progress

  // Start Transalte
  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setMyResumeTranslate(obj);
      },
      32,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Translate

  //   Start Social

  const handleClose = () => setVisivle(false);

  const handleGetSocialList = () => {
    http().SocialsSetting(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.socials?.map((item) => {
            custome.push({
              value: item.id,
              label: item.title,
              icon: item.icon,
            });
          });
          setSocialsRecil(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetAllSocial = () => {
    http().SocialsAll(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data.socials.map((item, index) => {
            custome.push({
              id: item.id,
              username: item.username,
              name: item.name,
              disabled: true,
              isUpdated: false,
              icon: item?.icon,
              link: item?.link,
            });
          });
          setSocialsInputs(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCreateSocial = () => {
    setDisabledButton(true);
    const obj = {};
    obj.socialId = singleSocialInput.socialId;
    if (singleSocialInput?.username?.includes(".com/")) {
      obj.username = singleSocialInput.username.split(".com/")[1];
    } else {
      obj.username = singleSocialInput.username;
    }
    http().SocialsCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetAllSocial();
          setSingleSocialInputs({
            socialId: "",
            username: "",
          });
        }
        if (data.status == -1) {
          toast({ message: data.error, type: "error" });
        }
      },
      obj,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleSocial = (id) => {
    http().SocialsShow(
      ({ data }) => {
        if (data.status == 1) {
          setSocialsInputs((prev) => {
            const moz = prev.map((item) => {
              return { ...item, isUpdated: false, disabled: true };
            });
            const indexItem = moz.findIndex(
              (item) => item.id == data.social.id
            );
            const target = moz[indexItem];
            target.isUpdated = true;
            target.disabled = false;
            moz[indexItem] = target;
            return [...moz];
          });
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateSocial = (id) => {
    const target = socialsInputs.filter((item) => item.id == id)[0];
    http().SocialsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetAllSocial();
        }
      },
      {
        id: target.id,
        username: target.username,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeleteSocial = (id) => {
    http().SocialsDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetAllSocial();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Social

  //   Start Avatar

  const handleOpenProf = () => {
    setIsProf("profile");
    setProfileShow(true);
    setCroppedImage("");
    setYourImage("");
    setStep(1);
    setZoom(1);
    setRotate(0);
  };

  const handleCloseProf = () => {
    setProfileShow(false);
  };

  const handleChangeAvatar = (image) => {
    if (isProf == "profile") {
      setUploaderLoader(true);
      const formData = new FormData();
      formData.append("image", image);
      http().UpdateAvatar(
        ({ data }) => {
          if (data.status == 1) {
            setUploaderLoader(false);
            toast({ message: data.message, type: "success" });
            setCroppedImage("");
            setYourImage("");
            setStep(1);
            setProfileShow(false);
            setZoom(1);
            setRotate(0);
            getCurrentUser();
          }
          if (data.status == -1) {
            toast({ message: data.error, type: "error" });
          }
        },
        formData,
        (err) => {
          console.log(err);
        }
      );
    } else {
      const formData = new FormData();
      formData.append("image", image);

      http().UpdateBanner(
        ({ data }) => {
          if (data.status == 1) {
            toast({ message: data.message, type: "success" });
            setCroppedImage("");
            setYourImage("");
            setStep(1);
            setProfileShow(false);
            setZoom(1);
            setRotate(0);
            getCurrentUser();
          }
          if (data.status == -1) {
            toast({ message: data.error, type: "error" });
          }
        },
        formData,
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handleDeleteAvatar = () => {
    http().DeleteAvatar(
      ({ data }) => {
        if (data?.status == 1) {
          handleGetCv();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // End Avatar

  //   Start PersonalInfo

  const showVerifyModal = () => setVerifyPhone(true);
  const closeVerifyModal = () => setVerifyPhone(false);
  const handleGetPersonalInfo = () => {
    http().PersonalInformation(
      ({ data }) => {
        if (data.status == 1) {
          setInputsInfo({
            firstName: data.personalInfo.firstName || "",
            lastName: data.personalInfo.lastName || "",
            dateOfBirth: data.personalInfo.dateOfBirth || "",
            phone: data.personalInfo.phone || "",
            streetAddress: data.personalInfo.streetAddress || "",
            latitude: data.personalInfo.latitude || "",
            longitude: data.personalInfo.longitude || "",
            genderId: data.personalInfo.genderId,
            birthCountry: data.personalInfo.birthCountry,
            birthCity: data.personalInfo.birthCity,
            birth:
              data.personalInfo?.birthCountry +
              ", " +
              data.personalInfo?.birthCity,
          });
          setInfoRecoil(data.personalInfo);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetOtherInfo = () => {
    http().OtherInformation(
      ({ data }) => {
		// JSON.stringify(data.personalInfo, function(key, value) { return (value === null) ? "" : value });
        if (data.status == 1) {
          setInputsOther({
            jobTitle: data.personalInfo.jobTitle || "",
            nationalityId: data.personalInfo.nationalityId || "",
            industryId: data.personalInfo.industryId || "",
            currencyId: data.personalInfo.currencyId || "",
            academicLevelId: data.personalInfo.academicLevelId || "",
            minSalary: data.personalInfo.minSalary || "",
            maxSalary: data.personalInfo.maxSalary || "",
            drivingLicenseId: data.personalInfo.drivingLicenseId || "",
            website: data.personalInfo.website || "",
            salaryPeriodId: data.personalInfo.salaryPeriodId || "",
          });
          setOtherRecoil(data.personalInfo);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleSendSms = () => {
    http().SendSms(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          showVerifyModal();
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleVerifyPhone = () => {
    setDisabledButton(true);

    http().VerifyPhone(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });

          closeVerifyModal();

          setInputsPhone({
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
          });

          handleGetPersonalInfo();
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
      },
      {
        otp:
          inputsPhone.one +
          inputsPhone.two +
          inputsPhone.three +
          inputsPhone.four +
          inputsPhone.five +
          inputsPhone.six,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const updatePersonalInfo = () => {
    http().UpdatePersonalInformation(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          handleGetCv();
          setErrors([]);
        }
      },
      {
        editorId: currentUser?.id,
        genderId: inputsInfo.genderId,
        firstName: inputsInfo.firstName,
        lastName: inputsInfo.lastName,
        phone: !isEmpty(inputsInfo.phone)
          ? inputsInfo.phone.includes("+")
            ? inputsInfo.phone
            : "+" + inputsInfo.phone
          : "",
        streetAddress: inputsInfo.streetAddress,
        latitude: inputsInfo.latitude,
        longitude: inputsInfo.longitude,
        dateOfBirth: inputsInfo.dateOfBirth,
        residentCountry: inputsInfo?.residentCountry || "",
        residentState: inputsInfo?.residentState || "",
        residentCity: inputsInfo?.residentCity || "",
        birthCountry: inputsInfo?.birthCountry,
        birthCity: inputsInfo?.birthCity,
        birthState: inputsInfo?.birthState,
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const updateOtherInfo = () => {
    setDisabledButton(true);
    http().UpdateOtherInformation(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          handleGetCv();
          setErrors([]);
        }
      },
      {
        editorId: currentUser?.id,
        jobTitle: inputsOther.jobTitle,
        nationalityId: inputsOther.nationalityId,
        academicLevelId: inputsOther.academicLevelId,
        industryId: inputsOther.industryId,
        currencyId: inputsOther.currencyId,
        minSalary:
          inputsOther.minSalary != ""
            ? inputsOther?.minSalary?.toString()
            : "",
        maxSalary:
          inputsOther.maxSalary != ""
            ? inputsOther?.maxSalary?.toString()
            : "",
        drivingLicenseId: inputsOther.drivingLicenseId,
        website: inputsOther.website,
        salaryPeriodId: inputsOther.salaryPeriodId,
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetCoverLetter = () => {
    http().Description(
      ({ data }) => {
        if (data.status == 1) {
          setDescription((prev) => {
            return { ...prev, description: data.description };
          });
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleChangeCoverLetter = () => {
    http().DescriptionUpdate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      { editorId: currentUser?.id, description: description.description },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  // End PersonalInfo

  //   Start Data Select
  const handleGetNationalityList = () => {
    http().Nationalities(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setNationalities(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetAcademicLevelList = () => {
    http().AcademicLevels(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setAcademicLevels(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetIndustriesList = () => {
    http().Industries(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setIndustries(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetCurrencies = () => {
    http().currencies(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item.title,
              value: item.id,
            });
          });
          setCurrencies(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };

  const handleGetDrivingList = () => {
    http().DrivingLicenses(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              value: item.id,
              label: item?.title,
            });
          });
          setDrivingRecoil(custome);
        }
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  const handleGetAcademicLevel = () => {
    http().AcademicLevels(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setAcademicLevel(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetEmploymentType = () => {
    http().EmploymentListLang(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setEmploymentType(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSkillList = () => {
    http().Skills(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setSkillsList(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetLanguagesList = () => {
    http().LanguagesList(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setLanguagesList(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetLangLevel = () => {
    http().LanguageLevel(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setLanguageLevel(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetLangCertificates = () => {
    http().LanguageCertificates(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setLanguageCertificate(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSalaryPeriod = () => {
    http().Salary(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list.map((item, index) => {
            custome.push({
              label: item?.title,
              value: item.id,
            });
          });
          setSalary(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Data Select

  // Start Education

  const handleCreateEducation = () => {
    if (!isEmpty(educationInputs.institute)) {
    }
    http().EducationCreate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleGetCv();
          setEducationInputs({
            institute: "",
            fromDate: "",
            toDate: "",
            present: false,
            location: "",
            degreeId: "",
            major: "",
            city: "",
            country: "",
            state: "",
          });
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "education" });
        else setErrors(undefined);
      },
      {
        ...educationInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleEducation = (id) => {
    http().EducationShow(
      ({ data }) => {
        if (data.status == 1) {
          setEducationInputs((prev) => {
            return {
              ...prev,
              ...data.education,
              degreeId: data?.education?.degree?.id,
              location:
                data?.education?.country?.title +
                ", " +
                data?.education?.city?.title,
            };
          });
          setIsUpdateList((prev) => {
            return { ...prev, education: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateEducation = () => {
    http().EducationUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          setEducationInputs({
            institute: "",
            fromDate: "",
            toDate: "",
            present: false,
            location: "",
            degreeId: "",
            major: "",
            city: "",
            country: "",
            state: "",
          });
          setIsUpdateList((prev) => {
            return { ...prev, education: { isUpdate: false } };
          });
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "education" });
        else setErrors(undefined);
      },
      { ...educationInputs },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletEducation = (id) => {
    http().EducationDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Education

  // start Experiences
  const handleCreateExperiences = () => {
    http().ExperiencesCreate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
          setExperiencesInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            institute: "",
            location: "",
            description: "",
            employmentTypeId: "",
          });
        }
        if (data.status == 0)
          setErrors({ ...data.errors, typeE: "experience" });
        else setErrors(undefined);
      },
      {
        ...experiencesInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleExperiences = (id) => {
    http().ExperiencesShow(
      ({ data }) => {
        if (data.status == 1) {
          setExperiencesInputs((prev) => {
            return {
              ...prev,
              ...data.experience,
              employmentTypeId: data?.experience?.employmentType?.id,
              location:
                data?.experience?.country?.title +
                ", " +
                data?.experience?.city?.title,
            };
          });
          setIsUpdateList((prev) => {
            return { ...prev, experience: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateExperiences = () => {
    http().ExperiencesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setExperiencesInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            institute: "",
            location: "",
            description: "",
            employmentTypeId: "",
          });
          setIsUpdateList((prev) => {
            return { ...prev, experience: { isUpdate: false } };
          });
          handleGetCv();
        }
        if (data.status == 0)
          setErrors({ ...data.errors, typeE: "experience" });
        else setErrors(undefined);
      },
      {
        ...experiencesInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletExperiences = (id) => {
    http().ExperiencesDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Experiences

  // Start Skill

  const handleCreateSkills = () => {
    http().SkillsCreate(
      ({ data }) => {
        if (data.status == 1) {
          setSkillsInputs({
            title: "",
            dominationId: "",
            percentage: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "skill" });
        else setErrors(undefined);
      },
      {
        title: skillsInputs.title,
        dominationId: skillsInputs.dominationId,
        percentage: parseInt(skillsInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleSkills = (id) => {
    http().SkillsShow(
      ({ data }) => {
        if (data.status == 1) {
          setSkillsInputs((prev) => {
            return {
              ...prev,
              ...data.skill,
              dominationId: data?.skill?.domination?.id,
            };
          });
          setIsUpdateList((prev) => {
            return { ...prev, skill: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateSkills = () => {
    http().SkillsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
          setSkillsInputs({
            title: "",
            dominationId: "",
            percentage: "",
          });
          setIsUpdateList((prev) => {
            return { ...prev, skill: { isUpdate: false } };
          });
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "skill" });
        else setErrors(undefined);
      },
      {
        id: skillsInputs.id,
        title: skillsInputs.title,
        dominationId: skillsInputs.dominationId,
        percentage: parseInt(skillsInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletSkills = (id) => {
    http().SkillsDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Skill

  // Start  Languages

  const handleCreateLanguages = () => {
    http().LanguagesCreate(
      ({ data }) => {
        if (data.status == 1) {
          setLanguageInput({
            languageId: "",
            levelId: "",
            certificateId: "",
            percentage: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "language" });
        else setErrors(undefined);
      },
      {
        languageId: languageInputs.languageId,
        levelId: languageInputs.levelId,
        certificateId: languageInputs.certificateId,
        percentage: parseInt(languageInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleLang = (id) => {
    http().LanguagesShow(
      ({ data }) => {
        if (data.status == 1) {
          setLanguageInput({
            id: data?.language?.id,
            languageId: data?.language?.language?.id,
            levelId: data?.language?.level?.id,
            certificateId: data?.language?.certificate?.id,
            percentage: data?.language?.percentage,
          });
          setIsUpdateList((prev) => {
            return { ...prev, language: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateLanguage = () => {
    http().LanguagesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setLanguageInput({
            languageId: "",
            levelId: "",
            certificateId: "",
            percentage: "",
          });
          setIsUpdateList((prev) => {
            return { ...prev, language: { isUpdate: false } };
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "language" });
        else setErrors(undefined);
      },
      {
        id: languageInputs.id,
        languageId: languageInputs.languageId,
        levelId: languageInputs.levelId,
        certificateId: languageInputs.certificateId,
        percentage: parseInt(languageInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletLanguage = (id) => {
    http().LanguagesDelete(
      ({ data }) => {
        if (data.status == 1) handleGetCv();
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End  Languages

  // Start Expertises

  const handleCreateExpertises = () => {
    http().ExpertisesCreate(
      ({ data }) => {
        if (data.status == 1) {
          setExpertisesInput({
            title: "",
            dominationId: "",
            percentage: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "expertise" });
        else setErrors(undefined);
      },
      {
        title: expertisesInputs.title,
        dominationId: expertisesInputs.dominationId,
        percentage: parseInt(expertisesInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleExpertises = (id) => {
    http().ExpertisesShow(
      ({ data }) => {
        if (data.status == 1) {
          setExpertisesInput({
            id: data?.expertise?.id,
            title: data?.expertise?.title,
            dominationId: data?.expertise?.domination?.id,
            percentage: data?.expertise?.percentage,
          });
          setIsUpdateList((prev) => {
            return { ...prev, expertise: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateExpertises = () => {
    setDisabledButton(true);
    http().ExpertisesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setExpertisesInput({
            title: "",
            dominationId: "",
            percentage: "",
          });
          handleGetCv();
          setIsUpdateList((prev) => {
            return { ...prev, expertise: { isUpdate: false } };
          });
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "expertise" });
        else setErrors(undefined);
      },
      {
        id: expertisesInputs.id,
        title: expertisesInputs.title,
        dominationId: expertisesInputs.dominationId,
        percentage: parseInt(expertisesInputs.percentage),
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletExpertises = (id) => {
    http().ExpertisesDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Expertises

  // Start Extra Activities
  const handleCreateExtra = () => {
    http().ExtraCreate(
      ({ data }) => {
        if (data.status == 1) {
          setExtraInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            institute: "",
            location: "",
            description: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "extra" });
        else setErrors(undefined);
      },
      {
        ...extraInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleExtra = (id) => {
    http().ExtraShow(
      ({ data }) => {
        if (data.status == 1) {
          setExtraInputs((prev) => {
            return {
              ...prev,
              ...data.extraActivity,
              location:
                data.extraActivity?.country?.title +
                ", " +
                data.extraActivity?.city?.title,
            };
          });
          setIsUpdateList((prev) => {
            return { ...prev, extra: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateExtra = () => {
    http().ExtraUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setExtraInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            institute: "",
            location: "",
            description: "",
          });
          setIsUpdateList((prev) => {
            return { ...prev, extra: { isUpdate: false } };
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "extra" });
        else setErrors(undefined);
      },
      {
        ...extraInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletExtra = (id) => {
    http().ExtraDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Extra Activities

  // Start Courses

  const handleCreateCourses = () => {
    http().CoursesCreate(
      ({ data }) => {
        if (data.status == 1) {
          setCoursesInputs({
            institute: "",
            fromDate: "",
            toDate: "",
            present: false,
            title: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "courses" });
        else setErrors(undefined);
      },
      {
        ...coursesInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleCourses = (id) => {
    http().CoursesShow(
      ({ data }) => {
        if (data.status == 1) {
          setCoursesInputs((prev) => {
            return { ...prev, ...data.course };
          });
          setIsUpdateList((prev) => {
            return { ...prev, courses: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateCourses = () => {
    http().CoursesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, courses: { isUpdate: false } };
          });
          setCoursesInputs({
            institute: "",
            fromDate: "",
            toDate: "",
            present: false,
            title: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "courses" });
        else setErrors(undefined);
      },
      { ...coursesInputs },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeleteCourses = (id) => {
    http().CoursesDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Courses

  // Start Internship
  const handleCreateInternships = () => {
    http().IntershipsCreate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
          setInternshipsInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            employer: "",
            location: "",
            description: "",
          });
        }
        if (data.status == 0)
          setErrors({ ...data.errors, typeE: "internship" });
        else setErrors(undefined);
      },
      {
        ...internshipsInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handelGetSingleInternships = (id) => {
    http().IntershipsShow(
      ({ data }) => {
        if (data.status == 1) {
          setInternshipsInputs((prev) => {
            return {
              ...prev,
              ...data.intership,
              location:
                data?.intership?.country?.title +
                ", " +
                data?.intership?.city?.title,
            };
          });
          setIsUpdateList((prev) => {
            return { ...prev, internship: { isUpdate: true } };
          });
          setErrors(undefined);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateInternships = () => {
    http().IntershipsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, internship: { isUpdate: false } };
          });
          handleGetCv();
          setInternshipsInputs({
            title: "",
            fromDate: "",
            toDate: "",
            present: false,
            employer: "",
            location: "",
            description: "",
          });
        }
        if (data.status == 0)
          setErrors({ ...data.errors, typeE: "internship" });
        else setErrors(undefined);
      },
      {
        ...internshipsInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletInternships = (id) => {
    http().IntershipsDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Internship

  // Start References
  const handleCreateReferences = () => {
    http().ReferencesCreate(
      ({ data }) => {
        if (data.status == 1) {
          setReferencesInputs({
            fullName: "",
            company: "",
            phone: "",
            email: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "reference" });
        else setErrors(undefined);
      },
      {
        fullName: referencesInputs.fullName,
        company: referencesInputs.company,
        phone: !isEmpty(referencesInputs.phone)
          ? referencesInputs.phone.includes("+")
            ? referencesInputs.phone
            : "+" + referencesInputs.phone
          : "",
        email: referencesInputs.email,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleReferences = (id) => {
    http().ReferencesShow(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, reference: { isUpdate: true } };
          });
          setErrors(undefined);
          setReferencesInputs((prev) => {
            return { ...prev, ...data.reference };
          });
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateReferences = () => {
    http().ReferencesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, reference: { isUpdate: false } };
          });
          setReferencesInputs({
            fullName: "",
            company: "",
            phone: "",
            email: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "reference" });
        else setErrors(undefined);
      },
      {
        id: referencesInputs.id,
        fullName: referencesInputs.fullName,
        company: referencesInputs.company,
        phone: !isEmpty(referencesInputs.phone)
          ? referencesInputs.phone.includes("+")
            ? referencesInputs.phone
            : "+" + referencesInputs.phone
          : "",
        email: referencesInputs.email,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletReferences = (id) => {
    http().ReferencesDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End References

  // Start Award
  const handleCreateAwards = () => {
    http().AwardsCreate(
      ({ data }) => {
        if (data.status == 1) {
          setAwardsInputs({
            title: "",
            date: "",
            description: "",
          });
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "award" });
        else setErrors(undefined);
      },
      {
        ...awardsInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSingleAwards = (id) => {
    http().AwardsShow(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, award: { isUpdate: true } };
          });
          setErrors(undefined);
          setAwardsInputs((prev) => {
            return { ...prev, ...data.award };
          });
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateAwards = () => {
    http().AwardsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setIsUpdateList((prev) => {
            return { ...prev, award: { isUpdate: false } };
          });
          handleGetCv();
          setAwardsInputs({
            title: "",
            date: "",
            description: "",
          });
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "award" });
        else setErrors(undefined);
      },
      { ...awardsInputs },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeleteAwards = (id) => {
    http().AwardsDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Awards

  // Start Portfolio
  const handleCreatePortfolio = () => {
    const form = new FormData();
    filelist.map((item) => {
      form.append("images", item.originFileObj);
    });
    form.append("title", portfolioInputs.title);
    if (portfolioInputs.link != "") form.append("link", portfolioInputs.link);
    if (portfolioInputs.videoLink != "")
      form.append("videoLink", portfolioInputs.videoLink);
    http().PortfoliosCreate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "portfolio" });
        else setErrors(undefined);

        setPortfolioInputs({
          title: "",
          link: "",
          videoLink: "",
        });
        setFilelist([]);
      },
      form,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetSinglePortfolio = (id) => {
    http().PortfoliosShow(
      ({ data }) => {
        if (data.status == 1) {
          setPortfolioInputs({
            id: data?.portfolio?.id,
            link: data?.portfolio?.link,
            videoLink: data?.portfolio?.videoLink,
            title: data?.portfolio?.title,
          });
          setFilelist(data?.portfolio?.images);
          setIsUpdateList((prev) => {
            return { ...prev, portfolio: { isUpdate: true } };
          });
          setErrors(undefined);
        }

        setResumeId(id);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdatePortfolio = () => {
    const form = new FormData();
    filelist.map((item) => {
      form.append("images", item.originFileObj);
    });
    form.append("title", portfolioInputs.title);
    form.append("id", portfolioInputs.id);
    if (portfolioInputs.link != "") form.append("link", portfolioInputs.link);
    if (portfolioInputs.videoLink != "")
      form.append("videoLink", portfolioInputs.videoLink);
    http().PortfoliosUpdate(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
        if (data.status == 0) setErrors({ ...data.errors, typeE: "portfolio" });
        else setErrors(undefined);
        setPortfolioInputs({
          title: "",
          link: "",
          videoLink: "",
        });
        setFilelist([]);

        setIsUpdateList((prev) => {
          return { ...prev, portfolio: { isUpdate: false } };
        });
      },
      form,
      portfolioInputs.id,
      (err) => {
        console.log(err);
      }
    );
  };

  const handleDeletePortfolio = (id) => {
    http().PortfoliosDelete(
      ({ data }) => {
        if (data.status == 1) {
          handleGetCv();
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeletePortfolioImage = (imageId) => {
    http().PortfoliosImageDelete(
      ({ data }) => {
        if (data.status == 1) {
          const array = [...filelist];
          const itemFilter = array.filter((item) => item?.imageId != imageId);
          setFilelist(itemFilter);
          handleGetCv();
        }
      },
      { imageId: imageId, id: resumeId },
      (err) => {
        console.log(err);
      }
    );
  };

  // End Portfolio

  // Start Hobbies
  const handleUpdateHobbies = () => {
    http().HobbiesUpdate(
      ({ data }) => {
        if (data.status == 1) {
          // setCv((prev) => {
          //   return { ...prev, hobbies: hobbiesInputs.hobbies };
          // });
        } else setErrors(undefined);
      },
      {
        ...hobbiesInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Hobbies

  // Start Additional
  const handleUpdateAdditional = () => {
    http().AdditionalInfoUpdate(
      ({ data }) => {
        if (data.status == 1) {
          // setCv((prev) => {
          //   return {
          //     ...prev,
          //     additionalInfo: additionalInputs.additionalInformation,
          //   };
          // });
        } else setErrors(undefined);
      },
      {
        ...additionalInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Additional

  // Start Publications
  const handleUpdatePublications = () => {
    http().PublicationsUpdate(
      ({ data }) => {
        if (data.status == 1) {
          // setCv((prev) => {
          //   return {
          //     ...prev,
          //     publications: publicationsInputs.publications,
          //   };
          // });
        } else setErrors(undefined);
      },
      {
        ...publicationsInputs,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Publications

  // Start Find Location

  const handleGeoCode = async (string = "") => {
    if (!isEmpty(string)) {
      const obj = {};
      const results = await getGeocode({ address: string || "" });
      const components = results[0].address_components;
      for (let i = 0; i < components.length; i++) {
        for (let j = 0; j < components[i].types.length; j++) {
          if (components[i].types[j] === "country") {
            obj.country = components[i].long_name;
          }
          if (components[i].types[j] === "administrative_area_level_1") {
            obj.state = components[i].long_name;
          }
          if (components[i].types[j] === "locality") {
            obj.city = components[i].long_name;
          }
        }
      }
      return obj;
    }
  };

  // End Find Location

  // Start Cv

  const handleGetCv = () => {
    if (currentUser?.id) {
      http().Cvs(
        ({ data }) => {
          if (data.status == 1) {
            setCv(data?.cv);
            setHobbiesInputs((prev) => {
              return { ...prev, hobbies: data?.cv?.hobbies };
            });
            setAdditionalInputs((prev) => {
              return {
                ...prev,
                additionalInformation: data?.cv?.additionalInfo,
              };
            });
            setPublicationsInputs((prev) => {
              return {
                ...prev,
                publications: data?.cv?.publications,
              };
            });
          }
        },
        currentUser?.id,
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const handleGenerateCv = () => {
    // setDownloadLoader(true);
  };
  // End Cv
  //***************************
  // define useEffect
  //***************************

  useEffect(async () => {
    setLoading(true);
    await Promise.all([
      handleGetTranslateLayout(),
      handleResumeProgress(),
      handleGetSocialList(),
      handleGetAllSocial(),
      handleGetPersonalInfo(),
      handleGetOtherInfo(),
      handleGetNationalityList(),
      handleGetIndustriesList(),
      handleGetAcademicLevelList(),
      handleGetCurrencies(),
      handleGetDrivingList(),
      handleGetCoverLetter(),
      handleGetAcademicLevel(),
      handleGetEmploymentType(),
      getCurrentUser(),
      handleGetSkillList(),
      handleGetLanguagesList(),
      handleGetLangLevel(),
      handleGetLangCertificates(),
      handleGetSalaryPeriod(),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);
  useEffect(async () => {
    if (router.isReady) await Promise.all([handleGetCv()]).finally(() => {});
  }, [currentUser]);

  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(inputsInfo.streetAddress);
      setInputsInfo((prev) => {
        return {
          ...prev,
          residentCountry: results?.country,
          residentState: results?.state,
          residentCity: results?.city,
        };
      });
    }
  }, [inputsInfo.streetAddress]);

  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(inputsInfo.birth);
      setInputsInfo((prev) => {
        return {
          ...prev,
          birthCountry: results?.country,
          birthCity: results?.city,
          birthState: results?.state,
        };
      });
    }
  }, [inputsInfo.birth]);

  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(educationInputs.location);
      setEducationInputs((prev) => {
        return {
          ...prev,
          country: results?.country,
          city: results?.city,
          state: results?.state,
        };
      });
    }
  }, [educationInputs.location]);
  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(experiencesInputs.location);
      setExperiencesInputs((prev) => {
        return {
          ...prev,
          country: results?.country,
          city: results?.city,
          state: results?.state,
        };
      });
    }
  }, [experiencesInputs.location]);
  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(extraInputs.location);
      setExtraInputs((prev) => {
        return {
          ...prev,
          country: results?.country,
          city: results?.city,
          state: results?.state,
        };
      });
    }
  }, [extraInputs.location]);
  useEffect(async () => {
    if (isLoaded) {
      const results = await handleGeoCode(internshipsInputs.location);
      setInternshipsInputs((prev) => {
        return {
          ...prev,
          country: results?.country,
          city: results?.city,
          state: results?.state,
        };
      });
    }
  }, [internshipsInputs.location]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      updatePersonalInfo();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [inputsInfo]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      updateOtherInfo();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [inputsOther]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleChangeCoverLetter();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [description]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleUpdateHobbies();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [hobbiesInputs]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleUpdateAdditional();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [additionalInputs]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleUpdatePublications();
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [publicationsInputs]);
  useEffect(() => {
    setExistInputs((prev) => {
      return {
        ...prev,
        skill: {
          show: cv?.userSkils?.length > 0 ? false : true,
          exist: cv?.userSkils?.length > 0 ? true : false,
          deleted: cv?.userSkils?.length > 0 ? true : false,
        },
        language: {
          show: cv?.userLanguages?.length > 0 ? false : true,
          exist: cv?.userLanguages?.length > 0 ? true : false,
          deleted: cv?.userLanguages?.length > 0 ? true : false,
        },
        expertise: {
          show: cv?.userExpertises?.length > 0 ? false : true,
          exist: cv?.userExpertises?.length > 0 ? true : false,
          deleted: cv?.userExpertises?.length > 0 ? true : false,
        },
        portfolio: {
          show: cv?.userPortfolios?.length > 0 ? false : true,
          exist: cv?.userPortfolios?.length > 0 ? true : false,
          deleted: cv?.userPortfolios?.length > 0 ? true : false,
        },
        extra: {
          show: cv?.userExtraActivities?.length > 0 ? false : true,
          exist: cv?.userPortfolios?.length > 0 ? true : false,
          deleted: cv?.userPortfolios?.length > 0 ? true : false,
        },
        courses: {
          show: cv?.userExtraActivities?.length > 0 ? false : true,
          exist: cv?.userExtraActivities?.length > 0 ? true : false,
          deleted: cv?.userExtraActivities?.length > 0 ? true : false,
        },
        internship: {
          show: cv?.userInterships?.length > 0 ? false : true,
          exist: cv?.userInterships?.length > 0 ? true : false,
          deleted: cv?.userInterships?.length > 0 ? true : false,
        },
        reference: {
          show: cv?.userReferences?.length > 0 ? false : true,
          exist: cv?.userReferences?.length > 0 ? true : false,
          deleted: cv?.userReferences?.length > 0 ? true : false,
        },
        award: {
          show: cv?.userAwards?.length > 0 ? false : true,
          exist: cv?.userAwards?.length > 0 ? true : false,
          deleted: cv?.userAwards?.length > 0 ? true : false,
        },
        hobbies: {
          show: cv?.hobbies ? false : true,
          exist: cv?.hobbies ? true : false,
          deleted: cv?.hobbies ? true : false,
        },
        additionalInfo: {
          show: cv?.additionalInfo ? false : true,
          exist: cv?.additionalInfo ? true : false,
          deleted: cv?.additionalInfo ? true : false,
        },
        publications: {
          show: cv?.publications ? false : true,
          exist: cv?.publications ? true : false,
          deleted: cv?.publications ? true : false,
        },
      };
    });
  }, [cv]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight + 80);
      if (window.innerHeight <= 1500) {
        setWidth(window.innerWidth / 2 - 80);
      }
      if (window.innerWidth <= 1024) {
        setWidth(window.innerWidth / 2 + 80);
      } else {
        setWidth(window.innerWidth / 2 - 60);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHeight(window.innerHeight + 80);
      if (window.innerHeight <= 1500) {
        setWidth(window.innerWidth / 2 - 80);
      }
      if (window.innerWidth <= 1024) {
        setWidth(window.innerWidth / 2 + 80);
      } else {
        setWidth(window.innerWidth / 2 - 60);
      }
    }, 10000);
  }, []);

  return (
    <Authenticated removeLoader={true} backToLogin={true}>
      <Authorization>
        <ResumeLayout title="reume builder" theme={theme?.light}>
          <Row>
            <Col xl={{ span: 13 }} lg={{ span: 12 }} md={{ span: 12 }}>
              <ResumeSidebar
                salary={salary}
                setModalTheme={setModalTheme}
                router={router}
                updateList={updateList}
                cv={cv}
                handleBack={handleBack}
                errors={errors}
                drivingRecoil={drivingRecoil}
                currencies={currencies}
                industries={industries}
                academicLevels={academicLevels}
                nationalities={nationalities}
                myResumeTranslate={myResumeTranslate}
                theme={theme?.light}
                progress={progress}
                currentUser={currentUser}
                socialsInputs={socialsInputs}
                setVisivle={setVisivle}
                handleOpenProf={handleOpenProf}
                inputsInfo={inputsInfo}
                InfoRecoil={InfoRecoil}
                handleSendSms={handleSendSms}
                setInputsInfo={setInputsInfo}
                inputsOther={inputsOther}
                setInputsOther={setInputsOther}
                otherRecoil={otherRecoil}
                updatePersonalInfo={updatePersonalInfo}
                updateOtherInfo={updateOtherInfo}
                description={description}
                setDescription={setDescription}
                filelist={filelist}
                setFilelist={setFilelist}
                academicLevel={academicLevel}
                educationInputs={educationInputs}
                setEducationInputs={setEducationInputs}
                handleCreateEducation={handleCreateEducation}
                handleGetSingleEducation={handleGetSingleEducation}
                handleUpdateEducation={handleUpdateEducation}
                handleDeletEducation={handleDeletEducation}
                employmentType={employmentType}
                experiencesInputs={experiencesInputs}
                setExperiencesInputs={setExperiencesInputs}
                handleCreateExperiences={handleCreateExperiences}
                handleGetSingleExperiences={handleGetSingleExperiences}
                handleUpdateExperiences={handleUpdateExperiences}
                handleDeletExperiences={handleDeletExperiences}
                skillsInputs={skillsInputs}
                setSkillsInputs={setSkillsInputs}
                handleCreateSkills={handleCreateSkills}
                handleGetSingleSkills={handleGetSingleSkills}
                handleUpdateSkills={handleUpdateSkills}
                handleDeletSkills={handleDeletSkills}
                skillsList={skillsList}
                languagesList={languagesList}
                languageLevel={languageLevel}
                languageCertificates={languageCertificates}
                languageInputs={languageInputs}
                setLanguageInput={setLanguageInput}
                handleCreateLanguages={handleCreateLanguages}
                handleGetSingleLang={handleGetSingleLang}
                handleUpdateLanguage={handleUpdateLanguage}
                handleDeletLanguage={handleDeletLanguage}
                expertisesInputs={expertisesInputs}
                setExpertisesInput={setExpertisesInput}
                handleCreateExpertises={handleCreateExpertises}
                handleGetSingleExpertises={handleGetSingleExpertises}
                handleUpdateExpertises={handleUpdateExpertises}
                handleDeletExpertises={handleDeletExpertises}
                extraInputs={extraInputs}
                setExtraInputs={setExtraInputs}
                handleCreateExtra={handleCreateExtra}
                handleGetSingleExtra={handleGetSingleExtra}
                handleUpdateExtra={handleUpdateExtra}
                handleDeletExtra={handleDeletExtra}
                coursesInputs={coursesInputs}
                setCoursesInputs={setCoursesInputs}
                handleCreateCourses={handleCreateCourses}
                handleGetSingleCourses={handleGetSingleCourses}
                handleUpdateCourses={handleUpdateCourses}
                handleDeleteCourses={handleDeleteCourses}
                internshipsInputs={internshipsInputs}
                setInternshipsInputs={setInternshipsInputs}
                handleCreateInternships={handleCreateInternships}
                handelGetSingleInternships={handelGetSingleInternships}
                handleUpdateInternships={handleUpdateInternships}
                handleDeletInternships={handleDeletInternships}
                referencesInputs={referencesInputs}
                setReferencesInputs={setReferencesInputs}
                handleCreateReferences={handleCreateReferences}
                handleGetSingleReferences={handleGetSingleReferences}
                handleUpdateReferences={handleUpdateReferences}
                handleDeletReferences={handleDeletReferences}
                awardsInputs={awardsInputs}
                setAwardsInputs={setAwardsInputs}
                handleCreateAwards={handleCreateAwards}
                handleGetSingleAwards={handleGetSingleAwards}
                handleUpdateAwards={handleUpdateAwards}
                handleDeleteAwards={handleDeleteAwards}
                hobbiesInputs={hobbiesInputs}
                setHobbiesInputs={setHobbiesInputs}
                additionalInputs={additionalInputs}
                setAdditionalInputs={setAdditionalInputs}
                publicationsInputs={publicationsInputs}
                setPublicationsInputs={setPublicationsInputs}
                portfolioInputs={portfolioInputs}
                setPortfolioInputs={setPortfolioInputs}
                handleCreatePortfolio={handleCreatePortfolio}
                handleGetSinglePortfolio={handleGetSinglePortfolio}
                handleUpdatePortfolio={handleUpdatePortfolio}
                handleDeletePortfolio={handleDeletePortfolio}
                handleDeletePortfolioImage={handleDeletePortfolioImage}
                existInputs={existInputs}
                setExistInputs={setExistInputs}
                handleDeleteAvatar={handleDeleteAvatar}
              />
            </Col>
            <Col
              className="md:block hidden"
              xl={{ span: 11 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <ResumeContent
                handleGenerateCv={handleGenerateCv}
                donwloadLoader={donwloadLoader}
                height={height}
                width={width}
                cvLoader={cvLoader}
                handleShowCvType={handleShowCvType}
                handleBack={handleBack}
                cvTarget={cvTarget}
                modalTheme={modalTheme}
                setModalTheme={setModalTheme}
                cv={cv}
                theme={theme?.light}
                blob={blob}
              />
            </Col>
          </Row>
          <AddSocialModal
            myProfileTranslate={myResumeTranslate}
            socialsRecil={socialsRecil}
            handleClose={handleClose}
            theme={theme.light}
            visible={visible}
            handleCreateSocial={handleCreateSocial}
            socialsInputs={socialsInputs}
            setSingleSocialInputs={setSingleSocialInputs}
            singleSocialInput={singleSocialInput}
            setSocialsInputs={setSocialsInputs}
            handleDeleteSocial={handleDeleteSocial}
            handleGetSingleSocial={handleGetSingleSocial}
            handleUpdateSocial={handleUpdateSocial}
          />
          <ImageCroperModal
            disabledButton={uploaderLoader}
            myProfileTranslate={myResumeTranslate}
            isProf={isProf}
            currentUser={cv}
            handleChangeAvatar={handleChangeAvatar}
            handleClose={handleCloseProf}
            visible={profileShow}
            theme={theme.light}
            step={step}
            setStep={setStep}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            setYourImage={setYourImage}
            yourImage={yourImage}
            zoom={zoom}
            setZoom={setZoom}
            rotate={rotate}
            setRotate={setRotate}
          />
          <VerifyPhoneModal
            myProfileTranslate={myResumeTranslate}
            theme={theme.light}
            visible={verifyPhone}
            handleClose={closeVerifyModal}
            setInputsPhone={setInputsPhone}
            inputsPhone={inputsPhone}
            handleVerifyPhone={handleVerifyPhone}
            disabledButton={disabledButton}
          />
        </ResumeLayout>
      </Authorization>
    </Authenticated>
  );
}
