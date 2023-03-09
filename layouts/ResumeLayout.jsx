import React from "react";
import Head from "next/head";
import Body from "./Body";
import LoadingProvider from "providers/LoadingProvider";
const ResumeLayout = ({ theme, title, children }) => {
  const AppName = process.env.NEXT_PUBLIC_APPNAME;
  return (
    <Body theme={theme}>
      <Head>
        <title>
          {AppName} | {title}
        </title>
        <meta name="description" content="Enviretech" />
        <link rel="icon" href="/assets/images/svgs/envire-icon.svg" />
      </Head>
      <LoadingProvider>{children}</LoadingProvider>
    </Body>
  );
};

export default ResumeLayout;
