import React, { useState, useEffect } from "react";
import { Theme } from "atoms/Theme";
import SettingsContent from "components/shared/SettingsContent";
import Authenticated from "layouts/Authenticated";
import UserLayout from "layouts/UserLayout";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { CurrentUser } from "atoms/CurrentUser";
import { http } from "utils/http";
import { LanguageApp } from "atoms/LanguageApp";
import { TimeZone } from "atoms/resume/TimeZone";
import { Currencies } from "atoms/Currencies";
import { LanguagesList } from "atoms/LanguagesList";
import { MySettings } from "atoms/translate/MySettings";
import useToast from "hooks/useToast";
import ButtonTabBar from "components/shared/ButtonTabBar";
import General from "/public/assets/images/svgs/general.svg";
import GeneralActive from "/public/assets/images/svgs/general-active.svg";
import GeneralDark from "/public/assets/images/svgs/dark/general.svg";
import GeneralActiveDark from "/public/assets/images/svgs/dark/general-active.svg";
import Notif from "/public/assets/images/svgs/notif.svg";
import NotifActive from "/public/assets/images/svgs/notif-active.svg";
import NotifDark from "/public/assets/images/svgs/dark/notif.svg";
import NotifActiveDark from "/public/assets/images/svgs/dark/notif-active.svg";
import Privacy from "/public/assets/images/svgs/privacy.svg";
import PrivacyActive from "/public/assets/images/svgs/privacy-active.svg";
import PrivacyDark from "/public/assets/images/svgs/dark/privacy.svg";
import PrivacyActiveDark from "/public/assets/images/svgs/dark/privacy-active.svg";
import Account from "/public/assets/images/svgs/account-mangement.svg";
import AccountActive from "/public/assets/images/svgs/account-mangement-active.svg";
import AccountDark from "/public/assets/images/svgs/dark/account-mangement.svg";
import AccountActiveDark from "/public/assets/images/svgs/dark/account-mangement-active.svg";
import Styles from "/styles/scss/common/Pages.module.scss";
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
  const [theme, setTheme] = useRecoilState(Theme);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
  const [language] = useRecoilState(LanguageApp);
  const [timeZone, setTimeZone] = useRecoilState(TimeZone);
  const [currnecy, setCurrnecy] = useRecoilState(Currencies);
  const [languagesList, setLanguageList] = useRecoilState(LanguagesList);
  const [mySettingsTranslate, setMySettingsTranslate] =
    useRecoilState(MySettings);
  //***************************
  // define state
  //***************************

  const [tab, setTab] = useState(1);
  const [accountTab, setAccountTab] = useState(0);
  const [timeZoneInputs, setTimeZoneInputs] = useState({
    timezoneId: null,
  });
  const [currnecyInputs, setCurrnecyInputs] = useState({
    currencyId: null,
  });
  const [languageInputs, setLanguageInputs] = useState({
    languageId: null,
  });
  const [themeInputs, setThemeInputs] = useState({
    themeId: currentUser?.theme?.id,
  });
  const [notifInputs, setNotifInputs] = useState();
  const [notifActive, setNotifActive] = useState(false);
  const [privacyActive, setPrivacyActive] = useState(false);
  const [privacyInputs, setPrivacyInputs] = useState();
  //***************************
  // define function
  //***************************
  const handleChangeTab = (tab) => {
    setTab(tab);
    setAccountTab(0);
  };
  const handleChangeTabAccount = (tab) => {
    setAccountTab(tab);
  };
  const handleGetTimeZone = () => {
    http().TimeZoneListLang(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              value: item.id,
              label: item?.title + " " + item?.offset,
            });
          });
          setTimeZone(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetLanguagesList = () => {
    http().LanguagesTranslate(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            if (item?.isOnLine)
              custome.push({
                label: item?.title,
                value: item.id,
              });
          });
          setLanguageList(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetCurrenciesList = () => {
    http().currencies(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.list?.map((item) => {
            custome.push({
              value: item.id,
              label: item?.title + "  " + item?.symbol,
            });
          });
          setCurrnecy(custome);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChangeTimeZone = () => {
    http().UpdateTimeZone(
      ({ data }) => {},
      { timezoneId: timeZoneInputs.timezoneId },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChangeCurrency = () => {
    http().UpdateCurrnecy(
      ({ data }) => {},
      { currencyId: currnecyInputs.currencyId },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChangeLanguage = () => {
    http().UpdateLanguage(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data?.message });
          getCurrentUser();
        } else {
          toast({ type: "error", message: data?.error });
        }
      },
      { languageId: languageInputs.languageId },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetNotifList = () => {
    http().NotifList(
      ({ data }) => {
        if (data.status == 1) {
          setNotifInputs(data?.notifications);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateNotif = () => {
    http().NotifUpdate(
      ({ data }) => {},
      { ...notifInputs },
      (err) => {
        console.log(err);
      }
    );
  };
  const onNotifChange = (key, value) => {
    setNotifInputs((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const onPrivacyChange = (key, value) => {
    setPrivacyInputs((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleGetPrivacyList = () => {
    http().PrivacyList(
      ({ data }) => {
        if (data.status == 1) {
          setPrivacyInputs(data?.privacy);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdatePrivacy = () => {
    http().PrivacyUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
        }
      },
      { ...privacyInputs },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDeActiveAccount = () => {
    http().AccountDeActive(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleLogOut();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleAccountDelete = () => {
    http().AccountDelete(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleLogOut();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleLogOut = () => {
    http().Logout(
      ({ data }) => {
        if (data.status == 1) {
          router.push("/login");
        }
      },
      (err) => {
        console.log(err);
      }
    );
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

  // Start Translate

  // Start Translate
  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setMySettingsTranslate(obj);
      },
      49,
      (err) => {
        console.log(err);
      }
    );
  };
  // End Translate

  // Start Theme

  const handleChangeTheme = () => {
    http().UpdateTheme(
      ({ data }) => {
        if (themeInputs.themeId == 2) {
          setTheme((prev) => {
            return {
              ...prev,
              light: true,
            };
          });
        }
        if (themeInputs.themeId == 1) {
          setTheme((prev) => {
            return {
              ...prev,
              light: false,
            };
          });
        }
        if (themeInputs.themeId == 3) {
          if (window)
            if (window.matchMedia("(prefers-color-scheme: light)").matches) {
              setTheme((prev) => {
                return {
                  ...prev,
                  light: true,
                };
              });
            } else {
              setTheme((prev) => {
                return {
                  ...prev,
                  light: false,
                };
              });
            }
        }
      },
      { id: themeInputs.themeId },
      (err) => {
        console.log(err);
      }
    );
  };
  // End Theme

  //***************************
  // define useEffect
  //***************************
  useEffect(async () => {
    await Promise.all([
      handleGetTimeZone(),
      handleGetCurrenciesList(),
      handleGetLanguagesList(),
      handleGetNotifList(),
      handleGetPrivacyList(),
      handleGetTranslateLayout(),
    ]).finally(() => {
      console.log("finally");
    });
  }, [language]);
  useEffect(() => {
    if (timeZoneInputs.timezoneId != null) {
      handleChangeTimeZone();
    }
  }, [timeZoneInputs]);
  useEffect(() => {
    if (currnecyInputs.currencyId != null) {
      handleChangeCurrency();
    }
  }, [currnecyInputs]);
  useEffect(() => {
    if (languageInputs.languageId != null) {
      handleChangeLanguage();
    }
  }, [languageInputs]);
  useEffect(() => {
    if (notifActive) {
      handleUpdateNotif();
    }
  }, [notifInputs]);
  useEffect(() => {
    if (privacyActive) {
      handleUpdatePrivacy();
    }
  }, [privacyInputs]);
  useEffect(() => {
    if (themeInputs?.themeId != null) handleChangeTheme();
  }, [themeInputs]);
  useEffect(() => {
    setThemeInputs((prev) => {
      return { ...prev, themeId: currentUser?.theme?.id };
    });
    setTimeZoneInputs((prev) => {
      return { ...prev, timezoneId: currentUser?.timezone?.id };
    });
    setCurrnecyInputs((prev) => {
      return { ...prev, currencyId: currentUser?.currency?.id };
    });
  }, [currentUser]);
  return (
    <Authenticated>
      <UserLayout
        hasSubSidebar={true}
        hasRadius={false}
        title="Settings"
        subSidebarContent={
          <div
            className={
              theme.light ? Styles.lightResumeWrapper : Styles.darkResumeWrapper
            }
          >
            <div style={{ paddingTop: 48 }}>
              <ButtonTabBar
                theme={theme.light}
                current={1}
                tab={tab}
                handleChangeTab={() => handleChangeTab(1)}
                active={tab == 1}
                lightIcon={<General />}
                darkIcon={<GeneralDark />}
                activeLightIcon={<GeneralActive />}
                activeDarkIcon={<GeneralActiveDark />}
                text={mySettingsTranslate["general"]?.title}
              />
              <ButtonTabBar
                theme={theme.light}
                current={2}
                tab={tab}
                handleChangeTab={() => handleChangeTab(2)}
                active={tab == 2}
                lightIcon={<Notif />}
                darkIcon={<NotifDark />}
                activeLightIcon={<NotifActive />}
                activeDarkIcon={<NotifActiveDark />}
                text={mySettingsTranslate["notifications"]?.title}
              />
              <ButtonTabBar
                theme={theme.light}
                current={3}
                tab={tab}
                handleChangeTab={() => handleChangeTab(3)}
                active={tab == 3}
                lightIcon={<Privacy />}
                darkIcon={<PrivacyDark />}
                activeLightIcon={<PrivacyActive />}
                activeDarkIcon={<PrivacyActiveDark />}
                text={mySettingsTranslate["privacy"]?.title}
              />
              <ButtonTabBar
                theme={theme.light}
                current={4}
                tab={tab}
                handleChangeTab={() => handleChangeTab(4)}
                active={tab == 4}
                lightIcon={<Account />}
                darkIcon={<AccountDark />}
                activeLightIcon={<AccountActive />}
                activeDarkIcon={<AccountActiveDark />}
                text={
                  mySettingsTranslate["account-management"]?.title.substr(
                    0,
                    15
                  ) + "..."
                }
              />
            </div>
          </div>
        }
      >
        <Authorization>
          <SettingsContent
            themeInputs={themeInputs}
            setThemeInputs={setThemeInputs}
            router={router}
            mySettingsTranslate={mySettingsTranslate}
            timeZoneInputs={timeZoneInputs}
            setTimeZoneInputs={setTimeZoneInputs}
            currnecyInputs={currnecyInputs}
            setCurrnecyInputs={setCurrnecyInputs}
            languagesList={languagesList}
            timeZone={timeZone}
            currnecy={currnecy}
            handleChangeTab={handleChangeTab}
            handleChangeTabAccount={handleChangeTabAccount}
            accountTab={accountTab}
            setAccountTab={setAccountTab}
            currentUser={currentUser}
            tab={tab}
            theme={theme.light}
            setLanguageInputs={setLanguageInputs}
            languageInputs={languageInputs}
            notifInputs={notifInputs}
            setNotifActive={setNotifActive}
            onNotifChange={onNotifChange}
            privacyInputs={privacyInputs}
            setPrivacyActive={setPrivacyActive}
            onPrivacyChange={onPrivacyChange}
            handleDeActiveAccount={handleDeActiveAccount}
            handleAccountDelete={handleAccountDelete}
          />{" "}
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
