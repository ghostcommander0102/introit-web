import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import ContentWrapper from "../ContentWrapper";
import DividerItem from "../DividerItem";
import CountryCreate from "./CountryCreate";
import CountryItem from "./CountryItem";
import SegmentedItem from "./SegmentedItem";
export default function SettingCountryContent({
  theme,
  errors,
  isCreateCountry,
  setIsCreateCountry,
  countries,
  handleShowCountryForm,
  countryInputs,
  setCountryInputs,
  handleCreateCountry,
  isUpdatedCountry,
  handleUpdateCountry,
  handleShowCountry,
  handelDeleteCountry,
  globalSettingTranslate,
}) {
  return (
    <Row className="pb-10">
      <Col span={24}>
        <ContentWrapper marginLeft={0} marginRight={0} theme={theme}>
          <Row>
            <Col span={24} className="pl-5">
              <DividerItem
                content={globalSettingTranslate["country"]?.title}
                theme={theme}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mt-5">
              <SegmentedItem
                handleShowSocialForm={handleShowCountryForm}
                theme={theme}
                isCreateSocial={isCreateCountry}
                setIsCreateSocial={setIsCreateCountry}
                items={countries}
                textRight={globalSettingTranslate["add-new-country"]?.title}
              />
            </Col>
          </Row>
          {isCreateCountry ? (
            <Row className="mt-10 pt-10">
              <Col span={24}>
                <CountryCreate
                  handleCreateCountry={handleCreateCountry}
                  countryInputs={countryInputs}
                  setCountryInputs={setCountryInputs}
                  theme={theme}
                  errors={errors}
                  isUpdatedCountry={isUpdatedCountry}
                  handleUpdateCountry={handleUpdateCountry}
                  globalSettingTranslate={globalSettingTranslate}
                />
              </Col>
            </Row>
          ) : (
            <Row className="mt-5">
              <Col span={24}>
                {!isEmpty(countries)
                  ? countries.map((item, index) => {
                      return (
                        <div key={index} className="mb-5">
                          <CountryItem
                            handelDeleteCountry={() =>
                              handelDeleteCountry(item.id)
                            }
                            handleShowCountry={() => handleShowCountry(item.id)}
                            data={item}
                            theme={theme}
                          />
                        </div>
                      );
                    })
                  : null}
              </Col>
            </Row>
          )}
        </ContentWrapper>
      </Col>
    </Row>
  );
}
