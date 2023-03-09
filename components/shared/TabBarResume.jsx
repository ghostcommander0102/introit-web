import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import ContentWrapper from "./ContentWrapper";
import Education from "./resume/Education";
import Experience from "./resume/Experience";
import Skill from "./resume/Skill";
import Languages from "./resume/Languages";
import Expertise from "./resume/Expertise";
import Portfolio from "./resume/Portfolio";
import ExtraCurricular from "./resume/ExtraCurricular";
import Courses from "./resume/Courses";
import Internships from "./resume/Internships";
import References from "./resume/References";
import Hobbies from "./resume/Hobbies";
import Additional from "./resume/Additional";
import Publications from "./resume/Publications";
import Honors from "./resume/Honors";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import CustomeProgress from "./CustomeProgress";
import FormItem from "./form/FormItem";
import BreadcrumbItem from "./BreadcrumbItem";
import ResumeButton from "./ResumeButton";
import Link from "next/link";
import Styles from "/styles/scss/common/Pages.module.scss";
import ResuemTabSlider from "./ResumeTabSlider";
import ResumeDownload from "./ResumeDownload";
export default function TabBarResume({
  theme,
  handleShowMore,
  handleChangeTab,
  tab,
  setTab,
  handleClose,
  show,
  disabledButton,
  education,
  setEducationInputs,
  educationInputs,
  handleCreateEducation,
  handleDeletEducation,
  handleGetSingleEducation,
  handleUpdateEducation,
  handleModalEducation,
  errors,
  isUpdate,
  experiences,
  handleCreateExperiences,
  experiencesInputs,
  setExperiencesInputs,
  handleGetSingleExperiences,
  handleDeletExperiences,
  handleUpdateExperiences,
  handleModalExperiences,
  skills,
  skillsList,
  handleCreateSkills,
  skillsInputs,
  setSkillsInput,
  handleGetSingleSkills,
  handleUpdateSkills,
  handleDeletSkills,
  handleModalSkills,
  languageCertificates,
  languageLevel,
  languages,
  handleGetSingleLang,
  languageInputs,
  setLanguageInput,
  handleCreateLanguages,
  languagesList,
  handleDeletLanguage,
  handleModalLanguage,
  handleUpdateLanguage,
  expertises,
  expertisesInputs,
  setExpertisesInput,
  handleCreateExpertises,
  handleGetSingleExpertises,
  handleDeletExpertises,
  handleUpdateExpertises,
  handleModalExpertises,
  portfolios,
  filelist,
  setFilelist,
  handlePreview,
  handleModalPortfolio,
  handleCreatePortfolio,
  portfolioInputs,
  setPortfolioInputs,
  extra,
  extraInputs,
  setExtraInputs,
  handleCreateExtra,
  handleGetSingleExtra,
  handleDeletExtra,
  handleModalExtra,
  handleUpdateExtra,
  internships,
  handleCreateInternships,
  handelGetSingleInternships,
  handleDeletInternships,
  internshipsInputs,
  setInternshipsInputs,
  handleModalInternships,
  handleUpdateInternships,
  references,
  handleCreateReferences,
  referencesInputs,
  setReferencesInputs,
  handleGetSingleReferences,
  handleUpdateReferences,
  handleDeletReferences,
  handleModalReferences,
  hobbiesInputs,
  setHobbiesInputs,
  handleUpdateHobbies,
  additionalInputs,
  setAdditionalInputs,
  handleUpdateAdditional,
  handleUpdatePublications,
  publicationsInputs,
  setPublicationsInputs,
  disabledDeleteRow,
  disabledSingleRow,
  handleModalAwards,
  awards,
  awardsInputs,
  setAwardsInputs,
  handleCreateAwards,
  handleGetSingleAwards,
  handleUpdateAwards,
  handleDeleteAwards,
  academicLevel,
  handleCreateCourses,
  handleGetSingleCourses,
  handleUpdateCourses,
  handleDeleteCourses,
  coursesInputs,
  setCoursesInputs,
  handleModalCourses,
  courses,
  handleGetSinglePortfolio,
  handleDeletePortfolio,
  handleSelectAddress,
  isMapBoxOpen,
  address,
  employmentType,
  handleShowCvs,
  myResumeTranslate,
  handleDeletePortfolioImage,
  handleUpdatePortfolio,
  progress,
  currentUser,
  addressData,
}) {
  return (
    <Row>
      <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
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
                  {myResumeTranslate["dashboard"]?.title}
                </span>
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => {}}>
            <Link href={"/profile/"}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {myResumeTranslate["profile"]?.title}
              </span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleChangeTab(2)}>
            <span
              className={
                theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
              }
            >
              {myResumeTranslate["resume"]?.title}
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className={
                theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
              }
            >
              {tab == "2"
                ? myResumeTranslate["education"]?.title
                : tab == "3"
                ? myResumeTranslate["experience"]?.title
                : tab == "4"
                ? myResumeTranslate["skills"]?.title
                : tab == "5"
                ? myResumeTranslate["languages"]?.title
                : tab == "6"
                ? myResumeTranslate["expertise"]?.title
                : tab == "7"
                ? myResumeTranslate["portfolio"]?.title
                : tab == "8"
                ? myResumeTranslate["extra-curricular-activities"]?.title
                : tab == "9"
                ? myResumeTranslate["courses"]?.title
                : tab == "10"
                ? myResumeTranslate["internships"]?.title
                : tab == "11"
                ? myResumeTranslate["references"]?.title
                : tab == "12"
                ? myResumeTranslate["hobbies"]?.title
                : tab == "13"
                ? myResumeTranslate["additional-information"]?.title
                : tab == "14"
                ? myResumeTranslate["publications"]?.title
                : tab == "15"
                ? myResumeTranslate["honors-and-awards"]?.title
                : null}
            </span>
          </Breadcrumb.Item>
        </BreadcrumbItem>
      </Col>
      <Col
        span={24}
        className={`${
          theme ? Styles.lightWrapperSlider : Styles.darkWrapperSlider
        } md:hidden block px-4 py-2`}
      >
        <ResuemTabSlider
          myResumeTranslate={myResumeTranslate}
          handleChangeTab={handleChangeTab}
          tab={tab}
          theme={theme}
          education={education}
          experiences={experiences}
          skills={skills}
          languages={languages}
          expertises={expertises}
          portfolios={portfolios}
          extra={extra}
          courses={courses}
          internships={internships}
          references={references}
          currentUser={currentUser}
          awards={awards}
        />
      </Col>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <ContentWrapper theme={theme}>
              <Col className="p-0 md:hidden block" span={24}>
                <div className="flex justify-between w-full">
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
                              {myResumeTranslate["dashboard"]?.title}
                            </span>
                          </a>
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item onClick={() => {}}>
                        <Link href={"/profile/"}>
                          <span
                            className={
                              theme
                                ? BreadcrumbStyles.lightItem
                                : BreadcrumbStyles.darkItem
                            }
                          >
                            {myResumeTranslate["profile"]?.title}
                          </span>
                        </Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item onClick={() => handleChangeTab(2)}>
                        <span
                          className={
                            theme
                              ? BreadcrumbStyles.lightItem
                              : BreadcrumbStyles.darkItem
                          }
                        >
                          {myResumeTranslate["resume"]?.title}
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
                          {tab == "2"
                            ? myResumeTranslate["education"]?.title
                            : tab == "3"
                            ? myResumeTranslate["experience"]?.title
                            : tab == "4"
                            ? myResumeTranslate["skills"]?.title
                            : tab == "5"
                            ? myResumeTranslate["languages"]?.title
                            : tab == "6"
                            ? myResumeTranslate["expertise"]?.title
                            : tab == "7"
                            ? myResumeTranslate["portfolio"]?.title
                            : tab == "8"
                            ? myResumeTranslate["extra-curricular-activities"]
                                ?.title
                            : tab == "9"
                            ? myResumeTranslate["courses"]?.title
                            : tab == "10"
                            ? myResumeTranslate["internships"]?.title
                            : tab == "11"
                            ? myResumeTranslate["references"]?.title
                            : tab == "12"
                            ? myResumeTranslate["hobbies"]?.title
                            : tab == "13"
                            ? myResumeTranslate["additional-information"]?.title
                            : tab == "14"
                            ? myResumeTranslate["publications"]?.title
                            : tab == "15"
                            ? myResumeTranslate["honors-and-awards"]?.title
                            : null}
                        </span>
                      </Breadcrumb.Item>
                    </BreadcrumbItem>
                  </div>
                  <div>
                    <Link href="/profile/resume/preview">
                      <a>
                        <ResumeDownload />
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
              <div className="py-2 md:pr-2 md:pl-6 pl-4">
                <CustomeProgress theme={theme} now={progress} />
              </div>
              <FormItem>
                {tab == "2" ? (
                  <Education
                    addressData={addressData}
                    myResumeTranslate={myResumeTranslate}
                    academicLevel={academicLevel}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    errors={errors}
                    education={education}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    show={show}
                    setEducationInputs={setEducationInputs}
                    educationInputs={educationInputs}
                    handleCreateEducation={handleCreateEducation}
                    handleDeletEducation={handleDeletEducation}
                    handleGetSingleEducation={handleGetSingleEducation}
                    handleUpdateEducation={handleUpdateEducation}
                    handleModalEducation={handleModalEducation}
                    isUpdate={isUpdate}
                    handleSelectAddress={handleSelectAddress}
                    isMapBoxOpen={isMapBoxOpen}
                    address={address}
                  />
                ) : tab == "3" ? (
                  <Experience
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    experiences={experiences}
                    employmentType={employmentType}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalExperiences}
                    show={show}
                    handleCreateExperiences={handleCreateExperiences}
                    experiencesInputs={experiencesInputs}
                    setExperiencesInputs={setExperiencesInputs}
                    errors={errors}
                    handleGetSingleExperiences={handleGetSingleExperiences}
                    handleDeletExperiences={handleDeletExperiences}
                    handleUpdateExperiences={handleUpdateExperiences}
                    isUpdate={isUpdate}
                    addressData={addressData}
                  />
                ) : tab == "4" ? (
                  <Skill
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalSkills}
                    show={show}
                    skills={skills}
                    skillsList={skillsList}
                    handleCreateSkills={handleCreateSkills}
                    handleGetSingleSkills={handleGetSingleSkills}
                    skillsInputs={skillsInputs}
                    setSkillsInput={setSkillsInput}
                    handleUpdateSkills={handleUpdateSkills}
                    handleDeletSkills={handleDeletSkills}
                    errors={errors}
                    isUpdate={isUpdate}
                  />
                ) : tab == "5" ? (
                  <Languages
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalLanguage}
                    show={show}
                    languageCertificates={languageCertificates}
                    languageLevel={languageLevel}
                    languages={languages}
                    handleGetSingleLang={handleGetSingleLang}
                    setLanguageInput={setLanguageInput}
                    languageInputs={languageInputs}
                    errors={errors}
                    isUpdate={isUpdate}
                    handleCreateLanguages={handleCreateLanguages}
                    languagesList={languagesList}
                    handleDeletLanguage={handleDeletLanguage}
                    handleUpdateLanguage={handleUpdateLanguage}
                  />
                ) : tab == "6" ? (
                  <Expertise
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalExpertises}
                    show={show}
                    handleShowMore={handleShowMore}
                    expertises={expertises}
                    expertisesInputs={expertisesInputs}
                    setExpertisesInput={setExpertisesInput}
                    handleCreateExpertises={handleCreateExpertises}
                    skillsList={skillsList}
                    handleGetSingleExpertises={handleGetSingleExpertises}
                    handleDeletExpertises={handleDeletExpertises}
                    handleUpdateExpertises={handleUpdateExpertises}
                    errors={errors}
                    isUpdate={isUpdate}
                  />
                ) : tab == "7" ? (
                  <Portfolio
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    show={show}
                    handleOpen={handleModalPortfolio}
                    handleShowMore={handleShowMore}
                    portfolios={portfolios}
                    filelist={filelist}
                    setFilelist={setFilelist}
                    handlePreview={handlePreview}
                    handleCreatePortfolio={handleCreatePortfolio}
                    handleGetSinglePortfolio={handleGetSinglePortfolio}
                    handleUpdatePortfolio={handleUpdatePortfolio}
                    handleDeletePortfolio={handleDeletePortfolio}
                    portfolioInputs={portfolioInputs}
                    setPortfolioInputs={setPortfolioInputs}
                    errors={errors}
                    isUpdate={isUpdate}
                    handleDeletePortfolioImage={handleDeletePortfolioImage}
                  />
                ) : tab == "8" ? (
                  <ExtraCurricular
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalExtra}
                    show={show}
                    extra={extra}
                    extraInputs={extraInputs}
                    errors={errors}
                    isUpdate={isUpdate}
                    setExtraInputs={setExtraInputs}
                    handleCreateExtra={handleCreateExtra}
                    handleGetSingleExtra={handleGetSingleExtra}
                    handleDeletExtra={handleDeletExtra}
                    handleUpdateExtra={handleUpdateExtra}
                    addressData={addressData}
                  />
                ) : tab == "9" ? (
                  <Courses
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalCourses}
                    show={show}
                    errors={errors}
                    isUpdate={isUpdate}
                    handleCreateCourses={handleCreateCourses}
                    handleGetSingleCourses={handleGetSingleCourses}
                    handleUpdateCourses={handleUpdateCourses}
                    handleDeleteCourses={handleDeleteCourses}
                    coursesInputs={coursesInputs}
                    setCoursesInputs={setCoursesInputs}
                    courses={courses}
                  />
                ) : tab == "10" ? (
                  <Internships
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalInternships}
                    show={show}
                    errors={errors}
                    isUpdate={isUpdate}
                    internships={internships}
                    handleCreateInternships={handleCreateInternships}
                    handelGetSingleInternships={handelGetSingleInternships}
                    handleDeletInternships={handleDeletInternships}
                    internshipsInputs={internshipsInputs}
                    setInternshipsInputs={setInternshipsInputs}
                    handleUpdateInternships={handleUpdateInternships}
                    addressData={addressData}
                  />
                ) : tab == "11" ? (
                  <References
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalReferences}
                    show={show}
                    errors={errors}
                    isUpdate={isUpdate}
                    references={references}
                    handleCreateReferences={handleCreateReferences}
                    referencesInputs={referencesInputs}
                    setReferencesInputs={setReferencesInputs}
                    handleGetSingleReferences={handleGetSingleReferences}
                    handleUpdateReferences={handleUpdateReferences}
                    handleDeletReferences={handleDeletReferences}
                  />
                ) : tab == "12" ? (
                  <Hobbies
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleUpdateHobbies={handleUpdateHobbies}
                    hobbiesInputs={hobbiesInputs}
                    setHobbiesInputs={setHobbiesInputs}
                    errors={errors}
                  />
                ) : tab == "13" ? (
                  <Additional
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    additionalInputs={additionalInputs}
                    setAdditionalInputs={setAdditionalInputs}
                    handleUpdateAdditional={handleUpdateAdditional}
                    errors={errors}
                  />
                ) : tab == "14" ? (
                  <Publications
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleUpdatePublications={handleUpdatePublications}
                    publicationsInputs={publicationsInputs}
                    setPublicationsInputs={setPublicationsInputs}
                    errors={errors}
                  />
                ) : tab == "15" ? (
                  <Honors
                    myResumeTranslate={myResumeTranslate}
                    disabledButton={disabledButton}
                    disabledDeleteRow={disabledDeleteRow}
                    disabledSingleRow={disabledSingleRow}
                    theme={theme}
                    setTab={setTab}
                    handleClose={handleClose}
                    handleOpen={handleModalAwards}
                    show={show}
                    awards={awards}
                    errors={errors}
                    isUpdate={isUpdate}
                    awardsInputs={awardsInputs}
                    setAwardsInputs={setAwardsInputs}
                    handleCreateAwards={handleCreateAwards}
                    handleGetSingleAwards={handleGetSingleAwards}
                    handleUpdateAwards={handleUpdateAwards}
                    handleDeleteAwards={handleDeleteAwards}
                    handleShowCvs={handleShowCvs}
                  />
                ) : null}
              </FormItem>
              {tab == "2" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => {}}
                  onClickRight={() => setTab("3")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "3" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("2")}
                  onClickRight={() => setTab("4")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "4" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("3")}
                  onClickRight={() => {
                    console.log("hi");
                    setTab("5");
                  }}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "5" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("4")}
                  onClickRight={() => setTab("6")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "6" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("5")}
                  onClickRight={() => setTab("7")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "7" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("6")}
                  onClickRight={() => setTab("8")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "8" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("7")}
                  onClickRight={() => setTab("9")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "9" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("8")}
                  onClickRight={() => setTab("10")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "10" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("9")}
                  onClickRight={() => setTab("11")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "11" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("10")}
                  onClickRight={() => setTab("12")}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "12" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("11")}
                  onClickRight={() => {
                    handleUpdateHobbies(), setTab("13");
                  }}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "13" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("12")}
                  onClickRight={() => {
                    setTab("14"), handleUpdateAdditional();
                  }}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "14" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("13")}
                  onClickRight={() => {
                    setTab("15"), handleUpdatePublications();
                  }}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : tab == "15" ? (
                <ResumeButton
                  type="button"
                  onClickLeft={() => setTab("14")}
                  onClickRight={() => {}}
                  theme={theme}
                  leftText={myResumeTranslate["back-step"]?.title}
                  rightText={myResumeTranslate["next-step"]?.title}
                />
              ) : null}
            </ContentWrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
