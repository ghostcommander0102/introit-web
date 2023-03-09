import React, { useEffect } from "react";
import { http } from "utils/http";
import { useRouter } from "next/router";
import { CurrentUser } from "/atoms/CurrentUser";
import { useRecoilState } from "recoil";
import { Loading } from "/atoms/Loading";
import Loader from "components/shared/Loader";
export default function NotAuthenticated({ children, back }) {
  // *********************
  // define RecoilState
  // *********************
  const [currnetUser, setCurrentUser] = useRecoilState(CurrentUser);
  const [, setLoading] = useRecoilState(Loading);
  //***************************
  // define hooks
  //***************************
  const router = useRouter();
  //***************************
  // define useEffect
  //***************************
  console.log("currnetUser", currnetUser);
  useEffect(async () => {
    if (router.isReady)
      await Promise.all([
        http().CurrentUser(
          ({ data }) => {
            if (data.status == -1) {
              if (back) router.replace("/login");
              setCurrentUser({ user: "empty" });
            } else {
              setCurrentUser(data.user);
              if (data?.user?.isAcceptedTerms) {
                router.replace("/");
              }
            }
          },
          (err) => {
            if (err?.response?.status == 502) {
              router.replace("/login");
            }
          }
        ),
      ]).finally(() => {
        setLoading(false);
      });
  }, [router.isReady]);
  if (currnetUser?.user == "empty" || currnetUser?.isAcceptedTerms == false)
    return children;
  else return <Loader />;
}
