import React, { useState } from "react";
import { Button, Modal, Spin } from "antd";
import Styles from "/styles/scss/dashboard/ThemeModal.module.scss";

import Close from "/public/assets/images/svgs/close-icon.svg";
import ImageProvider from "providers/ImageProvider";

export default function ThemeModal({
	visible,
	handleClose,
	theme,
	onClick,
	loader,
	handleShowCvType,
	type
}) {
	//***************************
	// define useState
	//***************************
	const [resumeType, setResumeType] = useState(type)
	const [resumeStyle, setResumeStyle] = useState("")

	return (
		<Modal
			footer={false}
			closable={false}
			visible={visible}
			centered={true}
			width={900}
			className="theme-modal"
		>
			<div className={Styles.wrapperClose}>
				<Button onClick={handleClose} className={Styles.close}>
					<Close />
				</Button>
			</div>
			<div>
				<Button className={Styles.lightButton} onClick={() => { setResumeStyle("light"); handleShowCvType(resumeType, "light") }}>LIGHT</Button>
				<Button className={Styles.darkButton} onClick={() => { setResumeStyle("dark"); handleShowCvType(resumeType, "dark") }}>DARK</Button>
				<Button className={Styles.gradientButton} onClick={() => { setResumeStyle("gradient"); handleShowCvType(resumeType, "gradient") }}>GRADIENT</Button>
				<Button className={Styles.coloredButton} onClick={() => { setResumeStyle("colored"); handleShowCvType(resumeType, "colored") }}>COLORED</Button>
			</div>
			<div className="pt-4 px-2" style={{ display: "flex", flexWrap: "wrap", height: "calc(100vh - 134px)", overflowY: "scroll" }}>
				<div className={resumeType == "paris" ? Styles.resumeSelected : ""} onClick={() => { setResumeType("paris"); handleShowCvType("paris", resumeStyle) }}>
					<ImageProvider
						width={184}
						height={257}
						src={"/assets/images/cvs/paris.jpg"}
					/>
				</div>
				<div className={resumeType == "newyork" ? Styles.resumeSelected : ""} onClick={() => { setResumeType("newyork"); handleShowCvType("newyork", resumeStyle) }}>
					<ImageProvider
						width={184}
						height={257}
						src={"/assets/images/cvs/newyork.jpg"}
					/>
				</div>
				<div className={resumeType == "osolo" ? Styles.resumeSelected : ""} onClick={() => { setResumeType("osolo"); handleShowCvType("osolo", resumeStyle) }}>
					<ImageProvider
						width={184}
						height={257}
						src={"/assets/images/cvs/osolo.jpg"}
					/>
				</div>
				<div className={resumeType == "soho" ? Styles.resumeSelected : ""} onClick={() => { setResumeType("soho"); handleShowCvType("soho", resumeStyle) }}>
					<ImageProvider
						width={184}
						height={257}
						src={"/assets/images/cvs/soho.jpg"}
					/>
				</div>
				<div className={resumeType == "venice" ? Styles.resumeSelected : ""} onClick={() => { setResumeType("venice"); handleShowCvType("venice", resumeStyle) }}>
					<ImageProvider
						width={184}
						height={257}
						src={"/assets/images/cvs/venice.jpg"}
					/>
				</div>
			</div>
			<div className={Styles.footer}>
				<Button
					onClick={handleClose}
					className={theme ? Styles.lightEdit : Styles.darkEdit}
				>
					edit
				</Button>
				<Button disabled={loader} onClick={onClick} className={Styles.download}>
					{loader ? <Spin /> : "Download Resume"}
				</Button>
			</div>
		</Modal >
	);
}
