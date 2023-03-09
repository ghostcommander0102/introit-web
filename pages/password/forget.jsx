import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import AuthLayout from "../../layouts/AuthLayout";
import { http } from "utils/http";
import ForgetContent from "components/shared/ForgetContent";
import { Errors } from "/atoms/Errors";
import useToast from "/hooks/useToast";
import NotAuthenticated from "layouts/NotAuthenticated";
export default function Forget() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define RecoilState(
  //***************************
  const [theme] = useRecoilState(Theme);
  const [errors, setErrors] = useRecoilState(Errors);
  //***************************
  // define state
  //***************************
  const [inputs, setInputs] = useState({
    email: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  //***************************
  // define function
  //***************************
  const handleForgot = () => {
    setDisabledButton(true);

    http().Forgot(
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
          setInputs({ email: "" });
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
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="login">
        <ForgetContent
          disabledButton={disabledButton}
          errors={errors}
          handleForgot={handleForgot}
          setInputs={setInputs}
          inputs={inputs}
          theme={theme.light}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
