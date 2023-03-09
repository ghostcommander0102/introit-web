import React from "react";
import { Col, Row, Form, Input, Button, Breadcrumb } from "antd";
import Styles from "/styles/scss/dashboard/FilterCandi.module.scss";
import Search from "/public/assets/images/svgs/search-candy-icon.svg";
import FilterButton from "./FilterButton";
import RowIcon from "/public/assets/images/svgs/row-icon.svg";
import CardIcon from "/public/assets/images/svgs/card-icon.svg";
import Sort from "/public/assets/images/svgs/sortable-icon.svg";
import SortDark from "/public/assets/images/svgs/dark/sortable-icon.svg";
import Filter from "/public/assets/images/svgs/filter-icon.svg";
import FilterDark from "/public/assets/images/svgs/dark/filter-icon.svg";
import Role from "/public/assets/images/svgs/role-icon.svg";
import RoleDark from "/public/assets/images/svgs/dark/role-icon.svg";
import BreadcrumbItem from "./BreadcrumbItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Link from "next/link";
import HeadPlusButton from "./HeadPlusButton";
export default function FilterUserProf({
  theme,
  searchInput,
  isCard,
  handleChangeStructure,
  handleOnInputSearch,
  translator = {},
  userProf,
  inRole = false,
  roleDetails = {},
  handleShowMemberModal = () => {},
  router,
}) {
  const styleButton = {
    backgroundColor: "transparent",
    border: 0,
    boxShadow: "0 0 0px",
    padding: "0",
  };
  return (
    <Row className="md:px-2">
      <Col className="md:hidden block" span={24}>
        {inRole ? (
          <div className="flex justify-between">
            <div className="wrapper-bread">
              <BreadcrumbItem>
                <Breadcrumb.Item onClick={() => {}}>
                  <Link href="/">
                    <a>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {translator["dashboard"]?.title}
                      </span>
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => router.push("/global-setting")}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {translator["global-setting"]?.title}
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => router.push("/global-setting")}>
                  <Link href="/global-setting/roles/">
                    <a>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {translator["accesses"]?.title}
                      </span>
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => {}}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightLast
                        : BreadcrumbStyles.darkLast
                    }
                  >
                    {roleDetails?.role?.title}
                  </span>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightNumber
                        : BreadcrumbStyles.darkNumber
                    }
                  >
                    {roleDetails?.members?.results}
                    {translator["members"]?.title}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </div>
            <div className="flex items-center">
              <HeadPlusButton onClick={handleShowMemberModal} theme={theme} />
            </div>
          </div>
        ) : (
          <BreadcrumbItem>
            <Breadcrumb.Item onClick={() => {}}>
              <Link href="/">
                <a>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {translator["dashboard"]?.title}
                  </span>
                </a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => {}}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {translator["profile"]?.title}
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => {}}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {translator["user-profiles"]?.title}

                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightNumber
                      : BreadcrumbStyles.darkNumber
                  }
                >
                  {userProf?.results + " " + translator["members"]?.title}
                </span>
              </span>
            </Breadcrumb.Item>
          </BreadcrumbItem>
        )}
      </Col>
      <Col style={{ zIndex: 35 }} md={{ span: 12 }} span={18} className="pt-4">
        <Form.Item>
          <Input
            value={searchInput.query}
            onChange={(e) => handleOnInputSearch(e)}
            prefix={theme ? <Search /> : <Search />}
            className={theme ? Styles.lightInput : Styles.darkInput}
            placeholder={translator["search-for-users"]?.title}
          />
        </Form.Item>
      </Col>
      <Col md={{ span: 12 }} span={6} className="pt-4">
        <div>
          <div className="flex justify-end items-center md:pt-0 pt-1">
            <div className="md:block hidden">
              <Button onClick={handleChangeStructure} style={styleButton}>
                {isCard ? <RowIcon /> : <CardIcon />}
              </Button>
            </div>
            <div className="md:block hidden pl-4">
              <FilterButton
                icon={<Role />}
                iconDark={<RoleDark />}
                text={translator["roles"]?.title}
                theme={theme}
              />
            </div>
            <div className="px-4">
              <FilterButton
                icon={<Sort />}
                iconDark={<SortDark />}
                text={translator["sort-by"]?.title}
                theme={theme}
              />
            </div>
            <div className="">
              <FilterButton
                text={translator["filters"]?.title}
                theme={theme}
                onClick={() => {}}
                icon={<Filter />}
                iconDark={<FilterDark />}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
