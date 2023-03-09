import { Breadcrumb, Col, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import DividerItem from "../DividerItem";
import FormItem from "../form/FormItem";
import SelectItem from "../form/SelectItem";
import BasicCreate from "./BasicCreate";
import BasicItem from "./BasicItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import HeadPlus from "/public/assets/images/svgs/plus-head.svg";
import HeadPlusDark from "/public/assets/images/svgs/dark/plus-head.svg";
import BreadcrumbItem from "../BreadcrumbItem";
import Link from "next/link";
import HeadButton from "../HeadButton";
import BasicItems from "./BasicItems";
import HeadPlusButton from "../HeadPlusButton";
import ContentWrapper from "../ContentWrapper";
import GlobalTabSlider from "./GlobalTabSlider";
export default function SettingBasicContent({
  theme,
  setBasicTitle,
  basicTitle,
  handleCreateGenders,
  setBasicInputs,
  basicInputs,
  errors,
  handelDeleteGender,
  handleShowGenders,
  handleChangeGenderItem,
  handleUpdateGender,
  securityQuestionInputs,
  handelDeleteSecurityQuestions,
  handleCreateSecurityQuestions,
  handleShowSecurityQuestions,
  handleChangeSecurityQuestionsItem,
  handleUpdateSecurityQuestions,
  academicInputs,
  handleCreateAcademic,
  handleShowAcademic,
  handleChangeAcademicItem,
  handleUpdateAcademic,
  handelDeleteAcademic,
  skillsInputs,
  handleCreateDomination,
  handleShowDomination,
  handleChangeDominationItem,
  handleUpdateDomination,
  handelDeleteDomination,
  languageLevelInputs,
  handleCreateLanguageLevel,
  handleShowLanguageLevel,
  handleChangeLanguageLevelItem,
  handleUpdateLanguageLevel,
  handelDeleteLanguageLevel,
  drivingInputs,
  handleCreateDrivingLicenses,
  handleShowDrivingLicenses,
  handleChangeDrivingLicensesItem,
  handleUpdateDrivingLicenses,
  handelDeleteDrivingLicenses,
  languageCertificateInputs,
  handleCreateCertificates,
  handleShowCertificates,
  handleChangeCertificatesItem,
  handleUpdateCertificates,
  handelDeleteCertificates,
  industryInputs,
  handleCreateIndustry,
  handleShowIndustry,
  handleChangeIndustryItem,
  handleUpdateIndustry,
  handelDeleteIndustry,
  nationalityInputs,
  handleCreateNationality,
  handleShowNationality,
  handleChangeNationalityItem,
  handleUpdateNationality,
  handelDeleteNationality,
  handleShowLanguages,
  handelDeleteLanguages,
  employmentInputs,
  handleCreateEmployment,
  handleShowEmployment,
  handleChangeEmploymentItem,
  handleUpdateEmployment,
  handelDeleteEmployment,
  timeZoneInputs,
  handleCreateTimeZone,
  handleShowTimeZone,
  handleChangeTimeZoneItem,
  handleUpdateTimeZone,
  handelDeleteTimeZone,
  globalSettingTranslate,
  gendersInputs,
  countries,
  handleShowCountryForm,
  handelDeleteCountry,
  handleShowCountry,
  currency,
  handleShowCurrencies,
  handelDeleteCurrencies,
  handleShowCurrencyForm,
  languages,
  handleShowLanguagesModal,
  handleChangeTab,
  tab,
  salaryInputs,
  handleCreateSalary,
  handleShowSalary,
  handleChangeSalaryItem,
  handleUpdateSalary,
  handelDeleteSalary,
}) {
  return (
    <Row>
      <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
        <Row>
          <Col span={12}>
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
                      {globalSettingTranslate["dashboard"]?.title}
                    </span>
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {globalSettingTranslate["global-setting"]?.title}
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => {}}>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightLast
                      : BreadcrumbStyles.darkLast
                  }
                >
                  {globalSettingTranslate["basic-info"]?.title}
                </span>
              </Breadcrumb.Item>
            </BreadcrumbItem>
          </Col>
          <Col span={12}>
            {basicTitle == 15 ? (
              <div className="flex justify-end items-center">
                <HeadButton
                  inGlobal={true}
                  onClick={handleShowCountryForm}
                  theme={theme}
                  text={globalSettingTranslate["add-new-country"]?.title}
                  icon={theme ? <HeadPlus /> : <HeadPlusDark />}
                />
              </div>
            ) : basicTitle == 16 ? (
              <div className="flex justify-end items-center">
                <HeadButton
                  inGlobal={true}
                  onClick={handleShowCurrencyForm}
                  theme={theme}
                  text={globalSettingTranslate["add-new-currency"]?.title}
                  icon={theme ? <HeadPlus /> : <HeadPlusDark />}
                />
              </div>
            ) : basicTitle == 10 ? (
              <div className="flex justify-end items-center">
                <HeadButton
                  inGlobal={true}
                  onClick={handleShowLanguagesModal}
                  theme={theme}
                  text={globalSettingTranslate["add-new-languages"]?.title}
                  icon={theme ? <HeadPlus /> : <HeadPlusDark />}
                />
              </div>
            ) : null}
          </Col>
        </Row>
      </Col>
      <Col
        style={{ height: 50 }}
        span={24}
        className={`${
          theme ? Pages.lightWrapperSlider : Pages.darkWrapperSlider
        } md:hidden block px-4 py-2`}
      >
        <GlobalTabSlider
          tab={tab}
          handleChangeTab={handleChangeTab}
          theme={theme}
          globalSettingTranslate={globalSettingTranslate}
        />
      </Col>
      <Col span={24}>
        <ContentWrapper theme={theme}>
          <FormItem>
            <Row className="md:px-2 pt-2">
              <Col className="pb-4 md:hidden block" span={24}>
                <Row>
                  <Col span={12}>
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
                                {globalSettingTranslate["dashboard"]?.title}
                              </span>
                            </a>
                          </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
                          <span
                            className={
                              theme
                                ? BreadcrumbStyles.lightItem
                                : BreadcrumbStyles.darkItem
                            }
                          >
                            {globalSettingTranslate["global-setting"]?.title}
                          </span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => {}}>
                          <span
                            className={
                              theme
                                ? BreadcrumbStyles.lightLast
                                : BreadcrumbStyles.darkLast
                            }
                          >
                            {globalSettingTranslate["basic-info"]?.title}
                          </span>
                        </Breadcrumb.Item>
                      </BreadcrumbItem>
                    </div>
                  </Col>
                  <Col span={12}>
                    {basicTitle == 15 ? (
                      <div className="flex justify-end items-center">
                        <HeadPlusButton
                          onClick={handleShowCountryForm}
                          theme={theme}
                          text={
                            globalSettingTranslate["add-new-country"]?.title
                          }
                          icon={<HeadPlus />}
                        />
                      </div>
                    ) : basicTitle == 16 ? (
                      <div className="flex justify-end items-center">
                        <HeadPlusButton
                          onClick={handleShowCurrencyForm}
                          theme={theme}
                          text={
                            globalSettingTranslate["add-new-currency"]?.title
                          }
                          icon={<HeadPlus />}
                        />
                      </div>
                    ) : basicTitle == 10 ? (
                      <div className="flex justify-end items-center">
                        <HeadPlusButton
                          onClick={handleShowLanguagesModal}
                          theme={theme}
                          text={
                            globalSettingTranslate["add-new-languages"]?.title
                          }
                          icon={<HeadPlus />}
                        />
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col md={{ span: 12 }} span={24} className="">
                    <SelectItem
                      inAdmin={false}
                      defaultValue={basicTitle}
                      onChange={(value) => {
                        setBasicTitle(value);
                        setBasicInputs({ basic: "" });
                      }}
                      options={[
                        {
                          value: 1,
                          label: globalSettingTranslate["genders"]?.title,
                        },
                        {
                          value: 2,
                          label:
                            globalSettingTranslate["security-questions"]?.title,
                        },
                        {
                          value: 3,
                          label:
                            globalSettingTranslate["academic-levels"]?.title,
                        },
                        {
                          value: 4,
                          label:
                            globalSettingTranslate["domination-levels"]?.title,
                        },
                        {
                          value: 5,
                          label:
                            globalSettingTranslate["language-level"]?.title,
                        },
                        {
                          value: 6,
                          label:
                            globalSettingTranslate["language-certificates"]
                              ?.title,
                        },
                        {
                          value: 7,
                          label: globalSettingTranslate["industry"]?.title,
                        },
                        {
                          value: 9,
                          label: globalSettingTranslate["nationalities"]?.title,
                        },

                        {
                          value: 12,
                          label:
                            globalSettingTranslate["driving-licenses"]?.title,
                        },
                        {
                          value: 13,
                          label:
                            globalSettingTranslate["employment-types"]?.title,
                        },
                        {
                          value: 14,
                          label: globalSettingTranslate["time-zone"]?.title,
                        },
                        {
                          value: 15,
                          label: globalSettingTranslate["country"]?.title,
                        },
                        {
                          value: 16,
                          label: globalSettingTranslate["currency"]?.title,
                        },
                        {
                          value: 10,
                          label: globalSettingTranslate["languages"]?.title,
                        },
                        {
                          value: 17,
                          label: "Salary Period",
                        },
                      ]}
                      label="Title"
                      theme={theme}
                      placeholder="title"
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24} className="pt-10">
                <DividerItem
                  theme={theme}
                  content={
                    basicTitle == 1
                      ? globalSettingTranslate["genders"]?.title
                      : basicTitle == 2
                      ? globalSettingTranslate["security-questions"]?.title
                      : basicTitle == 3
                      ? globalSettingTranslate["academic-levels"]?.title
                      : basicTitle == 4
                      ? globalSettingTranslate["domination-levels"]?.title
                      : basicTitle == 5
                      ? globalSettingTranslate["language-level"]?.title
                      : basicTitle == 6
                      ? globalSettingTranslate["language-certificates"]?.title
                      : basicTitle == 7
                      ? globalSettingTranslate["industry"]?.title
                      : basicTitle == 9
                      ? globalSettingTranslate["nationalities"]?.title
                      : basicTitle == 10
                      ? globalSettingTranslate["languages"]?.title
                      : basicTitle == 12
                      ? globalSettingTranslate["driving-licenses"]?.title
                      : basicTitle == 13
                      ? globalSettingTranslate["employment-types"]?.title
                      : basicTitle == 14
                      ? globalSettingTranslate["time-zone"]?.title
                      : basicTitle == 15
                      ? globalSettingTranslate["country"]?.title
                      : basicTitle == 16
                      ? globalSettingTranslate["currency"]?.title
                      : basicTitle == 17
                      ? "Salary Period"
                      : null
                  }
                />
              </Col>
            </Row>
            <Row className="mt-6 md:px-2">
              {basicTitle == 1 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          translator={globalSettingTranslate}
                          handleAddBasic={handleCreateGenders}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={!isEmpty(errors?.title) ? true : false}
                          help={errors?.title}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {gendersInputs?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        md={{ span: 12 }}
                        span={24}
                        className="md:pr-2.5 pr-0  pb-6"
                      >
                        <BasicItem
                          translator={globalSettingTranslate}
                          deleted={() => handelDeleteGender(item.id)}
                          show={() => handleShowGenders(item.id)}
                          changed={(e) => handleChangeGenderItem(e, item.id)}
                          updated={() => handleUpdateGender()}
                          theme={theme}
                          data={item}
                        />
                      </Col>
                    );
                  })}
                </>
              ) : basicTitle == 2 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateSecurityQuestions}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {securityQuestionInputs.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        md={{ span: 12 }}
                        span={24}
                        className="md:pr-2.5 pr-0  pb-6"
                      >
                        <BasicItem
                          translator={globalSettingTranslate}
                          deleted={() => handelDeleteSecurityQuestions(item.id)}
                          show={() => handleShowSecurityQuestions(item.id)}
                          changed={(e) =>
                            handleChangeSecurityQuestionsItem(e, item.id)
                          }
                          updated={() => handleUpdateSecurityQuestions()}
                          theme={theme}
                          data={item}
                        />
                      </Col>
                    );
                  })}
                </>
              ) : basicTitle == 3 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateAcademic}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(academicInputs)
                    ? academicInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteAcademic(item.id)}
                              show={() => handleShowAcademic(item.id)}
                              changed={(e) =>
                                handleChangeAcademicItem(e, item.id)
                              }
                              updated={() => handleUpdateAcademic()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 4 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateDomination}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(skillsInputs)
                    ? skillsInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteDomination(item.id)}
                              show={() => handleShowDomination(item.id)}
                              changed={(e) =>
                                handleChangeDominationItem(e, item.id)
                              }
                              updated={() => handleUpdateDomination()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 5 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateLanguageLevel}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(languageLevelInputs)
                    ? languageLevelInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteLanguageLevel(item.id)}
                              show={() => handleShowLanguageLevel(item.id)}
                              changed={(e) =>
                                handleChangeLanguageLevelItem(e, item.id)
                              }
                              updated={() => handleUpdateLanguageLevel()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 6 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateCertificates}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(languageCertificateInputs)
                    ? languageCertificateInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteCertificates(item.id)}
                              show={() => handleShowCertificates(item.id)}
                              changed={(e) =>
                                handleChangeCertificatesItem(e, item.id)
                              }
                              updated={() => handleUpdateCertificates()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 7 ? (
                <>
                  {" "}
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateIndustry}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(industryInputs)
                    ? industryInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteIndustry(item.id)}
                              show={() => handleShowIndustry(item.id)}
                              changed={(e) =>
                                handleChangeIndustryItem(e, item.id)
                              }
                              updated={() => handleUpdateIndustry()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 9 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateNationality}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(nationalityInputs)
                    ? nationalityInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteNationality(item.id)}
                              show={() => handleShowNationality(item.id)}
                              changed={(e) =>
                                handleChangeNationalityItem(e, item.id)
                              }
                              updated={() => handleUpdateNationality()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 10 ? (
                <>
                  {!isEmpty(languages)
                    ? languages.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItems
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteLanguages(item.id)}
                              show={() => handleShowLanguages(item.id)}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 12 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateDrivingLicenses}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(drivingInputs)
                    ? drivingInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() =>
                                handelDeleteDrivingLicenses(item.id)
                              }
                              show={() => handleShowDrivingLicenses(item.id)}
                              changed={(e) =>
                                handleChangeDrivingLicensesItem(e, item.id)
                              }
                              updated={() => handleUpdateDrivingLicenses()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 13 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateEmployment}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(employmentInputs)
                    ? employmentInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteEmployment(item.id)}
                              show={() => handleShowEmployment(item.id)}
                              changed={(e) =>
                                handleChangeEmploymentItem(e, item.id)
                              }
                              updated={() => handleUpdateEmployment()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 14 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          handleAddBasic={handleCreateTimeZone}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={
                            !isEmpty(errors?.title_english) ? true : false
                          }
                          help={errors?.title_english}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {!isEmpty(timeZoneInputs)
                    ? timeZoneInputs.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItem
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteTimeZone(item.id)}
                              show={() => handleShowTimeZone(item.id)}
                              changed={(e) =>
                                handleChangeTimeZoneItem(e, item.id)
                              }
                              updated={() => handleUpdateTimeZone()}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 15 ? (
                <>
                  {!isEmpty(countries)
                    ? countries.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItems
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteCountry(item.id)}
                              show={() => handleShowCountry(item.id)}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 16 ? (
                <>
                  {!isEmpty(currency)
                    ? currency.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={{ span: 12 }}
                            span={24}
                            className="md:pr-2.5 pr-0  pb-6"
                          >
                            <BasicItems
                              translator={globalSettingTranslate}
                              deleted={() => handelDeleteCurrencies(item.id)}
                              show={() => handleShowCurrencies(item.id)}
                              theme={theme}
                              data={item}
                            />
                          </Col>
                        );
                      })
                    : null}
                </>
              ) : basicTitle == 17 ? (
                <>
                  <Col span={24} className="md:pr-2.5 pr-0  pb-2">
                    <Row>
                      <Col md={{ span: 12 }} span={24}>
                        <BasicCreate
                          translator={globalSettingTranslate}
                          handleAddBasic={handleCreateSalary}
                          setBasicInputs={setBasicInputs}
                          basicInputs={basicInputs}
                          placeholder=""
                          theme={theme}
                          isWrong={!isEmpty(errors?.title) ? true : false}
                          help={errors?.title}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {salaryInputs?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        md={{ span: 12 }}
                        span={24}
                        className="md:pr-2.5 pr-0  pb-6"
                      >
                        <BasicItem
                          translator={globalSettingTranslate}
                          deleted={() => handelDeleteSalary(item.id)}
                          show={() => handleShowSalary(item.id)}
                          changed={(e) => handleChangeSalaryItem(e, item.id)}
                          updated={() => handleUpdateSalary()}
                          theme={theme}
                          data={item}
                        />
                      </Col>
                    );
                  })}
                </>
              ) : null}
            </Row>
          </FormItem>
        </ContentWrapper>
      </Col>
    </Row>
  );
}
