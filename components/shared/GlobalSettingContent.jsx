import React from "react";
import { Breadcrumb, Col, Empty, Row } from "antd";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import ButtonTabBar from "./ButtonTabBar";
import Role from "/public/assets/images/svgs/role.svg";
import RoleActive from "/public/assets/images/svgs/role-active.svg";
import RoleDark from "/public/assets/images/svgs/dark/role.svg";
import RoleActiveDark from "/public/assets/images/svgs/dark/role-active.svg";
import Social from "/public/assets/images/svgs/social.svg";
import SocialActive from "/public/assets/images/svgs/social-active.svg";
import SocialDark from "/public/assets/images/svgs/dark/social.svg";
import SocialActiveDark from "/public/assets/images/svgs/dark/social-active.svg";
import Percentage from "/public/assets/images/svgs/percentage.svg";
import PercentageActive from "/public/assets/images/svgs/percentage-active.svg";
import PercentageDark from "/public/assets/images/svgs/dark/percentage.svg";
import PercentageActiveDark from "/public/assets/images/svgs/dark/percentage-active.svg";
import Translate from "/public/assets/images/svgs/translate.svg";
import TranslateActive from "/public/assets/images/svgs/translate-active.svg";
import TranslateDark from "/public/assets/images/svgs/dark/translate.svg";
import TranslateActiveDark from "/public/assets/images/svgs/dark/translate-active.svg";
import Basic from "/public/assets/images/svgs/basic-info.svg";
import BasicDark from "/public/assets/images/svgs/dark/basic-info.svg";
import Pen from "/public/assets/images/svgs/setting-pen.svg";
import PenDark from "/public/assets/images/svgs/dark/setting-pen.svg";
import DividerItem from "./DividerItem";
import ButtonWithPlus from "./ButtonWithPlus";
import SettingRoleContent from "./global/SettingRoleContent";
import BreadcrumbItem from "./BreadcrumbItem";
import ContentWrapper from "./ContentWrapper";
import HeaderAccess from "./HeaderAccess";
import RowAccess from "./RowAccess";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import SettingText from "./form/SettingText";
import SettingSocialContent from "./global/SocialContent";
import SettingPercentageContent from "./global/SettingPercentageContent";
import SettingBasicContent from "./global/SettingBasicContent";
import { isEmpty } from "lodash";
import SettingCountryContent from "./global/SettingCountryContent";
import SettingCurrencyContent from "./global/SettingCurrencyContent";
import PermissionButton from "./PermissionsButton";
import TransalteList from "./TranslateList";
export default function GlobalSettingContent({
  handleChangeTab,
  tab,
  theme,
  visibleRole,
  handleOpenRoleModal,
  handleCloseRoleModal,
  handleGetPermissionList,
  isCreateRole,
  setIsCreateRole,
  handleHideCreate,
  isCreateSocial,
  setIsCreateSocial,
  role,
  handleCreateRole,
  handleEditRole,
  inputsRole,
  setInputsRole,
  errors,
  handleOpenRoleModalEdit,
  isEditRole,
  handleDeleteRole,
  permission,
  handleEditPermission,
  roleId,
  percentageInputs,
  setPercentageInputs,
  handelUpdatePercentage,
  socials,
  setSocialsInputs,
  socialsInputs,
  handleCreateSocial,
  handleDeleteSocial,
  handleShowSocial,
  handleShowSocialForm,
  isUpdatedSocial,
  handleUpdateSocial,
  setBasicTitle,
  basicTitle,
  genders,
  handleCreateGenders,
  setBasicInputs,
  basicInputs,
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
  languagesInputs,
  handleCreateLanguages,
  handleShowLanguages,
  handleChangeLanguagesItem,
  handleUpdateLanguages,
  handelDeleteLanguages,
  handleCloseBasicInfo,
  handleCloseTranslate,
  countries,
  isCreateCountry,
  setIsCreateCountry,
  handleShowCountryForm,
  countryInputs,
  setCountryInputs,
  handleCreateCountry,
  isUpdatedCountry,
  handleUpdateCountry,
  handleShowCountry,
  handelDeleteCountry,
  currency,
  handleShowCurrencyForm,
  isCreateCurrency,
  currnecyInputs,
  setCurrencyInputs,
  handleCreateCurrencies,
  handleShowCurrencies,
  handleUpdateCurrencies,
  isUpdatedCurrency,
  handelDeleteCurrencies,
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
  handlePermissionTab,
  permissionTab,
  handleSetDefaultRole,
  handleChangeRouteRole,
  currentUser,
  languagesList,
  setTranslateSetting,
  translateSetting,
  translateSection,
  translateInputs,
  setTranslateInputs,
  handleTranslate,
  globalSettingTranslate,
  languageTranslateList,
  translateIsCraete,
  setTranslateIsCreate,
  setTranslateTarget,
  translateTarget,
  handleLiveLanguage,
  handleDeletTranslate,
}) {
  if (isCreateRole) {
    return (
      <Row className="px-10 mt-5">
        <Col span={24}>
          <div className="flex justify-between">
            <div>
              <BreadcrumbItem>
                <Breadcrumb.Item onClick={() => setIsCreateRole(false)}>
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
                <Breadcrumb.Item onClick={() => setIsCreateRole(false)}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {globalSettingTranslate["roles"]?.title}
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
                    {permission?.roleName}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </div>
            <div className="mt-3">
              <CancelButton
                translator={globalSettingTranslate}
                onClick={handleHideCreate}
                hasText={false}
              />
            </div>
          </div>
        </Col>
        <Col span={4} className="mt-10">
          <Row>
            <Col span={24} className="pr-5">
              <div>
                <p
                  style={{
                    color: theme ? "#6E7191" : "#F2F2F8",
                    fontWeight: 400,
                  }}
                >
                  {
                    globalSettingTranslate["what-are-the-features-of-the"]
                      ?.title
                  }
                </p>
              </div>
              <SettingText
                onClick={() =>
                  handleOpenRoleModalEdit(roleId, permission?.roleName)
                }
                text={permission?.roleName}
                icon={theme ? <Pen /> : <PenDark />}
                theme={theme}
              />
              <div>
                <p
                  className="pl-2"
                  style={{
                    color: theme ? "#6E7191" : "#F2F2F8",
                    fontWeight: 400,
                  }}
                >
                  {globalSettingTranslate["role-in-sidebar"]?.title}
                </p>
              </div>
            </Col>
          </Row>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Dashboard")}
              theme={theme}
              text={globalSettingTranslate["dashboard"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Profile")}
              theme={theme}
              text={globalSettingTranslate["profile"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Company")}
              theme={theme}
              text={globalSettingTranslate["companies"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Jobs")}
              theme={theme}
              text={globalSettingTranslate["jobs"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Blog")}
              theme={theme}
              text={globalSettingTranslate["blog"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Settings")}
              theme={theme}
              text={globalSettingTranslate["settings"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Messages")}
              theme={theme}
              text={globalSettingTranslate["messages"]?.title}
            />
          </div>
          <div className="mb-1">
            <PermissionButton
              onClick={() => handlePermissionTab("Support")}
              theme={theme}
              text={globalSettingTranslate["support"]?.title}
            />
          </div>
        </Col>
        <Col span={20} className="mt-10">
          <ContentWrapper theme={theme} marginLeft={0} marginRight={0}>
            {!isEmpty(permission)
              ? permission?.access?.map((item, index) => {
                  if (item.title == permissionTab)
                    return (
                      <Row key={index} className="mb-10 pb-10">
                        <Col span={24}>
                          <HeaderAccess
                            translator={globalSettingTranslate}
                            data={item}
                            theme={theme}
                          />
                        </Col>
                        {!isEmpty(item?.modules)
                          ? item?.modules.map((prop, key) => {
                              return (
                                <Col key={key} span={24} className="mt-3">
                                  <RowAccess
                                    roleId={roleId}
                                    handleEditPermission={handleEditPermission}
                                    data={prop}
                                    theme={theme}
                                    bgGray={true}
                                  />
                                </Col>
                              );
                            })
                          : null}
                      </Row>
                    );
                })
              : null}
          </ContentWrapper>
        </Col>
      </Row>
    );
  } else if (tab == 4) {
    return (
      <TransalteList
        handleDeletTranslate={handleDeletTranslate}
        handleLiveLanguage={handleLiveLanguage}
        translateTarget={translateTarget}
        setTranslateTarget={setTranslateTarget}
        setTranslateIsCreate={setTranslateIsCreate}
        translateIsCraete={translateIsCraete}
        languageTranslateList={languageTranslateList}
        languagesList={languagesList}
        setTranslateSetting={setTranslateSetting}
        translateSetting={translateSetting}
        translateSection={translateSection}
        translateInputs={translateInputs}
        setTranslateInputs={setTranslateInputs}
        handleTranslate={handleTranslate}
        theme={theme}
        globalSettingTranslate={globalSettingTranslate}
        handleCloseTranslate={handleCloseTranslate}
        errors={errors}
        handleChangeTab={handleChangeTab}
      />
    );
  } else if (tab == 5) {
    return (
      <>
        <Row className="mb-5 px-10 mt-5">
          <Col span={12}>
            <BreadcrumbItem>
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
              <Breadcrumb.Item>
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
            <div className="mt-3 flex justify-end">
              <CancelButton
                translator={globalSettingTranslate}
                onClick={handleCloseBasicInfo}
                hasText={false}
              />
            </div>
          </Col>
        </Row>
        <SettingBasicContent
          globalSettingTranslate={globalSettingTranslate}
          basicTitle={basicTitle}
          setBasicTitle={setBasicTitle}
          theme={theme}
          genders={genders}
          handleCreateGenders={handleCreateGenders}
          setBasicInputs={setBasicInputs}
          basicInputs={basicInputs}
          errors={errors}
          handelDeleteGender={handelDeleteGender}
          handleShowGenders={handleShowGenders}
          handleChangeGenderItem={handleChangeGenderItem}
          handleUpdateGender={handleUpdateGender}
          securityQuestionInputs={securityQuestionInputs}
          handelDeleteSecurityQuestions={handelDeleteSecurityQuestions}
          handleCreateSecurityQuestions={handleCreateSecurityQuestions}
          handleShowSecurityQuestions={handleShowSecurityQuestions}
          handleChangeSecurityQuestionsItem={handleChangeSecurityQuestionsItem}
          handleUpdateSecurityQuestions={handleUpdateSecurityQuestions}
          academicInputs={academicInputs}
          handleCreateAcademic={handleCreateAcademic}
          handleShowAcademic={handleShowAcademic}
          handleChangeAcademicItem={handleChangeAcademicItem}
          handleUpdateAcademic={handleUpdateAcademic}
          handelDeleteAcademic={handelDeleteAcademic}
          skillsInputs={skillsInputs}
          handleCreateDomination={handleCreateDomination}
          handleShowDomination={handleShowDomination}
          handleChangeDominationItem={handleChangeDominationItem}
          handleUpdateDomination={handleUpdateDomination}
          handelDeleteDomination={handelDeleteDomination}
          languageLevelInputs={languageLevelInputs}
          handleCreateLanguageLevel={handleCreateLanguageLevel}
          handleShowLanguageLevel={handleShowLanguageLevel}
          handleChangeLanguageLevelItem={handleChangeLanguageLevelItem}
          handleUpdateLanguageLevel={handleUpdateLanguageLevel}
          handelDeleteLanguageLevel={handelDeleteLanguageLevel}
          drivingInputs={drivingInputs}
          handleCreateDrivingLicenses={handleCreateDrivingLicenses}
          handleShowDrivingLicenses={handleShowDrivingLicenses}
          handleChangeDrivingLicensesItem={handleChangeDrivingLicensesItem}
          handleUpdateDrivingLicenses={handleUpdateDrivingLicenses}
          handelDeleteDrivingLicenses={handelDeleteDrivingLicenses}
          languageCertificateInputs={languageCertificateInputs}
          handleCreateCertificates={handleCreateCertificates}
          handleShowCertificates={handleShowCertificates}
          handleChangeCertificatesItem={handleChangeCertificatesItem}
          handleUpdateCertificates={handleUpdateCertificates}
          handelDeleteCertificates={handelDeleteCertificates}
          industryInputs={industryInputs}
          handleCreateIndustry={handleCreateIndustry}
          handleShowIndustry={handleShowIndustry}
          handleChangeIndustryItem={handleChangeIndustryItem}
          handleUpdateIndustry={handleUpdateIndustry}
          handelDeleteIndustry={handelDeleteIndustry}
          nationalityInputs={nationalityInputs}
          handleCreateNationality={handleCreateNationality}
          handleShowNationality={handleShowNationality}
          handleChangeNationalityItem={handleChangeNationalityItem}
          handleUpdateNationality={handleUpdateNationality}
          handelDeleteNationality={handelDeleteNationality}
          languagesInputs={languagesInputs}
          handleCreateLanguages={handleCreateLanguages}
          handleShowLanguages={handleShowLanguages}
          handleChangeLanguagesItem={handleChangeLanguagesItem}
          handleUpdateLanguages={handleUpdateLanguages}
          handelDeleteLanguages={handelDeleteLanguages}
          employmentInputs={employmentInputs}
          handleCreateEmployment={handleCreateEmployment}
          handleShowEmployment={handleShowEmployment}
          handleChangeEmploymentItem={handleChangeEmploymentItem}
          handleUpdateEmployment={handleUpdateEmployment}
          handelDeleteEmployment={handelDeleteEmployment}
          timeZoneInputs={timeZoneInputs}
          handleCreateTimeZone={handleCreateTimeZone}
          handleShowTimeZone={handleShowTimeZone}
          handleChangeTimeZoneItem={handleChangeTimeZoneItem}
          handleUpdateTimeZone={handleUpdateTimeZone}
          handelDeleteTimeZone={handelDeleteTimeZone}
          countries={countries}
        />
      </>
    );
  } else {
    return (
      <Row>
        <Col span={24} className="mt-5 px-10">
          <div className="flex justify-between items-center">
            <div className="w-2/4">
              <DividerItem
                theme={theme}
                content={globalSettingTranslate["global-setting"]?.title}
              />
            </div>
            {tab == 1 ? (
              <div className="w-3/4 flex justify-end">
                <ButtonWithPlus
                  onClick={handleOpenRoleModal}
                  theme={theme}
                  text={globalSettingTranslate["create-new-role"]?.title}
                />
              </div>
            ) : null}
            {tab == 3 ? (
              <div className="w-3/4">
                <DividerItem
                  fontWeight={400}
                  theme={theme}
                  content={globalSettingTranslate["profile-percentage"]?.title}
                />
              </div>
            ) : null}
          </div>
        </Col>
        <Col
          md={{ span: 8 }}
          span={24}
          className="mt-10 md:pl-10 pl-2 md:pr-4 pr-2"
        >
          {currentUser?.menus?.map((item, index) => {
            if (item.title == "Global Settings") {
              return item.modules.map((item, index) => {
                if (item.title == "Roles") {
                  return (
                    <ButtonTabBar
                      key={index}
                      theme={theme}
                      current={1}
                      tab={tab}
                      handleChangeTab={() => handleChangeTab(1)}
                      active={tab == 1}
                      lightIcon={<Role />}
                      activeLightIcon={<RoleActive />}
                      darkIcon={<RoleDark />}
                      activeDarkIcon={<RoleActiveDark />}
                      text={item.title}
                    />
                  );
                }
                if (item.title == "Social Media") {
                  return (
                    <ButtonTabBar
                      theme={theme}
                      current={2}
                      tab={tab}
                      handleChangeTab={() => handleChangeTab(2)}
                      active={tab == 2}
                      lightIcon={<Social />}
                      activeLightIcon={<SocialActive />}
                      darkIcon={<SocialDark />}
                      activeDarkIcon={<SocialActiveDark />}
                      text={item.title}
                    />
                  );
                }
                if (item.title == "Percentage") {
                  return (
                    <ButtonTabBar
                      theme={theme}
                      current={3}
                      tab={tab}
                      handleChangeTab={() => handleChangeTab(3)}
                      active={tab == 3}
                      lightIcon={<Percentage />}
                      activeLightIcon={<PercentageActive />}
                      darkIcon={<PercentageDark />}
                      activeDarkIcon={<PercentageActiveDark />}
                      text={item.title}
                    />
                  );
                }
                if (item.title == "Translation") {
                  return (
                    <ButtonTabBar
                      theme={theme}
                      current={4}
                      tab={tab}
                      handleChangeTab={() => handleChangeTab(4)}
                      active={tab == 4}
                      lightIcon={<Translate />}
                      activeLightIcon={<TranslateActive />}
                      darkIcon={<TranslateDark />}
                      activeDarkIcon={<TranslateActiveDark />}
                      text={item.title}
                    />
                  );
                }
                if (item.title == "Basic Info") {
                  return (
                    <ButtonTabBar
                      theme={theme}
                      current={5}
                      tab={tab}
                      handleChangeTab={() => handleChangeTab(5)}
                      active={tab == 5}
                      lightIcon={<Basic />}
                      activeLightIcon={<RoleActive />}
                      darkIcon={<BasicDark />}
                      activeDarkIcon={<RoleActiveDark />}
                      text={item.title}
                    />
                  );
                }
              });
            }
          })}
        </Col>
        <Col
          md={{ span: 16 }}
          span={24}
          className="mt-10 md:pr-10 pr-2 md:pl-4 pl-2  w-full"
        >
          {tab == 1 ? (
            <SettingRoleContent
              globalSettingTranslate={globalSettingTranslate}
              handleOpenRoleModalEdit={handleOpenRoleModalEdit}
              isEditRole={isEditRole}
              handleGetPermissionList={handleGetPermissionList}
              role={role}
              visibleRole={visibleRole}
              handleCloseRoleModal={handleCloseRoleModal}
              theme={theme}
              handleCreateRole={handleCreateRole}
              inputsRole={inputsRole}
              setInputsRole={setInputsRole}
              handleEditRole={handleEditRole}
              errors={errors}
              handleDeleteRole={handleDeleteRole}
              handleSetDefaultRole={handleSetDefaultRole}
              handleChangeRouteRole={handleChangeRouteRole}
            />
          ) : tab == 2 ? (
            <SettingSocialContent
              globalSettingTranslate={globalSettingTranslate}
              isCreateSocial={isCreateSocial}
              setIsCreateSocial={setIsCreateSocial}
              theme={theme}
              socials={socials}
              setSocialsInputs={setSocialsInputs}
              socialsInputs={socialsInputs}
              handleCreateSocial={handleCreateSocial}
              handleDeleteSocial={handleDeleteSocial}
              handleShowSocial={handleShowSocial}
              handleShowSocialForm={handleShowSocialForm}
              isUpdatedSocial={isUpdatedSocial}
              handleUpdateSocial={handleUpdateSocial}
              errors={errors}
            />
          ) : tab == 3 ? (
            <SettingPercentageContent
              globalSettingTranslate={globalSettingTranslate}
              percentageInputs={percentageInputs}
              setPercentageInputs={setPercentageInputs}
              theme={theme}
              handelUpdatePercentage={handelUpdatePercentage}
            />
          ) : tab == 6 ? (
            <SettingCountryContent
              globalSettingTranslate={globalSettingTranslate}
              isCreateCountry={isCreateCountry}
              setIsCreateCountry={setIsCreateCountry}
              handleShowCountryForm={handleShowCountryForm}
              countryInputs={countryInputs}
              setCountryInputs={setCountryInputs}
              countries={countries}
              handleCreateCountry={handleCreateCountry}
              isUpdatedCountry={isUpdatedCountry}
              handleUpdateCountry={handleUpdateCountry}
              handleShowCountry={handleShowCountry}
              handelDeleteCountry={handelDeleteCountry}
              theme={theme}
              errors={errors}
            />
          ) : tab == 7 ? (
            <SettingCurrencyContent
              globalSettingTranslate={globalSettingTranslate}
              handelDeleteCurrencies={handelDeleteCurrencies}
              isUpdatedCurrency={isUpdatedCurrency}
              isCreateCurrency={isCreateCurrency}
              setIsCreateCountry={setIsCreateCountry}
              handleShowCurrencyForm={handleShowCurrencyForm}
              currnecyInputs={currnecyInputs}
              setCurrencyInputs={setCurrencyInputs}
              currency={currency}
              handleCreateCurrencies={handleCreateCurrencies}
              isUpdatedCountry={isUpdatedCountry}
              handleUpdateCurrencies={handleUpdateCurrencies}
              handleShowCurrencies={handleShowCurrencies}
              handelDeleteCountry={handelDeleteCountry}
              theme={theme}
              errors={errors}
            />
          ) : null}
        </Col>
      </Row>
    );
  }
}
