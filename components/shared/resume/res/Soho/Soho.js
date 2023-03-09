import NextImage from 'next/image'
import styles from '/styles/scss/dashboard/Soho.module.scss'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf';
import Script from 'next/script'
import htmlRenderer from "utils/htmlRenderer"
import { isEmpty } from "lodash";
import { Button, Spin } from "antd";
import ThemeModal from "../../ThemeModal";
import tempcv from 'utils/data';

export default function Soho({
    cv = tempcv,
    modalTheme,
    setModalTheme,
    theme,
    type,
    startGenerate,
    setStartGenerate,
    setLoading
}) {
    const canvasRef = useRef(null)
    const avatarRef = useRef(null)
    const canvasParentRef = useRef(null)

    const [avatarSrc, setAvatarSrc] = useState("")
    const [filteredContent, setFilteredContent] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [eduPos, setEduPos] = useState({ pos: 373, page: 1 })
    const [skillPos, setSkillPos] = useState({})
    const [expPos, setExpPos] = useState({})
    const [langPos, setLangPos] = useState({})
    const [expertPos, setExpertPos] = useState({})
    const [couPos, setCouPos] = useState({})
    const [internPos, setInternPos] = useState({})
    const [referPos, setReferPos] = useState({})
    const [portPos, setPortPos] = useState({})
    const [extraPos, setExtraPos] = useState({})
    const [hobbiesPos, setHobbiesPos] = useState({})
    const [hobbiesContentPos, setHobbiesContentPos] = useState({})
    const [addPos, setAddPos] = useState({})
    const [addContentPos, setAddContentPos] = useState({})
    const [honorPos, setHonorPos] = useState({})
    const [contactPos, setContactPos] = useState({})

    const [educationContent, setEducationContent] = useState([])
    const [skillContent, setSkillContent] = useState([])
    const [experienceContent, setExperienceContent] = useState([])
    const [languageContent, setLanguageContent] = useState([])
    const [expertiseContent, setExpertiseContent] = useState([])
    const [coursesContent, setCoursesContent] = useState([])
    const [internshipsContent, setInternShipsContent] = useState([])
    const [referencesContent, setReferencesContent] = useState([])
    const [portfolioContent, setPortfolioContent] = useState([])
    const [extracurriContent, setExtraCurriContent] = useState([])
    const [hobbiesContent, setHobbiesContent] = useState([])
    const [additionalContent, setAdditionalContent] = useState([])
    const [honorsContent, setHonorsContent] = useState([])

    const [pageImg, setPageImg] = useState([])
    const [deviceRatio, setDeviceRatio] = useState(1)
    // const [cv, setCV] = useState(props.cv)
    const [loader, setLoader] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 720, height: 1019 })
    const [initDraw, setInitDraw] = useState(false);

    const ratio = 0.62
    const scaleRatio = 720 / 1019

    useLayoutEffect(() => {
        function updateSize() {
            if (!initDraw) return;
            const widthRatio = 720 / canvasParentRef.current.clientWidth
            const heightRatio = 1019 / canvasParentRef.current.clientHeight
            if (widthRatio < heightRatio) {
                setCanvasSize({
                    width: canvasParentRef.current.clientHeight * scaleRatio,
                    height: canvasParentRef.current.clientHeight
                })
            } else {
                setCanvasSize({
                    width: canvasParentRef.current.clientWidth,
                    height: canvasParentRef.current.clientWidth / scaleRatio
                })
            }
            setDeviceRatio(1 / (widthRatio > heightRatio ? widthRatio : heightRatio))
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        filterContents();
        const avatar = new Image()
        avatar.crossOrigin = "*"
        var imagecanvas = document.createElement('canvas');
        var imagecontext = imagecanvas.getContext('2d');
        const avatarImg = new Image()
        avatarImg.src = cv.avatar
        avatarImg.crossOrigin = "*"
        avatarImg.onload = () => {
            const maskImg = new Image()
            maskImg.src = "/images/Osolomask.png"
            maskImg.crossOrigin = "*"
            maskImg.onload = () => {
                imagecanvas.width = maskImg.width
                imagecanvas.height = maskImg.height
                imagecontext.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height)
                imagecontext.globalCompositeOperation = 'source-in'
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)
                setAvatarSrc(imagecanvas.toDataURL("image/png"))
            }
        }
    }, [cv?.avatar]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         axios.get('https://api.introit.io/profile/resume/view/cv2/8').then(response => {
    //             setCV(response.data.cv)
    //         });
    //     }, 320);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        showCanvas(currentPage)
    }, [deviceRatio])

    useEffect(() => {
        if (startGenerate) {
            generatePDF();
            setStartGenerate();
        }
    }, [startGenerate])

    const checkSize = () => {
        const widthRatio = 720 / canvasParentRef.current.clientWidth
        const heightRatio = 1019 / canvasParentRef.current.clientHeight
        if (widthRatio < heightRatio) {
            setCanvasSize({
                width: canvasParentRef.current.clientHeight * scaleRatio,
                height: canvasParentRef.current.clientHeight
            })
        } else {
            setCanvasSize({
                width: canvasParentRef.current.clientWidth,
                height: canvasParentRef.current.clientWidth / scaleRatio
            })
        }
        if (deviceRatio != 1 / (widthRatio > heightRatio ? widthRatio : heightRatio)) {
            setDeviceRatio(1 / (widthRatio > heightRatio ? widthRatio : heightRatio))
        } else {
            showCanvas(currentPage)
        }
    }

    useEffect(() => {
        if (avatarSrc) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            const scale = window.devicePixelRatio;
            context.scale(1 / scale, 1 / scale)
            // showCanvas(currentPage)
            checkSize()
        }
    }, [avatarSrc])

    useEffect(() => {
        // const timeOut = setTimeout(() => {
        // showCanvas(currentPage);
        if(initDraw)
            checkSize()
        // }, 1000);
        // return () => clearTimeout(timeOut);
    }, [cv, type]);

    const showCanvas = (page) => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        setTimeout(async () => {
            html2canvas(document.querySelector("#resume"), {
                useCORS: true,
            }).then(async canvas1 => {
                const backgroundImg = await loadImage(canvas1.toDataURL('image/png'))
                context.drawImage(backgroundImg, 0, 0, 720 * deviceRatio, 1019 * deviceRatio)
                if (page == 1) {
                    const avatarImg = await loadImage(avatarSrc)
                    // context.drawImage(avatarImg, 67 * window.devicePixelRatio, 179 * window.devicePixelRatio, 124.8 * window.devicePixelRatio, 124.8 * window.devicePixelRatio)

                    // const linkedinImg = await loadImage("/images/Linkedin.png")
                    // const dribbleImg = await loadImage("/images/Dribble.png")
                    // const instagramImg = await loadImage("/images/Instagram.png")
                    // const whatsappImg = await loadImage("/images/Whatsapp.png")
                    // const twitterImg = await loadImage("/images/Twitter.png")
                    // context.drawImage(linkedinImg, 428 * window.devicePixelRatio, 20 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(dribbleImg, 478 * window.devicePixelRatio, 20 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(instagramImg, 528 * window.devicePixelRatio, 20 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(whatsappImg, 578 * window.devicePixelRatio, 20 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(twitterImg, 628 * window.devicePixelRatio, 20 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)

                    // const phoneImg = await loadImage("/images/Phone.png")
                    // const smsImg = await loadImage("/images/SMS.png")
                    // const filterImg = await loadImage("/images/Filter.png")
                    // const steerImg = await loadImage("/images/SteeringWheel.png")
                    // const locationImg = await loadImage('/images/Location.png')
                    // const linkImg = await loadImage("/images/Link2.png")
                    // const moneyImg = await loadImage('/images/Money.png')
                    // const nationImg = await loadImage('/images/Global.png')
                    // const genderImg = await loadImage("/images/Gender.png")
                    // const settingImg = await loadImage("/images/setting2.png")
                    // const birthImg = await loadImage("/images/Birthday.png")
                    // const homeImg = await loadImage("/images/Home.png")
                    // context.drawImage(phoneImg, 32 * window.devicePixelRatio, 372 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(smsImg, 32 * window.devicePixelRatio, 412 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(filterImg, 32 * window.devicePixelRatio, 452 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(steerImg, 32 * window.devicePixelRatio, 492 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(locationImg, 266 * window.devicePixelRatio, 372 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(linkImg, 266 * window.devicePixelRatio, 412 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(moneyImg, 266 * window.devicePixelRatio, 452 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(nationImg, 266 * window.devicePixelRatio, 492 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(genderImg, 329 * window.devicePixelRatio, 372 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(settingImg, 329 * window.devicePixelRatio, 412 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(birthImg, 329 * window.devicePixelRatio, 452 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                    // context.drawImage(homeImg, 329 * window.devicePixelRatio, 492 * window.devicePixelRatio, 12 * window.devicePixelRatio, 12 * window.devicePixelRatio)
                }

                // skillContent.forEach(async element => {
                //     if (element.page == page) {
                //         const skiItem = cv.userSkils[element.index]
                //         for (let i = 0; i < 5; i++) {
                //             if (skiItem.percentage >= (i + 1) * 18) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (524 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (skiItem.percentage > i * 18 && skiItem.percentage < (i + 1) * 18) {
                //                 const img = await loadImage("/images/half.png")
                //                 context.drawImage(img, (524 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else {
                //                 const img = await loadImage("/images/half.png")
                //                 context.drawImage(img, (524 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             }
                //         }
                //     }
                // })

                // languageContent.forEach(async element => {
                //     if (element.page == page) {
                //         const langItem = cv.userLanguages[element.index]
                //         for (let i = 0; i < 5; i++) {
                //             if (langItem.percentage >= (i + 1) * 18) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (32 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (langItem.percentage > i * 18 && langItem.percentage < (i + 1) * 18) {
                //                 const img = await loadImage("/images/half.png")
                //                 context.drawImage(img, (32 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else {
                //                 const img = await loadImage("/images/blank.png")
                //                 context.drawImage(img, (32 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             }
                //         }
                //     }
                // })

                // expertiseContent.forEach(async element => {
                //     if (element.page == page) {
                //         const expertiseItem = cv.userExpertises[element.index]

                //         for (let i = 0; i < 5; i++) {
                //             if (expertiseItem.percentage >= (i + 1) * 18) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (298.5 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (expertiseItem.percentage > i * 18 && expertiseItem.percentage < (i + 1) * 18) {
                //                 const img = await loadImage("/images/half.png")
                //                 context.drawImage(img, (298.5 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else {
                //                 const img = await loadImage("/images/blank.png")
                //                 context.drawImage(img, (298.5 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             }
                //         }
                //     }
                // })
                setInitDraw(true);
            });
        }, 500)
    }

    const getBackgroundURL = () => {
        return (type == "light" ? "/images/background/backgroundWhite.png" : (type == "gradient" ? "/images/background/backgroundSoho.png" : "/images/background/backgroundDark.png"))
    }

    const getStyle = () => {
        return (type == "light" ? styles.light : (type == "gradient" ? styles.gradient : styles.dark))
    }

    const getContactImageURL = (contact) => {
        return (type == "dark" ? "/images/contact/Osolo/" + contact + "Dark.png" : "/images/contact/Osolo/" + contact + ".png")
    }

    const getSohoIconURL = (url) => {
        return (type == "dark" ? "/images/SohoIcons/" + url + "Dark.png" : "/images/SohoIcons/" + url + ".png")
    }

    const getTextColor = () => {
        return (type == "dark" ? "#EEF8EE" : (type == 'light' ? "#373D48" : "#3B3841"))
    }

    const getTextColor1 = () => {
        return (type == "dark" ? "#1D1F1D" : (type == 'light' ? "#FFFFFF" : "#DAE6F8"))
    }

    const generatePDF = async () => {
        setLoader(true);
        setLoading(true);
        const report = new JsPDF('portrait', 'px', 'A4');
        var width = report.internal.pageSize.getWidth();
        var height = report.internal.pageSize.getHeight();

        report.addFont("/fonts/PTSansCaption-Regular.ttf", "PTSansCaption", "normal")
        report.setFont("PTSansCaption")
        report.setTextColor(getTextColor())
        const backgroundImg = await loadImage(getBackgroundURL())
        report.addImage(backgroundImg, 'png', 0, 0, 720 * ratio, 1019 * ratio)
        report.setDrawColor("#BFC8DD")
        report.setLineWidth(2 * ratio)
        report.line(87 * ratio, 160 * ratio, 87 * ratio, 1019 * ratio)
        await generateProfile(report)
        for (let i = 1; i <= totalPage; i++) {
            if (i != 1) {
                report.addPage()
                report.addImage(backgroundImg, 'png', 0, 0, 720 * ratio, 1019 * ratio)
                if (honorPos.page != 1) {
                    report.line(87 * ratio, 20 * ratio, 87 * ratio, 1019 * ratio)
                }
            }
            // await generateHeader(report)
            await generateEducation(report, i)
            await generateSkills(report, i)
            await generateExperience(report, i)
            await generateLanguages(report, i)
            await generateExpertise(report, i)
            await generateCourses(report, i)
            await generateInternships(report, i)
            await generateReference(report, i)
            await generateExtra(report, i)
            await generatehobbies(report, i)
            await generateAdditional(report, i)
            await generateHonors(report, i)
            await generateContactList(report, i)
        }

        report.save('report.pdf');
        setLoader(false);
        setLoading(false);
    }

    const generateProfile = async (report) => {
        const avatarImg = await loadImage(avatarSrc)
        report.addImage(avatarImg, 'png', 509 * ratio, 20 * ratio, 193 * ratio, 193 * ratio)

        report.setFillColor(getTextColor())
        report.ellipse(58 * ratio, 60 * ratio, 40 * ratio, 40 * ratio, "F")

        report.setTextColor(getTextColor1())
        report.setFontSize(16 * ratio)
        report.text(cv.givenName.toUpperCase()[0] + cv.familyName.toUpperCase()[0], 58 * ratio, (60 + report.getTextDimensions("JW").h) * ratio)

        report.setTextColor(getTextColor())
        report.setFontSize(24 * ratio)
        report.text(cv.givenName.toUpperCase(), 116 * ratio, (26 + report.getTextDimensions(cv.givenName.toUpperCase()).h) * ratio)
        report.text(cv.familyName.toUpperCase(), 116 * ratio, (57 + report.getTextDimensions(cv.familyName.toUpperCase()).h) * ratio)

        report.setFontSize(14 * ratio)
        report.text(cv.jobTitle ? cv.jobTitle : "", 116 * ratio, (92 + report.getTextDimensions(cv.jobTitle ? cv.jobTitle : "").h) * ratio)

        const aboutImg = await loadImage(getSohoIconURL("PersonalInfo"))
        report.addImage(aboutImg, 75 * ratio, 137 * ratio, 26 * ratio, 26 * ratio)
        report.setFontSize(20 * ratio)
        report.text("ABOUT ME", 113 * ratio, (145 + report.getTextDimensions("ABOUT ME").h) * ratio)

        report.ellipse(87 * ratio, 185 * ratio, 4 * ratio, 4 * ratio, "F")
        report.setFontSize(14 * ratio)
        let tmp;
        if (typeof window !== "undefined") {
            tmp = document.createElement("DIV");
            tmp.innerHTML = cv?.description;
        }
        var splitDescription = report.splitTextToSize(tmp?.textContent || tmp?.innerText || "", 378 * ratio)
        report.text(splitDescription, 113 * ratio, (182 + report.getTextDimensions(cv.description).h) * ratio)

        const personalImg = await loadImage(getSohoIconURL("Personal"))
        report.addImage(personalImg, 509 * ratio, 237 * ratio, 24 * ratio, 24 * ratio)
        report.setFontSize(16)
        report.text("PERSONAL INFO", 542 * ratio, (246.5 + report.getTextDimensions("P").h) * ratio)

        report.setFontSize(12 * ratio)
        report.text("Phone number :", 509 * ratio, (275 + report.getTextDimensions("Phone number").h) * ratio)
        report.text("Email :", 509 * ratio, (319 + report.getTextDimensions("Email").h) * ratio)
        report.text("Academic Level :", 509 * ratio, (363 + report.getTextDimensions("Academic Level").h) * ratio)
        report.text("Driving License :", 509 * ratio, (407 + report.getTextDimensions("Driving License").h) * ratio)
        report.text("Address :", 509 * ratio, (451 + report.getTextDimensions("Address").h) * ratio)
        report.text("Website :", 509 * ratio, (519 + report.getTextDimensions("Website").h) * ratio)
        report.text("Salary range :", 509 * ratio, (561 + report.getTextDimensions("Salary range").h) * ratio)
        report.text("Nationality :", 509 * ratio, (605 + report.getTextDimensions("Nationality :").h) * ratio)
        report.text("Gender :", 509 * ratio, (649 + report.getTextDimensions("Gender : ").h) * ratio)
        report.text("Industry :", 509 * ratio, (693 + report.getTextDimensions("Industry").h) * ratio)
        report.text("Date Of Birth", 509 * ratio, (737 + report.getTextDimensions("Date Of Birth").h) * ratio)
        report.text("Place Of Birth", 509 * ratio, (781 + report.getTextDimensions("Place Of Birth").h) * ratio)

        report.text(cv.phone ? cv.phone : "", 509 * ratio, (291 + report.getTextDimensions(cv.phone ? cv.phone : "").h) * ratio)
        var splitEmail = report.splitTextToSize(cv.email, 193 * ratio)
        report.text(splitEmail, 509 * ratio, (335 + report.getTextDimensions(cv.email).h) * ratio)
        report.text(cv.degree ? cv.degree.title : "", 509 * ratio, (379 + report.getTextDimensions(cv.degree ? cv.degree.title : "").h) * ratio)
        report.text(cv.drivingLicense ? cv.drivingLicense.title : "", 509 * ratio, (423 + report.getTextDimensions(cv.drivingLicense ? cv.drivingLicense.title : "").h) * ratio)
        report.text(cv.streetAddress ? cv.streetAddress : "", 509 * ratio, (467 + report.getTextDimensions(cv.streetAddress ? cv.streetAddress : "").h) * ratio)
        report.text(cv.website ? cv.website : "", 509 * ratio, (533 + report.getTextDimensions(cv.website ? cv.website : "").h) * ratio)
        report.text("$ " + (cv.minSalary ? cv.minSalary : "") + " - " + (cv.maxSalary ? cv.maxSalary : "") + " monthly", 509 * ratio, (577 + report.getTextDimensions("$ " + (cv.minSalary ? cv.minSalary : "") + " - " + (cv.maxSalary ? cv.maxSalary : "") + " monthly").h) * ratio)
        report.text(cv.nationality ? cv.nationality.title : "", 509 * ratio, (621 + report.getTextDimensions(cv.nationality ? cv.nationality.title : "").h) * ratio)
        report.text(cv.gender ? cv.gender.title : "", 509 * ratio, (665 + report.getTextDimensions(cv.gender ? cv.gender.title : "").h) * ratio)
        report.text(cv.industry ? cv.industry.title : "", 509 * ratio, (709 + report.getTextDimensions(cv.industry ? cv.industry.title : "").h) * ratio)
        report.text(cv.dateOfBirth ? cv.dateOfBirth : "", 509 * ratio, (753 + report.getTextDimensions(cv.dateOfBirth ? cv.dateOfBirth : "").h) * ratio)
        report.text(cv.residentCountry ? cv?.residentCountry?.title : "", 509 * ratio, (797 + report.getTextDimensions(cv.residentCountry ? cv?.residentCountry?.title : "").h) * ratio)
        // const phoneImg = await loadImage("/images/Phone.png")
        // const smsImg = await loadImage("/images/SMS.png")
        // const filterImg = await loadImage("/images/Filter.png")
        // const steerImg = await loadImage("/images/SteeringWheel.png")
        // const locationImg = await loadImage('/images/Location.png')
        // const linkImg = await loadImage("/images/Link2.png")
        // const moneyImg = await loadImage('/images/Money.png')
        // const nationImg = await loadImage('/images/Global.png')
        // const genderImg = await loadImage("/images/Gender.png")
        // const settingImg = await loadImage("/images/setting2.png")
        // const birthImg = await loadImage("/images/Birthday.png")
        // const homeImg = await loadImage("/images/Home.png")
        // const phoneInfo = document.getElementsByClassName("phoneImg")[0].getBoundingClientRect()
        // const smsInfo = document.getElementsByClassName("smsImg")[0].getBoundingClientRect()
        // const filterInfo = document.getElementsByClassName("filterImg")[0].getBoundingClientRect()
        // const steerInfo = document.getElementsByClassName("steerImg")[0].getBoundingClientRect()
        // const locationInfo = document.getElementsByClassName("locationImg")[0].getBoundingClientRect()
        // const linkInfo = document.getElementsByClassName("linkImg")[0].getBoundingClientRect()
        // const moneyInfo = document.getElementsByClassName("moneyImg")[0].getBoundingClientRect()
        // const nationInfo = document.getElementsByClassName("globalImg")[0].getBoundingClientRect()
        // const genderInfo = document.getElementsByClassName("genderImg")[0].getBoundingClientRect()
        // const settingInfo = document.getElementsByClassName("settingImg")[0].getBoundingClientRect()
        // const birthInfo = document.getElementsByClassName("birthImg")[0].getBoundingClientRect()
        // const homeInfo = document.getElementsByClassName("homeImg")[0].getBoundingClientRect()

        // report.addImage(phoneImg, 32 * ratio, 372 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(smsImg, 32 * ratio, 423 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(filterImg, 32 * ratio, 463 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(steerImg, 32 * ratio, 503 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(locationImg, 266 * ratio, 372 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(linkImg, 266 * ratio, 423 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(moneyImg, 266 * ratio, 463 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(nationImg, 266 * ratio, 503 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(genderImg, 509 * ratio, 372 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(settingImg, 509 * ratio, 423 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(birthImg, 509 * ratio, 463 * ratio, 12 * ratio, 12 * ratio)
        // report.addImage(homeImg, 509 * ratio, 503 * ratio, 12 * ratio, 12 * ratio)
    }

    const generateHeader = async (report) => {
        report.setFillColor(255, 255, 255)
        report.rect(32 * ratio, 32 * ratio, 656 * ratio, 78 * ratio, 'F')
        report.setTextColor("#454545")
        report.setFontSize(24 * ratio)
        // cv.givenName = cv.givenName.toUpperCase()
        report.text(cv.givenName.toUpperCase(), 64 * ratio, (20 + report.getTextDimensions(cv.givenName.toUpperCase()).h) * ratio)

        report.setFontSize(24 * ratio)
        report.text(cv.jobTitle, 64 * ratio, (72 + report.getTextDimensions(cv.jobTitle).h) * ratio)

        const linkedinImg = await loadImage("/images/Linkedin.png")
        const dribbleImg = await loadImage("/images/Dribble.png")
        const instagramImg = await loadImage("/images/Instagram.png")
        const whatsappImg = await loadImage("/images/Whatsapp.png")
        const twitterImg = await loadImage("/images/Twitter.png")
        report.addImage(linkedinImg, 428 * ratio, 20 * ratio, 18 * ratio, 18 * ratio)
        report.addImage(dribbleImg, 478 * ratio, 20 * ratio, 18 * ratio, 18 * ratio)
        report.addImage(instagramImg, 528 * ratio, 20 * ratio, 18 * ratio, 18 * ratio)
        report.addImage(whatsappImg, 578 * ratio, 20 * ratio, 18 * ratio, 18 * ratio)
        report.addImage(twitterImg, 628 * ratio, 20 * ratio, 18 * ratio, 18 * ratio)
    }

    const generateEducation = async (report, page) => {
        if (eduPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Education"))
            report.addImage(educationImg, 75 * ratio, eduPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("EDUCATION", 113 * ratio, (eduPos.pos + 8 + report.getTextDimensions("Education").h) * ratio)
        }
        educationContent.forEach(element => {
            if (element.page == page) {
                const eduItem = cv.userEducations[element.index]
                const fromDate = new Date(eduItem.fromDate)
                const toDate = new Date(eduItem.toDate)

                report.ellipse(87 * ratio, (element.posy + 2) * ratio, 4 * ratio, 4 * ratio, "F")
                report.setFontSize(16 * ratio)
                report.text(eduItem.institute, 113 * ratio, (element.posy + report.getTextDimensions(eduItem.institute).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = eduItem?.city?.title + ", " + eduItem?.country?.title
                report.text(location, 491 * ratio, (element.posy + report.getTextDimensions(location).h) * ratio, { align: 'right' })

                const duration = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                }) + " " + toDate.getFullYear() + "-" + (toDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                const splitDuration = report.splitTextToSize(duration, 52 * ratio)
                report.text(splitDuration, 23 * ratio, (element.posy + report.getTextDimensions(duration).h) * ratio)

                report.setFontSize(14 * ratio)
                report.text(eduItem.major, 113 * ratio, (element.posy + 27 + report.getTextDimensions(eduItem.major).h) * ratio)
            }
        });
    }

    const generateSkills = async (report, page) => {
        if (skillPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Skills"))
            report.addImage(educationImg, skillPos.posx * ratio, skillPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("SKILLS", (skillPos.posx + 33) * ratio, (skillPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }
        skillContent.forEach(element => {
            if (element.page == page) {
                const skiItem = cv.userSkils[element.index]

                report.setFontSize(14 * ratio)
                report.text(skiItem.title, skillPos.posx * ratio, (element.posy + report.getTextDimensions(skiItem.title).h) * ratio)
                report.setFontSize(12 * ratio)
                report.text(skiItem.domination.title, skillPos.posx * ratio, (element.posy + 22 + report.getTextDimensions(skiItem.domination.title).h) * ratio)
                report.text(skiItem.percentage + "%", (skillPos.posx + 193) * ratio, (element.posy + 22 + report.getTextDimensions(skiItem.percentage).h) * ratio, { align: 'right' })
            }
        })
    }

    const generateExperience = async (report, page) => {
        if (expPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Experience"))
            report.addImage(educationImg, 75 * ratio, expPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("EXPERIENCE", 113 * ratio, (expPos.pos + 8 + report.getTextDimensions("Education").h) * ratio)
        }
        experienceContent.forEach(element => {
            if (element.page == page) {
                const expItem = cv.userExperiences[element.index]
                const fromDate = new Date(expItem.fromDate)
                const toDate = new Date(expItem.toDate)

                report.ellipse(87 * ratio, (element.posy + 2) * ratio, 4 * ratio, 4 * ratio, "F")
                report.setFontSize(16 * ratio)
                report.text(expItem.title, 113 * ratio, (element.posy + report.getTextDimensions(expItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = expItem.city?.title + ", " + expItem.country?.title
                report.text(location, 113 * ratio, (element.posy + 27 + report.getTextDimensions(location).h) * ratio)
                const duration = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                }) + " " + toDate.getFullYear() + "-" + (toDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                const splitDuration = report.splitTextToSize(duration, 52 * ratio)
                report.text(splitDuration, 23 * ratio, (element.posy + report.getTextDimensions(duration).h) * ratio)

                report.setFontSize(14 * ratio)
                var splitDescription = report.splitTextToSize(expItem.description, 378 * ratio)
                report.text(splitDescription, 113 * ratio, (element.posy + 49 + report.getTextDimensions(expItem.description ? expItem.description : "").h) * ratio)
            }
        })
    }

    const generateLanguages = async (report, page) => {
        if (langPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Language"))
            report.addImage(educationImg, langPos.posx * ratio, langPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("LANGUAGE", (langPos.posx + 33) * ratio, (langPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }

        languageContent.forEach(element => {
            if (element.page == page) {
                const langItem = cv.userLanguages[element.index]

                report.setFontSize(14 * ratio)
                report.text(langItem.language.title, langPos.posx * ratio, (element.posy + report.getTextDimensions(langItem.language.title).h) * ratio)
                report.setFontSize(12 * ratio)
                report.text(langItem.level.title, langPos.posx * ratio, (element.posy + 22 + report.getTextDimensions(langItem.level.title).h) * ratio)
                report.text(langItem.percentage + "%", (langPos.posx + 193) * ratio, (element.posy + 22 + report.getTextDimensions(langItem.percentage).h) * ratio, { align: 'right' })
            }
        })
    }

    const generateExpertise = async (report, page) => {
        if (expertPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Expertise"))
            report.addImage(educationImg, expPos.posx * ratio, expertPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("LANGUAGE", (expertPos.posx + 33) * ratio, (expertPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }

        expertiseContent.forEach(element => {
            if (element.page == page) {
                const expertiseItem = cv.userExpertises[element.index]

                report.setFontSize(14 * ratio)
                report.text(expertiseItem.title, expPos.posx * ratio, (element.posy + report.getTextDimensions(expertiseItem.title).h) * ratio)
                report.setFontSize(12 * ratio)
                report.text(expertiseItem.domination.title, expPos.posx * ratio, (element.posy + 22 + report.getTextDimensions(expertiseItem.domination.title).h) * ratio)
                report.text(expertiseItem.percentage + "%", (expertPos.posx + 193) * ratio, (element.posy + 22 + report.getTextDimensions(expertiseItem.percentage).h) * ratio, { align: 'right' })
            }
        })
    }

    const generateCourses = async (report, page) => {
        if (couPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Courses"))
            report.addImage(educationImg, 509 * ratio, couPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("COURSES", 542 * ratio, (couPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        coursesContent.forEach(element => {
            if (element.page == page) {
                const couItem = cv.userCourses[element.index]
                const fromDate = new Date(couItem.fromDate)
                const toDate = new Date(couItem.toDate)

                report.setFontSize(14 * ratio)
                report.text(couItem.title, 509 * ratio, (element.posy + report.getTextDimensions(couItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear();
                var splitDuration = report.splitTextToSize(duration, 192 * ratio)
                report.text(splitDuration, 509 * ratio, (element.posy + 22 + report.getTextDimensions(duration).h) * ratio)
            }
        })
    }

    const generateInternships = async (report, page) => {
        if (internPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Internships"))
            report.addImage(educationImg, 509 * ratio, internPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("INTERNSHIPS", 542 * ratio, (internPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        internshipsContent.forEach(element => {
            if (element.page == page) {
                const internItem = cv.userInterships[element.index]
                const fromDate = new Date(internItem.fromDate)
                const toDate = new Date(internItem.toDate)
                report.setFontSize(14 * ratio)
                report.text(internItem.title, 509 * ratio, (element.posy + report.getTextDimensions(internItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = internItem.city.title + ", " + internItem.country.title
                report.text(location, 509 * ratio, (element.posy + 22 + report.getTextDimensions(location).h) * ratio)

                const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear()
                const splitDuration = report.splitTextToSize(duration, 194 * ratio)
                report.text(splitDuration, 509 * ratio, (element.posy + 42 + report.getTextDimensions(duration).h) * ratio)
            }
        })
    }

    const generateReference = async (report, page) => {
        if (referPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("References"))
            report.addImage(educationImg, 509 * ratio, referPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.setFontSize(16 * ratio)
            report.text("REFERENCES", 542 * ratio, (referPos.pos + 8 + report.getTextDimensions("S").h) * ratio)
        }
        referencesContent.forEach(element => {
            if (element.page == page) {
                const referItem = cv.userReferences[element.index]
                report.setFontSize(14 * ratio)
                const splitName = report.splitTextToSize(referItem.fullName, 232 * ratio)
                report.text(splitName, 509 * ratio, (element.posy + report.getTextDimensions(referItem.fullName).h) * ratio)

                report.setFontSize(12 * ratio)
                report.text("Company :" + referItem.company, 509 * ratio, (element.posy + 22 + report.getTextDimensions(referItem.company).h) * ratio)
                report.text("Email :" + referItem.email, 509 * ratio, (element.posy + 42 + report.getTextDimensions(referItem.email).h) * ratio)
                report.text("Phone :" + referItem.phone, 509 * ratio, (element.posy + 62 + report.getTextDimensions(referItem.phone).h) * ratio)
            }
        })
    }

    const generateExtra = async (report, page) => {
        if (extraPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Extra"))
            report.addImage(educationImg, 75 * ratio, extraPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("EXTRA-CURRICULAR ACTIVITIES", 113 * ratio, (extraPos.pos + 8 + report.getTextDimensions("Education").h) * ratio)
        }
        extracurriContent.forEach(element => {
            if (element.page == page) {
                const extraItem = cv.userExtraActivities[element.index]
                const fromDate = new Date(extraItem.fromDate)
                const toDate = new Date(extraItem.toDate)

                report.ellipse(87 * ratio, (element.posy + 2) * ratio, 4 * ratio, 4 * ratio, "F")
                report.setFontSize(16 * ratio)
                report.text(extraItem.title, 113 * ratio, (element.posy + report.getTextDimensions(extraItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = extraItem.city.title + ", " + extraItem.country.title
                report.text(location, 113 * ratio, (element.posy + 27 + report.getTextDimensions(location).h) * ratio)
                const duration = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                }) + " " + toDate.getFullYear() + "-" + (toDate.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
                const splitDuration = report.splitTextToSize(duration, 52 * ratio)
                report.text(splitDuration, 23 * ratio, (element.posy + report.getTextDimensions(location).h) * ratio)
                report.setFontSize(14 * ratio)
                const splitDescription = report.splitTextToSize(extraItem.description, 378 * ratio)
                report.text(splitDescription, 113 * ratio, (element.posy + 54 + report.getTextDimensions(extraItem.description).h) * ratio)
            }
        })
    }

    const generatehobbies = async (report, page) => {
        if (hobbiesPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Hobby"))
            report.addImage(educationImg, 75 * ratio, hobbiesPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("HOBBIES", 113 * ratio, (hobbiesPos.pos + 8 + report.getTextDimensions("H").h) * ratio)
        }
        if (hobbiesContentPos.page == page) {
            report.ellipse(87 * ratio, (hobbiesContentPos.pos + 2) * ratio, 4 * ratio, 4 * ratio, "F")
            report.setFontSize(14 * ratio)
            const splitHobbies = report.splitTextToSize(cv.hobbies, 378 * ratio)
            report.text(splitHobbies, 113 * ratio, (hobbiesContentPos.pos + report.getTextDimensions(cv.hobbies).h) * ratio)
        }
    }

    const generateAdditional = async (report, page) => {
        if (addPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Additional"))
            report.addImage(educationImg, 75 * ratio, addPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("HOBBIES", 113 * ratio, (addPos.pos + 8 + report.getTextDimensions("H").h) * ratio)
        }
        if (addContentPos.page == page) {
            report.setFontSize(14 * ratio)
            const splitAdd = report.splitTextToSize(cv.additionalInfo, 378 * ratio)
            report.text(splitAdd, 113 * ratio, (addContentPos.pos + report.getTextDimensions(cv.additionalInfo).h) * ratio)
        }
    }

    const generateHonors = async (report, page) => {
        if (honorPos.page == page) {
            const educationImg = await loadImage(getSohoIconURL("Honors"))
            report.addImage(educationImg, 75 * ratio, honorPos.pos * ratio, 26 * ratio, 26 * ratio)
            report.setFontSize(20 * ratio)
            report.text("HONORS & AWARDS", 113 * ratio, (honorPos.pos + 8 + report.getTextDimensions("Education").h) * ratio)
        }
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        honorsContent.forEach(element => {
            if (element.page == page) {
                const honorItem = cv.userAwards[element.index]
                const date = new Date(honorItem.date)

                report.ellipse(87 * ratio, (element.posy + 2) * ratio, 4 * ratio, 4 * ratio, "F")
                report.setFontSize(16 * ratio)
                report.text(honorItem.title, 113 * ratio, (element.posy + report.getTextDimensions(honorItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const duration = date.getFullYear() + "-" + (date.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                })
                report.text(duration, 23 * ratio, (element.posy + report.getTextDimensions(duration).h) * ratio)

                report.setFontSize(14 * ratio)
                const splitDescription = report.splitTextToSize(honorItem.description, 378 * ratio)
                report.text(splitDescription, 113 * ratio, (element.posy + 27 + report.getTextDimensions(honorItem.description).h) * ratio)
            }
        })
    }

    const generateContactList = async (report, page) => {
        if (page == contactPos.page) {
            const linkedinImg = await loadImage(getContactImageURL("Linkedin"))
            const dribbleImg = await loadImage(getContactImageURL("Dribble"))
            const instagramImg = await loadImage(getContactImageURL("Instagram"))
            const whatsappImg = await loadImage(getContactImageURL("Whatsapp"))
            const twitterImg = await loadImage(getContactImageURL("Twitter"))
            const facebookImg = await loadImage(getContactImageURL("Facebook"))
            report.addImage(linkedinImg, 637 * ratio, contactPos.pos * ratio, 16 * ratio, 16 * ratio)
            report.addImage(dribbleImg, 669 * ratio, contactPos.pos * ratio, 16 * ratio, 16 * ratio)
            report.addImage(instagramImg, 573 * ratio, contactPos.pos * ratio, 16 * ratio, 16 * ratio)
            report.addImage(twitterImg, 605 * ratio, (contactPos.pos) * ratio, 16 * ratio, 16 * ratio)
            report.addImage(facebookImg, 541 * ratio, (contactPos.pos) * ratio, 16 * ratio, 16 * ratio)
        }
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src;
            img.onload = () => {
                resolve(img)
            }
        })
    }

    const filterContents = () => {
        let eduContent = [];
        let edu_page = 1
        let edu_tempy = 177;
        if (cv.userEducations) {
            if (cv.userEducations.length > 0) edu_tempy = 237 + Math.ceil((cv.description ? cv.description.length : 0) / 54) * 18 + 24
            setEduPos({ pos: edu_tempy, page: 1 })
            edu_tempy += 26
            for (let i = 0; i < cv.userEducations.length; i++) {
                if (edu_tempy + 62 > 972) {
                    edu_tempy = 20;
                    edu_page++;
                }
                eduContent.push({
                    index: i,
                    posy: edu_tempy == 20 ? 20 : edu_tempy + 14,
                    page: edu_page
                })
                // if (i != cv.userEducations.length - 1)
                edu_tempy += 62
            }
            setEducationContent(eduContent);
        }

        let exp_page = edu_page
        let exp_tempy = edu_tempy
        let expContent = []

        if (cv.userExperiences) {
            if (cv.userExperiences.length > 0) {
                if (exp_tempy + 50 > 972) {
                    exp_tempy = 20
                    exp_page++
                } else {
                    exp_tempy += 24
                }
                setExpPos({
                    page: exp_page,
                    pos: exp_tempy
                })
                exp_tempy += 26
                for (let i = 0; i < cv.userExperiences.length; i++) {
                    if (exp_tempy + 135 > 972) {
                        exp_page++
                        exp_tempy = 20
                    }
                    expContent.push({
                        index: i,
                        posy: exp_tempy == 20 ? 20 : exp_tempy + 14,
                        page: exp_page
                    })
                    exp_tempy += 135
                }
                setExperienceContent(expContent)
            }
        }

        let extra_page = exp_page
        let extra_tempy = exp_tempy
        let extraContent = []

        if (cv.userExtraActivities) {
            if (cv.userExtraActivities.length > 0) {
                if (extra_tempy + 50 > 972) {
                    extra_tempy = 20
                    extra_page++
                } else {
                    extra_tempy += 24
                }
                setExtraPos({
                    pos: extra_tempy,
                    page: extra_page
                })
                extra_tempy += 26
            }
            for (let i = 0; i < cv.userExtraActivities.length; i++) {
                if (extra_tempy + 135 > 972) {
                    extra_tempy = 20
                    extra_page++
                }
                extraContent.push({
                    index: i,
                    posy: extra_tempy == 20 ? 20 : extra_tempy + 14,
                    page: extra_page
                })
                extra_tempy += 135
            }
            setExtraCurriContent(extraContent)
        }

        let hobby_page = extra_page, hobby_tempy = extra_tempy
        if (cv.hobbies) {
            if (hobby_tempy + 50 > 972) {
                hobby_tempy = 20
                hobby_page++
            } else {
                hobby_tempy += 24
            }
            setHobbiesPos({
                pos: hobby_tempy,
                page: hobby_page
            })
            hobby_tempy += 26;
            if (hobby_tempy + 24 + Math.ceil((cv.hobbies ? cv.hobbies.length : 0) / 54) * 18 > 972) {
                hobby_tempy = 20
                hobby_page++
            }
            setHobbiesContentPos({
                pos: hobby_tempy == 20 ? 20 : hobby_tempy + 14,
                page: hobby_page
            })
            hobby_tempy += hobby_tempy == 20 ? 0 : 14 + Math.ceil((cv.hobbies ? cv.hobbies.length : 0) / 54) * 18
        }

        let add_page = hobby_page, add_tempy = hobby_tempy
        if (cv.additionalInfo) {
            if (add_tempy + 50 > 972) {
                add_tempy = 20
                add_page++
            } else {
                add_tempy += 24
            }
            setAddPos({
                pos: add_tempy,
                page: add_page
            })
            add_tempy += 26;
            if (add_tempy + 24 + Math.ceil((cv.additionalInfo ? cv.additionalInfo.length : 0) / 54) * 18 > 972) {
                add_tempy = 20
                add_page++
            }
            setAddContentPos({
                pos: add_tempy == 20 ? 20 : add_tempy + 14,
                page: add_page
            })
            add_tempy += add_tempy == 20 ? 0 : 14 + Math.ceil((cv.additionalInfo ? cv.additionalInfo.length : 0) / 54) * 18
        }

        let honor_page = add_page, honor_tempy = add_tempy, honorContent = []
        if (cv.userAwards) {
            if (cv.userAwards) {
                if (honor_tempy + 50 > 972) {
                    honor_tempy = 20
                    honor_page++
                } else {
                    honor_tempy += 24
                }
                setHonorPos({
                    pos: honor_tempy,
                    page: honor_page
                })
                honor_tempy += 26
            }

            for (let i = 0; i < cv.userAwards.length; i++) {
                if (honor_tempy + 113 > 972) {
                    honor_tempy = 20
                    honor_page++
                }
                honorContent.push({
                    index: i,
                    posy: honor_tempy == 20 ? 20 : honor_tempy + 14,
                    page: honor_page
                })
                honor_tempy += 113
            }
            setHonorsContent(honorContent)
        }

        let skiContent = []
        let skill_page = 2
        let skill_tempy = 20
        setSkillPos({
            page: skill_page,
            pos: skill_tempy,
            posx: honor_page == 1 ? 18 : 509
        })

        if (cv.userSkils) {
            skill_tempy = skill_tempy + 28
            for (let i = 0; i < cv.userSkils.length; i++) {
                if (skill_tempy + 54 > 972) {
                    skill_tempy = 20;
                    skill_page++;
                }

                skiContent.push({
                    index: i,
                    posy: skill_tempy == 20 ? 20 : skill_tempy + 16,
                    page: skill_page
                })
                skill_tempy += 54
            }
            setSkillContent(skiContent)
        }

        let lang_tempy = skill_tempy, lang_page = skill_page, langContent = []
        if (honor_page == 1) {
            lang_tempy = 20;
        }
        if (cv.userLanguages) {
            if (cv.userLanguages.length > 0) {
                if (honor_page != 1) {
                    if (lang_tempy + 50 > 972) {
                        lang_tempy = 20
                        lang_page++
                    } else
                        lang_tempy += 24
                }
                setLangPos({
                    pos: lang_tempy,
                    page: lang_page,
                    posx: (honor_page == 1 && cv.userSkils && cv.userSkils.length > 0) ? 263 : ((honor_page == 1 && !(cv.userSkils && cv.userSkils.length > 0)) ? 18 : 509)
                })
                lang_tempy += 26
            }
            for (let i = 0; i < cv.userLanguages.length; i++) {
                if (lang_tempy + 54 > 972) {
                    lang_tempy = 20
                    lang_page++
                }
                langContent.push({
                    index: i,
                    posy: lang_tempy == 20 ? 20 : lang_tempy + 16,
                    page: lang_page
                })
                lang_tempy += 54
            }
            setLanguageContent(langContent)
        }

        let expert_tempy = lang_tempy
        let expert_page = lang_page
        let expertContent = []
        let posx = 509
        if (honor_page == 1) {
            if (cv.userSkils && cv.userSkils.length > 0) {
                if (cv.userLanguages && cv.userLanguages.length > 0) {
                    posx = 509
                } else {
                    posx = 263
                }
            } else {
                if (cv.userLanguages && cv.userLanguages.length > 0) {
                    posx = 263
                } else {
                    posx = 18
                }
            }
        }

        if (cv.userExpertises) {
            if (cv.userExpertises.length > 0) {
                if (honor_page != 1) {
                    if (expert_tempy + 50 > 972) {
                        expert_tempy = 20
                        expert_page++
                    } else
                        expert_tempy += 24
                }
                setExpertPos({
                    pos: expert_tempy,
                    page: expert_page,
                    posx: 509
                })
                expert_tempy += 26
            }
            for (let i = 0; i < cv.userExpertises.length; i++) {
                if (expert_tempy + 54 > 972) {
                    expert_tempy = 20
                    expert_page++
                }
                expertContent.push({
                    index: i,
                    posy: expert_tempy == 20 ? 20 : expert_tempy + 16,
                    page: expert_page
                })
                expert_tempy += 54
            }

            setExpertiseContent(expertContent)
        }

        let cou_tempy = expert_tempy, cou_page = expert_page, couContent = []
        if (cv.userCourses) {
            if (cv.userCourses.length > 0) {
                if (cou_tempy + 50 > 972) {
                    cou_tempy = 20
                    cou_page++
                } else
                    cou_tempy += 24
                setCouPos({
                    pos: cou_tempy,
                    page: cou_page
                })
                cou_tempy += 26
            }
            for (let i = 0; i < cv.userCourses.length; i++) {
                if (cou_tempy + 54 > 972) {
                    cou_tempy = 20
                    cou_page++
                }
                couContent.push({
                    index: i,
                    posy: cou_tempy == 20 ? 20 : cou_tempy + 16,
                    page: cou_page
                })
                cou_tempy += 54
            }

            setCoursesContent(couContent)
        }

        let intern_page = cou_page
        let intern_tempy = cou_tempy
        let internContent = []

        if (cv.userInterships) {
            if (cv.userInterships.length > 0) {
                if (intern_tempy + 50 > 972) {
                    intern_tempy = 20
                    intern_page++
                } else {
                    intern_tempy += 24
                }
                setInternPos({
                    pos: intern_tempy,
                    page: intern_page
                })
                intern_tempy += 26
            }

            for (let i = 0; i < cv.userInterships.length; i++) {
                if (intern_tempy + 74 > 972) {
                    intern_tempy = 20
                    intern_page++
                }
                internContent.push({
                    index: i,
                    posy: intern_tempy == 20 ? 20 : intern_tempy + 16,
                    page: intern_page
                })

                intern_tempy += 74

            }
            setInternShipsContent(internContent)
        }

        let refer_tempy = intern_tempy, refer_page = intern_page, referContent = []
        if (cv.userReferences) {
            if (cv.userReferences.length > 0) {
                if (refer_tempy + 50 > 972) {
                    refer_tempy = 20
                    refer_page++
                } else {
                    refer_tempy += 24
                }
                setReferPos({
                    pos: refer_tempy,
                    page: refer_page
                })
                refer_tempy += 26
            }
            for (let i = 0; i < cv.userReferences.length; i++) {
                if (refer_tempy + 94 > 972) {
                    refer_tempy = 20
                    refer_page++
                }
                referContent.push({
                    index: i,
                    posy: refer_tempy == 20 ? 20 : refer_tempy + 16,
                    page: refer_page
                })
                refer_tempy += 94
            }
            setReferencesContent(referContent)
        }

        setContactPos({ pos: refer_tempy + 24, page: refer_page })

        setTotalPage(refer_page > honor_page ? refer_page : honor_page)
    }

    const getMax = (a, b, c) => {
        let largest;
        if (a >= b && a >= c) {
            largest = a;
        }
        else if (b >= a && b >= c) {
            largest = b;
        }
        else {
            largest = c;
        }
        return largest
    }

    const prevPage = () => {
        if (currentPage == 1) return
        setCurrentPage(currentPage - 1)
        showCanvas(currentPage - 1)
    }

    const nextPage = () => {
        if (currentPage == totalPage) return
        setCurrentPage(currentPage + 1)
        showCanvas(currentPage + 1)
    }

    const getAvatarRef = () => {
        const avatar = new Image()
        avatar.crossOrigin = "*"
        var imagecanvas = document.createElement('canvas');
        var imagecontext = imagecanvas.getContext('2d');
        const avatarImg = new Image()
        avatarImg.src = cv.avatar
        avatarImg.crossOrigin = "*"
        avatarImg.onload = () => {
            const maskImg = new Image()
            maskImg.src = "/images/mask.png"
            maskImg.crossOrigin = "*"
            maskImg.onload = () => {
                imagecanvas.width = maskImg.width
                imagecanvas.height = maskImg.height
                imagecontext.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height)
                imagecontext.globalCompositeOperation = 'source-in'
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)

                // avatarRef.current.src = imagecanvas.toDataURL("image/png")
                setAvatarSrc(imagecanvas.toDataURL("image/png"))
            }
        }
    }

    const getResumeContent = (page) => {
        if (page == 1) {
            return (
                <div className={styles.resume + " " + getStyle()} id="resume">
                    <div className={styles.resumeLine + " " + styles.resumeLine1}></div>
                    <div className={styles.part_1}>
                        <div className={styles.info}>
                            <div className={styles.namebg}>
                                {cv?.givenName.toUpperCase()[0]}{cv?.familyName.toUpperCase()[0]}
                            </div>
                            <div className={styles.info1}>
                                <div className={styles.name}>{cv?.givenName.toUpperCase()}<br />{cv?.familyName.toUpperCase()}
                                </div>
                                <div className={styles.job}>{cv?.jobTitle}</div>
                            </div>
                        </div>
                        <div className={styles.maintitle}>
                            <NextImage src={getSohoIconURL("PersonalInfo")} alt="" width={26} height={26} />
                            <div className={styles.about}>ABOUT ME</div>
                        </div>
                        <div className={styles.descriptionContent}>
                            <div className={styles.resumeCircle}></div>
                            <div className={styles.description} id="description">{htmlRenderer(cv?.description)}</div>
                        </div>
                    </div>
                    <div className={styles.part_2}>
                        {!isEmpty(avatarSrc) ? (<NextImage src={avatarSrc} width={193} height={193} alt="" ref={avatarRef} className={styles.avatar} />) : null}
                        <div className={styles.profile}>
                            <div className={styles.maintitle}>
                                <NextImage src={getSohoIconURL("Personal")} alt="" width={24} height={24} />
                                <div className={styles.title}>Personal Info</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Phone number</div>
                                <div className={styles.text}>{cv?.phone}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Email</div>
                                <div className={styles.text}>{cv?.email}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Academic Level</div>
                                <div className={styles.text}>{cv?.degree?.title}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Driving License</div>
                                <div className={styles.text}>{cv?.drivingLicense?.title}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Address</div>
                                <div className={styles.text}>{cv?.streetAddress}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Website</div>
                                <div className={styles.text}>{cv?.website}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Salary range</div>
                                <div className={styles.text}>$ {cv?.minSalary} - {cv?.maxSalary} monthly</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Nationality</div>
                                <div className={styles.text}>{cv?.nationality?.title}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Gender</div>
                                <div className={styles.text}>{cv?.gender?.title}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Industry</div>
                                <div className={styles.text}>{cv?.industry?.title}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Date Of Birth</div>
                                <div className={styles.text}>{cv?.dateOfBirth}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>Place Of Birth</div>
                                <div className={styles.text}>{cv?.residentCountry?.title}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.section_1}>

                        <div className={styles.contactlist}>
                            <a href="">
                                <NextImage src="/images/Linkedin.png" width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src="/images/Dribble.png" width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src="/images/Instagram.png" width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src="/images/Whatsapp.png" width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src="/images/Twitter.png" width={18} height={18} alt="" />
                            </a>
                        </div>
                    </div> */}
                    {getEducationContent(page)}
                    {getSkillContent(page)}
                    {getExperienceContent(page)}
                    {getLanguageContent(page)}
                    {getExpertiseContent(page)}
                    {getCoursesContent(page)}
                    {getInternshipsContent(page)}
                    {getReferences(page)}
                    {getExtraActivites(page)}
                    {getHobbies(page)}
                    {getAdditional(page)}
                    {getAwards(page)}
                    {getContactList(page)}
                </div>
            );
        } else {
            return (
                <div className={styles.resume + " " + getStyle()} id="resume">
                    {honorPos.page == 1 ? <></> : <div className={styles.resumeLine}></div>}
                    {getEducationContent(page)}
                    {getSkillContent(page)}
                    {getExperienceContent(page)}
                    {getLanguageContent(page)}
                    {getExpertiseContent(page)}
                    {getCoursesContent(page)}
                    {getInternshipsContent(page)}
                    {getReferences(page)}
                    {getExtraActivites(page)}
                    {getHobbies(page)}
                    {getAdditional(page)}
                    {getAwards(page)}
                    {getContactList(page)}
                </div>
            )
        }
    }

    const getEducationContent = (page) => {
        if (cv.userEducations && cv.userEducations.length > 0) {
            return (
                <>
                    {eduPos.page == page ?
                        <div className={styles.componentTitle} style={{ top: eduPos.pos, left: 75 }}>
                            <NextImage src={getSohoIconURL("Education")} alt="" width={26} height={26} />
                            <div className={styles.title}>EDUCATION</div>
                        </div> : <></>}
                    {educationContent.map((item) => {
                        const fromDate = new Date(cv.userEducations[item.index].fromDate)
                        const toDate = new Date(cv.userEducations[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.eduContent} style={{ top: item.posy, left: 84 }}>
                                    <div className={styles.resumeCircle}></div>
                                    <div className={styles.mainContent}>
                                        <div className={styles.content}>
                                            <div className={styles.title}>{cv.userEducations[item.index].institute}</div>
                                            <div className={styles.location}>{cv.userEducations[item.index].city?.title}, {cv.userEducations[item.index].country?.title}</div>
                                        </div>
                                        <div className={styles.role}>{cv.userEducations[item.index].major}</div>
                                    </div>
                                    <div className={styles.Date}>{fromDate.getFullYear()}-{(fromDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })} {toDate.getFullYear()}-{(toDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })}</div>
                                </div>
                                : <></>
                        )
                    })}
                </>
            )
        }
    }

    const getSkillContent = (page) => {
        if (cv.userSkils && cv.userSkils.length > 0) {
            return (
                <>
                    {skillPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: skillPos.posx, top: skillPos.pos }}>
                            <NextImage src={getSohoIconURL("Skills")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                Skill
                            </div>
                        </div> : <></>}
                    {skillContent.map((item) => {
                        return (
                            item.page == page ?
                                <div className={styles.skillContent} style={{ top: item.posy, left: skillPos.posx }}>
                                    <div className={styles.title}>{cv.userSkils[item.index].title}</div>
                                    <div className={styles.content}>
                                        <div className={styles.level}>{cv.userSkils[item.index].domination.title}</div>
                                        <div className={styles.percentage}>{cv.userSkils[item.index].percentage}%</div>
                                    </div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getExperienceContent = (page) => {
        if (cv.userExperiences && cv.userExperiences.length > 0) {
            return (
                <>
                    {expPos.page == page ?
                        <div className={styles.componentTitle} style={{ top: expPos.pos, left: 75 }}>
                            <NextImage src={getSohoIconURL("Experience")} alt="" width={26} height={26} />
                            <div className={styles.title}>EXPERIENCE</div>
                        </div> : <></>}
                    {experienceContent.map((item) => {
                        const fromDate = new Date(cv.userExperiences[item.index].fromDate)
                        const toDate = new Date(cv.userExperiences[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.expContent} style={{ top: item.posy, left: 84 }}>
                                    <div className={styles.resumeCircle}></div>
                                    <div className={styles.mainContent}>
                                        <div className={styles.content}>
                                            <div className={styles.title}>{cv.userExperiences[item.index].title}</div>
                                            <div className={styles.location}>{cv.userExperiences[item.index].city?.title}, {cv.userExperiences[item.index].country?.title}</div>
                                        </div>
                                        <div className={styles.description}>{cv.userExperiences[item.index].description}</div>
                                    </div>
                                    <div className={styles.Date}>{fromDate.getFullYear()}-{(fromDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })} {toDate.getFullYear()}-{(toDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })}</div>
                                </div>
                                : <></>
                        )
                    })}
                </>
            )
        }
    }

    const getLanguageContent = (page) => {
        if (cv.userLanguages && cv.userLanguages.length > 0) {
            return (
                <>
                    {langPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: langPos.posx, top: langPos.pos }}>
                            <NextImage src={getSohoIconURL("Language")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                Languages
                            </div>
                        </div> : <></>}
                    {languageContent.map((item) => {
                        return (
                            item.page == page ?
                                <div className={styles.skillContent} style={{ top: item.posy, left: langPos.posx }}>
                                    <div className={styles.title}>{cv.userLanguages[item.index].language.title}</div>
                                    <div className={styles.content}>
                                        <div className={styles.level}>{cv.userLanguages[item.index].level.title}</div>
                                        <div className={styles.percentage}>{cv.userLanguages[item.index].percentage}%</div>
                                    </div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getExpertiseContent = (page) => {
        if (cv.userExpertises && cv.userExpertises.length > 0) {
            return (
                <>
                    {expertPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: expPos.posx, top: expertPos.pos }}>
                            <NextImage src={getSohoIconURL("Language")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                Expertise
                            </div>
                        </div> : <></>}
                    {expertiseContent.map((item) => {
                        return (
                            item.page == page ?
                                <div className={styles.skillContent} style={{ top: item.posy, left: expPos.posx }}>
                                    <div className={styles.title}>{cv.userExpertises[item.index].title}</div>
                                    <div className={styles.content}>
                                        <div className={styles.level}>{cv.userExpertises[item.index].domination.title}</div>
                                        <div className={styles.percentage}>{cv.userExpertises[item.index].percentage}%</div>
                                    </div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getCoursesContent = (page) => {
        if (cv.userCourses && cv.userCourses.length > 0) {
            return (
                <>
                    {couPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: 509, top: couPos.pos }}>
                            <NextImage src={getSohoIconURL("Courses")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                COURSES
                            </div>
                        </div> : <></>}
                    {coursesContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userCourses[item.index].fromDate)
                        const toDate = new Date(cv.userCourses[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.coursesContent} style={{ top: item.posy, left: 509 }}>
                                    <div className={styles.title}>{cv.userCourses[item.index].title}</div>
                                    <div className={styles.date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()} - {month[toDate.getMonth()]} {toDate.getFullYear()}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getInternshipsContent = (page) => {
        if (cv.userInterships && cv.userInterships.length > 0) {
            return (
                <>
                    {internPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: 509, top: internPos.pos }}>
                            <NextImage src={getSohoIconURL("Internships")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                internships
                            </div>
                        </div> : <></>}
                    {internshipsContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userInterships[item.index].fromDate)
                        const toDate = new Date(cv.userInterships[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.internContent} style={{ top: item.posy, left: 509 }}>
                                    <div className={styles.title}>{cv.userInterships[item.index].title}</div>
                                    <div className={styles.location}>{cv.userInterships[item.index].city?.title}, {cv.userInterships[item.index].country?.title}</div>
                                    <div className={styles.date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()} - {month[toDate.getMonth()]} {toDate.getFullYear()}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getReferences = (page) => {
        if (cv.userReferences && cv.userReferences.length > 0) {
            return (
                <>
                    {referPos.page == page ?
                        <div className={styles.componentTitle + " " + styles.componentTitle1} style={{ left: 509, top: referPos.pos }}>
                            <NextImage src={getSohoIconURL("References")} alt="" width={24} height={24} />
                            <div className={styles.title}>
                                references
                            </div>
                        </div> : <></>}
                    {referencesContent.map((item) => {
                        return (
                            item.page == page ?
                                <div className={styles.referContent} style={{ top: item.posy, left: 509 }}>
                                    <div className={styles.title}>{cv.userReferences[item.index].fullName}</div>
                                    <div className={styles.company}>{"Company : " + cv.userReferences[item.index].fullName}</div>
                                    <div className={styles.email}>{"Email : " + cv.userReferences[item.index].email}</div>
                                    <div className={styles.phone}>{"Phone : " + cv.userReferences[item.index].phone}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getExtraActivites = (page) => {
        if (cv.userExtraActivities && cv.userExtraActivities.length > 0) {
            return (
                <>
                    {extraPos.page == page ?
                        <div className={styles.componentTitle} style={{ left: 75, top: extraPos.pos }}>
                            <NextImage src={getSohoIconURL("Extra")} alt="" width={26} height={26} />
                            <div className={styles.title}>Extra-curricular Activities</div>
                        </div> : <></>}
                    {extracurriContent.map((item) => {
                        const fromDate = new Date(cv.userExtraActivities[item.index].fromDate)
                        const toDate = new Date(cv.userExtraActivities[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.extraContent} style={{ top: item.posy, left: 84 }}>
                                    <div className={styles.resumeCircle}></div>
                                    <div className={styles.mainContent}>
                                        <div className={styles.content}>
                                            <div className={styles.title}>{cv.userExtraActivities[item.index].title}</div>
                                            <div className={styles.location}>{cv.userExtraActivities[item.index].city?.title}, {cv.userExtraActivities[item.index].country?.title}</div>
                                        </div>
                                        <div className={styles.description}>{cv.userExtraActivities[item.index].description}</div>
                                    </div>
                                    <div className={styles.Date}>{fromDate.getFullYear()}-{(fromDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })} {toDate.getFullYear()}-{(toDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getHobbies = (page) => {
        if (cv.hobbies) {
            return (
                <>
                    {hobbiesPos.page == page ?
                        <div className={styles.componentTitle} style={{ left: 75, top: hobbiesPos.pos }}>
                            <NextImage src={getSohoIconURL("Hobby")} alt="" width={26} height={26} />
                            <div className={styles.title}>Hobbies</div>
                        </div>
                        : <></>}
                    {hobbiesContentPos.page == page ?
                        <div className={styles.hobbyContent} style={{ left: 84, top: hobbiesContentPos.pos }}>
                            <div className={styles.resumeCircle}></div>
                            <div className={styles.mainContent}>
                                <div className={styles.description}>
                                    {cv.hobbies}
                                </div>
                            </div>
                        </div>
                        : <></>}
                </>
            )
        }
    }

    const getAdditional = (page) => {
        if (cv.additionalInfo) {
            return (
                <>
                    {addPos.page == page ?
                        <div className={styles.componentTitle} style={{ left: 75, top: addPos.pos }}>
                            <NextImage src={getSohoIconURL("Additional")} width={26} height={26} alt="" />
                            <div className={styles.title}>
                                Additional information
                            </div>
                        </div>
                        : <></>}
                    {addContentPos.page == page ?
                        <div className={styles.hobbyContent} style={{ left: 84, top: addContentPos.pos }}>
                            <div className={styles.resumeCircle}></div>
                            <div className={styles.mainContent}>
                                <div className={styles.description}>{cv.additionalInfo}</div>
                            </div>
                        </div>
                        : <></>}
                </>
            )
        }
    }

    const getAwards = (page) => {
        if (cv.userAwards && cv.userAwards.length > 0) {
            return (
                <>
                    {honorPos.page == page ?
                        <div className={styles.componentTitle} style={{ left: 75, top: honorPos.pos }}>
                            <NextImage src={getSohoIconURL("Honors")} alt="" width={26} height={26} />
                            <div className={styles.title}>Honors & Awards</div>
                        </div> : <></>}
                    {honorsContent.map((item) => {
                        const fromDate = new Date(cv.userAwards[item.index].date)
                        return (
                            item.page == page ?
                                <div className={styles.honorContent} style={{ top: item.posy, left: 84 }}>
                                    <div className={styles.resumeCircle}></div>
                                    <div className={styles.mainContent}>
                                        <div className={styles.content}>
                                            <div className={styles.title}>{cv.userAwards[item.index].title}</div>
                                        </div>
                                        <div className={styles.description}>{cv.userAwards[item.index].description}</div>
                                    </div>

                                    <div className={styles.Date}>{fromDate.getFullYear()}-{(fromDate.getMonth() + 1).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                        useGrouping: false
                                    })}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
            )
        }
    }

    const getContactList = (page) => {
        if (page == contactPos.page) {
            return (
                <div className={styles.contactList} style={{ left: 541, top: contactPos.pos }}>
                    <NextImage src={getContactImageURL("Facebook")} width={16} height={16} alt="" />
                    <NextImage src={getContactImageURL("Instagram")} width={16} height={16} alt="" />
                    <NextImage src={getContactImageURL("Twitter")} width={16} height={16} alt="" />
                    <NextImage src={getContactImageURL("Linkedin")} width={16} height={16} alt="" />
                    <NextImage src={getContactImageURL("Dribble")} width={16} height={16} alt="" />
                </div>
            )
        }
    }

    const loadAvatar = (context) => {
        const avatar = new Image()
        avatar.crossOrigin = "*"
        var imagecanvas = document.createElement('canvas');
        var imagecontext = imagecanvas.getContext('2d');
        const avatarImg = new Image()
        avatarImg.src = cv.avatar
        avatarImg.crossOrigin = "*"
        avatarImg.onload = () => {
            const maskImg = new Image()
            maskImg.src = "/images/mask.png"
            maskImg.crossOrigin = "*"
            maskImg.onload = () => {
                imagecanvas.width = maskImg.width
                imagecanvas.height = maskImg.height
                imagecontext.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height)
                imagecontext.globalCompositeOperation = 'source-in'
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)

                avatar.src = imagecanvas.toDataURL("image/png")
                avatar.onload = () => {
                    context.drawImage(avatar, 81, 85)
                }
            }
        }
    }

    const loadProfile = (context) => {
        context.font = "700 40px Amaranth"
        context.fillStyle = '#000'
        context.textBaseline = "top"

        context.fillText(cv.givenName.toUpperCase(), 289, 82)

        context.font = "400 20px Amaranth"
        context.fillText(cv.jobTitle, 289, 147)

        const linkedImg = new Image();
        const dribbleImg = new Image();
        const instagramImg = new Image();
        const whatsappImg = new Image();
        const twitterImg = new Image();
        // let dribbleCnt = 0, instagramCnt = 0, whatsappCnt = 0, twitterCnt = 0;

        linkedImg.src = "/images/Linkedin.png"
        linkedImg.onload = () => {
            context.drawImage(linkedImg, 294, 188);
        }

        dribbleImg.src = "/images/Dribble.png"
        dribbleImg.onload = () => {
            context.drawImage(dribbleImg, 324, 188);
        }

        instagramImg.src = "/images/Instagram.png"
        instagramImg.onload = () => {
            context.drawImage(instagramImg, 354, 188);
        }

        whatsappImg.src = "/images/Whatsapp.png"
        whatsappImg.onload = () => {
            context.drawImage(whatsappImg, 384, 188);
        }

        twitterImg.src = "/images/Twitter.png"
        twitterImg.onload = () => {
            context.drawImage(twitterImg, 414, 188);
        }
    }

    const loadContact = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = '#6B7598'
        context.fillText("Email:", 289, 219)
        context.fillText("Phone number:", 325, 220)
        context.font = "700 24px Amaranth"
        context.fillStyle = '#242435'
        if (cv.email.length > 30) {
            context.fillText(cv.email.split('@')[0], 289, 235)
            context.fillText("@" + cv.email.split('@')[1], 289, 255)
        }
        else
            context.fillText(cv.email, 289, 235)
        context.fillText(cv.phone, 325, 236)
    }

    const loadDescription = (context) => {
        context.font = "400 24px Amaranth"
        context.fillText(cv.description, 32, 351)
    }

    const loadInformation = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = "#6B7598"
        context.fillText("Academic Level :", 32, 203)
        context.fillText("Website :", 288, 203)
        context.fillText("Gender : ", 526, 203)
        context.fillText("Driving License :", 32, 527)
        context.fillText("Salary range :", 288, 525)
        context.fillText("Industry :", 526, 527)
        context.fillText("Address :", 32, 571)
        context.fillText("Nationality :", 288, 571)
        context.fillText("Date Of Birth :", 526, 571)

        context.font = "700 12px Amaranth"
        context.fillStyle = "#242435"
        context.fillText("Bachelor degree", 32, 499)
        context.fillText(cv.website, 288, 499)
        context.fillText(cv.gender.title, 526, 499)
        context.fillText(cv.drivingLicense.title, 32, 543)
        context.fillText("$" + cv.minSalary + "-" + cv.maxSalary + " monthly", 288, 543)
        context.fillText(cv.industry.title, 526, 543)
        context.fillText(cv.streetAddress, 32, 587)
        context.fillText(cv.nationality.title, 288, 587)
        context.fillText(cv.dateOfBirth, 526, 587)
    }

    return (
        <>
            <div className={styles.resumeContent + " " + styles.soho + " " + getStyle()}>
                {getResumeContent(currentPage)}

            </div>
            <div className="pl-4">
                <div style={{ height: "calc(100vh - 143px)" }} ref={canvasParentRef}>
                    <canvas
                        ref={canvasRef}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        style={{
                            transform: "scale(" + 1 + ")",
                        }}
                        className={styles.canvas}
                    ></canvas>
                </div>

                <div className={styles.pagination}>
                    <div
                        className={
                            styles.prev + " " + (currentPage == 1 ? styles.disabled : "")
                        }
                        onClick={prevPage}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"></path>
                        </svg>
                    </div>
                    <div className={styles.pageInfo}>
                        {currentPage} / {totalPage}
                    </div>
                    <div
                        className={
                            styles.next +
                            " " +
                            (currentPage == totalPage ? styles.disabled : "")
                        }
                        onClick={nextPage}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"></path>
                        </svg>
                    </div>
                </div>
                <div>
                    <Button
                        disabled={loader}
                        className={styles.button}
                        onClick={generatePDF}
                        type="button"
                    >
                        {loader ? <Spin /> : "Export PDF"}
                    </Button>
                </div>
            </div>
            <Script src="https://unpkg.com/jspdf@2.5.1/dist/jspdf.es.min.js" />
            <Script src="https://cdn.rawgit.com/sphilee/jsPDF-CustomFonts-support/bcc544cd/dist/jspdf.customfonts.min.js" />
            <Script src="https://cdn.rawgit.com/stuehler/jsPDF-CustomFonts-support/master/dist/default_vfs.js" />
        </>
    )
}
