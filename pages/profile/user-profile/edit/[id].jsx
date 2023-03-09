import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import TabBarProfile from "/components/shared/TabBarProfile";
import UserLayout from "/layouts/UserLayout";
import MultyAuthModal from "/components/shared/MultyAuthModal";
import { http } from "utils/http";
import useToast from "/hooks/useToast";
import { MultyAuth } from "/atoms/MultyAuth";
import { AcademicLevels } from "/atoms/AcademicLevels";
import { Countries } from "/atoms/Countries";
import { Nationalities } from "/atoms/Nationalities";
import { SecurityQuestions } from "/atoms/SecurityQuestions";
import { Industries } from "/atoms/Industries";
import { Currencies } from "/atoms/Currencies";
import { PersonalInfo } from "/atoms/PersonalInfo";
import { OtherInfo } from "/atoms/OtherInfo";
import { SecurityInfo } from "/atoms/SecurityInfo";
import { Loading } from "/atoms/Loading";
import { Errors } from "/atoms/Errors";
import { useRouter } from "next/router";
import VerifyPhoneModal from "components/shared/VerifyPhoneModal";
import { CurrentUser } from "atoms/CurrentUser";
import Authenticated from "layouts/Authenticated";
import AddSocialModal from "/components/shared/AddSocialModal";
import { Socials } from "/atoms/Socials";
import ImageCroperModal from "components/shared/ImageCroperModal";
import { isEmpty } from "lodash";
import { Driving } from "atoms/Driving";
import { Gender } from "atoms/Genders";
import { LanguageApp } from "atoms/LanguageApp";
import { MyProfile } from "atoms/translate/MyProfile";
import { Layout } from "atoms/translate/Layout";
import { PercentageUser } from "atoms/PercentageUser";
import SidebarProfile from "components/shared/SidebarProfile";
import CovertLetter from "components/shared/CovertLetter";
import SocialNetworks from "components/shared/SocialNetworks";
import Authorization from "layouts/Authorization";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
import { UserDetail } from "atoms/UserDetail";
import UserTabBarProfile from "components/shared/UserTabBarProfile";
const Profile = () => {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  const userId = router?.query?.id;
  const {
    suggestions: { data: address },
  } = usePlacesAutocomplete();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [, setLoading] = useRecoilState(Loading);
  const [multyAuth, setMultyAuth] = useRecoilState(MultyAuth);
  const [academicLevels, setAcademicLevels] = useRecoilState(AcademicLevels);
  const [countries, setCountries] = useRecoilState(Countries);
  const [nationalities, setNationalities] = useRecoilState(Nationalities);
  const [questions, setQuestions] = useRecoilState(SecurityQuestions);
  const [industries, setIndustries] = useRecoilState(Industries);
  const [currencies, setCurrencies] = useRecoilState(Currencies);
  const [InfoRecoil, setInfoRecoil] = useRecoilState(PersonalInfo);
  const [otherRecoil, setOtherRecoil] = useRecoilState(OtherInfo);
  const [securityRecoil, setSecurityRecoil] = useRecoilState(SecurityInfo);
  const [socialsRecil, setSocialsRecil] = useRecoilState(Socials);
  const [gendersRecoil, setGendersRecoil] = useRecoilState(Gender);
  const [drivingRecoil, setDrivingRecoil] = useRecoilState(Driving);
  const [errors, setErrors] = useRecoilState(Errors);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
  const [language] = useRecoilState(LanguageApp);
  const [myProfileTranslate, setMyProfileTranslate] = useRecoilState(MyProfile);
  const [layoutTranslate] = useRecoilState(Layout);
  const [percentage] = useRecoilState(PercentageUser);
  const [userDetail, setUserDetail] = useRecoilState(UserDetail);
  //***************************
  // define state
  //***************************
  const [readOnly, setReadOnly] = useState(true);
  const [tab, setTab] = useState(1);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isProf, setIsProf] = useState();
  const [croppedImage, setCroppedImage] = useState(null);
  const [yourImage, setYourImage] = useState();
  const [multyAuthShow, setMultyAuthShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [description, setDescription] = useState({
    description: null,
  });
  const [inputsInfo, setInputsInfo] = useState({
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    phone: null,
    streetAddress: null,
    latitude: null,
    longitude: null,
    genderId: null,
    residentCountry: null,
    residentState: null,
    residentCity: null,
    birthCountry: null,
    birthCity: null,
    birthState: null,
    birth: "",
  });

  const [inputsOther, setInputsOther] = useState({
    jobTitle: null,
    nationalityId: null,
    academicLevelId: null,
    industryId: null,
    currencyId: null,
    minSalary: null,
    maxSalary: null,
    drivingLicenseId: null,
    website: null,
  });
  const [inputsSecurity, setInputsSecurity] = useState({
    confirmPassowrd: null,
    oldPassword: null,
    newPassword: null,
    question1Id: null,
    answer1: null,
    question2Id: null,
    answer2: null,
    question3Id: null,
    answer3: null,
  });
  const [inputsPhone, setInputsPhone] = useState({
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
  });
  const [socialsInputs, setSocialsInputs] = useState();
  const [singleSocialInput, setSingleSocialInputs] = useState({
    socialId: null,
    username: null,
  });
  // ***************************
  // define function
  // ***************************
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
  const handleChangeReadOnly = () => {
    setReadOnly(false);
  };
  const handleCancelReadOnly = () => {
    setReadOnly(true);
  };
  const handleChangeTab = (tab) => {
    setTab(tab);
  };
  const handleOpenBanner = () => {
    setIsProf("banner");
    setProfileShow(true);
    setCroppedImage(null);
    setYourImage(null);
    setStep(1);
    setZoom(1);
    setRotate(0);
  };
  const handleOpenProf = () => {
    setIsProf("profile");
    setProfileShow(true);
    setCroppedImage(null);
    setYourImage(null);
    setStep(1);
    setZoom(1);
    setRotate(0);
  };
  const handleCloseProf = () => {
    setProfileShow(false);
  };
  const handleClose = () => setShow(false);
  const handleCloseAuth = () => setMultyAuthShow(false);
  const handleShow = () => setShow(true);
  const showVerifyModal = () => setVerifyPhone(true);
  const closeVerifyModal = () => setVerifyPhone(false);
  const handleDuplicate = () => {
    const text = document.querySelector(".setup-key").innerHTML;
    navigator.clipboard.writeText(text);
    toast({ type: "success", message: "Copied" });
  };
  const handleGenerateMultyAuth = () => {
    http().Generate2fa(
      ({ data }) => {
        setMultyAuthShow(true);
        setMultyAuth(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleEnableMultyAuth = () => {
    http().Enable2fa(
      ({ data }) => {
        if (data.status == 1) {
          setMultyAuthShow(false);
          handleGetSecurityInfo();
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
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
  const handleDisableMultyAuth = () => {
    http().Disable2fa(
      ({ data }) => {
        if (data.status == 1) {
          handleGetSecurityInfo();
          setMultyAuth(data);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
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
  const handleUserDetail = () => {
    http().Cvs(
      ({ data }) => {
        setUserDetail(data?.cv);
      },
      userId,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetPersonalInfo = () => {
    http().UserPersonalInfo(
      ({ data }) => {
        if (data.status == 1) {
          setInputsInfo({
            firstName: data.personalInfo.firstName || null,
            lastName: data.personalInfo.lastName || null,
            dateOfBirth: data.personalInfo.dateOfBirth || null,
            phone: data.personalInfo.phone || null,
            streetAddress: data.personalInfo.streetAddress || null,
            latitude: data.personalInfo.latitude || null,
            longitude: data.personalInfo.longitude || null,
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
      userId,
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
  const updatePersonalInfo = () => {
    setDisabledButton(true);

    http().UserPersonalInfoUpdate(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleGetPersonalInfo();
          getCurrentUser();
          setTab(2);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDisabledButton(false);
      },
      {
        id: userId,
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
        setDisabledButton(false);
      }
    );
  };
  const handleGetOtherInfo = () => {
    http().UserOtherInfo(
      ({ data }) => {
        if (data.status == 1) {
          setInputsOther({
            jobTitle: data.personalInfo.jobTitle || null,
            nationalityId: data.personalInfo.nationalityId || null,
            industryId: data.personalInfo.industryId || null,
            currencyId: data.personalInfo.currencyId || null,
            academicLevelId: data.personalInfo.academicLevelId || null,
            minSalary: data.personalInfo.minSalary || null,
            maxSalary: data.personalInfo.maxSalary || null,
            drivingLicenseId: data.personalInfo.drivingLicenseId || null,
            website: data.personalInfo.website || null,
          });
          setOtherRecoil(data.personalInfo);
        }
      },
      userId,
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
    http().UserOtherInfoUpdate(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleGetOtherInfo();
          getCurrentUser();
          router.push("/profile/resume");
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDisabledButton(false);
      },
      {
        id: userId,
        editorId: currentUser?.id,
        jobTitle: inputsOther.jobTitle,
        nationalityId: inputsOther.nationalityId,
        academicLevelId: inputsOther.academicLevelId,
        industryId: inputsOther.industryId,
        currencyId: inputsOther.currencyId,
        minSalary:
          inputsOther.minSalary != null
            ? inputsOther?.minSalary?.toString()
            : null,
        maxSalary:
          inputsOther.maxSalary != null
            ? inputsOther?.maxSalary?.toString()
            : null,
        drivingLicenseId: inputsOther.drivingLicenseId,
        website: inputsOther.website,
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
        setDisabledButton(false);
      }
    );
  };
  const handleGetSecurityInfo = () => {
    http().SecurityInformation(
      ({ data }) => {
        if (data.status == 1) {
          setInputsSecurity({
            confirmPassowrd: data.personalInfo.confirmPassowrd || null,
            oldPassword: data.personalInfo.oldPassword || null,
            newPassword: data.personalInfo.newPassword || null,
            question1Id: data.personalInfo.question1Id || null,
            answer1: data.personalInfo.answer1 || null,
            question2Id: data.personalInfo.question2Id || null,
            answer2: data.personalInfo.answer2 || null,
            question3Id: data.personalInfo.question3Id || null,
            answer3: data.personalInfo.answer3 || null,
          });
          setSecurityRecoil(data.personalInfo);
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
  const updateSecurityInfo = () => {
    if (
      !isEmpty(inputsSecurity.newPassword) ||
      !isEmpty(inputsSecurity.confirmPassowrd)
    ) {
      if (inputsSecurity.newPassword != inputsSecurity.confirmPassowrd) {
        return toast({
          type: "error",
          message: "password and confirmation password is  not equal",
        });
      }
    }

    setDisabledButton(true);
    http().UpdateSecurityInformation(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleGetSecurityInfo();
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDisabledButton(false);
      },
      {
        editorId: currentUser?.id,
        oldPassword: inputsSecurity.oldPassword,
        newPassword: inputsSecurity.newPassword,
        question1Id: inputsSecurity.question1Id,
        answer1: inputsSecurity.answer1,
        question2Id: inputsSecurity.question2Id,
        answer2: inputsSecurity.answer2,
        question3Id: inputsSecurity.question3Id,
        answer3: inputsSecurity.answer3,
      },
      (err) => {
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
        setDisabledButton(false);
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
          setDisabledButton(false);
          setInputsPhone({
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            six: null,
          });
          handleGetPersonalInfo();
        }
        if (data.status == -1) {
          setDisabledButton(false);
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
        setDisabledButton(false);
        console.log(err);
      }
    );
  };
  const handleChangeDescription = () => {
    http().DescriptionUpdate(
      ({ data }) => {
        if (data.status == 1) {
          setReadOnly(true);
          toast({ type: "success", message: data.message });
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
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
  const handleChangeAvatar = (image) => {
    if (isProf == "profile") {
      const formData = new FormData();
      formData.append("image", image);

      http().UpdateAvatar(
        ({ data }) => {
          if (data.status == 1) {
            toast({ message: data.message, type: "success" });
            setCroppedImage(null);
            setYourImage(null);
            setStep(1);
            setProfileShow(false);
            setZoom(1);
            setRotate(0);
            getCurrentUser();
          }
          if (data.status == -1) {
            toast({ message: data.error, type: "error" });
          }
          setDisabledButton(false);
        },
        formData,
        (err) => {
          setDisabledButton(false);
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
            setCroppedImage(null);
            setYourImage(null);
            setStep(1);
            setProfileShow(false);
            setZoom(1);
            setRotate(0);
            getCurrentUser();
          }
          if (data.status == -1) {
            toast({ message: data.error, type: "error" });
          }
          setDisabledButton(false);
        },
        formData,
        (err) => {
          console.log(err);
          setDisabledButton(false);
        }
      );
    }
  };

  // Start Social
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
            socialId: null,
            username: null,
          });
        }
        setDisabledButton(false);
      },
      obj,
      (err) => {
        console.log(err);
        setDisabledButton(false);
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

  // Start Translate
  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setMyProfileTranslate(obj);
      },
      31,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Translate

  // Start Find Location
  const handleGeoCode = async (string = null) => {
    if (!isEmpty(string)) {
      const obj = {};
      const results = await getGeocode({ address: string || null });
      console.log("results map api", results);
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

  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    if (
      inputsPhone.one &&
      inputsPhone.two &&
      inputsPhone.three &&
      inputsPhone.four &&
      inputsPhone.five &&
      inputsPhone.six
    ) {
      handleVerifyPhone();
    }
  }, [inputsPhone]);
  useEffect(() => {
    if (router.isReady) setLoading(true);
  }, [router.isReady]);
  useEffect(async () => {
    await Promise.all([
      http().SecurityQuestions(
        ({ data }) => {
          if (data.status == 1) {
            const custome = [];
            data?.list?.map((item) => {
              custome.push({
                label: item?.title,
                value: item.id,
              });
            });
            setQuestions(custome);
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
      ),
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
      ),
      http().Countries(
        ({ data }) => {
          if (data.status == 1) {
            const custome = [];
            data?.list?.map((item) => {
              custome.push({
                label: item?.title,
                value: item.id,
              });
            });
            setCountries(custome);
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
      ),
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
      ),
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
      ),
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
      ),
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
      ),
      http().SocialsSetting(
        ({ data }) => {
          if (data.status == 1) {
            const custome = [];
            data?.socials?.map((item) => {
              custome.push({
                value: item.id,
                label: item.name,
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
      ),
      http().Genders(
        ({ data }) => {
          if (data.status == 1) {
            const custome = [];
            data?.list?.map((item) => {
              custome.push({
                value: item.id,
                label: item?.title,
              });
            });
            setGendersRecoil(custome);
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
      ),
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
      ),
      handleGetAllSocial(),
      handleGetSecurityInfo(),
      handleGetOtherInfo(),
      handleGetPersonalInfo(),
      handleGetTranslateLayout(),
      handleUserDetail(),
    ]).finally(() => {
      setLoading(false);
    });
  }, [userId]);

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
    console.log("inputsInfo.birth", inputsInfo.birth);
  }, [inputsInfo.birth]);
  console.log("userDetail", userDetail);
  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout
        hasSubSidebar={true}
        hasRadius={false}
        subSidebarContent={
          <>
            <div style={{ height: "47.9%" }}>
              <SidebarProfile
                edit={false}
                tab={tab}
                handleChangeTab={handleChangeTab}
                currentUser={userDetail}
                handleOpenBanner={handleOpenBanner}
                handleOpenProf={handleOpenProf}
                theme={theme.light}
                myProfileTranslate={myProfileTranslate}
              />
            </div>
            <div style={{ height: "29.1%", marginTop: 6 }}>
              <CovertLetter
                edit={false}
                myProfileTranslate={myProfileTranslate}
                handleCancelReadOnly={handleCancelReadOnly}
                handleChangeReadOnly={handleChangeReadOnly}
                readOnly={readOnly}
                theme={theme.light}
                description={userDetail?.description}
                setDescription={setDescription}
                handleChangeDescription={handleChangeDescription}
              />
            </div>
            <div style={{ height: "33%", marginTop: 6 }}>
              <SocialNetworks
                edit={false}
                myProfileTranslate={myProfileTranslate}
                theme={theme.light}
                socialsInputs={userDetail?.userSocials}
                handleShow={handleShow}
              />
            </div>
          </>
        }
        title="Profile"
      >
        <Authorization>
          <UserTabBarProfile
            verifyPhoneEdit={false}
            userDetail={userDetail}
            currentUser={currentUser}
            layoutTranslate={layoutTranslate}
            percentage={percentage}
            myProfileTranslate={myProfileTranslate}
            handleGenerateMultyAuth={handleGenerateMultyAuth}
            handleDisableMultyAuth={handleDisableMultyAuth}
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            handleCancelReadOnly={handleCancelReadOnly}
            handleChangeReadOnly={handleChangeReadOnly}
            handleChangeTab={handleChangeTab}
            readOnly={readOnly}
            theme={theme.light}
            tab={tab}
            academicLevels={academicLevels}
            countries={countries}
            nationalities={nationalities}
            questions={questions}
            setQuestions={setQuestions}
            industries={industries}
            currencies={currencies}
            InfoRecoil={InfoRecoil}
            otherRecoil={otherRecoil}
            securityRecoil={securityRecoil}
            setInputsInfo={setInputsInfo}
            inputsInfo={inputsInfo}
            updatePersonalInfo={updatePersonalInfo}
            setInputsSecurity={setInputsSecurity}
            inputsSecurity={inputsSecurity}
            setInputsOther={setInputsOther}
            inputsOther={inputsOther}
            updateOtherInfo={updateOtherInfo}
            updateSecurityInfo={updateSecurityInfo}
            errors={errors}
            handleSendSms={handleSendSms}
            description={description}
            setDescription={setDescription}
            handleChangeDescription={handleChangeDescription}
            handleOpenProf={handleOpenProf}
            handleOpenBanner={handleOpenBanner}
            disabledButton={disabledButton}
            drivingRecoil={drivingRecoil}
            gendersRecoil={gendersRecoil}
            socialsInputs={socialsInputs}
            handleGeoCode={handleGeoCode}
            address={address}
          />
          <MultyAuthModal
            myProfileTranslate={myProfileTranslate}
            handleDuplicate={handleDuplicate}
            multyAuth={multyAuth}
            handleClose={handleCloseAuth}
            theme={theme.light}
            visible={multyAuthShow}
            handleEnableMultyAuth={handleEnableMultyAuth}
          />
          <VerifyPhoneModal
            myProfileTranslate={myProfileTranslate}
            theme={theme.light}
            visible={verifyPhone}
            handleClose={closeVerifyModal}
            setInputsPhone={setInputsPhone}
            inputsPhone={inputsPhone}
            handleVerifyPhone={handleVerifyPhone}
            disabledButton={disabledButton}
          />
          <AddSocialModal
            myProfileTranslate={myProfileTranslate}
            disabledButton={disabledButton}
            socialsRecil={socialsRecil}
            handleClose={handleClose}
            theme={theme.light}
            visible={show}
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
            myProfileTranslate={myProfileTranslate}
            isProf={isProf}
            currentUser={currentUser}
            disabledButton={disabledButton}
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
          />{" "}
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
};
export default Profile;
