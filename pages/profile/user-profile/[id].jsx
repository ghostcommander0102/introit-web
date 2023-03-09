import React, { useEffect, useState } from "react";
import { Theme } from "/atoms/Theme";
import UserLayout from "layouts/UserLayout";
import Authenticated from "layouts/Authenticated";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { http } from "utils/http";
import { Cv } from "atoms/Cv";
import UserContent from "components/shared/UserContent";
import { User } from "atoms/translate/User";
import Authorization from "layouts/Authorization";
import { Role } from "atoms/Role";
import { toInteger } from "lodash";
import UserDrawer from "components/shared/user/UserDrawer";
const UserProfile = () => {
  //***************************
  // Defind hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  const userId = router?.query?.id;
  //***************************
  // Define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [cv, setCv] = useRecoilState(Cv);
  const [userTranslate, setUserTranslate] = useRecoilState(User);
  const [role, setRole] = useRecoilState(Role);
  //***************************
  // Define state
  //***************************
  const [statusInputs, setStatusInputs] = useState({
    status: null,
  });
  const [roleInputs, setRoleInputs] = useState({
    role: null,
  });
  const [visible, setVisible] = useState(false);
  //***************************
  // Define Function
  //***************************
  const handleGetRoleList = () => {
    http().RoleList(
      ({ data }) => {
        if (data.status == 1) {
          const array = [];
          data?.roles?.map((item) => {
            array.push({ value: item?.id, label: item?.title });
          });
          setRole(array);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetCv = () => {
    http().Cvs(
      ({ data }) => {
        if (data?.status == 1) {
          setCv(data?.cv);
          handleUserDetail();
        }
      },
      userId,
      (err) => {
        console.log("err", err);
      }
    );
  };
  const handleUserDetail = () => {
    http().UserProfileShow(
      ({ data }) => {
        setCv((prev) => {
          return {
            ...prev,
            role: data?.user?.role?.id,
            like: data?.user?.isLiked,
            status: data?.user?.status,
          };
        });
      },
      userId,
      (err) => {
        console.log(err);
      }
    );
  };

  const handleLiked = (id) => {
    http().Liked(
      ({ data }) => {
        toast({ type: "success", message: data.message });
        handleUserDetail();
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUpdateMemberRole = () => {
    http().MemberRoleUpdate(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleUserDetail();
        }
      },
      { members: [toInteger(userId)], id: roleInputs.role },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleUserStatus = () => {
    http().UserProfileStatus(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data?.message, type: "success" });
          handleUserDetail();
        }
        if (data?.status == -1) {
          toast({ message: data?.error, type: "error" });
        }
      },
      {
        id: userId,
        status: statusInputs.status,
      },
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
        setUserTranslate(obj);
      },
      50,
      (err) => {
        console.log(err);
      }
    );
  };

  //***************************
  // Define Useffect
  //***************************
  useEffect(() => {
    if (userId != null) handleGetCv();
  }, [userId]);
  useEffect(async () => {
    await Promise.all([handleGetTranslateLayout(), handleGetRoleList()]);
  }, []);
  useEffect(() => {
    if (roleInputs.role != null) handleUpdateMemberRole();
  }, [roleInputs]);
  useEffect(() => {
    if (statusInputs.status != null) handleUserStatus();
  }, [statusInputs]);
  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout hasSubSidebar={false} title="Profile">
        <Authorization>
          <UserContent
            userId={userId}
            router={router}
            role={role}
            handleUserStatus={handleUserStatus}
            handleLiked={handleLiked}
            cv={cv}
            userTranslate={userTranslate}
            theme={theme.light}
            setRoleInputs={setRoleInputs}
            setStatusInputs={setStatusInputs}
            setVisible={setVisible}
          />
          <UserDrawer
            userId={userId}
            router={router}
            role={role}
            cv={cv}
            theme={theme?.light}
            visible={visible}
            userTranslate={userTranslate}
            handleLiked={handleLiked}
            onClose={() => setVisible(false)}
          />
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
};
export default UserProfile;
