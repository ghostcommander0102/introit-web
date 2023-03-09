import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import TabBarProfile from "components/shared/TabBarProfile";
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
import axios from "axios";
import { LanguageApp } from "atoms/LanguageApp";
import { MyProfile } from "atoms/translate/MyProfile";
import { Sidebar } from "atoms/Sidebar";
import { Layout } from "atoms/translate/Layout";
import { PercentageUser } from "atoms/PercentageUser";
import SidebarProfile from "components/shared/SidebarProfile";
import CovertLetter from "components/shared/CovertLetter";
import SocialNetworks from "components/shared/SocialNetworks";
import Authorization from "layouts/Authorization";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
const Profile = () => {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
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
  //***************************
  // define state
  //***************************
  const [coverVisible, setCoverVisible] = useState(false);
  const [tab, setTab] = useState(1);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isProf, setIsProf] = useState();
  const [croppedImage, setCroppedImage] = useState("");
  const [yourImage, setYourImage] = useState();
  const [multyAuthShow, setMultyAuthShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [description, setDescription] = useState({
    description: "",
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
  });
  const [inputsSecurity, setInputsSecurity] = useState({
    confirmPassowrd: "",
    oldPassword: "",
    newPassword: "",
    question1Id: "",
    answer1: "",
    question2Id: "",
    answer2: "",
    question3Id: "",
    answer3: "",
  });
  const [inputsPhone, setInputsPhone] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [socialsInputs, setSocialsInputs] = useState();
  const [singleSocialInput, setSingleSocialInputs] = useState({
    socialId: "",
    username: "",
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

  const handleChangeTab = (tab) => {
    setTab(tab);
  };
  const handleOpenBanner = () => {
    setIsProf("banner");
    setProfileShow(true);
    setCroppedImage("");
    setYourImage("");
    setStep(1);
    setZoom(1);
    setRotate(0);
  };
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
  const updatePersonalInfo = () => {
    setDisabledButton(true);

    http().UpdatePersonalInformation(
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
    http().OtherInformation(
      ({ data }) => {
        JSON.stringify(data, function(key, value) { return (value === null) ? "" : value });
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
  const updateOtherInfo = () => {
    setDisabledButton(true);

    http().UpdateOtherInformation(
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
            confirmPassowrd: data.personalInfo.confirmPassowrd || "",
            oldPassword: data.personalInfo.oldPassword || "",
            newPassword: data.personalInfo.newPassword || "",
            question1Id: data.personalInfo.question1Id || "",
            answer1: data.personalInfo.answer1 || "",
            question2Id: data.personalInfo.question2Id || "",
            answer2: data.personalInfo.answer2 || "",
            question3Id: data.personalInfo.question3Id || "",
            answer3: data.personalInfo.answer3 || "",
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
          setCoverVisible(false);
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
            socialId: "",
            username: "",
          });
        }
        if (data.status == -1) {
          toast({ message: data.error, type: "error" });
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
  const handleGeoCode = async (string = "") => {
    if (!isEmpty(string)) {
      const obj = {};
      const results = await getGeocode({ address: string || "" });
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
              console.log("item", item);
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
    ]).finally(() => {
      setLoading(false);
    });
  }, [language]);
  useEffect(() => {
    if (router.isReady) setLoading(true);
  }, [router.isReady]);
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

  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout
        hasSubSidebar={true}
        hasRadius={false}
        subSidebarContent={
          <>
            <div style={{ height: "47.9%" }}>
              <SidebarProfile
                edit={true}
                tab={tab}
                handleChangeTab={handleChangeTab}
                currentUser={currentUser}
                handleOpenBanner={handleOpenBanner}
                handleOpenProf={handleOpenProf}
                theme={theme.light}
                myProfileTranslate={myProfileTranslate}
              />
            </div>
            <div style={{ height: "42.1%", marginTop: 6 }}>
              <CovertLetter
                coverVisible={coverVisible}
                setCoverVisible={setCoverVisible}
                edit={true}
                myProfileTranslate={myProfileTranslate}
                theme={theme.light}
                description={description.description}
                setDescription={setDescription}
                handleChangeDescription={handleChangeDescription}
              />
            </div>
            <div style={{ height: "20%", marginTop: 6 }}>
              <SocialNetworks
                edit={true}
                myProfileTranslate={myProfileTranslate}
                theme={theme.light}
                socialsInputs={socialsInputs}
                handleShow={handleShow}
              />
            </div>
          </>
        }
        title="Profile"
      >
        <Authorization>
          <TabBarProfile
            currentUser={currentUser}
            layoutTranslate={layoutTranslate}
            percentage={percentage}
            myProfileTranslate={myProfileTranslate}
            handleGenerateMultyAuth={handleGenerateMultyAuth}
            handleDisableMultyAuth={handleDisableMultyAuth}
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            handleChangeTab={handleChangeTab}
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
            setCoverVisible={setCoverVisible}
            coverVisible={coverVisible}
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
          />
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
};
export default Profile;
