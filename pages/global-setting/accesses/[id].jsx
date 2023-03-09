import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row } from "antd";
import Authenticated from "layouts/Authenticated";
import UserLayout from "layouts/UserLayout";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import GlobalRoleContent from "components/shared/GlobalRoleContent";
import { Theme } from "atoms/Theme";
import { useRecoilState } from "recoil";
import { http } from "utils/http";
import { RoleDetails } from "atoms/RoleDetails";
import MemberModal from "components/shared/MemberModal";
import { Members } from "atoms/Members";
import { isEmpty } from "lodash";
import { MyRole } from "atoms/translate/MyRole";
import { CurrentUser } from "atoms/CurrentUser";
import FilterUserProf from "components/shared/FilterUserProf";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import PagesStyles from "/styles/scss/common/Pages.module.scss";
import GrayWrapper from "components/shared/GrayWrapper";
import HeadPlus from "/public/assets/images/svgs/plus-head.svg";
import HeadPlusDark from "/public/assets/images/svgs/dark/plus-head.svg";
import Link from "next/link";
import BreadcrumbItem from "components/shared/BreadcrumbItem";
import HeadButton from "components/shared/HeadButton";
import Authorization from "layouts/Authorization";
export default function SingleRole() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  const roleId = router?.query?.id;
  //***************************
  // define useRecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [roleDetails, setRoleDetails] = useRecoilState(RoleDetails);
  const [members, setMembers] = useRecoilState(Members);
  const [currentUser] = useRecoilState(CurrentUser);
  const [myRoleTranslate, setMyRoleTranslate] = useRecoilState(MyRole);
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
  const [memberSearch, setMebmerSearch] = useState({
    name: null,
  });
  const [status, setStatus] = useState({
    id: null,
    status: null,
  });
  const [isCard, setIsCard] = useState(currentUser?.defaultGridView);
  const [isCardMember, setIsCardMember] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerId, setDrawerId] = useState(null);
  const [onSearch, setOnSearch] = useState(false);
  const [visibleMemberModal, setVisibleMemberModal] = useState(false);
  const [roleInputs, setRoleInputs] = useState([]);
  const handleShowMemberRole = () => {
    http().MemberRole(
      ({ data }) => {
        if (data.status == 1) {
          setRoleDetails(data);
        }
      },
      {
        skip: inputsskip.skip,
        take: inputstake.take,
        roleId: roleId,
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
            setRoleDetails((prev) => {
              return {
                ...prev,
                role: {
                  id: prev?.role?.id,
                  isDefaultRole: prev?.role?.isDefaultRole,
                  name: prev?.role?.name,
                  users: data?.users,
                },
                members: {
                  pages: data?.pages,
                  results: data?.results,
                },
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
  const handleChangeStructure = () => {
    if (isCard) {
      setIsCard(false);
      setInputsTake((prev) => {
        return { ...prev, take: 24 };
      });
      setInputsSkip((prev) => {
        return { ...prev, skip: 0 };
      });
    } else {
      setIsCard(true);
      setRoleDetails(null);
      setInputsTake((prev) => {
        return { ...prev, take: 24 };
      });
      setInputsSkip((prev) => {
        return { ...prev, skip: 0 };
      });
    }
  };
  const handleApprove = (id) => {
    http().UserProfApprove(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isApproved", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleDisapprove = (id) => {
    http().UserProfDisApprove(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isApproved", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const UserProfSuspend = (id) => {
    http().UserProfSuspend(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isSuspended", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const UserProfUnsuspend = (id) => {
    http().UserProfUnsuspend(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isSuspended", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const UserProfDisable = (id) => {
    http().UserProfDisable(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isEnabled", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const UserProfEnable = (id) => {
    http().UserProfEnable(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          handleChnageStateLocali("isEnabled", id);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
        }
        setDrawer(false);
      },
      id,
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
    setRoleDetails((prev) => {
      return {
        ...prev,
        role: {
          id: prev?.role?.id,
          isDefaultRole: prev?.role?.isDefaultRole,
          name: prev?.role?.name,
          users: prev.role?.users.map((item) => {
            if (item.id == id) {
              return { ...item, [key]: !item[key] };
            } else {
              return { ...item };
            }
          }),
        },
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
  const handleShowMemberModal = () => {
    setVisibleMemberModal(true);
    setMebmerSearch({ name: null });
    setRoleInputs([]);
  };
  const handleGetMemberList = () => {
    http().MemberList(
      ({ data }) => {
        if (data.status == 1) {
          const custome = [];
          data?.users.map((item) => {
            custome.push({ ...item, checked: false });
          });
          setMembers(custome);
        }
      },
      roleId,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSearchMember = () => {
    if (!isEmpty(memberSearch.name)) {
      const memberList = [...members];
      const editedFullname = memberList.map((item, index) => {
        return {
          ...item,
          fullName:
            item?.givenName.toLowerCase() +
            " " +
            item?.familyName.toLowerCase(),
        };
      });
      const searchItem = editedFullname.filter((item, index) => {
        if (item.fullName.includes(memberSearch.name.toLowerCase())) {
          return item;
        }
      });
      setMembers(searchItem);
    } else {
      handleGetMemberList();
    }
  };
  const handleChangeRoleChecked = (id) => {
    const idList = [...roleInputs];
    const dupItem = idList.filter((item) => {
      return item.id == id;
    });
    const memberList = [...members];
    if (dupItem.length > 0) {
      const removedItem = idList.filter((item) => item.id != id);
      setRoleInputs(removedItem);
      const checkedMember = memberList?.map((item, index) => {
        if (item.id == id) {
          return { ...item, checked: false };
        } else {
          return { ...item };
        }
      });
      setMembers(checkedMember);
    } else {
      const key = Math.floor(Math.random() * 100000000000);
      idList.push({
        key: key,
        id: id,
      });
      setRoleInputs(idList);
      const checkedMember = memberList?.map((item, index) => {
        if (item.id == id) {
          return { ...item, checked: true };
        } else {
          return { ...item };
        }
      });
      setMembers(checkedMember);
    }
  };
  const handleUpdateMemberRole = () => {
    const array = [];
    roleInputs.map((item) => {
      array.push(item.id);
    });
    http().MemberRoleUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleSearchMember();
          setVisibleMemberModal(false);
          setMebmerSearch({ name: null });
          handleShowMemberRole();
          setRoleInputs([]);
        }
      },
      { members: array, id: roleId },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setMyRoleTranslate(obj);
      },
      51,
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
            handleShowMemberRole();
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
  //***************************
  // define useEffect
  //***************************
  useEffect(async () => {
    if (!onSearch)
      await Promise.all([handleShowMemberRole()]).finally(() => {});
  }, [inputsskip, inputstake, onSearch, roleId]);
  useEffect(async () => {
    if (onSearch) await Promise.all([handleSearchUser()]);
  }, [searchInput, inputsskip, inputstake]);
  useEffect(() => {
    return () => {
      setRoleDetails((prev) => {
        return null;
      });
    };
  }, []);
  useEffect(async () => {
    await Promise.all([
      handleGetMemberList(),
      handleGetTranslateLayout(),
    ]).finally(() => {});
  }, []);
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
    handleSearchMember();
  }, [memberSearch]);
  useEffect(() => {
    handleUserStatus();
  }, [status]);

  useEffect(async () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setIsCard(true);
        setIsCardMember(true);
      }
    }
  }, []);
  return (
    <Authenticated>
      <UserLayout
        hasSubSidebar={false}
        hasRadius={false}
        title={myRoleTranslate["role"]?.title}
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
                            {myRoleTranslate["dashboard"]?.title}
                          </span>
                        </a>
                      </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() => router.push("/global-setting")}
                    >
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {myRoleTranslate["global-setting"]?.title}
                      </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      onClick={() => router.push("/global-setting")}
                    >
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {myRoleTranslate["accesses"]?.title}
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
                        {roleDetails?.role?.title}
                      </span>
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightNumber
                            : BreadcrumbStyles.darkNumber
                        }
                      >
                        {roleDetails?.members?.results}
                        {myRoleTranslate["members"]?.title}
                      </span>
                    </Breadcrumb.Item>
                  </BreadcrumbItem>
                </Col>
                <Col span={12} className="flex justify-end">
                  <HeadButton
                    onClick={handleShowMemberModal}
                    theme={theme?.light}
                    text={myRoleTranslate["add-new-member"]?.title}
                    icon={theme?.light ? <HeadPlus /> : <HeadPlusDark />}
                  />
                </Col>
              </Row>
            </Col>
          </div>
          <GrayWrapper>
            <FilterUserProf
              router={router}
              handleShowMemberModal={handleShowMemberModal}
              inRole={true}
              translator={myRoleTranslate}
              handleOnInputSearch={handleOnInputSearch}
              setOnSearch={setOnSearch}
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              theme={theme.light}
              handleSearchUser={handleSearchUser}
              isCard={isCard}
              handleChangeStructure={handleChangeStructure}
              roleDetails={roleDetails}
            />
            <GlobalRoleContent
              myRoleTranslate={myRoleTranslate}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handleLiked={handleLiked}
              setInputsSkip={setInputsSkip}
              handleApprove={handleApprove}
              handleDisapprove={handleDisapprove}
              UserProfSuspend={UserProfSuspend}
              UserProfUnsuspend={UserProfUnsuspend}
              UserProfDisable={UserProfDisable}
              UserProfEnable={UserProfEnable}
              setInputsTake={setInputsTake}
              setInputsPage={setInputsPage}
              inputstake={inputstake}
              inputsPage={inputsPage}
              isCard={isCard}
              roleDetails={roleDetails}
              theme={theme.light}
              status={status}
              setStatus={setStatus}
              setDrawerId={setDrawerId}
              drawerId={drawerId}
              setDrawer={setDrawer}
              drawer={drawer}
            />
          </GrayWrapper>
          <MemberModal
            myRoleTranslate={myRoleTranslate}
            members={members}
            theme={theme.light}
            visible={visibleMemberModal}
            onClose={() => setVisibleMemberModal(false)}
            setMebmerSearch={setMebmerSearch}
            handleChangeRoleChecked={handleChangeRoleChecked}
            handleUpdateMemberRole={handleUpdateMemberRole}
            isCardMember={isCardMember}
          />
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
