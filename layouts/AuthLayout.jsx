import Head from "next/head";
import Body from "./Body";
import Header from "../components/auth/Header";
import { useRecoilState } from "recoil";
import { Theme } from "../atoms/Theme";
import LoadingProvider from "providers/LoadingProvider";
export default function AuthLayout({ children, title }) {
  //***************************
  // define state
  //***************************
  const [theme, setTheme] = useRecoilState(Theme);
  const AppName = process.env.NEXT_PUBLIC_APPNAME;
  //***************************
  // define function
  //***************************
  const handleChangeTheme = () => {
    setTheme({
      light: !theme.light,
    });
  };
  return (
    <Body theme={theme.light}>
      <Head>
        <title>
          {AppName} | {title}
        </title>
        <meta name="description" content="Enviretech" />
        <link rel="icon" href="/assets/images/svgs/envire-icon.svg" />
      </Head>
      <LoadingProvider>
        <div className="auth-layout pt-4 md:px-4 px-2">
          <Header handleChangeTheme={handleChangeTheme} theme={theme.light} />
          <div className="auth-main">{children}</div>
        </div>
      </LoadingProvider>
    </Body>
  );
}
