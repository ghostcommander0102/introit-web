import React from "react";
import { Col, Row, Form, Input, Button, Breadcrumb } from "antd";
import Styles from "/styles/scss/dashboard/FilterCandi.module.scss";
import Search from "/public/assets/images/svgs/search-candy-icon.svg";
import Sort from "/public/assets/images/svgs/sortable-icon.svg";
import SortDark from "/public/assets/images/svgs/dark/sortable-icon.svg";
import FilterButton from "./FilterButton";
import RowIcon from "/public/assets/images/svgs/row-icon.svg";
import CardIcon from "/public/assets/images/svgs/card-icon.svg";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import ButtonWithPlus from "./ButtonWithPlus";
export default function FilterRoleDetail({
  theme,
  handleShow,
  searchInput,
  isCard,
  handleChangeStructure,
  roleDetails,
  router,
  handleOnInputSearch,
  handleShowMemberModal,
  myRoleTranslate,
}) {
  const styleButton = {
    backgroundColor: "transparent",
    border: 0,
    boxShadow: "0 0 0px",
  };
  return (
    <Row className="md:px-10 px-2 md:mt-5">
      <Col md={{ span: 12 }} span={24} className="md:pt-0 mt-2.5">
        <div className="flex justify-between">
          <div>
            <BreadcrumbItem>
              <Breadcrumb.Item
                onClick={() => {
                  router.push("/global-setting");
                }}
              >
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {myRoleTranslate["global-setting"]?.title}
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => {
                  router.push("/global-setting");
                }}
              >
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {myRoleTranslate["roles"]?.title}
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightLast
                      : BreadcrumbStyles.darkLast
                  }
                >
                  {roleDetails?.role?.name},
                  <span className={BreadcrumbStyles.count}>
                    {roleDetails?.members?.results}
                    {myRoleTranslate["members"]?.title}
                  </span>
                </span>
              </Breadcrumb.Item>
            </BreadcrumbItem>
          </div>
        </div>
      </Col>
      <Col span={12} className="flex md:justify-end justify-start items-end">
        <ButtonWithPlus
          onClick={handleShowMemberModal}
          theme={theme}
          text={myRoleTranslate["add-new-member"]?.title}
        />
      </Col>
      <Col
        md={{ span: 12, order: 0 }}
        span={24}
        order={1}
        className="md:mt-10 mt-5 md:pl-5 pl-0"
      >
        <Form.Item>
          <Input
            value={searchInput?.query}
            onChange={(e) => handleOnInputSearch(e)}
            prefix={theme ? <Search /> : <Search />}
            className={theme ? Styles.lightInput : Styles.darkInput}
            placeholder={myRoleTranslate["search-for-user..."]?.title}
          />
        </Form.Item>
      </Col>
      <Col span={12} className="md:pl-5 pl-0  md:mt-7 mt-5">
        <div className="md:pl-2 pl-0">
          <div className="flex justify-end md:pl-5 pl-0">
            <div className="ml-3 mt-4 md:block hidden">
              <Button onClick={handleChangeStructure} style={styleButton}>
                {isCard ? <RowIcon /> : <CardIcon />}
              </Button>
            </div>
            <div className="ml-3 md:mt-3 mt-2">
              <FilterButton
                icon={<Sort />}
                iconDark={<SortDark />}
                text={myRoleTranslate["sort-by"]?.title}
                theme={theme}
              />
            </div>
            <div></div>
            <div className="ml-3 md:mt-3 mt-2">
              <FilterButton
                text={myRoleTranslate["filters"]?.title}
                theme={theme}
                onClick={handleShow}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
