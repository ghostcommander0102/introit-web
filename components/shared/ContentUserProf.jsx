import React from "react";
import { Button, Col, Empty, Row } from "antd";
import UserProfCard from "./UserProfCard";
import { isEmpty } from "lodash";
import Pagination from "./Pagination";
import PerPage from "./PerPage";
import UserProfRow from "./UserProfRow";
import UserProfDrawer from "./UserProfDrawer";
import Styles from "/styles/scss/dashboard/PerPage.module.scss";
export default function ContentUserProf({
  theme,
  userProf,
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
  setStatus,
  myTranslateUserProfile,
}) {
  return (
    <Row className="md:mt-2">
      {!isEmpty(userProf?.users) && isCard
        ? userProf?.users.map((item, index) => {
            return (
              <Col
                key={index}
                xl={{ span: 8 }}
                lg={{ span: 12 }}
                span={24}
                className="mb-4 md:px-2"
              >
                <UserProfCard
                  myTranslateUserProfile={myTranslateUserProfile}
                  setDrawerId={setDrawerId}
                  handleLiked={() => handleLiked(item.id)}
                  data={item}
                  theme={theme}
                  drawer={drawer}
                  setDrawer={setDrawer}
                  setStatus={setStatus}
                />
              </Col>
            );
          })
        : null}
      {!isEmpty(userProf) && !isCard ? (
        <Col span={24} className="mx:px-2">
          <UserProfRow
            myTranslateUserProfile={myTranslateUserProfile}
            setStatus={setStatus}
            userProf={userProf}
            theme={theme}
            handleLiked={handleLiked}
          />
        </Col>
      ) : null}
      {isEmpty(userProf?.users) ? (
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
            translator={myTranslateUserProfile}
            setInputsSkip={setInputsSkip}
            setInputsPage={setInputsPage}
            setInputsTake={setInputsTake}
            inputstake={inputstake}
            theme={theme}
          />
          {userProf.pages != 0 ? (
            <Pagination
              translator={myTranslateUserProfile}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              current={inputsPage?.current}
              pages={userProf?.pages}
              theme={theme}
            />
          ) : null}

          <div className="md:flex items-center  hidden">
            <p
              style={{ marginBottom: 0 }}
              className={theme ? Styles.lightText : Styles.darkText}
            >
              {userProf?.results}{" "}
              {myTranslateUserProfile["applications"]?.title}
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
          translator={myTranslateUserProfile}
          setStatus={setStatus}
        />
      </div>
      {/* End Drawer Mobile */}
    </Row>
  );
}
