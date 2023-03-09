import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import { Errors } from "/atoms/Errors";
import LoginContent from "components/shared/LoginContent";
import AuthLayout from "../layouts/AuthLayout";
import { http } from "utils/http";
import useToast from "/hooks/useToast";
import { useRouter } from "next/router";
import { LoginForm } from "/atoms/LoginForm";
import NotAuthenticated from "layouts/NotAuthenticated";

export default function Login() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [errors, setErrors] = useRecoilState(Errors);
  const [, setLoginForm] = useRecoilState(LoginForm);
  //***************************
  // define state
  //***************************
  const publicUrl = process.env.NEXT_PUBLIC_API;
  const [passwordType, setPasswordType] = useState("password");
  const [disabledButton, setDisabledButton] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  //***************************
  // define function
  //***************************
  const handleLogin = () => {
    setDisabledButton(true);
    http().Login(
      ({ data }) => {
        if (data.status == 0) {
          setErrors(data.errors);
          setDisabledButton(false);
        } else {
          setErrors(null);
        }
        if (data.status == -1) {
          toast({ type: "error", message: data.error });
          setDisabledButton(false);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          setDisabledButton(false);
          router.push("/profile/resume");
        }
        if (data.status == 2) {
          setLoginForm({
            email: inputs.email,
            password: inputs.password,
            remember_me: inputs.remember_me,
          });
          toast({ type: "success", message: data.error });
          router.push("/password/verify");
          setDisabledButton(false);
        }
      },
      { ...inputs },
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
  const handleTypePassword = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <NotAuthenticated removeLoader={true}>
      <AuthLayout title="login">
        <LoginContent
          disabledButton={disabledButton}
          errors={errors}
          setInputs={setInputs}
          inputs={inputs}
          handleTypePassword={handleTypePassword}
          passwordType={passwordType}
          handleLogin={handleLogin}
          theme={theme.light}
          publicUrl={publicUrl}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
