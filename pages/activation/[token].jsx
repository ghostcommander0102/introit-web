import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { http } from "/utils/http";
import useToast from "/hooks/useToast";
import AuthLayout from "/layouts/AuthLayout";
import ActivationContent from "components/shared/ActivationContent";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import NotAuthenticated from "layouts/NotAuthenticated";
export default function Token() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define state
  //***************************
  const [theme, setTheme] = useRecoilState(Theme);
  const { token } = router.query;
  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    if (token)
      http().Token(
        ({ data }) => {
          if (data.status == 1) {
            toast({ type: "success", message: data.message });
          }
          if (data.status == -1) {
            toast({ type: "error", message: data.error });
          }
        },
        token,
        (err) => {
          if (err?.response?.status == 500) {
            return toast({
              type: "error",
              message: "An error occurred on the server side",
            });
          }
        }
      );
  }, [token]);
  //***************************
  // define function
  //***************************
  const handleGoLogin = () => {
    router.push("/login");
  };
  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="activation">
        <ActivationContent
          handleGoHome={handleGoHome}
          handleGoLogin={handleGoLogin}
          theme={theme.light}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
