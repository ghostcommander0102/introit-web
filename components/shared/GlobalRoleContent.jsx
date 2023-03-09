import React from "react";
import { Col, Empty, Row } from "antd";
import { isEmpty } from "lodash";
import PerPage from "./PerPage";
import Pagination from "./Pagination";
import UserProfDrawer from "./UserProfDrawer";
import UserProfCard from "./UserProfCard";
import UserProfRow from "./UserProfRow";
import Styles from "/styles/scss/dashboard/PerPage.module.scss";
export default function GlobalRoleContent({
  theme,
  handleApprove,
  handleDisapprove,
  UserProfSuspend,
  UserProfUnsuspend,
  UserProfDisable,
  UserProfEnable,
  setInputsTake,
  inputstake,
  inputsPage,
  handlePrevPage,
  handleNextPage,
  isCard,
  setInputsPage,
  setInputsSkip,
  handleLiked,
  drawer,
  setDrawer,
  drawerId,
  setDrawerId,
  roleDetails,
  myRoleTranslate,
  setStatus,
}) {
  return (
    <Row>
      {!isEmpty(roleDetails?.role?.users) && isCard
        ? roleDetails?.role?.users.map((item, index) => {
            return (
              <Col
                key={index}
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                span={24}
                className="my-3 md:px-2"
              >
                <UserProfCard
                  setDrawerId={setDrawerId}
                  handleLiked={() => handleLiked(item.id)}
                  handleApprove={handleApprove}
                  handleDisapprove={handleDisapprove}
                  UserProfSuspend={UserProfSuspend}
                  UserProfUnsuspend={UserProfUnsuspend}
                  UserProfDisable={UserProfDisable}
                  UserProfEnable={UserProfEnable}
                  data={item}
                  theme={theme}
                  drawer={drawer}
                  setDrawer={setDrawer}
                  myTranslateUserProfile={myRoleTranslate}
                  setStatus={setStatus}
                />
              </Col>
            );
          })
        : null}
      {!isEmpty(roleDetails?.role?.users) && !isCard ? (
        <Col span={24} className="my-3 px-2">
          <UserProfRow
            userProf={roleDetails?.role}
            handleApprove={handleApprove}
            handleDisapprove={handleDisapprove}
            UserProfSuspend={UserProfSuspend}
            UserProfUnsuspend={UserProfUnsuspend}
            UserProfDisable={UserProfDisable}
            UserProfEnable={UserProfEnable}
            theme={theme}
            myTranslateUserProfile={myRoleTranslate}
            setStatus={setStatus}
          />
        </Col>
      ) : null}
      {isEmpty(roleDetails?.role?.users) ? (
        <Col span={24} className="mt-10">
          <Empty description={false} />
        </Col>
      ) : null}
      <Col span={24} className="pr-4">
        <div
          style={{ height: 50 }}
          className="flex items-center md:justify-end justify-center"
        >
          <PerPage
            setInputsSkip={setInputsSkip}
            setInputsPage={setInputsPage}
            setInputsTake={setInputsTake}
            inputstake={inputstake}
            translator={myRoleTranslate}
            theme={theme}
          />
          {roleDetails?.members?.pages != 0 ? (
            <Pagination
              translator={myRoleTranslate}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              current={inputsPage?.current}
              pages={roleDetails?.members?.pages}
              theme={theme}
            />
          ) : null}

          <div className="md:flex items-center  hidden">
            <p
              style={{ marginBottom: 0 }}
              className={theme ? Styles.lightText : Styles.darkText}
            >
              {roleDetails?.results} {myRoleTranslate["applications"]?.title}
            </p>
          </div>
        </div>
      </Col>
      {/* Start Drawer Mobile */}
      <div className="md:hidden block">
        <UserProfDrawer
          drawerId={drawerId}
          theme={theme}
          onClose={() => setDrawer(false)}
          visible={drawer}
          handleApprove={handleApprove}
          handleDisapprove={handleDisapprove}
          UserProfSuspend={UserProfSuspend}
          UserProfUnsuspend={UserProfUnsuspend}
          UserProfDisable={UserProfDisable}
          UserProfEnable={UserProfEnable}
          translator={myRoleTranslate}
          setStatus={setStatus}
        />
      </div>
      {/* End Drawer Mobile */}
    </Row>
  );
}
