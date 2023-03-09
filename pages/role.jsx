import React, { useState } from "react";
import { useRouter } from "next/router";
import RoleContent from "components/shared/RoleContent";
import Authenticated from "layouts/Authenticated";
import AuthLayout from "layouts/AuthLayout";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import { Role } from "/atoms/Role";
import NotAuthenticated from "layouts/NotAuthenticated";
export default function RolePage() {
  //***************************
  // define hooks
  //***************************
  const router = useRouter();
  //***************************
  // define state
  //***************************
  const [theme, setTheme] = useRecoilState(Theme);
  const [role, setRole] = useRecoilState(Role);
  const [enter, setEnter] = useState();
  //***************************
  // define function
  //***************************
  const handleMouseEnter = (number) => {
    setEnter(number);
  };
  const handleMouseOut = () => {
    setEnter(null);
  };
  const handleSetRole = (role) => {
    setRole(role);
    router.push("/signup");
  };
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="role">
        <RoleContent
          enter={enter}
          handleSetRole={handleSetRole}
          handleMouseOut={handleMouseOut}
          handleMouseEnter={handleMouseEnter}
          role={role}
          theme={theme.light}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
