import AuthLayout from "layouts/AuthLayout";
import React, { useEffect, useState } from "react";
import SignUpContent from "components/shared/SignUpContent";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import { http } from "utils/http";
import { Errors } from "/atoms/Errors";
import useToast from "/hooks/useToast";
import { useRouter } from "next/router";
import NotAuthenticated from "layouts/NotAuthenticated";
import { CurrentUser } from "atoms/CurrentUser";
export default function SignUp() {
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
  const [currentUser] = useRecoilState(CurrentUser);
  //***************************
  // define state
  //***************************
  const publicUrl = process.env.NEXT_PUBLIC_API;
  const [strong, setStrong] = useState(1);
  const [disabledButton, setDisabledButton] = useState(true);
  const [inputs, setInputs] = useState({
    givenName: "",
    familyName: "",
    email: "",
    password: "",
    terms: true,
    roleId: "",
    companyName: "",
    general: false,
    privacy: false,
    gdpr: false,
  });
  //***************************
  // define function
  //***************************

  const handleRegister = () => {
    setDisabledButton(true);
    http().Register(
      ({ data }) => {
        if (data.status == 0) {
          setDisabledButton(false);
          setErrors(data.errors);
        } else {
          setErrors([]);
        }
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          setDisabledButton(false);
          setInputs({
            givenName: "",
            familyName: "",
            email: "",
            password: "",
            terms: false,
          });
          router.push("/profile/resume");
          setStrong("setStrong");
        }
        if (data.status == -1) {
          setDisabledButton(false);
          toast({ type: "error", message: data.error });
        }
      },
      {
        givenName: inputs.givenName,
        familyName: inputs.familyName,
        email: inputs.email,
        password: inputs.password,
        companyName: inputs.companyName,
        terms: inputs.terms,
        role: "candidate",
        companyName: inputs.companyName,
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
  }, [inputs.password]);
  useEffect(() => {
    setInputs((prev) => {
      return {
        ...prev,
        givenName: currentUser?.givenName,
        familyName: currentUser?.familyName,
        email: currentUser?.email,
      };
    });
  }, [currentUser]);
  useEffect(() => {
    if (
      inputs.general &&
      inputs.privacy &&
      inputs.gdpr &&
      inputs.givenName &&
      inputs.familyName &&
      inputs.email
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [inputs]);
  return (
    <NotAuthenticated back={false}>
      <AuthLayout title="signup">
        <SignUpContent
          currentUser={currentUser}
          role={"Candidate"}
          errors={errors}
          setStrong={setStrong}
          strong={strong}
          setInputs={setInputs}
          inputs={inputs}
          theme={theme.light}
          publicUrl={publicUrl}
          handleRegister={handleRegister}
          disabledButton={disabledButton}
        />
      </AuthLayout>
    </NotAuthenticated>
  );
}
