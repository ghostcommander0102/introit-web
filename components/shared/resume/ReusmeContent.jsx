import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import ImageProvider from "providers/ImageProvider";
import Styles from "/styles/scss/dashboard/ResumeEditor.module.scss";

import Gradient from "./res/berlin/Gradient";
import NewYork from "./res/NewYork/NewYork";
import Osolo from "./res/Osolo/Osolo";
import Paris from "./res/Paris/Paris";
import Soho from "./res/Soho/Soho";
import Venice from "./res/Venice/Venice";
import ThemeModal from "./ThemeModal";
export default function ResumeContent({
	cv,
	cvTarget,
	theme,
	handleShowCvType,
	height,
	width,
	modalTheme,
	setModalTheme,
}) {
	const [loader, setLoader] = useState(false);
	const [startGenerate, setStartGenerate] = useState(false);

	const setLoading = (load) => {
		setLoader(load);
	}

	const setGenerate = () => {
		setStartGenerate(false);
	}

	return (
		<Row
			id="wrapper-resume"
			className={
				theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
			}
		>
			<Col xl={{ span: 19 }} lg={{ span: 19 }} md={{ span: 24 }}>
				<div style={{ marginTop: 74, overflow: "hidden", position: "relative", display: "flex", justifyContent: "center" }}>
					{
						cvTarget.name == "paris" ?
							<Paris
								setModalTheme={setModalTheme}
								modalTheme={modalTheme}
								widthCustome={width}
								heightCustome={height}
								cv={cv}
								theme={theme}
								type={cvTarget.style}
								startGenerate={startGenerate}
								setStartGenerate={setGenerate}
								setLoading={setLoading}
							/>
							:
							(
								cvTarget.name == "newyork" ?
									<NewYork
										setModalTheme={setModalTheme}
										modalTheme={modalTheme}
										widthCustome={width}
										heightCustome={height}
										cv={cv}
										theme={theme}
										type={cvTarget.style}
										startGenerate={startGenerate}
										setStartGenerate={setGenerate}
										setLoading={setLoading}
									/>
									:
									(
										cvTarget.name == "osolo" ?
											<Osolo
												setModalTheme={setModalTheme}
												modalTheme={modalTheme}
												widthCustome={width}
												heightCustome={height}
												cv={cv}
												theme={theme}
												type={cvTarget.style}
												startGenerate={startGenerate}
												setStartGenerate={setGenerate}
												setLoading={setLoading}
											/>
											:
											(
												cvTarget.name == "soho" ?
													<Soho
														setModalTheme={setModalTheme}
														modalTheme={modalTheme}
														widthCustome={width}
														heightCustome={height}
														cv={cv}
														theme={theme}
														type={cvTarget.style}
														startGenerate={startGenerate}
														setStartGenerate={setGenerate}
														setLoading={setLoading}
													/>
													:
													<Venice
														setModalTheme={setModalTheme}
														modalTheme={modalTheme}
														widthCustome={width}
														heightCustome={height}
														cv={cv}
														theme={theme}
														type={cvTarget.style}
														startGenerate={startGenerate}
														setStartGenerate={setGenerate}
														setLoading={setLoading}
													/>
											)
									)
							)
					}
				</div>
			</Col>
			<Col
				className="lg:block hidden"
				lg={{ span: 5 }}
				md={{ span: 5 }}
				span={7}
			>
				<div className={Styles.wrapper}>
					<div className={theme ? Styles.lightHeader : Styles.lightHeader}>
						<div className="flex justify-end px-2">
							<div className="px-1">
								<Button
									onClick={() => handleShowCvType(cvTarget.name, "light")}
									className={Styles.lightButton}
								>
									{" "}
								</Button>
							</div>
							<div className="px-1">
								<Button
									onClick={() => handleShowCvType(cvTarget.name, "dark")}
									className={Styles.darkButton}
								>
									{" "}
								</Button>
							</div>
							<div className="px-1">
								<Button
									onClick={() => handleShowCvType(cvTarget.name, "gradient")}
									className={Styles.gradientButton}
								>
									{" "}
								</Button>
							</div>
							<div className="px-1">
								<Button
									onClick={() => handleShowCvType(cvTarget.name, "colored")}
									className={Styles.coloredButton}
								>
									{" "}
								</Button>
							</div>
						</div>
					</div>
					<div className={Styles.templateList}>
						<div
							className={
								theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
							}
						>
							<Row className="p-4">
								<Col span={24}>
									<div
										onClick={() => handleShowCvType("paris", cvTarget.style)}
										className={`${cvTarget.name == "paris"
											? Styles.wrapperImgActive
											: Styles.wrapperImg
											} mx-auto mt-4`}
									>
										<ImageProvider
											width={90}
											height={120}
											src={"/assets/images/cvs/paris.jpg"}
										/>
									</div>
								</Col>
							</Row>
						</div>
						<div
							className={
								theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
							}
						>
							<Row className="p-4">
								<Col span={24}>
									<div
										onClick={() => handleShowCvType("newyork", cvTarget.style)}
										className={`${cvTarget.name == "newyork"
											? Styles.wrapperImgActive
											: Styles.wrapperImg
											} mx-auto mt-4`}
									>
										<ImageProvider
											width={90}
											height={120}
											src={"/assets/images/cvs/newyork.jpg"}
										/>
									</div>
								</Col>
							</Row>
						</div>
						<div
							className={
								theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
							}
						>
							<Row className="p-4">
								<Col span={24}>
									<div
										onClick={() => handleShowCvType("osolo", cvTarget.style)}
										className={`${cvTarget.name == "osolo"
											? Styles.wrapperImgActive
											: Styles.wrapperImg
											} mx-auto mt-4`}
									>
										<ImageProvider
											width={90}
											height={120}
											src={"/assets/images/cvs/osolo.jpg"}
										/>
									</div>
								</Col>
							</Row>
						</div>
						<div
							className={
								theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
							}
						>
							<Row className="p-4">
								<Col span={24}>
									<div
										onClick={() => handleShowCvType("soho", cvTarget.style)}
										className={`${cvTarget.name == "soho"
											? Styles.wrapperImgActive
											: Styles.wrapperImg
											} mx-auto mt-4`}
									>
										<ImageProvider
											width={90}
											height={120}
											src={"/assets/images/cvs/soho.jpg"}
										/>
									</div>
								</Col>
							</Row>
						</div>
						<div
							className={
								theme ? Styles.lightWrapperTemplate : Styles.darkWrapperTemplate
							}
						>
							<Row className="p-4">
								<Col span={24}>
									<div
										onClick={() => handleShowCvType("venice", cvTarget.style)}
										className={`${cvTarget.name == "venice"
											? Styles.wrapperImgActive
											: Styles.wrapperImg
											} mx-auto mt-4`}
									>
										<ImageProvider
											width={90}
											height={120}
											src={"/assets/images/cvs/venice.jpg"}
										/>
									</div>
								</Col>
							</Row>
						</div>
					</div>
					<ThemeModal
						onClick={() => { setStartGenerate(true) }}
						visible={modalTheme}
						theme={theme}
						loader={loader}
						handleShowCvType={handleShowCvType}
						handleClose={() => setModalTheme(false)}
						type={cvTarget.name}
					/>
				</div>
			</Col>
		</Row>
	);
}
