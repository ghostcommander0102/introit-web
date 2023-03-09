import { CurrentUser } from "atoms/CurrentUser";
import { Theme } from "atoms/Theme";
import LockContent from "components/shared/LockContent";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
export default function Lock() {
  //***************************
  // define hooks
  //***************************
  const router = useRouter();

  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  //***************************
  // define function
  //***************************
  return <LockContent router={router} theme={theme?.light} />;
}
