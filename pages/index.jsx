import React from "react";
import { Row } from "antd";
import { useRecoilState } from "recoil";
import { Theme } from "../atoms/Theme";
import CounterContent from "/components/shared/CounterContent";
import OverView from "/components/shared/OverView";
import UserLayout from "../layouts/UserLayout";
import Authenticated from "layouts/Authenticated";
import { useRouter } from "next/router";
import { CurrentUser } from "atoms/CurrentUser";
import AppliedJob from "components/shared/AppliedJob";
import Authorization from "layouts/Authorization";

const Dashboard = () => {
  //***************************
  // define hooks
  //***************************
  const router = useRouter();
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [currentUser] = useRecoilState(CurrentUser);

  //***************************
  // define function
  //***************************

  return (
    <Authenticated removeLoader={false}>
      <UserLayout hasRadius={true} hasSubSidebar={false} title="Dashboard">
        <Authorization>
          <Row className="w-full">
            <CounterContent theme={theme.light} />
            {currentUser?.menus?.map((item, index) => {
              if (item.name == "dashboard") {
                return item.modules.map((item, index) => {
                  if (item.name == "overview") {
                    return <OverView key={index} theme={theme.light} />;
                  }
                  if (item.name == "recently") {
                    return <AppliedJob key={index} theme={theme.light} />;
                  }
                });
              }
            })}
          </Row>
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
};

export default Dashboard;
