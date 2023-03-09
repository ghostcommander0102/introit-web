import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import AuthLayout from "../../layouts/AuthLayout";
import { http } from "utils/http";
import VerifyContent from "components/shared/VerifyContent";
import Authenticated from "layouts/Authenticated";
import { LoginForm } from "/atoms/LoginForm";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import useToast from "/hooks/useToast";
import NotAuthenticated from "layouts/NotAuthenticated";
export default function Reset() {
  //***************************
  // define hooks
  //***************************
  const router = useRouter();
  const toast = useToast();
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [loginForm] = useRecoilState(LoginForm);
  //***************************
  // define state
  //***************************
  const [inputs, setInputs] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  //***************************
  // define function
  //***************************
  const handleVerify = () => {
    setDisabledButton(true);
    http().Login2Fa(
      ({ data }) => {
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
          setInputs({
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            six: "",
          });
          setDisabledButton(false);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          router.push("/");
        }
      },
      {
        pin:
          inputs.one +
          inputs.two +
          inputs.three +
          inputs.four +
          inputs.five +
          inputs.six,
        email: loginForm?.email,
        password: loginForm?.password,
        remember_me: loginForm?.remember_me,
      },
      (err) => {
        setDisabledButton(false);
        if (err?.response?.status == 500) {
          return toast({
            type: "error",
            message: "An error occurred on the server side",
          });
        }
      }
    );
  };
  //***************************
  // define useEffect
  //***************************
  // useEffect(() => {
  //   if (isEmpty(loginForm)) {
  //     return router.push("/login");
  //   }
  // }, []);
  useEffect(() => {
    if (
      inputs.one &&
      inputs.two &&
      inputs.three &&
      inputs.four &&
      inputs.five &&
      inputs.six
    ) {
      handleVerify();
    }
  }, [inputs]);
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="verify">
        <VerifyContent
          disabledButton={disabledButton}
          handleVerify={handleVerify}
          setInputs={setInputs}
          inputs={inputs}
          theme={theme.light}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
