import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/Access.module.scss";
import CheckBoxItem from "./form/CheckboxItem";
export default function RowAccess({
  theme,
  data,
  handleEditPermission,
  roleId,
  translator,
}) {
  return (
    <Row>
      <Col className="md:block hidden" span={24}>
        <div
          className={theme ? Styles.lightWrapperGray : Styles.darkWrapperGray}
        >
          <div className="flex w-1/4">
            <p
              style={{ textTransform: "capitalize" }}
              className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
            >
              {data?.title}
            </p>
          </div>
          <div className="flex justify-between items-center w-3/4 pl-10">
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].invite == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "invite",
                    !data?.permissions[0].invite
                  )
                }
                value={data?.permissions[0].invite}
                theme={theme}
              />
            </div>
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].create == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "create",
                    !data?.permissions[0].create
                  )
                }
                value={data?.permissions[0].create}
                theme={theme}
              />
            </div>
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].view == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "view",
                    !data?.permissions[0].view
                  )
                }
                value={data?.permissions[0].view}
                theme={theme}
              />
            </div>
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].edit == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "edit",
                    !data?.permissions[0].edit
                  )
                }
                value={data?.permissions[0].edit}
                theme={theme}
              />
            </div>
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].delete == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "delete",
                    !data?.permissions[0].delete
                  )
                }
                value={data?.permissions[0].delete}
                theme={theme}
              />
            </div>
            <div>
              <CheckBoxItem
                disabled={data?.permissions[0].approve == null}
                onChange={() =>
                  handleEditPermission(
                    roleId,
                    data.id,
                    "approve",
                    !data?.permissions[0].approve
                  )
                }
                value={data?.permissions[0].approve}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col span={24} className="md:hidden block">
        <div
          className={theme ? Styles.lightWrapperGray : Styles.darkWrapperGray}
        >
          <div className="flex w-full">
            <p
              style={{ textTransform: "capitalize" }}
              className={theme ? Styles.lightHeaderRow : Styles.darkHeaderRow}
            >
              {data?.title}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <div style={{ height: 30 }} className="flex justify-between">
              <div className="flex items-center w-1/3 justify-start">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["add-invite"]?.title}
                </p>
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].invite == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "invite",
                        !data?.permissions[0].invite
                      )
                    }
                    value={data?.permissions[0].invite}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="flex items-center w-1/3 justify-center">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["create"]?.title}
                </p>{" "}
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].create == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "create",
                        !data?.permissions[0].create
                      )
                    }
                    value={data?.permissions[0].create}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="flex items-center w-1/3 justify-end">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["view"]?.title}
                </p>
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].view == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "view",
                        !data?.permissions[0].view
                      )
                    }
                    value={data?.permissions[0].view}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
            <div style={{ height: 30 }} className="flex justify-between">
              <div className="flex items-center w-1/3 justify-center pl-4">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["edit"]?.title}
                </p>
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].edit == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "edit",
                        !data?.permissions[0].edit
                      )
                    }
                    value={data?.permissions[0].edit}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="flex items-center w-1/3 justify-center">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["delete"]?.title}
                </p>
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].delete == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "delete",
                        !data?.permissions[0].delete
                      )
                    }
                    value={data?.permissions[0].delete}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="flex items-center w-1/3 justify-end">
                <p
                  className={
                    theme ? Styles.lightHeaderRowM : Styles.darkHeaderRowM
                  }
                >
                  {translator["approve"]?.title}
                </p>
                <div className="pl-2">
                  <CheckBoxItem
                    disabled={data?.permissions[0].approve == null}
                    onChange={() =>
                      handleEditPermission(
                        roleId,
                        data.id,
                        "approve",
                        !data?.permissions[0].approve
                      )
                    }
                    value={data?.permissions[0].approve}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
