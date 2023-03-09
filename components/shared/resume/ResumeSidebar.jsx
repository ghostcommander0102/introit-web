import React from "react";
import { Button, Col, Row } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import AddressItem from "../form/AddressItem";
import AreaItem from "../form/AreaItem";
import DateItem from "../form/DateItem";
import EmailItem from "../form/EmailItem";
import FormItem from "../form/FormItem";
import NumberItem from "../form/NumberItem";
import PhoneItem from "../form/PhoneItem";
import SelectItem from "../form/SelectItem";
import TextItem from "../form/TextItem";
import MarginTop from "../MarginTop";
import Avatar from "./Avatar";
import DividerItem from "./DividerItem";
import Seprator from "./Seprator";
import Arrow from "../../../public/assets/images/svgs/arrow-resume.svg";
import Styles from "/styles/scss/dashboard/ResumeSidebar.module.scss";
import CheckBoxItemRev from "../form/CheckBoxItemRev";
import RangePicker from "../form/RangePicker";
import QuartetItem from "./QuartetItem";
import BisectionItem from "./BisectionItem";
import TripletItem from "./TripletItem";
import Uploader from "../resume/Uploader";
import dynamic from "next/dynamic";
import Trash from "/public/assets/images/svgs/portfolio-trash.svg";
import ImageProvider from "providers/ImageProvider";
import StylesPortfolio from "/styles/scss/dashboard/Portfolio.module.scss";
import AddButton from "./AddButton";
import OtherItem from "./OtherItem";
import RemoveButton from "./RemoveButton";
const EditorCustome = dynamic(() => import("../EditorCustome"), {
	ssr: false,
});
const CarouselItem = dynamic(() => import("../resume/CarouselItem"), {
	ssr: false,
});
export default function ResumeSidebar({
	setModalTheme,
	theme,
	progress,
	myResumeTranslate = {},
	currentUser,
	socialsInputs,
	setVisivle,
	handleOpenProf,
	errors,
	setInputsInfo,
	inputsInfo,
	InfoRecoil,
	handleSendSms,
	inputsOther,
	setInputsOther,
	nationalities,
	academicLevels,
	industries,
	currencies,
	drivingRecoil,
	description,
	setDescription,
	handleBack,
	academicLevel,
	cv,
	filelist,
	setFilelist,
	educationInputs,
	setEducationInputs,
	handleCreateEducation,
	handleGetSingleEducation,
	handleUpdateEducation,
	updateList,
	handleDeletEducation,
	employmentType,
	experiencesInputs,
	setExperiencesInputs,
	handleCreateExperiences,
	handleUpdateExperiences,
	handleGetSingleExperiences,
	handleDeletExperiences,
	handleCreateSkills,
	handleGetSingleSkills,
	handleUpdateSkills,
	handleDeletSkills,
	skillsList,
	setSkillsInputs,
	skillsInputs,
	languagesList,
	languageLevel,
	languageCertificates,
	languageInputs,
	setLanguageInput,
	handleCreateLanguages,
	handleGetSingleLang,
	handleUpdateLanguage,
	handleDeletLanguage,
	expertisesInputs,
	setExpertisesInput,
	handleCreateExpertises,
	handleGetSingleExpertises,
	handleUpdateExpertises,
	handleDeletExpertises,
	extraInputs,
	setExtraInputs,
	handleCreateExtra,
	handleGetSingleExtra,
	handleUpdateExtra,
	handleDeletExtra,
	coursesInputs,
	setCoursesInputs,
	handleCreateCourses,
	handleGetSingleCourses,
	handleUpdateCourses,
	handleDeleteCourses,
	internshipsInputs,
	setInternshipsInputs,
	handleCreateInternships,
	handelGetSingleInternships,
	handleUpdateInternships,
	handleDeletInternships,
	referencesInputs,
	setReferencesInputs,
	handleCreateReferences,
	handleGetSingleReferences,
	handleUpdateReferences,
	handleDeletReferences,
	awardsInputs,
	setAwardsInputs,
	handleCreateAwards,
	handleGetSingleAwards,
	handleUpdateAwards,
	handleDeleteAwards,
	hobbiesInputs,
	setHobbiesInputs,
	additionalInputs,
	setAdditionalInputs,
	publicationsInputs,
	setPublicationsInputs,
	portfolioInputs,
	setPortfolioInputs,
	handleCreatePortfolio,
	handleGetSinglePortfolio,
	handleUpdatePortfolio,
	handleDeletePortfolio,
	handleDeletePortfolioImage,
	existInputs,
	setExistInputs,
	router,
	handleDeleteAvatar,
	salary,
}) {
	return (
		<div className={Styles.wrapper}>
			<div
				className={
					theme ? Styles.lightProgressWrapper : Styles.darkProgressWrapper
				}
			>
				<div
					style={{ height: 52 }}
					className="flex md:justify-between justify-end items-center pl-4"
				>
					<div className="md:block hidden">
						<Button
							onClick={handleBack}
							className={theme ? Styles.lightBack : Styles.darkBack}
						>
							<span>
								<Arrow />
							</span>
							<span className="pl-4"> Back to Dashboard</span>
						</Button>
					</div>
					<p className={Styles.progressText}>
						{Math.trunc(progress)}% Completed
					</p>
				</div>
				<div
					style={{ width: progress + "%" }}
					className={Styles.progress}
				></div>
			</div>
			<div className="lg:px-10 px-2 pt-4">
				<DividerItem
					content={myResumeTranslate["personal-information"]?.title}
					theme={theme}
				/>
				<Avatar
					cv={cv}
					handleDeleteAvatar={handleDeleteAvatar}
					handleOpenProf={handleOpenProf}
					setVisivle={setVisivle}
					myResumeTranslate={myResumeTranslate}
					socialsInputs={socialsInputs}
					theme={theme}
					currentUser={currentUser}
				/>
				<MarginTop marginTop={16} />
				<div>
					<FormItem>
						<Row>
							<Col span={24}>
								<EditorCustome
									label={myResumeTranslate["cover-letter"]?.title}
									onChange={setDescription}
									value={description?.description}
									theme={theme}
									name="description"
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<TextItem
									isWrong={!isEmpty(errors?.firstName) ? true : false}
									help={errors?.firstName}
									name="firstName"
									onChange={setInputsInfo}
									label={myResumeTranslate["first-name"]?.title}
									type="text"
									placeholder={
										!isEmpty(inputsInfo?.firstName)
											? inputsInfo?.firstName
											: null
									}
									theme={theme}
									value={inputsInfo?.firstName}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<TextItem
									isWrong={!isEmpty(errors?.lastName) ? true : false}
									help={errors?.lastName}
									name="lastName"
									onChange={setInputsInfo}
									label={myResumeTranslate["last-name"]?.title}
									type="text"
									placeholder={
										!isEmpty(inputsInfo?.lastName) ? inputsInfo?.lastName : null
									}
									theme={theme}
									value={inputsInfo.lastName}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<EmailItem
									isWrong={!isEmpty(errors?.email) ? true : false}
									help={errors?.email}
									disabled={true}
									name="email"
									theme={theme}
									label={myResumeTranslate["email"]?.title}
									type="email"
									value={InfoRecoil?.email}
									verifyed={true}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<PhoneItem
									isWrong={!isEmpty(errors?.phone) ? true : false}
									help={errors?.phone}
									value={inputsInfo?.phone}
									onChange={(phone) => {
										setInputsInfo((prev) => {
											return { ...prev, phone: phone };
										});
									}}
									placeholder={
										!isEmpty(inputsInfo?.phone) ? inputsInfo?.phone : null
									}
									verifyed={InfoRecoil?.isPhoneVerified}
									hasphone={!isEmpty(InfoRecoil?.phone) ? true : false}
									handleSendSms={handleSendSms}
									translator={myResumeTranslate}
									label={myResumeTranslate["phone"]?.title}
									theme={theme}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<DateItem
									picker="date"
									dateFormat="MMM DD, YYYY"
									label={myResumeTranslate["date-of-birth"]?.title}
									isWrong={!isEmpty(errors?.dateOfBirth) ? true : false}
									help={errors?.dateOfBirth}
									value={inputsInfo?.dateOfBirth || moment()}
									theme={theme}
									onChange={(value) => {
										setInputsInfo((prev) => {
											return { ...prev, dateOfBirth: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<AddressItem
									value={
										!inputsInfo?.birth.includes("null")
											? inputsInfo.birth
											: null
									}
									onChange={setInputsInfo}
									theme={theme}
									name="birth"
									label={myResumeTranslate["place-of-birth"]?.title}
								/>
							</Col>
							<Col span={24}>
								<AddressItem
									value={inputsInfo?.streetAddress}
									onChange={setInputsInfo}
									theme={theme}
									name="streetAddress"
									label={myResumeTranslate["address"]?.title}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<SelectItem
									isWrong={!isEmpty(errors?.nationalityId) ? true : false}
									help={errors?.nationalityId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.nationalityId : null
									}
									name="nationalityId"
									theme={theme}
									placeholder=""
									options={nationalities}
									label={myResumeTranslate["nationality"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, nationalityId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<SelectItem
									isWrong={!isEmpty(errors?.academicLevelId) ? true : false}
									help={errors?.academicLevelId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.academicLevelId : null
									}
									name="academicLevelId"
									theme={theme}
									placeholder=""
									options={academicLevels}
									label={myResumeTranslate["academic-level"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, academicLevelId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<SelectItem
									isWrong={!isEmpty(errors?.industryId) ? true : false}
									help={errors?.industryId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.industryId : null
									}
									name="industryId"
									theme={theme}
									placeholder=""
									options={industries}
									label={myResumeTranslate["industry"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, industryId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<TextItem
									isWrong={!isEmpty(errors?.jobTitle) ? true : false}
									help={errors?.jobTitle}
									value={inputsOther.jobTitle}
									name="jobTitle"
									label={myResumeTranslate["job-title"]?.title}
									type="text"
									placeholder={
										!isEmpty(inputsOther) ? inputsOther?.jobTitle : null
									}
									theme={theme}
									onChange={setInputsOther}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pr-2.5 pr-0">
								<SelectItem
									isWrong={!isEmpty(errors?.drivingLicenseId) ? true : false}
									help={errors?.drivingLicenseId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.drivingLicenseId : null
									}
									theme={theme}
									placeholder=""
									options={drivingRecoil}
									label={myResumeTranslate["driving-license"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, drivingLicenseId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 12 }} span={24} className="lg:pl-2.5 pl-0">
								<TextItem
									isWrong={!isEmpty(errors?.website) ? true : false}
									help={errors?.website}
									value={inputsOther.website}
									name="website"
									label={myResumeTranslate["website"]?.title}
									type="text"
									placeholder={
										!isEmpty(inputsOther) ? inputsOther?.website : null
									}
									theme={theme}
									onChange={setInputsOther}
								/>
							</Col>
							<Col lg={{ span: 6 }} span={12} className="md:pr-2.5 pr-0">
								<SelectItem
									isWrong={!isEmpty(errors?.currencyId) ? true : false}
									help={errors?.currencyId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.currencyId : null
									}
									theme={theme}
									placeholder=""
									options={currencies}
									label={myResumeTranslate["salary-currency"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, currencyId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 6 }} span={12} className="lg:px-2.5 pl-2.5 px-0">
								<SelectItem
									isWrong={!isEmpty(errors?.salaryPeriodId) ? true : false}
									help={errors?.salaryPeriodId}
									defaultValue={
										!isEmpty(inputsOther) ? inputsOther?.salaryPeriodId : null
									}
									theme={theme}
									placeholder=""
									options={salary}
									label={myResumeTranslate["salary-period"]?.title}
									onChange={(value) => {
										setInputsOther((prev) => {
											return { ...prev, salaryPeriodId: value };
										});
									}}
								/>
							</Col>
							<Col lg={{ span: 6 }} span={12} className="lg:px-2.5 pr-2.5 px-0">
								<NumberItem
									name="minSalary"
									isWrong={!isEmpty(errors?.minSalary) ? true : false}
									help={errors?.minSalary}
									value={inputsOther?.minSalary}
									theme={theme}
									placeholder="0.000"
									label={myResumeTranslate["salary-range-(from)"]?.title}
									onChange={(value) =>
										setInputsOther((prev) => {
											return { ...prev, minSalary: value };
										})
									}
								/>
							</Col>
							<Col lg={{ span: 6 }} span={12} className="pl-2.5">
								<NumberItem
									name="maxSalary"
									isWrong={!isEmpty(errors?.maxSalary) ? true : false}
									help={errors?.maxSalary}
									value={inputsOther?.maxSalary}
									theme={theme}
									placeholder="0.000"
									options={currencies}
									label={myResumeTranslate["salary-range-(to)"]?.title}
									onChange={(value) =>
										setInputsOther((prev) => {
											return { ...prev, maxSalary: value };
										})
									}
								/>
							</Col>
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							<Col span={24}>
								<Seprator theme={theme} />
							</Col>
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							<Col span={24}>
								<FormItem>
									<Row className="pt-4">
										<Col span={24} className="flex justify-start">
											<DividerItem
												theme={theme}
												content={myResumeTranslate["education"]?.title}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
											<TextItem
												onChange={setEducationInputs}
												value={educationInputs.institute}
												isWrong={
													!isEmpty(errors?.institute) &&
														errors?.typeE == "education"
														? true
														: false
												}
												help={errors?.institute}
												theme={theme}
												label={`${myResumeTranslate["institute"]?.title} *`}
												placeholder=""
												name="institute"
											/>
										</Col>
										<Col
											md={{ span: 12 }}
											span={24}
											className="md:pl-2.5 pl-0 pt-1.5"
										>
											<div className="absolute wrapper-check">
												<CheckBoxItemRev
													checked={educationInputs.present}
													onChange={(e) =>
														setEducationInputs((prev) => {
															return {
																...prev,
																[e.target.name]: e.target.checked,
																toDate: moment().format("MMM DD, YYYY"),
															};
														})
													}
													name="present"
													theme={theme}
													label={myResumeTranslate["present"]?.title}
												/>
											</div>
											<RangePicker
												value={[
													!isEmpty(educationInputs.fromDate)
														? moment(educationInputs.fromDate)
														: null,
													educationInputs.present
														? moment()
														: !isEmpty(educationInputs.toDate)
															? moment(educationInputs.toDate)
															: null,
												]}
												isWrong1={
													!isEmpty(errors?.fromDate) &&
														errors?.typeE == "education"
														? true
														: false
												}
												isWrong2={
													!isEmpty(errors?.toDate) &&
														errors?.typeE == "education"
														? true
														: false
												}
												help1={errors?.fromDate}
												help2={errors?.toDate}
												currentState={educationInputs}
												onChange={(value) => {
													console.log("value", value);
													setEducationInputs((prev) => {
														return {
															...prev,
															fromDate: value[0],
															toDate: value[1],
														};
													});
												}}
												myResumeTranslate={myResumeTranslate}
												theme={theme}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
											<SelectItem
												isWrong={
													!isEmpty(errors?.degreeId) &&
														errors?.typeE == "education"
														? true
														: false
												}
												help={errors?.degreeId}
												theme={theme}
												placeholder=""
												options={academicLevel}
												onChange={(item) => {
													setEducationInputs((prev) => {
														return { ...prev, degreeId: item };
													});
												}}
												defaultValue={
													!isEmpty(educationInputs)
														? educationInputs?.degreeId
														: null
												}
												label={`${myResumeTranslate["present"]?.title} *`}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
											<TextItem
												isWrong={
													!isEmpty(errors?.major) &&
														errors?.typeE == "education"
														? true
														: false
												}
												help={errors?.major}
												name="major"
												theme={theme}
												placeholder=""
												onChange={setEducationInputs}
												value={educationInputs?.major}
												label={`${myResumeTranslate["major"]?.title} *`}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="mt-0">
											<AddressItem
												isWrong={
													!isEmpty(errors?.location) &&
														errors?.typeE == "education"
														? true
														: false
												}
												help={errors?.location}
												theme={theme}
												value={educationInputs.location}
												onChange={setEducationInputs}
												name="location"
												label={myResumeTranslate["location"]?.title}
											/>
										</Col>
										<Col span={24} className="flex justify-end">
											<AddButton
												theme={theme}
												onClick={
													updateList["education"].isUpdate
														? handleUpdateEducation
														: handleCreateEducation
												}
											/>
										</Col>
									</Row>
								</FormItem>
							</Col>
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							{!isEmpty(cv?.userEducations) ? (
								<Col span={24}>
									{cv?.userEducations?.map((item, index) => {
										return (
											<QuartetItem
												translator={myResumeTranslate}
												edit={() => handleGetSingleEducation(item?.id)}
												deleted={() => handleDeletEducation(item?.id)}
												theme={theme}
												title={item?.institute}
												date={`
                        ${moment(item.fromDate).format("MMM YYYY")}  
                        ${moment(item.toDate).format("MMM YYYY")}
                        `}
												location={item.country?.title + " " + item.city?.title}
												detail={item?.degree?.title + " , " + item?.major}
												key={index}
											/>
										);
									})}
								</Col>
							) : null}
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							<Col span={24}>
								<Seprator theme={theme} />
							</Col>
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							<Col span={24}>
								<FormItem>
									<Row className="pt-4">
										<Col span={24} className="flex justify-start">
											<DividerItem
												theme={theme}
												content={myResumeTranslate["experience"]?.title}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
											<TextItem
												value={experiencesInputs.title}
												onChange={setExperiencesInputs}
												isWrong={
													!isEmpty(errors?.title) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												help={errors?.title}
												name="title"
												type="text"
												theme={theme}
												label={`${myResumeTranslate["title"]?.title} *`}
												placeholder=""
											/>
										</Col>
										<Col
											md={{ span: 12 }}
											span={24}
											className="md:pl-2.5 pl-0 pt-1.5"
										>
											<div className="absolute wrapper-check">
												<CheckBoxItemRev
													name="present"
													checked={experiencesInputs.present}
													onChange={(e) =>
														setExperiencesInputs((prev) => {
															return {
																...prev,
																[e.target.name]: e.target.checked,
																toDate: e.target.checked
																	? moment().format("MMM DD, YYYY")
																	: prev.toDate,
															};
														})
													}
													theme={theme}
													label={myResumeTranslate["present"]?.title}
												/>
											</div>
											<RangePicker
												value={[
													!isEmpty(experiencesInputs.fromDate)
														? moment(experiencesInputs.fromDate)
														: null,
													experiencesInputs.present
														? moment()
														: !isEmpty(experiencesInputs.toDate)
															? moment(experiencesInputs.toDate)
															: null,
												]}
												currentState={experiencesInputs}
												onChange={(value) => {
													setExperiencesInputs((prev) => {
														return {
															...prev,
															fromDate: value[0],
															toDate: value[1],
														};
													});
												}}
												isWrong1={
													!isEmpty(errors?.fromDate) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												isWrong2={
													!isEmpty(errors?.toDate) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												help1={errors?.fromDate}
												help2={errors?.toDate}
												myResumeTranslate={myResumeTranslate}
												theme={theme}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
											<TextItem
												value={experiencesInputs.institute}
												onChange={setExperiencesInputs}
												isWrong={
													!isEmpty(errors?.institute) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												help={errors?.institute}
												theme={theme}
												label={`${myResumeTranslate["institute"]?.title} *`}
												placeholder=""
												name="institute"
											/>
										</Col>
										<Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
											<AddressItem
												value={experiencesInputs.location}
												onChange={setExperiencesInputs}
												isWrong={
													!isEmpty(errors?.location) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												help={errors?.location}
												theme={theme}
												name="location"
												label={myResumeTranslate["city"]?.title}
											/>
										</Col>
										<Col md={{ span: 12 }} span={24}>
											<SelectItem
												isWrong={
													!isEmpty(errors?.employmentTypeId) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												onChange={(item) => {
													setExperiencesInputs((prev) => {
														return { ...prev, employmentTypeId: item };
													});
												}}
												defaultValue={
													!isEmpty(experiencesInputs)
														? experiencesInputs?.employmentTypeId
														: null
												}
												options={employmentType}
												help={errors?.employmentTypeId}
												theme={theme}
												placeholder=""
												label={`${myResumeTranslate["employment-type"]?.title} *`}
											/>
										</Col>
										<Col span={24} className="">
											<AreaItem
												value={experiencesInputs.description}
												onChange={setExperiencesInputs}
												isWrong={
													!isEmpty(errors?.description) &&
														errors?.typeE == "experience"
														? true
														: false
												}
												help={errors?.description}
												name="description"
												hasCustomeBack={true}
												theme={theme}
												label={`${myResumeTranslate["description"]?.title} *`}
												rows={3}
											/>
										</Col>
										<Col span={24} className="flex justify-end">
											<AddButton
												theme={theme}
												onClick={
													updateList["experience"].isUpdate
														? handleUpdateExperiences
														: handleCreateExperiences
												}
											/>
										</Col>
									</Row>
								</FormItem>
							</Col>
							<Col span={24}>
								<MarginTop marginTop={48} />
							</Col>
							{!isEmpty(cv?.userExperiences) ? (
								<Col span={24}>
									{cv?.userExperiences?.map((item, index) => {
										return (
											<QuartetItem
												translator={myResumeTranslate}
												edit={() => handleGetSingleExperiences(item?.id)}
												deleted={() => handleDeletExperiences(item?.id)}
												theme={theme}
												title={item?.title}
												date={`
                        ${moment(item.fromDate).format("MMM YYYY")}  
                        ${moment(item.toDate).format("MMM YYYY")}
                        `}
												location={item.country?.title + " " + item.city?.title}
												detail={item?.institute}
												key={index}
											/>
										);
									})}
								</Col>
							) : null}
							{existInputs["skill"].exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															theme={theme}
															content={myResumeTranslate["skills"]?.title}
														/>
														<RemoveButton
															disabled={existInputs["skill"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		skill: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "skill"
																	? true
																	: false
															}
															help={errors?.title}
															name="title"
															theme={theme}
															label={`${myResumeTranslate["title"]?.title} *`}
															placeholder=""
															onChange={setSkillsInputs}
															value={skillsInputs.title}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<SelectItem
															isWrong={
																!isEmpty(errors?.dominationId) &&
																	errors?.typeE == "skill"
																	? true
																	: false
															}
															help={errors?.dominationId}
															onChange={(item) => {
																setSkillsInputs((prev) => {
																	return { ...prev, dominationId: item };
																});
															}}
															defaultValue={
																!isEmpty(skillsInputs)
																	? skillsInputs?.dominationId
																	: null
															}
															theme={theme}
															placeholder=""
															options={skillsList}
															label={`${myResumeTranslate["level"]?.title} *`}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															onChange={setSkillsInputs}
															value={skillsInputs.percentage}
															isWrong={
																!isEmpty(errors?.percentage) &&
																	errors?.typeE == "skill"
																	? true
																	: false
															}
															help={errors?.percentage}
															name="percentage"
															theme={theme}
															label={`${myResumeTranslate["determine-the-percentage"]?.title} *`}
															placeholder=""
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["skill"].isUpdate
																	? handleUpdateSkills
																	: handleCreateSkills
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userSkils) ? (
											<Col span={24}>
												{cv?.userSkils?.map((item, index) => {
													return (
														<BisectionItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleSkills(item?.id)}
															deleted={() => handleDeletSkills(item?.id)}
															theme={theme}
															title={item?.title}
															detail={item.domination.title}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["language"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Row className="pt-4">
												<Col span={24} className="flex justify-between">
													<DividerItem
														theme={theme}
														content={myResumeTranslate["languages"]?.title}
													/>
													<RemoveButton
														disabled={existInputs["language"].deleted}
														onClick={() =>
															setExistInputs((prev) => {
																return {
																	...prev,
																	language: { exist: false, show: true },
																};
															})
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pr-2.5 pr-0"
												>
													<SelectItem
														isWrong={
															!isEmpty(errors?.languageId) &&
																errors?.typeE == "language"
																? true
																: false
														}
														help={errors?.languageId}
														theme={theme}
														placeholder=""
														options={languagesList}
														label={myResumeTranslate["language"]?.title}
														onChange={(item) => {
															setLanguageInput((prev) => {
																return { ...prev, languageId: item };
															});
														}}
														defaultValue={
															!isEmpty(languageInputs)
																? languageInputs?.languageId
																: null
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pl-2.5 pl-0"
												>
													<SelectItem
														isWrong={
															!isEmpty(errors?.levelId) &&
																errors?.typeE == "language"
																? true
																: false
														}
														help={errors?.levelId}
														theme={theme}
														label={myResumeTranslate["level"]?.title}
														options={languageLevel}
														onChange={(item) => {
															setLanguageInput((prev) => {
																return { ...prev, levelId: item };
															});
														}}
														defaultValue={
															!isEmpty(languageInputs)
																? languageInputs?.levelId
																: null
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pr-2.5 pr-0"
												>
													<SelectItem
														isWrong={
															!isEmpty(errors?.certificateId) &&
																errors?.typeE == "language"
																? true
																: false
														}
														help={errors?.certificateId}
														theme={theme}
														label={myResumeTranslate["certificate"]?.title}
														options={languageCertificates}
														onChange={(item) => {
															setLanguageInput((prev) => {
																return { ...prev, certificateId: item };
															});
														}}
														defaultValue={
															!isEmpty(languageInputs)
																? languageInputs?.certificateId
																: null
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pl-2.5 pl-0"
												>
													<TextItem
														name="percentage"
														onChange={setLanguageInput}
														value={languageInputs.percentage}
														isWrong={
															!isEmpty(errors?.percentage) &&
																errors?.typeE == "language"
																? true
																: false
														}
														help={errors?.percentage}
														type="text"
														theme={theme}
														label={
															myResumeTranslate["determine-the-percentage"]
																?.title
														}
													/>
												</Col>
												<Col span={24} className="flex justify-end">
													<AddButton
														onClick={
															updateList["language"].isUpdate
																? handleUpdateLanguage
																: handleCreateLanguages
														}
														theme={theme}
													/>
												</Col>
											</Row>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userLanguages) ? (
											<Col span={24}>
												{cv?.userLanguages?.map((item, index) => {
													return (
														<TripletItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleLang(item?.id)}
															deleted={() => handleDeletLanguage(item?.id)}
															theme={theme}
															title={item.language?.title}
															detail={item.level?.title}
															level={item.certificate?.title}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["expertise"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Row className="pt-4">
												<Col span={24} className="flex justify-between">
													<DividerItem
														theme={theme}
														content={myResumeTranslate["expertise"]?.title}
													/>
													<RemoveButton
														disabled={existInputs["expertise"].deleted}
														onClick={() =>
															setExistInputs((prev) => {
																return {
																	...prev,
																	expertise: { exist: false, show: true },
																};
															})
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pr-2.5 pr-0"
												>
													<TextItem
														isWrong={
															!isEmpty(errors?.title) &&
																errors?.typeE == "expertise"
																? true
																: false
														}
														help={errors?.title}
														value={expertisesInputs.title}
														onChange={setExpertisesInput}
														name="title"
														type="text"
														theme={theme}
														label={`${myResumeTranslate["title"]?.title} *`}
														placeholder=""
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pl-2.5 pl-0"
												>
													<SelectItem
														isWrong={
															!isEmpty(errors?.dominationId) &&
																errors?.typeE == "expertise"
																? true
																: false
														}
														help={errors?.dominationId}
														theme={theme}
														placeholder=""
														options={skillsList}
														label={`${myResumeTranslate["level"]?.title} *`}
														onChange={(item) => {
															setExpertisesInput((prev) => {
																return { ...prev, dominationId: item };
															});
														}}
														defaultValue={
															!isEmpty(expertisesInputs)
																? expertisesInputs?.dominationId
																: null
														}
													/>
												</Col>
												<Col
													md={{ span: 12 }}
													span={24}
													className="md:pr-2 pr-0"
												>
													<TextItem
														isWrong={
															!isEmpty(errors?.percentage) &&
																errors?.typeE == "expertise"
																? true
																: false
														}
														help={errors?.percentage}
														value={expertisesInputs.percentage}
														onChange={setExpertisesInput}
														name="percentage"
														type="text"
														theme={theme}
														label={`${myResumeTranslate["determine-the-percentage"]?.title} *`}
													/>
												</Col>
												<Col span={24} className="flex justify-end">
													<AddButton
														onClick={
															updateList["expertise"].isUpdate
																? handleUpdateExpertises
																: handleCreateExpertises
														}
														theme={theme}
													/>
												</Col>
											</Row>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userExpertises) ? (
											<Col span={24}>
												{cv?.userExpertises?.map((item, index) => {
													return (
														<BisectionItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleExpertises(item?.id)}
															deleted={() => handleDeletExpertises(item?.id)}
															theme={theme}
															title={item?.title}
															detail={item.domination?.title}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["portfolio"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															content={myResumeTranslate["portfolio"]?.title}
															theme={theme}
														/>
														<RemoveButton
															disabled={existInputs["portfolio"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		portfolio: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col span={24}>
														<TextItem
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "portfolio"
																	? true
																	: false
															}
															help={errors?.title}
															name="title"
															theme={theme}
															value={portfolioInputs.title}
															onChange={setPortfolioInputs}
															label={`${myResumeTranslate["title"]?.title} *`}
															placeholder=""
														/>
														<Uploader
															text={myResumeTranslate["upload-image"]?.title}
															setFilelist={setFilelist}
															fileList={filelist}
														/>
													</Col>
													<Col span={24} className="text-center">
														{!isEmpty(filelist) ? (
															<CarouselItem>
																{filelist?.map((item) => {
																	if (item?.originFileObj) {
																		return (
																			<div className={StylesPortfolio.wrapper}>
																				<Button
																					className={StylesPortfolio.button}
																				>
																					<Trash />
																				</Button>
																				<ImageProvider
																					width={155}
																					height={155}
																					src={URL.createObjectURL(
																						item.originFileObj
																					)}
																					alt=""
																				/>
																			</div>
																		);
																	} else {
																		return (
																			<div className={StylesPortfolio.wrapper}>
																				<Button
																					onClick={() =>
																						handleDeletePortfolioImage(
																							item?.imageId
																						)
																					}
																					className={StylesPortfolio.button}
																				>
																					<Trash />
																				</Button>
																				<ImageProvider
																					width={155}
																					height={155}
																					src={item?.imageLink}
																					alt=""
																				/>
																			</div>
																		);
																	}
																})}
															</CarouselItem>
														) : null}
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="mt-3 md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.link) &&
																	errors?.typeE == "portfolio"
																	? true
																	: false
															}
															help={errors?.link}
															name="link"
															theme={theme}
															value={portfolioInputs.link}
															onChange={setPortfolioInputs}
															label={myResumeTranslate["link"]?.title}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="mt-3 md:pl-2.5 pl-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.videoLink) &&
																	errors?.typeE == "portfolio"
																	? true
																	: false
															}
															help={errors?.videoLink}
															name="videoLink"
															value={portfolioInputs.videoLink}
															onChange={setPortfolioInputs}
															theme={theme}
															label={myResumeTranslate["video-link"]?.title}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["portfolio"].isUpdate
																	? handleUpdatePortfolio
																	: handleCreatePortfolio
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userPortfolios) ? (
											<Col span={24}>
												{cv?.userPortfolios?.map((item, index) => {
													return (
														<BisectionItem
															translator={myResumeTranslate}
															edit={() => handleGetSinglePortfolio(item?.id)}
															deleted={() => handleDeletePortfolio(item?.id)}
															theme={theme}
															title={item?.title}
															detail={`${item?.images.length} images`}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["extra"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															theme={theme}
															content={
																myResumeTranslate["extra-curricular-activities"]
																	?.title
															}
														/>
														<RemoveButton
															disabled={existInputs["extra"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		extra: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															help={errors?.title}
															onChange={setExtraInputs}
															value={extraInputs.title}
															name="title"
															theme={theme}
															label={`${myResumeTranslate["title"]?.title} *`}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0 pt-1.5"
													>
														<div className="absolute wrapper-check">
															<CheckBoxItemRev
																checked={extraInputs.present}
																onChange={(e) =>
																	setExtraInputs((prev) => {
																		return {
																			...prev,
																			[e.target.name]: e.target.checked,
																			toDate: e.target.checked
																				? moment().format("MMM DD, YYYY")
																				: prev.toDate,
																		};
																	})
																}
																name="present"
																theme={theme}
																label={`${myResumeTranslate["present"]?.title}`}
															/>
														</div>
														<RangePicker
															isWrong1={
																!isEmpty(errors?.fromDate) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															isWrong2={
																!isEmpty(errors?.toDate) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															help1={errors?.fromDate}
															help2={errors?.toDate}
															theme={theme}
															currentState={extraInputs}
															value={[
																!isEmpty(extraInputs.fromDate)
																	? moment(extraInputs.fromDate)
																	: null,
																extraInputs.present
																	? moment()
																	: !isEmpty(extraInputs.toDate)
																		? moment(extraInputs.toDate)
																		: null,
															]}
															onChange={(value) => {
																setExtraInputs((prev) => {
																	return {
																		...prev,
																		fromDate: value[0],
																		toDate: value[1],
																	};
																});
															}}
															myResumeTranslate={myResumeTranslate}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.institute) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															help={errors?.institute}
															onChange={setExtraInputs}
															value={extraInputs?.institute}
															name="institute"
															type="text"
															theme={theme}
															label={`${myResumeTranslate["institute"]?.title} *`}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<AddressItem
															isWrong={
																!isEmpty(errors?.city) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															help={errors?.city}
															name="location"
															value={extraInputs?.location}
															onChange={setExtraInputs}
															theme={theme}
															label={myResumeTranslate["city"]?.title}
														/>
													</Col>
													<Col span={24}>
														<AreaItem
															isWrong={
																!isEmpty(errors?.description) &&
																	errors?.typeE == "extra"
																	? true
																	: false
															}
															name="description"
															value={extraInputs.description}
															onChange={setExtraInputs}
															hasCustomeBack={true}
															theme={theme}
															label={`${myResumeTranslate["description"]?.title} *`}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["extra"].isUpdate
																	? handleUpdateExtra
																	: handleCreateExtra
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userExtraActivities) ? (
											<Col span={24}>
												{cv?.userExtraActivities?.map((item, index) => {
													return (
														<TripletItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleExtra(item?.id)}
															deleted={() => handleDeletExtra(item?.id)}
															level={`
                      ${moment(item.fromDate).format("MMM YYYY")}  
                      ${moment(item.toDate).format("MMM YYYY")}
                      `}
															detail={
																item.country?.title + " " + item.city?.title
															}
															theme={theme}
															title={item?.title}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["courses"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															theme={theme}
															content={myResumeTranslate["courses"]?.title}
														/>
														<RemoveButton
															disabled={existInputs["courses"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		courses: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															onChange={setCoursesInputs}
															value={coursesInputs.title}
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "courses"
																	? true
																	: false
															}
															help={errors?.title}
															name="title"
															theme={theme}
															label={`${myResumeTranslate["title"]?.title} *`}
														/>
													</Col>
													<Col md={{ span: 12 }} span={24} className="pt-1">
														<div className="absolute wrapper-check">
															<CheckBoxItemRev
																checked={coursesInputs.present}
																onChange={(e) =>
																	setCoursesInputs((prev) => {
																		return {
																			...prev,
																			[e.target.name]: e.target.checked,
																			toDate: moment().format("MMM DD, YYYY"),
																		};
																	})
																}
																name="present"
																theme={theme}
																label={`${myResumeTranslate["present"]?.title}`}
															/>
														</div>
														<RangePicker
															isWrong1={
																!isEmpty(errors?.fromDate) &&
																	errors?.typeE == "courses"
																	? true
																	: false
															}
															isWrong2={
																!isEmpty(errors?.toDate) &&
																	errors?.typeE == "courses"
																	? true
																	: false
															}
															help1={errors?.fromDate}
															help2={errors?.toDate}
															myResumeTranslate={myResumeTranslate}
															theme={theme}
															currentState={coursesInputs}
															value={[
																!isEmpty(coursesInputs.fromDate)
																	? moment(coursesInputs.fromDate)
																	: null,
																coursesInputs.present
																	? moment()
																	: !isEmpty(coursesInputs.toDate)
																		? moment(coursesInputs.toDate)
																		: null,
															]}
															onChange={(value) => {
																setCoursesInputs((prev) => {
																	return {
																		...prev,
																		fromDate: value[0],
																		toDate: value[1],
																	};
																});
															}}
														/>
													</Col>
													<Col span={24}>
														<TextItem
															onChange={setCoursesInputs}
															value={coursesInputs.institute}
															isWrong={
																!isEmpty(errors?.institute) &&
																	errors?.typeE == "courses"
																	? true
																	: false
															}
															help={errors?.institute}
															name="institute"
															theme={theme}
															label={`${myResumeTranslate["institute"]?.title} *`}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["courses"].isUpdate
																	? handleUpdateCourses
																	: handleCreateCourses
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userCourses) ? (
											<Col span={24}>
												{cv?.userCourses?.map((item, index) => {
													return (
														<BisectionItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleCourses(item?.id)}
															deleted={() => handleDeleteCourses(item?.id)}
															detail={item?.institute}
															theme={theme}
															title={item?.title}
															key={index}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{extraInputs["internship"]?.exist ? (
								<Col span={24}>
									<Row span={24}>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="justify-between flex">
														<DividerItem
															theme={theme}
															content={myResumeTranslate["internships"]?.title}
														/>
														<RemoveButton
															disabled={existInputs["internship"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		internship: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															value={internshipsInputs.title}
															onChange={setInternshipsInputs}
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "internship"
																	? true
																	: false
															}
															help={errors?.title}
															name="title"
															theme={theme}
															label={`${myResumeTranslate["title"]?.title} *`}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<div className="absolute wrapper-check">
															<CheckBoxItemRev
																checked={internshipsInputs.present}
																onChange={(e) =>
																	setInternshipsInputs((prev) => {
																		return {
																			...prev,
																			[e.target.name]: e.target.checked,
																			toDate: e.target.checked
																				? moment().format("MMM DD, YYYY")
																				: prev.toDate,
																		};
																	})
																}
																name="present"
																theme={theme}
																label={`${myResumeTranslate["present"]?.title}`}
															/>
														</div>
														<RangePicker
															isWrong1={
																!isEmpty(errors?.fromDate) &&
																	errors?.typeE == "internship"
																	? true
																	: false
															}
															isWrong2={
																!isEmpty(errors?.toDate) &&
																	errors?.typeE == "internship"
																	? true
																	: false
															}
															help1={errors?.fromDate}
															help2={errors?.fromDate}
															myResumeTranslate={myResumeTranslate}
															currentState={internshipsInputs}
															value={[
																!isEmpty(internshipsInputs.fromDate)
																	? moment(internshipsInputs.fromDate)
																	: null,
																internshipsInputs.present
																	? moment()
																	: !isEmpty(internshipsInputs.toDate)
																		? moment(internshipsInputs.toDate)
																		: null,
															]}
															onChange={(value) => {
																setInternshipsInputs((prev) => {
																	return {
																		...prev,
																		fromDate: value[0],
																		toDate: value[1],
																	};
																});
															}}
															theme={theme}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.employer) &&
																	errors?.typeE == "internship"
																	? true
																	: false
															}
															help={errors?.employer}
															name="employer"
															value={internshipsInputs.employer}
															onChange={setInternshipsInputs}
															label={`${myResumeTranslate["employer"]?.title}`}
															theme={theme}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<AddressItem
															isResume={true}
															isWrong={
																!isEmpty(errors?.city) &&
																	errors?.typeE == "internship"
																	? true
																	: false
															}
															help={errors?.city}
															name="location"
															value={internshipsInputs.location}
															onChange={setInternshipsInputs}
															theme={theme}
															label={myResumeTranslate["city"]?.title}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["internship"].isUpdate
																	? handleUpdateInternships
																	: handleCreateInternships
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userInterships) ? (
											<Col span={24}>
												{cv?.userInterships?.map((item, index) => {
													return (
														<QuartetItem
															translator={myResumeTranslate}
															edit={() => handelGetSingleInternships(item?.id)}
															deleted={() => handleDeletInternships(item?.id)}
															title={item?.title}
															date={`
                      ${moment(item.fromDate).format("MMM YYYY")}  
                      ${moment(item.toDate).format("MMM YYYY")}
                      `}
															location={
																item.country?.title + " " + item.city?.title
															}
															detail={item?.employer}
															key={index}
															theme={theme}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["reference"]?.exist ? (
								<Row>
									<Col span={24}>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>{" "}
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															content={myResumeTranslate["references"]?.title}
															theme={theme}
														/>
														<RemoveButton
															disabled={existInputs["reference"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		reference: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.fullName) &&
																	errors?.typeE == "reference"
																	? true
																	: false
															}
															help={errors?.fullName}
															name="fullName"
															theme={theme}
															onChange={setReferencesInputs}
															value={referencesInputs.fullName}
															label={`${myResumeTranslate["referent's-full-name"]?.title} *`}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.company) &&
																	errors?.typeE == "reference"
																	? true
																	: false
															}
															help={errors?.company}
															name="company"
															onChange={setReferencesInputs}
															value={referencesInputs.company}
															theme={theme}
															label={`${myResumeTranslate["company"]?.title} *`}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<PhoneItem
															isWrong={
																!isEmpty(errors?.phone) &&
																	errors?.typeE == "reference"
																	? true
																	: false
															}
															help={errors?.phone}
															value={referencesInputs?.phone}
															onChange={(phone) => {
																setReferencesInputs((prev) => {
																	return { ...prev, phone: phone };
																});
															}}
															label={`${myResumeTranslate["phone"]?.title} *`}
															theme={theme}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<EmailItem
															isWrong={
																!isEmpty(errors?.email) &&
																	errors?.typeE == "reference"
																	? true
																	: false
															}
															help={errors?.email}
															onChange={setReferencesInputs}
															value={referencesInputs.email}
															name="email"
															theme={theme}
															label={`${myResumeTranslate["email"]?.title} *`}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["reference"].isUpdate
																	? handleUpdateReferences
																	: handleCreateReferences
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userReferences) ? (
											<Col span={24}>
												{cv?.userReferences?.map((item, index) => {
													return (
														<QuartetItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleReferences(item?.id)}
															deleted={() => handleDeletReferences(item?.id)}
															title={item?.company}
															date={item?.fullName}
															location={item?.phone}
															detail={item?.email}
															key={index}
															theme={theme}
														/>
													);
												})}
											</Col>
										) : null}
									</Col>
								</Row>
							) : null}
							{existInputs["award"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<FormItem>
												<Row className="pt-4">
													<Col span={24} className="flex justify-between">
														<DividerItem
															theme={theme}
															content={
																myResumeTranslate["honors-and-awards"]?.title
															}
														/>
														<RemoveButton
															disabled={existInputs["award"].deleted}
															onClick={() =>
																setExistInputs((prev) => {
																	return {
																		...prev,
																		award: { exist: false, show: true },
																	};
																})
															}
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pr-2.5 pr-0"
													>
														<TextItem
															isWrong={
																!isEmpty(errors?.title) &&
																	errors?.typeE == "award"
																	? true
																	: false
															}
															help={errors?.title}
															name="title"
															theme={theme}
															onChange={setAwardsInputs}
															value={awardsInputs.title}
															label={`${myResumeTranslate["award-title"]?.title} *`}
															placeholder=""
														/>
													</Col>
													<Col
														md={{ span: 12 }}
														span={24}
														className="md:pl-2.5 pl-0"
													>
														<DateItem
															picker="date"
															dateFormat="MMM DD, YYYY"
															label={myResumeTranslate["date-of-birth"]?.title}
															isWrong={
																!isEmpty(errors?.dateOfBirth) &&
																	errors?.typeE == "award"
																	? true
																	: false
															}
															help={errors?.dateOfBirth}
															value={
																!isEmpty(awardsInputs?.date)
																	? moment(awardsInputs.date)
																	: moment()
															}
															onChange={(value, valueString) => {
																setAwardsInputs((prev) => {
																	return { ...prev, date: valueString };
																});
															}}
															theme={theme}
														/>
													</Col>
													<Col span={24}>
														<AreaItem
															value={awardsInputs.description}
															onChange={setAwardsInputs}
															isWrong={
																!isEmpty(errors?.description) &&
																	errors?.typeE == "award"
																	? true
																	: false
															}
															help={errors?.description}
															name="description"
															hasCustomeBack={true}
															theme={theme}
															label={`${myResumeTranslate["description"]?.title} *`}
														/>
													</Col>
													<Col span={24} className="flex justify-end">
														<AddButton
															onClick={
																updateList["award"].isUpdate
																	? handleUpdateAwards
																	: handleCreateAwards
															}
															theme={theme}
														/>
													</Col>
												</Row>
											</FormItem>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										{!isEmpty(cv?.userAwards) ? (
											<Col span={24}>
												{cv?.userAwards?.map((item, index) => {
													return (
														<BisectionItem
															translator={myResumeTranslate}
															edit={() => handleGetSingleAwards(item?.id)}
															deleted={() => handleDeleteAwards(item?.id)}
															title={item?.title}
															detail={moment(item.date).format("MMM YYYY")}
															key={index}
															theme={theme}
														/>
													);
												})}
											</Col>
										) : null}
									</Row>
								</Col>
							) : null}
							{existInputs["hobbies"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24} className="flex justify-between">
											<DividerItem
												theme={theme}
												content={myResumeTranslate["hobbies"]?.title}
											/>
											<RemoveButton
												disabled={existInputs["hobbies"].deleted}
												onClick={() =>
													setExistInputs((prev) => {
														return {
															...prev,
															hobbies: { exist: false, show: true },
														};
													})
												}
											/>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={24} />
										</Col>
										<Col span={24}>
											<AreaItem
												value={hobbiesInputs.hobbies}
												onChange={setHobbiesInputs}
												isWrong={!isEmpty(errors?.hobbies) ? true : false}
												help={errors?.hobbies}
												name="hobbies"
												hasCustomeBack={true}
												theme={theme}
												label={myResumeTranslate["hobbies"]?.title}
												placeholder=""
											/>
										</Col>
									</Row>
								</Col>
							) : null}
							{existInputs["additionalInfo"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24} className="flex justify-between">
											<DividerItem
												theme={theme}
												content={
													myResumeTranslate["additional-information"]?.title
												}
											/>
											<RemoveButton
												disabled={existInputs["additionalInfo"].deleted}
												onClick={() =>
													setExistInputs((prev) => {
														return {
															...prev,
															additionalInfo: { exist: false, show: true },
														};
													})
												}
											/>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={24} />
										</Col>
										<Col span={24}>
											<AreaItem
												value={additionalInputs.additionalInformation}
												onChange={setAdditionalInputs}
												isWrong={!isEmpty(errors?.hobbies) ? true : false}
												help={errors?.hobbies}
												name="additionalInformation"
												hasCustomeBack={true}
												theme={theme}
												label={
													myResumeTranslate["additional-information"]?.title
												}
												placeholder=""
											/>
										</Col>
									</Row>
								</Col>
							) : null}
							{existInputs["publications"]?.exist ? (
								<Col span={24}>
									<Row>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24}>
											<Seprator theme={theme} />
										</Col>
										<Col span={24}>
											<MarginTop marginTop={48} />
										</Col>
										<Col span={24} className="flex justify-between">
											<DividerItem
												theme={theme}
												content={myResumeTranslate["publications"]?.title}
											/>
											<RemoveButton
												disabled={existInputs["publications"].deleted}
												onClick={() =>
													setExistInputs((prev) => {
														return {
															...prev,
															publications: { exist: false, show: true },
														};
													})
												}
											/>
										</Col>
										<Col span={24}>
											<MarginTop marginTop={24} />
										</Col>
										<Col span={24}>
											<AreaItem
												value={publicationsInputs.publications}
												onChange={setPublicationsInputs}
												isWrong={!isEmpty(errors?.hobbies) ? true : false}
												help={errors?.hobbies}
												name="publications"
												hasCustomeBack={true}
												theme={theme}
												label={myResumeTranslate["publications"]?.title}
												placeholder=""
											/>
										</Col>
									</Row>
								</Col>
							) : null}
						</Row>
					</FormItem>
					<Col span={24}>
						<MarginTop marginTop={48} />
					</Col>
					<Col span={24}>
						<Seprator theme={theme} />
					</Col>
					<Col span={24}>
						<MarginTop marginTop={48} />
					</Col>
					<Col span={24}>
						<OtherItem
							existInputs={existInputs}
							setExistInputs={setExistInputs}
							theme={theme}
						/>
					</Col>
				</div>
			</div>
			<div className="md:hidden block">
				<div className={Styles.footer}>
					<Button
						onClick={() => router.push("/")}
						className={theme ? Styles.lightBackFooter : Styles.darkBackFooter}
					>
						Back to dashboard
					</Button>
					<Button
						onClick={() => setModalTheme(true)}
						className={Styles.SelectDownload}
					>
						select style
					</Button>
				</div>
			</div>
		</div>
	);
}
