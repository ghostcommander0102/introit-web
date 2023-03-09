import React, { useEffect } from "react";
import Loader from "/components/shared/Loader";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Loading } from "/atoms/Loading";
import { Errors } from "/atoms/Errors";
export default function LoadingProvider({ children }) {
  //***************************
  // define hooks
  //***************************
  const router = useRouter();
  //***************************
  // define hooks
  //***************************
  const [loading, setLoading] = useRecoilState(Loading);
  const [errors, setErrors] = useRecoilState(Errors);
  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    if (router.isReady) {
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeComplete", () => setLoading(false));
      setErrors(null);
    }
  }, [router.isReady]);

  return loading ? <Loader /> : children;
}
