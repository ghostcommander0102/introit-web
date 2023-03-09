import React from "react";
import { Breadcrumb } from "antd";
import Plus from "/public/assets/images/svgs/bread-arrow.svg";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
export default function BreadcrumbItem({ children }) {
  return (
    <Breadcrumb
      separator={
        <span className={BreadcrumbStyles.separator}>
          <Plus />
        </span>
      }
    >
      {children}
    </Breadcrumb>
  );
}
