import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import AuthLayout from "../../../layouts/AuthLayout";
import { http } from "utils/http";
import ResetContent from "components/shared/ResetContent";
import { Errors } from "/atoms/Errors";
import { useRouter } from "next/router";
import useToast from "hooks/useToast";
import NotAuthenticated from "layouts/NotAuthenticated";
export default function resetToken() {
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

  //***************************
  // define state
  //***************************
  const { token } = router.query;
  const [strong, setStrong] = useState(1);
  const [inputs, setInputs] = useState({ password: "", confirm_password: "" });
  const [disabledButton, setDisabledButton] = useState(false);
  //***************************
  // define function
  //***************************

  const handleResetPassword = () => {
    if (inputs.password != inputs.confirm_password) {
      return toast({
        type: "error",
        message: "password and confirmation password is  not equal",
      });
    }
    setDisabledButton(true);

    http().Reset(
      ({ data }) => {
        if (data.status == 0) {
          setDisabledButton(false);
          setErrors(data.errors);
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
          setInputs({
            password: "",
            confirm_password: "",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
      },
      {
        token: token,
        newPassword: inputs.password,
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
  useEffect(() => {
    setStrong(inputs.password.length);
  }, [inputs]);
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="reset passsword">
        <ResetContent
          handleResetPassword={handleResetPassword}
          disabledButton={disabledButton}
          errors={errors}
          strong={strong}
          setStrong={setStrong}
          setInputs={setInputs}
          inputs={inputs}
          theme={theme.light}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
