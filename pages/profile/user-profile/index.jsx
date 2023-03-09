import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Authenticated from "layouts/Authenticated";
import UserLayout from "layouts/UserLayout";
import { Theme } from "atoms/Theme";
import FilterUserProf from "components/shared/FilterUserProf";
import ContentUserProf from "components/shared/ContentUserProf";
import { UserProf } from "atoms/UserProf";
import { http } from "utils/http";
import useToast from "hooks/useToast";
import { CurrentUser } from "atoms/CurrentUser";
import { MyUserProfile } from "atoms/translate/MyUserProfile";
import GrayWrapper from "components/shared/GrayWrapper";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import PagesStyles from "/styles/scss/common/Pages.module.scss";
import { Breadcrumb, Col, Row } from "antd";
import BreadcrumbItem from "components/shared/BreadcrumbItem";
import Link from "next/link";
import Authorization from "layouts/Authorization";
export default function UserProfiles() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  // ***************************
  // Define RecoilState
  // ***************************
  const [theme] = useRecoilState(Theme);
  const [userProf, setUserProf] = useRecoilState(UserProf);
  const [currentUser] = useRecoilState(CurrentUser);
  const [myTranslateUserProfile, setMyTranslateUserProfile] =
    useRecoilState(MyUserProfile);
  //***************************
  // Define State
  //***************************
  const [searchInput, setSearchInput] = useState({
    query: null,
  });
  const [inputstake, setInputsTake] = useState({
    take: currentUser?.resultsPerPage,
  });
  const [inputsskip, setInputsSkip] = useState({
    skip: 0,
  });
  const [inputsPage, setInputsPage] = useState({
    page: 1,
    current: 1,
  });
  const [isCard, setIsCard] = useState(currentUser?.defaultGridView);
  const [drawer, setDrawer] = useState(false);
  const [drawerId, setDrawerId] = useState(null);
  const [onSearch, setOnSearch] = useState(false);
  const [status, setStatus] = useState({
    id: null,
    status: null,
  });
  // ***************************
  // Define function
  // ***************************
  const handleGetUserProf = () => {
    http().UserProfAll(
      ({ data }) => {
        if (data.status == 1) {
          setUserProf((prev) => {
            return {
              ...prev,
              users: data.users,
              results: data?.results,
              pages: data?.pages,
            };
          });
        }
        if (data?.status == -1) {
          toast({ message: data?.message, type: "error" });
        }
      },
      {
        skip: inputsskip.skip,
        take: inputstake.take,
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSearchUser = () => {
    if (searchInput.query != null)
      http().UserProfSearch(
        ({ data }) => {
          if (data.status == 1) {
            setUserProf((prev) => {
              return {
                ...prev,
                users: data.users,
                results: data?.results,
                pages: data?.pages,
              };
            });
            setInputsPage((prev) => {
              return { ...prev, current: 1 };
            });
          }
        },
        {
          query: searchInput.query || "",
          skip: inputsskip.skip,
          take: inputstake.take,
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const handlePrevPage = () => {
    setInputsPage((prev) => {
      return { ...prev, current: inputsPage.current - 1 };
    });
    setInputsSkip((prev) => {
      return { ...prev, skip: inputsskip.skip - inputstake.take };
    });
  };
  const handleNextPage = () => {
    setInputsPage((prev) => {
      return { ...prev, current: inputsPage.current + 1 };
    });
    setInputsSkip((prev) => {
      return { ...prev, skip: inputsskip.skip + inputstake.take };
    });
  };
  const handleChangeStructure = () => {
    if (isCard) {
      setIsCard(false);
      setInputsSkip((prev) => {
        return { ...prev, skip: 0 };
      });
    } else {
      setIsCard(true);
      setUserProf((prev) => {
        return { ...prev, users: [], pages: 1, results: 0 };
      });
      setInputsSkip((prev) => {
        return { ...prev, skip: 0 };
      });
    }
  };
  const handleLiked = (id) => {
    http().Liked(
      ({ data }) => {
        toast({ type: "success", message: data.message });
        handleChnageStateLocali("isLiked", id);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChnageStateLocali = (key, id) => {
    setUserProf((prev) => {
      return {
        ...prev,
        users: prev.users.map((item) => {
          if (item.id == id) {
            return { ...item, [key]: !item[key] };
          } else {
            return { ...item };
          }
        }),
      };
    });
  };
  const handleOnInputSearch = (e) => {
    setSearchInput((prev) => {
      return { ...prev, query: e.target.value };
    });
    setOnSearch(e.target.value.length == 0 ? false : true);
    setInputsSkip({ skip: 0 });
  };
  const handleUserStatus = () => {
    if (status.status != null)
      http().UserProfileStatus(
        ({ data }) => {
          if (data.status == 1) {
            toast({ message: data?.message, type: "success" });
          }
          if (data?.status == -1) {
            toast({ message: data?.error, type: "error" });
          }
          setDrawer(false);
          if (onSearch) {
            handleSearchUser();
          } else {
            handleGetUserProf();
          }
        },
        {
          id: status.id,
          status: status.status,
        },
        (err) => {
          console.log(err);
        }
      );
  };
  const handleChangeGird = () => {
    http().UpdateGridView(
      ({ data }) => {
        console.log("data", data);
      },
      {
        defaultGridView: isCard,
        resultsPerPage: inputstake.take,
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // Start Translate

  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setMyTranslateUserProfile(obj);
      },
      33,
      (err) => {
        console.log(err);
      }
    );
  };

  // End Translate

  // ***************************
  // Define useEffect
  // ***************************
  useEffect(async () => {
    if (!onSearch) await Promise.all([handleGetUserProf()]);
  }, [inputsskip, inputstake]);
  useEffect(async () => {
    if (onSearch) await Promise.all([handleSearchUser()]);
  }, [searchInput, inputsskip, inputstake]);
  useEffect(() => {
    return () => {
      setUserProf((prev) => {
        return { ...prev, users: [], pages: 0, results: 0 };
      });
    };
  }, []);
  useEffect(() => {
    handleUserStatus();
  }, [status]);
  useEffect(() => {
    setInputsTake({
      take: currentUser?.resultsPerPage,
    });
    setIsCard(currentUser?.defaultGridView);
  }, [currentUser]);
  useEffect(() => {
    handleChangeGird();
  }, [inputstake.take, isCard]);
  useEffect(() => {
    handleGetTranslateLayout();
  }, []);
  useEffect(async () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setIsCard(true);
      }
    }
  }, []);
  return (
    <Authenticated>
      <UserLayout
        hasSubSidebar={false}
        hasRadius={false}
        title={myTranslateUserProfile["user-profile"]?.title}
      >
        <Authorization>
          <div
            className={`${
              theme?.light
                ? PagesStyles.lightWrapperWhiteBread
                : PagesStyles.darkWrapperWhiteBread
            } md:block hidden`}
          >
            <Col className="p-4 md:block hidden" span={24}>
              <Row>
                <Col span={12}>
                  <BreadcrumbItem>
                    <Breadcrumb.Item onClick={() => {}}>
                      <Link href="/">
                        <a>
                          <span
                            className={
                              theme?.light
                                ? BreadcrumbStyles.lightItem
                                : BreadcrumbStyles.darkItem
                            }
                          >
                            {myTranslateUserProfile["dashboard"]?.title}
                          </span>
                        </a>
                      </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => {}}>
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {myTranslateUserProfile["profile"]?.title}
                      </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => {}}>
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightLast
                            : BreadcrumbStyles.darkLast
                        }
                      >
                        {myTranslateUserProfile["user-profiles"]?.title}
                      </span>
                      <span className="pl-2">
                        {userProf?.results}{" "}
                        {myTranslateUserProfile["members"]?.title}
                      </span>
                    </Breadcrumb.Item>
                  </BreadcrumbItem>
                </Col>
              </Row>
            </Col>
          </div>
          <GrayWrapper>
            <FilterUserProf
              translator={myTranslateUserProfile}
              handleOnInputSearch={handleOnInputSearch}
              setOnSearch={setOnSearch}
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              userProf={userProf}
              theme={theme.light}
              handleSearchUser={handleSearchUser}
              isCard={isCard}
              handleChangeStructure={handleChangeStructure}
            />
            <ContentUserProf
              myTranslateUserProfile={myTranslateUserProfile}
              drawer={drawer}
              setDrawer={setDrawer}
              handleLiked={handleLiked}
              setInputsSkip={setInputsSkip}
              userProf={userProf}
              theme={theme.light}
              setInputsTake={setInputsTake}
              inputstake={inputstake}
              inputsPage={inputsPage}
              setInputsPage={setInputsPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              isCard={isCard}
              drawerId={drawerId}
              setDrawerId={setDrawerId}
              setStatus={setStatus}
            />
          </GrayWrapper>
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
