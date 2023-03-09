import React, { useEffect } from "react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import GTM from "react-gtm-module";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "/styles/Main.scss";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    GTM.initialize({
      gtmId: "GTM-PCZX5V3",
    });
  }, []);
  return (
    <RecoilRoot>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-H9PGBHJYH8"
      />
      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-H9PGBHJYH8');
      `}
      </Script>
      <ConfigProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default MyApp;
