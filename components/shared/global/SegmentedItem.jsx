import React from "react";
import { Row, Col, Segmented } from "antd";
import Plus from "/public/assets/images/svgs/social-plus.svg";
import PlusActive from "/public/assets/images/svgs/social-plus-active.svg";
export default function SegmentedItem({
  translator,
  isCreateSocial,
  theme,
  handleShowSocialForm,
  items = [],
  textLeft = `${translator["active"]?.title} (${items?.length})`,
  textRight = translator["add-new-social"]?.title,
}) {
  return (
    <Row>
      <Col span={24}>
        <Segmented
          value={
            isCreateSocial
              ? translator["create"]?.title
              : translator["active"]?.title
          }
          className="segmented-item"
          onChange={(value) => handleShowSocialForm(value)}
          options={[
            {
              label: (
                <span
                  style={{
                    color: !isCreateSocial
                      ? theme
                        ? "#F2F2F8"
                        : "#F2F2F8"
                      : theme
                      ? "#6E7191"
                      : "#F2F2F8",
                  }}
                >
                  {textLeft}
                </span>
              ),
              value: translator["active"]?.title,
            },
            {
              label: (
                <div className="flex items-center">
                  <span
                    style={{
                      color: isCreateSocial
                        ? theme
                          ? "#F2F2F8"
                          : "#F2F2F8"
                        : theme
                        ? "#6E7191"
                        : "#F2F2F8",
                    }}
                  >
                    {textRight}
                  </span>
                  <span className="pl-2">
                    {theme ? (
                      isCreateSocial ? (
                        <PlusActive />
                      ) : (
                        <Plus />
                      )
                    ) : isCreateSocial ? (
                      <PlusActive />
                    ) : (
                      <PlusActive />
                    )}
                  </span>
                </div>
              ),
              value: translator["create"]?.title,
            },
          ]}
        />
      </Col>
    </Row>
  );
}
