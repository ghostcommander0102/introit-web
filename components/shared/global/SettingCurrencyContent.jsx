import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import ContentWrapper from "../ContentWrapper";
import DividerItem from "../DividerItem";
import CurrencyCreate from "./CurrencyCreate";
import CurrencyItem from "./CurrencyItem";
import SegmentedItem from "./SegmentedItem";

export default function SettingCurrencyContent({
  theme,
  errors,
  isCreateCurrency,
  currency,
  handleShowCurrencyForm,
  currnecyInputs,
  setCurrencyInputs,
  handleCreateCurrencies,
  isUpdatedCurrency,
  handleUpdateCurrencies,
  handleShowCurrencies,
  handelDeleteCurrencies,
  globalSettingTranslate,
}) {
  return (
    <Row className="pb-10">
      <Col span={24}>
        <ContentWrapper marginLeft={0} marginRight={0} theme={theme}>
          <Row>
            <Col span={24} className="pl-5">
              <DividerItem
                content={globalSettingTranslate["currency"]?.title}
                theme={theme}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mt-5">
              <SegmentedItem
                handleShowSocialForm={handleShowCurrencyForm}
                theme={theme}
                isCreateSocial={isCreateCurrency}
                items={currency}
                textRight={globalSettingTranslate["add-new-currency"]?.title}
              />
            </Col>
          </Row>
          {isCreateCurrency ? (
            <Row className="mt-10 pt-10">
              <Col span={24}>
                <CurrencyCreate
                  handleCreateCurrencies={handleCreateCurrencies}
                  currnecyInputs={currnecyInputs}
                  setCurrencyInputs={setCurrencyInputs}
                  theme={theme}
                  errors={errors}
                  isUpdatedCurrency={isUpdatedCurrency}
                  handleUpdateCurrencies={handleUpdateCurrencies}
                  globalSettingTranslate={globalSettingTranslate}
                />
              </Col>
            </Row>
          ) : (
            <Row className="mt-5">
              <Col span={24}>
                {!isEmpty(currency)
                  ? currency.map((item, index) => {
                      return (
                        <div key={index} className="mb-5">
                          <CurrencyItem
                            handelDeleteCurrencies={() =>
                              handelDeleteCurrencies(item.id)
                            }
                            handleShowCurrencies={() =>
                              handleShowCurrencies(item.id)
                            }
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
