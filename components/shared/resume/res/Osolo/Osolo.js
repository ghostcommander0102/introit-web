import NextImage from "next/image"
import styles from "/styles/scss/dashboard/Osolo.module.scss"
import React, { useEffect, useRef, useState, useLayoutEffect } from "react"
import html2canvas from "html2canvas"
import JsPDF from "jspdf"
import Script from "next/script"
import htmlRenderer from "utils/htmlRenderer"
import { isEmpty } from "lodash";
import { Button, Spin } from "antd";
import ThemeModal from "../../ThemeModal";
import tempcv from 'utils/data';

export default function Osolo({
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
    const [contctPos, setContactPos] = useState({})

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
        filterContents()
        const avatar = new Image()
        avatar.crossOrigin = "*"
        var imagecanvas = document.createElement("canvas")
        var imagecontext = imagecanvas.getContext("2d")
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
                imagecontext.globalCompositeOperation = "source-in"
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)
                setAvatarSrc(imagecanvas.toDataURL("image/png"))
            }
        }
    }, [cv?.avatar])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         axios.get('https://api.introit.io/profile/resume/view/cv2/3').then(response => {
    //             setCV(response.data.cv)
    //         })
    //     }, 320)
    //     return () => clearInterval(interval)
    // }, [])

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
            const context = canvas.getContext("2d")
            const scale = window.devicePixelRatio
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
        const context = canvas.getContext("2d")
        setTimeout(async () => {
            html2canvas(document.querySelector("#resume"), {
                useCORS: true,
            }).then(async (canvas1) => {
                const backgroundImg = await loadImage(canvas1.toDataURL("image/png"))
                context.drawImage(backgroundImg, 0, 0, 720 * deviceRatio, 1019 * deviceRatio)
                if (page == 1) {
                    const avatarImg = await loadImage(avatarSrc)
                    // context.drawImage(avatarImg, 67 * window.devicePixelRatio, 179 * window.devicePixelRatio, 124.8 * window.devicePixelRatio, 124.8 * window.devicePixelRatio)

                    // const linkedinImg = await loadImage(getContactImageURL("Linkedin"))
                    // const dribbleImg = await loadImage(getContactImageURL("Dribble"))
                    // const instagramImg = await loadImage(getContactImageURL("Instagram"))
                    // const whatsappImg = await loadImage(getContactImageURL("Whatsapp"))
                    // const twitterImg = await loadImage(getContactImageURL("Twitter"))
                    // context.drawImage(linkedinImg, 428 * window.devicePixelRatio, 48 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(dribbleImg, 478 * window.devicePixelRatio, 48 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(instagramImg, 528 * window.devicePixelRatio, 48 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(whatsappImg, 578 * window.devicePixelRatio, 48 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)
                    // context.drawImage(twitterImg, 628 * window.devicePixelRatio, 48 * window.devicePixelRatio, 18 * window.devicePixelRatio, 18 * window.devicePixelRatio)

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
                //         for (let i = 0 i < 5 i++) {
                //             if (skiItem.percentage >= (i + 1) * 20) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (524 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (skiItem.percentage > i * 20 && skiItem.percentage < (i + 1) * 20) {
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
                //         for (let i = 0 i < 5 i++) {
                //             if (langItem.percentage >= (i + 1) * 20) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (32 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (langItem.percentage > i * 20 && langItem.percentage < (i + 1) * 20) {
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

                //         for (let i = 0 i < 5 i++) {
                //             if (expertiseItem.percentage >= (i + 1) * 20) {
                //                 const img = await loadImage("/images/full.png")
                //                 context.drawImage(img, (298.5 + i * 33.5) * window.devicePixelRatio, (element.posy + 27) * window.devicePixelRatio, 12, 12)
                //             } else if (expertiseItem.percentage > i * 20 && expertiseItem.percentage < (i + 1) * 20) {
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
            })
        }, 320)
    }

    const getBackgroundURL = () => {
        return (type == "light" ? "/images/background/backgroundWhite.png" : (type == "gradient" ? "/images/background/backgroundOsolo.png" : "/images/background/backgroundDark.png"))
    }

    const getHeaderColor = () => {
        return (type == "light" ? "#F0F0F0" : (type == "gradient" ? "#FFFFFF" : "#24262F"))
    }

    const getStyle = () => {
        return (type == "light" ? styles.light : (type == "gradient" ? styles.gradient : styles.dark))
    }

    const getContactImageURL = (contact) => {
        return (type == "dark" ? "/images/contact/Osolo/" + contact + "Dark.png" : "/images/contact/Osolo/" + contact + ".png")
    }

    const getTextColor = () => {
        return (type == "dark" ? "#FBFEF9" : "#2E2725")
    }

    const getProgressBackColor = () => {
        return (type == "light" ? "#140229" : (type == "dark" ? "#FBFEF9" : "#ccc9d3"))
    }

    const getProgressValueColor = () => {
        return (type == "light" ? "#2E2725" : (type == "dark" ? "#0E79B2" : "#9BDAE9"))
    }

    const getProgressCircleColor = () => {
        return (type == "light" ? "#FFFFFF" : (type == "dark" ? "#191923" : "#FFFFFF"))
    }

    const generatePDF = async () => {
        setLoader(true);
        setLoading(true);
        const report = new JsPDF("portrait", "px", "A4")
        var width = report.internal.pageSize.getWidth()
        var height = report.internal.pageSize.getHeight()

        report.addFont("/fonts/Poppins-Regular.ttf", "Poppins", "normal")
        report.setFont("Poppins")
        report.setTextColor(getTextColor())
        const backgroundImg = await loadImage(getBackgroundURL())
        report.addImage(backgroundImg, "png", 0, 0, 720 * ratio, 1019 * ratio)

        await generateProfile(report)
        for (let i = 1; i <= totalPage; i++) {
            if (i != 1) {
                report.addPage()
                report.addImage(backgroundImg, "png", 0, 0, 720 * ratio, 1019 * ratio)
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
            await generateContacts(report, i)
        }

        report.save("report.pdf")
        setLoader(false)
        setLoading(false);
    }

    const generateProfile = async (report) => {
        const avatarImg = await loadImage(avatarSrc)
        report.addImage(avatarImg, "png", 432 * ratio, 0, 288 * ratio, 288 * ratio)

        report.setFontSize(32 * ratio)
        report.text(
            cv.givenName.toUpperCase() + " " + cv.familyName.toUpperCase(),
            216 * ratio,
            (48 + report.getTextDimensions(cv.givenName.toUpperCase()).h) * ratio,
            { align: "center" }
        )

        report.setFontSize(16 * ratio)
        report.text(
            cv.jobTitle ? cv.jobTitle : "",
            216 * ratio,
            (100 + report.getTextDimensions(cv.jobTitle ? cv.jobTitle : "").h) * ratio,
            { align: "center" }
        )

        report.setFontSize(24 * ratio)
        report.text(
            "ABOUT ME",
            216 * ratio,
            (177 + report.getTextDimensions("ABOUT ME").h) * ratio,
            { align: "center" }
        )

        report.setFontSize(14 * ratio)
        let tmp
        if (typeof window !== "undefined") {
            tmp = document.createElement("DIV")
            tmp.innerHTML = cv?.description
        }

        var splitDescription = report.splitTextToSize(
            tmp?.textContent || tmp?.innerText || "",
            384 * ratio
        )
        report.text(
            splitDescription,
            24 * ratio,
            (237 + report.getTextDimensions(cv.description).h) * ratio
        )

        report.setFontSize(12 * ratio)
        report.text(
            "Phone number :",
            456 * ratio,
            (328 + report.getTextDimensions("Phone number").h) * ratio
        )
        report.text(
            "Email :",
            456 * ratio,
            (372 + report.getTextDimensions("Email").h) * ratio
        )
        report.text(
            "Academic Level :",
            456 * ratio,
            (416 + report.getTextDimensions("Academic Level").h) * ratio
        )
        report.text(
            "Driving License :",
            456 * ratio,
            (460 + report.getTextDimensions("Driving License").h) * ratio
        )
        report.text(
            "Address :",
            456 * ratio,
            (504 + report.getTextDimensions("Address").h) * ratio
        )
        report.text(
            "Website :",
            456 * ratio,
            (572 + report.getTextDimensions("Website").h) * ratio
        )
        report.text(
            "Salary range :",
            456 * ratio,
            (614 + report.getTextDimensions("Salary range").h) * ratio
        )
        report.text(
            "Nationality :",
            456 * ratio,
            (658 + report.getTextDimensions("Nationality :").h) * ratio
        )
        report.text(
            "Gender :",
            456 * ratio,
            (702 + report.getTextDimensions("Gender : ").h) * ratio
        )
        report.text(
            "Industry :",
            456 * ratio,
            (746 + report.getTextDimensions("Industry").h) * ratio
        )
        report.text(
            "Date Of Birth",
            456 * ratio,
            (790 + report.getTextDimensions("Date Of Birth").h) * ratio
        )
        report.text(
            "Place Of Birth",
            456 * ratio,
            (834 + report.getTextDimensions("Place Of Birth").h) * ratio
        )

        report.text(
            cv.phone ? cv.phone : "",
            456 * ratio,
            (344 + report.getTextDimensions(cv.phone ? cv.phone : "").h) * ratio
        )
        var splitEmail = report.splitTextToSize(cv.email ? cv.email : "", 240 * ratio)
        report.text(
            splitEmail,
            456 * ratio,
            (388 + report.getTextDimensions(cv.email ? cv.email : "").h) * ratio
        )
        report.text(
            cv.degree ? cv.degree.title : "",
            456 * ratio,
            (432 + report.getTextDimensions(cv.degree ? cv.degree.title : "").h) * ratio
        )
        report.text(
            cv.drivingLicense ? cv.drivingLicense.title : "",
            456 * ratio,
            (476 + report.getTextDimensions(cv.drivingLicense ? cv.drivingLicense.title : "").h) * ratio
        )
        report.text(
            cv.streetAddress ? cv.streetAddress : "",
            456 * ratio,
            (520 + report.getTextDimensions(cv.streetAddress ? cv.streetAddress : "").h) * ratio
        )
        report.text(
            cv.website ? cv.website : "",
            456 * ratio,
            (586 + report.getTextDimensions(cv.website ? cv.website : "").h) * ratio
        )
        report.text(
            "$ " + (cv.minSalary ? cv.minSalary : "") + " - " + (cv.maxSalary ? cv.maxSalary : "") + " monthly",
            456 * ratio,
            (630 +
                report.getTextDimensions(
                    "$ " + (cv.minSalary ? cv.minSalary : "") + " - " + (cv.maxSalary ? cv.maxSalary : "") + " monthly"
                ).h) *
            ratio
        )
        report.text(
            cv.nationality ? cv.nationality.title : "",
            456 * ratio,
            (674 + report.getTextDimensions(cv.nationality ? cv.nationality.title : "").h) * ratio
        )
        report.text(
            cv.gender ? cv.gender.title : "",
            456 * ratio,
            (718 + report.getTextDimensions(cv.gender ? cv.gender.title : "").h) * ratio
        )
        report.text(
            cv.industry ? cv.industry.title : "",
            456 * ratio,
            (762 + report.getTextDimensions(cv.industry ? cv.industry.title : "").h) * ratio
        )
        report.text(
            cv.dateOfBirth ? cv.dateOfBirth : "",
            456 * ratio,
            (806 + report.getTextDimensions(cv.dateOfBirth ? cv.dateOfBirth : "").h) * ratio
        )
        report.text(
            cv.residentCountry ? cv?.residentCountry?.title : "",
            456 * ratio,
            (850 +
                report.getTextDimensions(
                    cv.residentCountry ? cv?.residentCountry?.title : ""
                ).h) *
            ratio
        )
    }

    const generateHeader = async (report) => {
        report.setFillColor(255, 255, 255)
        report.rect(32 * ratio, 32 * ratio, 656 * ratio, 78 * ratio, "F")
        report.setTextColor("#454545")
        report.setFontSize(24 * ratio)
        // cv.givenName = cv.givenName.toUpperCase()
        report.text(
            cv.givenName.toUpperCase(),
            64 * ratio,
            (48 + report.getTextDimensions(cv.givenName.toUpperCase()).h) * ratio
        )

        report.setFontSize(24 * ratio)
        report.text(
            cv.jobTitle,
            64 * ratio,
            (72 + report.getTextDimensions(cv.jobTitle).h) * ratio
        )

        const linkedinImg = await loadImage(getContactImageURL("Linkedin"))
        const dribbleImg = await loadImage(getContactImageURL("Dribble"))
        const instagramImg = await loadImage(getContactImageURL("Instagram"))
        const whatsappImg = await loadImage(getContactImageURL("Whatsapp"))
        const twitterImg = await loadImage(getContactImageURL("Twitter"))
        report.addImage(
            linkedinImg,
            428 * ratio,
            48 * ratio,
            18 * ratio,
            18 * ratio
        )
        report.addImage(
            dribbleImg,
            478 * ratio,
            48 * ratio,
            18 * ratio,
            18 * ratio
        )
        report.addImage(
            instagramImg,
            528 * ratio,
            48 * ratio,
            18 * ratio,
            18 * ratio
        )
        report.addImage(
            whatsappImg,
            578 * ratio,
            48 * ratio,
            18 * ratio,
            18 * ratio
        )
        report.addImage(
            twitterImg,
            628 * ratio,
            48 * ratio,
            18 * ratio,
            18 * ratio
        )
    }

    const generateEducation = async (report, page) => {
        if (eduPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "EDUCATION",
                213 * ratio,
                (eduPos.pos + report.getTextDimensions("Education").h) * ratio,
                { align: "center" }
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        educationContent.forEach((element) => {
            if (element.page == page) {
                const eduItem = cv.userEducations[element.index]
                const fromDate = new Date(eduItem.fromDate)
                const toDate = new Date(eduItem.toDate)

                report.setFontSize(16 * ratio)
                report.text(
                    eduItem.institute,
                    24 * ratio,
                    (element.posy + report.getTextDimensions(eduItem.institute).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const location = eduItem?.city?.title + ", " + eduItem?.country?.title
                report.text(
                    location,
                    24 * ratio,
                    (element.posy + 24 + report.getTextDimensions(location).h) * ratio
                )

                const duration =
                    month[fromDate.getMonth()] +
                    " " +
                    fromDate.getFullYear() +
                    " - " +
                    month[toDate.getMonth()] +
                    " " +
                    toDate.getFullYear()
                report.text(
                    duration,
                    408 * ratio,
                    (element.posy + 24 + report.getTextDimensions(duration).h) * ratio,
                    { align: "right" }
                )

                report.setFontSize(14 * ratio)
                report.text(
                    eduItem.major,
                    24 * ratio,
                    (element.posy + 46 + report.getTextDimensions(eduItem.major).h) *
                    ratio
                )
            }
        })
    }

    const generateSkills = async (report, page) => {
        if (skillPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "SKILLS",
                skillPos.posx * ratio,
                (skillPos.pos + report.getTextDimensions("Skills").h) * ratio
            )
        }
        skillContent.forEach((element) => {
            if (element.page == page) {
                const skiItem = cv.userSkils[element.index]

                report.setFontSize(14 * ratio)
                report.text(
                    skiItem.title,
                    skillPos.posx * ratio,
                    (element.posy + report.getTextDimensions(skiItem.title).h) * ratio
                )
                report.setFontSize(12 * ratio)
                report.text(
                    skiItem.domination.title,
                    (skillPos.posx + 240) * ratio,
                    (element.posy +
                        report.getTextDimensions(skiItem.domination.title).h) *
                    ratio,
                    { align: "right" }
                )

                report.setFillColor(getProgressBackColor())
                report.roundedRect(
                    skillPos.posx * ratio,
                    (element.posy + 36) * ratio,
                    240 * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.roundedRect(
                    skillPos.posx * ratio,
                    (element.posy + 36) * ratio,
                    ((240 * 1.0 * skiItem.percentage) / 100) * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )

                report.setFillColor(getProgressCircleColor())
                report.ellipse(
                    (skillPos.posx + (240 * 1.0 * skiItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    7,
                    7,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.ellipse(
                    (skillPos.posx + (240 * 1.0 * skiItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    5,
                    5,
                    "F"
                )
            }
        })
    }

    const generateExperience = async (report, page) => {
        if (expPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "EXPRIENCE",
                213 * ratio,
                (expPos.pos + report.getTextDimensions("Experience").h) * ratio,
                { align: "center" }
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        experienceContent.forEach((element) => {
            if (element.page == page) {
                const expItem = cv.userExperiences[element.index]
                const fromDate = new Date(expItem.fromDate)
                const toDate = new Date(expItem.toDate)
                report.setFontSize(16 * ratio)
                report.text(
                    expItem.title,
                    24 * ratio,
                    (element.posy + report.getTextDimensions(expItem.title).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const location = expItem.city?.title + ", " + expItem.country?.title
                report.text(
                    location,
                    24 * ratio,
                    (element.posy + 28 + report.getTextDimensions(location).h) * ratio
                )
                const duration =
                    month[fromDate.getMonth()] +
                    " " +
                    fromDate.getFullYear() +
                    " - " +
                    month[toDate.getMonth()] +
                    " " +
                    toDate.getFullYear()
                report.text(
                    duration,
                    408 * ratio,
                    (element.posy + 28 + report.getTextDimensions(duration).h) * ratio,
                    { align: "right" }
                )

                report.setFontSize(14 * ratio)
                var splitDescription = report.splitTextToSize(
                    expItem.description,
                    304 * ratio
                )
                report.text(
                    splitDescription,
                    24 * ratio,
                    (element.posy +
                        54 +
                        report.getTextDimensions(expItem.description ? expItem.description : "").h) *
                    ratio
                )
            }
        })
    }

    const generateLanguages = async (report, page) => {
        if (langPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "LANGUAGES",
                langPos.posx * ratio,
                (langPos.pos + report.getTextDimensions("Languages").h) * ratio
            )
        }

        languageContent.forEach((element) => {
            if (element.page == page) {
                const langItem = cv.userLanguages[element.index]

                report.setFontSize(14 * ratio)
                report.text(
                    langItem.language.title,
                    langPos.posx * ratio,
                    (element.posy + report.getTextDimensions(langItem.language.title).h) *
                    ratio
                )
                report.setFontSize(12 * ratio)
                report.text(
                    langItem.level.title,
                    (langPos.posx + 240) * ratio,
                    (element.posy + report.getTextDimensions(langItem.level.title).h) *
                    ratio,
                    { align: "right" }
                )

                report.setFillColor(getProgressBackColor())
                report.roundedRect(
                    langPos.posx * ratio,
                    (element.posy + 36) * ratio,
                    240 * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.roundedRect(
                    langPos.posx * ratio,
                    (element.posy + 36) * ratio,
                    ((240 * 1.0 * langItem.percentage) / 100) * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )

                report.setFillColor(getProgressCircleColor())
                report.ellipse(
                    (langPos.posx + (240 * 1.0 * langItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    7,
                    7,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.ellipse(
                    (langPos.posx + (240 * 1.0 * langItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    5,
                    5,
                    "F"
                )
            }
        })
    }

    const generateExpertise = async (report, page) => {
        if (expertPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "Expertise",
                456 * ratio,
                (expertPos.pos + report.getTextDimensions("Expertise").h) * ratio
            )
        }

        expertiseContent.forEach((element) => {
            if (element.page == page) {
                const expertiseItem = cv.userExpertises[element.index]

                report.setFontSize(14 * ratio)
                report.text(
                    expertiseItem.title,
                    456 * ratio,
                    (element.posy + report.getTextDimensions(expertiseItem.title).h) *
                    ratio
                )
                report.setFontSize(12 * ratio)
                report.text(
                    expertiseItem.domination.title,
                    696 * ratio,
                    (element.posy +
                        report.getTextDimensions(expertiseItem.domination.title).h) *
                    ratio,
                    { align: "right" }
                )

                report.setFillColor(getProgressBackColor())
                report.roundedRect(
                    456 * ratio,
                    (element.posy + 36) * ratio,
                    240 * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.roundedRect(
                    456 * ratio,
                    (element.posy + 36) * ratio,
                    ((240 * 1.0 * expertiseItem.percentage) / 100) * ratio,
                    8 * ratio,
                    4 * ratio,
                    4 * ratio,
                    "F"
                )

                report.setFillColor(getProgressCircleColor())
                report.ellipse(
                    (456 + (240 * 1.0 * expertiseItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    7,
                    7,
                    "F"
                )
                report.setFillColor(getProgressValueColor())
                report.ellipse(
                    (456 + (240 * 1.0 * expertiseItem.percentage) / 100) * ratio,
                    (element.posy + 39) * ratio,
                    5,
                    5,
                    "F"
                )
            }
        })
    }

    const generateCourses = async (report, page) => {
        if (couPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "COURSES",
                456 * ratio,
                (couPos.pos + report.getTextDimensions("Courses").h) * ratio
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        coursesContent.forEach((element) => {
            if (element.page == page) {
                const couItem = cv.userCourses[element.index]
                const fromDate = new Date(couItem.fromDate)
                const toDate = new Date(couItem.toDate)

                report.setFontSize(16 * ratio)
                report.text(
                    couItem.title,
                    456 * ratio,
                    (element.posy + report.getTextDimensions(couItem.title).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const duration =
                    month[fromDate.getMonth()] +
                    " " +
                    fromDate.getFullYear() +
                    " - " +
                    month[toDate.getMonth()] +
                    " " +
                    toDate.getFullYear()
                var splitDuration = report.splitTextToSize(duration, 300 * ratio)
                report.text(
                    splitDuration,
                    456 * ratio,
                    (element.posy + 28 + report.getTextDimensions(duration).h) * ratio
                )
            }
        })
    }

    const generateInternships = async (report, page) => {
        if (internPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "Internships",
                456 * ratio,
                (internPos.pos + report.getTextDimensions("Internships").h) * ratio
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        internshipsContent.forEach((element) => {
            if (element.page == page) {
                const internItem = cv.userInterships[element.index]
                const fromDate = new Date(internItem.fromDate)
                const toDate = new Date(internItem.toDate)
                report.setFontSize(16 * ratio)
                report.text(
                    internItem.title,
                    456 * ratio,
                    (element.posy + report.getTextDimensions(internItem.title).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const location =
                    internItem.city.title + ", " + internItem.country.title
                report.text(
                    location,
                    456 * ratio,
                    (element.posy + 28 + report.getTextDimensions(location).h) * ratio
                )

                const duration =
                    month[fromDate.getMonth()] +
                    " " +
                    fromDate.getFullYear() +
                    " - " +
                    month[toDate.getMonth()] +
                    " " +
                    toDate.getFullYear()
                const splitDuration = report.splitTextToSize(duration, 250 * ratio)
                report.text(
                    splitDuration,
                    456 * ratio,
                    (element.posy + 53 + report.getTextDimensions(duration).h) * ratio
                )
            }
        })
    }

    const generateReference = async (report, page) => {
        if (referPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "REFERENCES",
                456 * ratio,
                (referPos.pos + report.getTextDimensions("References").h) * ratio
            )
        }
        referencesContent.forEach((element) => {
            if (element.page == page) {
                const referItem = cv.userReferences[element.index]
                report.setFontSize(16 * ratio)
                const splitName = report.splitTextToSize(
                    referItem.fullName,
                    232 * ratio
                )
                report.text(
                    splitName,
                    456 * ratio,
                    (element.posy + report.getTextDimensions(referItem.fullName).h) *
                    ratio
                )

                report.setFontSize(12 * ratio)
                report.text(
                    "Company :" + referItem.company,
                    456 * ratio,
                    (element.posy + 32 + report.getTextDimensions(referItem.company).h) *
                    ratio
                )
                report.text(
                    "Email :" + referItem.email,
                    456 * ratio,
                    (element.posy + 54 + report.getTextDimensions(referItem.email).h) *
                    ratio
                )
                report.text(
                    "Phone :" + referItem.phone,
                    456 * ratio,
                    (element.posy + 76 + report.getTextDimensions(referItem.phone).h) *
                    ratio
                )
            }
        })
    }

    const generateExtra = async (report, page) => {
        if (extraPos.page == page) {
            report.setFontSize(24 * ratio)
            const splittext = report.splitTextToSize(
                "EXTRA-CURRICULAR ACTIVITIES",
                384 * ratio
            )
            report.text(
                splittext,
                213 * ratio,
                (extraPos.pos +
                    report.getTextDimensions("Extra-curricular Activities").h) *
                ratio,
                { align: "center" }
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        extracurriContent.forEach((element) => {
            if (element.page == page) {
                const extraItem = cv.userExtraActivities[element.index]
                const fromDate = new Date(extraItem.fromDate)
                const toDate = new Date(extraItem.toDate)

                report.setFontSize(16 * ratio)
                report.text(
                    extraItem.title,
                    24 * ratio,
                    (element.posy + report.getTextDimensions(extraItem.title).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const location = extraItem.city.title + ", " + extraItem.country.title
                report.text(
                    location,
                    24 * ratio,
                    (element.posy + 28 + report.getTextDimensions(location).h) * ratio
                )
                const duration =
                    month[fromDate.getMonth()] +
                    " " +
                    fromDate.getFullYear() +
                    " - " +
                    month[toDate.getMonth()] +
                    " " +
                    toDate.getFullYear()
                report.text(
                    duration,
                    408 * ratio,
                    (element.posy + 28 + report.getTextDimensions(location).h) * ratio,
                    { align: "right" }
                )
                report.setFontSize(14 * ratio)
                const splitDescription = report.splitTextToSize(
                    extraItem.description,
                    620 * ratio
                )
                report.text(
                    splitDescription,
                    24 * ratio,
                    (element.posy +
                        54 +
                        report.getTextDimensions(extraItem.description).h) *
                    ratio
                )
            }
        })
    }

    const generatehobbies = async (report, page) => {
        if (hobbiesPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "HOBBIES",
                213 * ratio,
                (hobbiesPos.pos + report.getTextDimensions("Hobbies").h) * ratio
            )
        }
        if (hobbiesContentPos.page == page) {
            report.setFontSize(14 * ratio)
            const splitHobbies = report.splitTextToSize(cv.hobbies, 384 * ratio)
            report.text(
                splitHobbies,
                24 * ratio,
                (hobbiesContentPos.pos + report.getTextDimensions(cv.hobbies).h) * ratio
            )
        }
    }

    const generateAdditional = async (report, page) => {
        if (addPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "ADDITIONAL INFORMATION",
                213 * ratio,
                (addPos.pos + report.getTextDimensions("Additional information").h) *
                ratio,
                { align: "center" }
            )
        }
        if (addContentPos.page == page) {
            report.setFontSize(14 * ratio)
            const splitAdd = report.splitTextToSize(cv.additionalInfo, 384 * ratio)
            report.text(
                splitAdd,
                24 * ratio,
                (addContentPos.pos + report.getTextDimensions(cv.additionalInfo).h) *
                ratio
            )
        }
    }

    const generateHonors = async (report, page) => {
        if (honorPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text(
                "HONORS & AWARDS",
                213 * ratio,
                (honorPos.pos + report.getTextDimensions("Honors & Awards").h) * ratio,
                { align: "center" }
            )
        }
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        honorsContent.forEach((element) => {
            if (element.page == page) {
                const honorItem = cv.userAwards[element.index]
                const date = new Date(honorItem.date)

                report.setFontSize(16 * ratio)
                report.text(
                    honorItem.title,
                    24 * ratio,
                    (element.posy + report.getTextDimensions(honorItem.title).h) * ratio
                )

                report.setFontSize(12 * ratio)
                const duration = month[date.getMonth()] + " " + date.getFullYear()
                report.text(
                    duration,
                    408 * ratio,
                    (element.posy + report.getTextDimensions(duration).h) * ratio,
                    { align: "right" }
                )

                report.setFontSize(14 * ratio)
                const splitDescription = report.splitTextToSize(
                    honorItem.description,
                    304 * ratio
                )
                report.text(
                    splitDescription,
                    24 * ratio,
                    (element.posy +
                        32 +
                        report.getTextDimensions(honorItem.description).h) *
                    ratio
                )
            }
        })
    }

    const generateContacts = async (report, page) => {
        if (contctPos.page == page) {
            const linkedinImg = await loadImage(getContactImageURL("Linkedin"))
            const dribbleImg = await loadImage(getContactImageURL("Dribble"))
            const instagramImg = await loadImage(getContactImageURL("Instagram"))
            const whatsappImg = await loadImage(getContactImageURL("Whatsapp"))
            const twitterImg = await loadImage(getContactImageURL("Twitter"))
            const facebookImg = await loadImage(getContactImageURL("Facebook"))
            report.addImage(linkedinImg, 508 * ratio, contctPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.addImage(dribbleImg, 564 * ratio, contctPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.addImage(instagramImg, 620 * ratio, contctPos.pos * ratio, 24 * ratio, 24 * ratio)
            report.addImage(whatsappImg, 508 * ratio, (contctPos.pos + 56) * ratio, 24 * ratio, 24 * ratio)
            report.addImage(twitterImg, 564 * ratio, (contctPos.pos + 56) * ratio, 24 * ratio, 24 * ratio)
            report.addImage(facebookImg, 620 * ratio, (contctPos.pos + 56) * ratio, 24 * ratio, 24 * ratio)
        }
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                resolve(img)
            }
        })
    }

    const filterContents = () => {
        let eduContent = []
        let edu_page = 1
        let edu_tempy = 237
        if (cv.userEducations) {
            if (cv.userEducations.length > 0)
                edu_tempy =
                    237 +
                    Math.ceil((cv.description ? cv.description.length : 0) / 54) * 20 +
                    56
            setEduPos({ pos: edu_tempy, page: 1 })
            edu_tempy += 36
            for (let i = 0; i < cv.userEducations.length; i++) {
                if (edu_tempy + 90 > 964) {
                    edu_tempy = 48
                    edu_page++
                }
                eduContent.push({
                    index: i,
                    posy: edu_tempy == 48 ? 48 : edu_tempy + 24,
                    page: edu_page,
                })
                // if (i != cv.userEducations.length - 1)
                edu_tempy += 90
            }
            setEducationContent(eduContent)
        }

        let exp_page = edu_page
        let exp_tempy = edu_tempy
        let expContent = []

        if (cv.userExperiences) {
            if (cv.userExperiences.length > 0) {
                if (exp_tempy + 92 > 964) {
                    exp_tempy = 48
                    exp_page++
                } else {
                    exp_tempy += 56
                }
                setExpPos({
                    page: exp_page,
                    pos: exp_tempy,
                })
                exp_tempy += 36
                for (let i = 0; i < cv.userExperiences.length; i++) {
                    if (exp_tempy + 162 > 964) {
                        exp_page++
                        exp_tempy = 48
                    }
                    expContent.push({
                        index: i,
                        posy: exp_tempy + 24,
                        page: exp_page,
                    })
                    exp_tempy += 162
                }
                setExperienceContent(expContent)
            }
        }

        let extra_page = exp_page
        let extra_tempy = exp_tempy
        let extraContent = []

        if (cv.userExtraActivities) {
            if (cv.userExtraActivities.length > 0) {
                if (extra_tempy + 128 > 964) {
                    extra_tempy = 48
                    extra_page++
                } else {
                    extra_tempy += 48
                }
                setExtraPos({
                    pos: extra_tempy,
                    page: extra_page,
                })
                extra_tempy += 72
            }
            for (let i = 0; i < cv.userExtraActivities.length; i++) {
                if (extra_tempy + 162 > 964) {
                    extra_tempy = 48
                    extra_page++
                }
                extraContent.push({
                    index: i,
                    posy: extra_tempy == 48 ? 48 : extra_tempy + 24,
                    page: extra_page,
                })
                extra_tempy += 162
            }
            setExtraCurriContent(extraContent)
        }

        let hobby_page = extra_page,
            hobby_tempy = extra_tempy
        if (cv.hobbies) {
            if (hobby_tempy + 92 > 964) {
                hobby_tempy = 48
                hobby_page++
            } else {
                hobby_tempy += 48
            }
            setHobbiesPos({
                pos: hobby_tempy,
                page: hobby_page,
            })
            hobby_tempy += 36
            if (
                hobby_tempy +
                24 +
                Math.ceil((cv.hobbies ? cv.hobbies.length : 0) / 54) * 20 >
                964
            ) {
                hobby_tempy = 48
                hobby_page++
            }
            setHobbiesContentPos({
                pos: hobby_tempy == 48 ? 48 : hobby_tempy + 24,
                page: hobby_page,
            })
            hobby_tempy +=
                hobby_tempy == 48
                    ? 0
                    : 24 + Math.ceil((cv.hobbies ? cv.hobbies.length : 0) / 54) * 20
        }

        let add_page = hobby_page,
            add_tempy = hobby_tempy
        if (cv.additionalInfo) {
            if (add_tempy + 92 > 964) {
                add_tempy = 48
                add_page++
            } else {
                add_tempy += 48
            }
            setAddPos({
                pos: add_tempy,
                page: add_page,
            })
            add_tempy += 36
            if (
                add_tempy +
                24 +
                Math.ceil((cv.additionalInfo ? cv.additionalInfo.length : 0) / 54) *
                20 >
                964
            ) {
                add_tempy = 48
                add_page++
            }
            setAddContentPos({
                pos: add_tempy + 24,
                page: add_page,
            })
            add_tempy +=
                24 + Math.ceil((cv.additionalInfo ? cv.additionalInfo.length : 0) / 54)
        }

        let honor_page = add_page,
            honor_tempy = add_tempy,
            honorContent = []
        if (cv.userAwards) {
            if (cv.userAwards.length > 0) {
                if (honor_tempy + 92 > 964) {
                    honor_tempy = 48
                    honor_page++
                } else {
                    honor_tempy += 48
                }
                setHonorPos({
                    pos: honor_tempy,
                    page: honor_page,
                })
                honor_tempy += 36
            }

            for (let i = 0; i < cv.userAwards.length; i++) {
                if (honor_tempy + 140 > 964) {
                    honor_tempy = 48
                    honor_page++
                }
                honorContent.push({
                    index: i,
                    posy: honor_tempy == 48 ? 48 : honor_tempy + 24,
                    page: honor_page,
                })
                honor_tempy += 140
            }
            setHonorsContent(honorContent)
        }

        let skiContent = []
        let skill_page = 2
        let skill_tempy = 48
        let skill_posx = 456
        if (honor_page == 1) {
            skill_posx = 24
        }
        setSkillPos({
            page: skill_page,
            pos: skill_tempy,
            posx: skill_posx
        })

        if (cv.userSkils) {
            skill_tempy = skill_tempy + 36
            for (let i = 0; i < cv.userSkils.length; i++) {
                if (skill_tempy + 84 > 964) {
                    skill_tempy = 48
                    skill_page++
                }

                skiContent.push({
                    index: i,
                    posy: skill_tempy == 48 ? 48 : skill_tempy + 32,
                    page: skill_page,
                })
                skill_tempy += 84
            }
            setSkillContent(skiContent)
        }

        let lang_tempy = skill_tempy,
            lang_page = skill_page,
            langContent = [], lang_posx = 456
        if (skill_posx == 24) {
            lang_tempy = 0
        }
        else if (honor_page == 2 && honor_tempy < lang_tempy) {
            lang_posx = 24
            lang_tempy = honor_tempy
        }

        if (cv.userLanguages) {
            if (cv.userLanguages.length > 0) {
                if (lang_tempy + 92 > 964) {
                    lang_tempy = 48
                    lang_page++
                } else lang_tempy += 48
                setLangPos({
                    pos: lang_tempy,
                    page: lang_page,
                    posx: lang_posx
                })
                lang_tempy += 36
            }
            for (let i = 0; i < cv.userLanguages.length; i++) {
                if (lang_tempy + 84 > 964) {
                    lang_tempy = 48
                    lang_page++
                }
                langContent.push({
                    index: i,
                    posy: lang_tempy == 48 ? 48 : lang_tempy + 32,
                    page: lang_page,
                })
                lang_tempy += 84
            }
            setLanguageContent(langContent)
        }

        let expert_tempy = lang_tempy
        let expert_page = lang_page
        let expertContent = []

        if (cv.userExpertises) {
            if (cv.userExpertises.length > 0) {
                if (expert_tempy + 92 > 964) {
                    expert_tempy = 48
                    expert_page++
                } else expert_tempy += 48
                setExpertPos({
                    pos: expert_tempy,
                    page: expert_page,
                })
                expert_tempy += 36
            }
            for (let i = 0; i < cv.userExpertises.length; i++) {
                if (expert_tempy + 84 > 964) {
                    expert_tempy = 48
                    expert_page++
                }
                expertContent.push({
                    index: i,
                    posy: expert_tempy == 48 ? 48 : expert_tempy + 32,
                    page: expert_page,
                })
                expert_tempy += 84
            }

            setExpertiseContent(expertContent)
        }

        let cou_tempy = expert_tempy,
            cou_page = expert_page,
            couContent = []
        if (cv.userCourses) {
            if (cv.userCourses.length > 0) {
                if (cou_tempy + 92 > 964) {
                    cou_tempy = 48
                    cou_page++
                } else cou_tempy += 48
                setCouPos({
                    pos: cou_tempy,
                    page: cou_page,
                })
                cou_tempy += 36
            }
            for (let i = 0; i < cv.userCourses.length; i++) {
                if (cou_tempy + 70 > 964) {
                    cou_tempy = 48
                    cou_page++
                }
                couContent.push({
                    index: i,
                    posy: cou_tempy == 48 ? 48 : cou_tempy + 24,
                    page: cou_page,
                })
                cou_tempy += 70
            }

            setCoursesContent(couContent)
        }

        let intern_page = cou_page
        let intern_tempy = cou_tempy
        let internContent = []

        if (cv.userInterships) {
            if (cv.userInterships.length > 0) {
                if (intern_tempy + 92 > 964) {
                    intern_tempy = 48
                    intern_page++
                } else {
                    intern_tempy += 48
                }
                setInternPos({
                    pos: intern_tempy,
                    page: intern_page,
                })
                intern_tempy += 36
            }

            for (let i = 0; i < cv.userInterships.length; i++) {
                if (intern_tempy + 95 > 964) {
                    intern_tempy = 48
                    intern_page++
                }
                internContent.push({
                    index: i,
                    posy: intern_tempy == 48 ? 48 : intern_tempy + 24,
                    page: intern_page,
                })

                intern_tempy += 95
            }
            setInternShipsContent(internContent)
        }

        let refer_tempy = intern_tempy,
            refer_page = intern_page,
            referContent = []
        if (cv.userReferences) {
            if (cv.userReferences.length > 0) {
                if (refer_tempy + 92 > 964) {
                    refer_tempy = 48
                    refer_page++
                } else {
                    refer_tempy += 48
                }
                setReferPos({
                    pos: refer_tempy,
                    page: refer_page,
                })
                refer_tempy += 36
            }
            for (let i = 0; i < cv.userReferences.length; i++) {
                if (refer_tempy + 118 > 964) {
                    refer_tempy = 48
                    refer_page++
                }
                referContent.push({
                    index: i,
                    posy: refer_tempy == 48 ? 48 : refer_tempy + 24,
                    page: refer_page,
                })
                refer_tempy += 118
            }
            setReferencesContent(referContent)
        }

        setContactPos({ pos: refer_tempy + 56, page: refer_page })
        setTotalPage(refer_page > honor_page ? refer_page : honor_page)
    }

    const getMax = (a, b, c) => {
        let largest
        if (a >= b && a >= c) {
            largest = a
        } else if (b >= a && b >= c) {
            largest = b
        } else {
            largest = c
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
        var imagecanvas = document.createElement("canvas")
        var imagecontext = imagecanvas.getContext("2d")
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
                imagecontext.globalCompositeOperation = "source-in"
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)

                // avatarRef.current.src = imagecanvas.toDataURL("image/png")
                setAvatarSrc(imagecanvas.toDataURL("image/png"))
            }
        }
    }

    const getResumeContent = (page) => {
        if (page == 1) {
            let tmp
            if (typeof window !== "undefined") {
                tmp = document.createElement("DIV")
                tmp.innerHTML = cv?.description
            }

            return (
                <div className={styles.resume + " " + getStyle()} id="resume">
                    <div className={styles.part_1}>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                {cv?.givenName.toUpperCase()} {cv?.familyName.toUpperCase()}
                            </div>
                            <div className={styles.job}>{cv?.jobTitle}</div>
                        </div>
                        <div className={styles.about}>ABOUT ME</div>
                        <div className={styles.description} id="description">
                            {htmlRenderer(cv?.description)}
                        </div>
                    </div>
                    <div className={styles.part_2}>
                        {!isEmpty(avatarSrc) ? (<NextImage
                            src={avatarSrc}
                            width={288}
                            height={288}
                            alt=""
                            ref={avatarRef}
                            className={styles.avatar}
                        />) : null}
                        <div className={styles.profile}>
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
                                <div className={styles.text}>
                                    $ {cv?.minSalary} - {cv?.maxSalary} monthly
                                </div>
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
                                <NextImage src=getContactImageURL("Linkedin") width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src=getContactImageURL("Dribble") width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src=getContactImageURL("Instagram") width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src=getContactImageURL("Whatsapp") width={18} height={18} alt="" />
                            </a>
                            <a href="">
                                <NextImage src=getContactImageURL("Twitter") width={18} height={18} alt="" />
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
            )
        } else {
            return (
                <div className={styles.resume + " " + getStyle()} id="resume">
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
                    {eduPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ top: eduPos.pos, left: 24 }}
                        >
                            Education
                        </div>
                    ) : (
                        <></>
                    )}
                    {educationContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(cv.userEducations[item.index].fromDate)
                        const toDate = new Date(cv.userEducations[item.index].toDate)
                        return item.page == page ? (
                            <div
                                className={styles.eduContent}
                                style={{ top: item.posy, left: 24 }}
                            >
                                <div className={styles.title}>
                                    {cv.userEducations[item.index].institute}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.location}>
                                        {cv.userEducations[item.index].city?.title},{" "}
                                        {cv.userEducations[item.index].country?.title}
                                    </div>
                                    <div className={styles.Date}>
                                        {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                                        {month[toDate.getMonth()]} {toDate.getFullYear()}
                                    </div>
                                </div>
                                <div className={styles.role}>
                                    {cv.userEducations[item.index].major}
                                </div>
                            </div>
                        ) : (
                            <></>
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
                    {skillPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: skillPos.posx, top: skillPos.pos }}
                        >
                            Skill
                        </div>
                    ) : (
                        <></>
                    )}
                    {skillContent.map((item) => {
                        return item.page == page ? (
                            <div
                                className={styles.skillContent}
                                style={{ top: item.posy, left: skillPos.posx }}
                            >
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        {cv.userSkils[item.index].title}
                                    </div>
                                    <div className={styles.level}>
                                        {cv.userSkils[item.index].domination.title}
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.percent}>
                                        <div
                                            className={styles.value}
                                            style={{
                                                width: cv.userSkils[item.index].percentage + "%",
                                            }}
                                        ></div>
                                        <div
                                            className={styles.circle}
                                            style={{
                                                left: cv.userSkils[item.index].percentage - 5 + "%",
                                            }}
                                        ></div>
                                    </div>
                                    {/* <div className={styles.percentage}>{cv.userSkils[item.index].percentage}%</div> */}
                                </div>
                            </div>
                        ) : (
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
                    {expPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ top: expPos.pos, left: 24 }}
                        >
                            Experience
                        </div>
                    ) : (
                        <></>
                    )}
                    {experienceContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(cv.userExperiences[item.index].fromDate)
                        const toDate = new Date(cv.userExperiences[item.index].toDate)
                        return item.page == page ? (
                            <div
                                className={styles.expContent}
                                style={{ top: item.posy, left: 24 }}
                            >
                                <div className={styles.title}>
                                    {cv.userExperiences[item.index].title}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.Date}>
                                        {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                                        {month[toDate.getMonth()]} {toDate.getFullYear()}
                                    </div>
                                    <div className={styles.location}>
                                        {cv.userExperiences[item.index].city?.title},{" "}
                                        {cv.userExperiences[item.index].country?.title}
                                    </div>
                                </div>
                                <div className={styles.description}>
                                    {cv.userExperiences[item.index].description}
                                </div>
                            </div>
                        ) : (
                            <></>
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
                    {langPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: langPos.posx, top: langPos.pos }}
                        >
                            Languages
                        </div>
                    ) : (
                        <></>
                    )}
                    {languageContent.map((item) => {
                        return item.page == page ? (
                            <div
                                className={styles.languageContent}
                                style={{ top: item.posy, left: langPos.posx }}
                            >
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        {cv.userLanguages[item.index].language.title}
                                    </div>
                                    <div className={styles.level}>
                                        {cv.userLanguages[item.index].level.title}
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.percent}>
                                        <div
                                            className={styles.value}
                                            style={{
                                                width: cv.userLanguages[item.index].percentage + "%",
                                            }}
                                        ></div>
                                        <div
                                            className={styles.circle}
                                            style={{
                                                left: cv.userLanguages[item.index].percentage - 5 + "%",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
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
                    {expertPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: 456, top: expertPos.pos }}
                        >
                            Expertise
                        </div>
                    ) : (
                        <></>
                    )}
                    {expertiseContent.map((item) => {
                        return item.page == page ? (
                            <div
                                className={styles.expertiseContent}
                                style={{ top: item.posy, left: 456 }}
                            >
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        {cv.userExpertises[item.index].title}
                                    </div>
                                    <div className={styles.level}>
                                        {cv.userExpertises[item.index].domination.title}
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.percent}>
                                        <div
                                            className={styles.value}
                                            style={{
                                                width: cv.userExpertises[item.index].percentage + "%",
                                            }}
                                        ></div>
                                        <div
                                            className={styles.circle}
                                            style={{
                                                left:
                                                    cv.userExpertises[item.index].percentage - 5 + "%",
                                            }}
                                        ></div>
                                    </div>
                                    {/* <div className={styles.percentage}>{cv.userExpertises[item.index].percentage}%</div> */}
                                </div>
                            </div>
                        ) : (
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
                    {couPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: 456, top: couPos.pos }}
                        >
                            Courses
                        </div>
                    ) : (
                        <></>
                    )}
                    {coursesContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(cv.userCourses[item.index].fromDate)
                        const toDate = new Date(cv.userCourses[item.index].toDate)
                        return item.page == page ? (
                            <div
                                className={styles.coursesContent}
                                style={{ top: item.posy, left: 456 }}
                            >
                                <div className={styles.title}>
                                    {cv.userCourses[item.index].title}
                                </div>
                                <div className={styles.date}>
                                    {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                                    {month[toDate.getMonth()]} {toDate.getFullYear()}
                                </div>
                            </div>
                        ) : (
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
                    {internPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: 456, top: internPos.pos }}
                        >
                            Internships
                        </div>
                    ) : (
                        <></>
                    )}
                    {internshipsContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(cv.userInterships[item.index].fromDate)
                        const toDate = new Date(cv.userInterships[item.index].toDate)
                        return item.page == page ? (
                            <div
                                className={styles.internContent}
                                style={{ top: item.posy, left: 456 }}
                            >
                                <div className={styles.title}>
                                    {cv.userInterships[item.index].title}
                                </div>
                                <div className={styles.location}>
                                    {cv.userInterships[item.index].city?.title},{" "}
                                    {cv.userInterships[item.index].country?.title}
                                </div>
                                <div className={styles.date}>
                                    {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                                    {month[toDate.getMonth()]} {toDate.getFullYear()}
                                </div>
                            </div>
                        ) : (
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
                    {referPos.page == page ? (
                        <div
                            className={styles.componentTitle + " " + styles.componentTitle1}
                            style={{ left: 456, top: referPos.pos }}
                        >
                            References
                        </div>
                    ) : (
                        <></>
                    )}
                    {referencesContent.map((item) => {
                        return item.page == page ? (
                            <div
                                className={styles.referContent}
                                style={{ top: item.posy, left: 456 }}
                            >
                                <div className={styles.title}>
                                    {cv.userReferences[item.index].fullName}
                                </div>
                                <div className={styles.company}>
                                    Company : {cv.userReferences[item.index].fullName}
                                </div>
                                <div className={styles.email}>
                                    Email : {cv.userReferences[item.index].email}
                                </div>
                                <div className={styles.phone}>
                                    Phone : {cv.userReferences[item.index].phone}
                                </div>
                            </div>
                        ) : (
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
                    {extraPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ left: 24, top: extraPos.pos }}
                        >
                            Extra-curricular Activities
                        </div>
                    ) : (
                        <></>
                    )}
                    {extracurriContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(
                            cv.userExtraActivities[item.index].fromDate
                        )
                        const toDate = new Date(cv.userExtraActivities[item.index].toDate)
                        return item.page == page ? (
                            <div
                                className={styles.extraContent}
                                style={{ top: item.posy, left: 24 }}
                            >
                                <div className={styles.title}>
                                    {cv.userExtraActivities[item.index].title}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.location}>
                                        {cv.userExtraActivities[item.index].city?.title},{" "}
                                        {cv.userExtraActivities[item.index].country?.title}
                                    </div>
                                    <div className={styles.date}>
                                        {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                                        {month[toDate.getMonth()]} {toDate.getFullYear()}
                                    </div>
                                </div>
                                <div className={styles.description}>
                                    {cv.userExtraActivities[item.index].description}
                                </div>
                            </div>
                        ) : (
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
                    {hobbiesPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ left: 24, top: hobbiesPos.pos }}
                        >
                            Hobbies
                        </div>
                    ) : (
                        <></>
                    )}
                    {hobbiesContentPos.page == page ? (
                        <div
                            className={styles.hobbyContent}
                            style={{ left: 24, top: hobbiesContentPos.pos }}
                        >
                            {cv.hobbies}
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            )
        }
    }

    const getAdditional = (page) => {
        if (cv.additionalInfo) {
            return (
                <>
                    {addPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ left: 24, top: addPos.pos }}
                        >
                            Additional information
                        </div>
                    ) : (
                        <></>
                    )}
                    {addContentPos.page == page ? (
                        <div
                            className={styles.hobbyContent}
                            style={{ left: 24, top: addPos.pos + 53 }}
                        >
                            {cv.additionalInfo}
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            )
        }
    }

    const getAwards = (page) => {
        if (cv.userAwards && cv.userAwards.length > 0) {
            return (
                <>
                    {honorPos.page == page ? (
                        <div
                            className={styles.componentTitle}
                            style={{ left: 32, top: honorPos.pos }}
                        >
                            Honors & Awards
                        </div>
                    ) : (
                        <></>
                    )}
                    {honorsContent.map((item) => {
                        const month = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                        ]
                        const fromDate = new Date(cv.userAwards[item.index].date)

                        return item.page == page ? (
                            <div
                                className={styles.honorContent}
                                style={{ top: item.posy, left: 32 }}
                            >
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        {cv.userAwards[item.index].title}
                                    </div>
                                    <div className={styles.date}>
                                        {month[fromDate.getMonth()]} {fromDate.getFullYear()}
                                    </div>
                                </div>
                                <div className={styles.description}>
                                    {cv.userAwards[item.index].description}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    })}
                </>
            )
        }
    }

    const getContactList = (page) => {
        if (page == contctPos.page) {
            return (
                <div className={styles.contactList} style={{ left: 508, top: contctPos.pos }}>
                    <div className={styles.list}>
                        <NextImage src={getContactImageURL("Linkedin")} width={24} height={24} alt="" />
                        <NextImage src={getContactImageURL("Dribble")} width={24} height={24} alt="" />
                        <NextImage src={getContactImageURL("Instagram")} width={24} height={24} alt="" />
                    </div>
                    <div className={styles.list}>
                        <NextImage src={getContactImageURL("Whatsapp")} width={24} height={24} alt="" />
                        <NextImage src={getContactImageURL("Twitter")} width={24} height={24} alt="" />
                        <NextImage src={getContactImageURL("Facebook")} width={24} height={24} alt="" />
                    </div>
                </div>
            )
        }
    }

    const loadAvatar = (context) => {
        const avatar = new Image()
        avatar.crossOrigin = "*"
        var imagecanvas = document.createElement("canvas")
        var imagecontext = imagecanvas.getContext("2d")
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
                imagecontext.globalCompositeOperation = "source-in"
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
        context.fillStyle = "#000"
        context.textBaseline = "top"

        context.fillText(cv.givenName.toUpperCase(), 289, 82)

        context.font = "400 20px Amaranth"
        context.fillText(cv.jobTitle, 289, 147)

        const linkedImg = new Image()
        const dribbleImg = new Image()
        const instagramImg = new Image()
        const whatsappImg = new Image()
        const twitterImg = new Image()
        // let dribbleCnt = 0, instagramCnt = 0, whatsappCnt = 0, twitterCnt = 0

        linkedImg.src = getContactImageURL("Linkedin")
        linkedImg.onload = () => {
            context.drawImage(linkedImg, 294, 188)
        }

        dribbleImg.src = getContactImageURL("Dribble")
        dribbleImg.onload = () => {
            context.drawImage(dribbleImg, 324, 188)
        }

        instagramImg.src = getContactImageURL("Instagram")
        instagramImg.onload = () => {
            context.drawImage(instagramImg, 354, 188)
        }

        whatsappImg.src = getContactImageURL("Whatsapp")
        whatsappImg.onload = () => {
            context.drawImage(whatsappImg, 384, 188)
        }

        twitterImg.src = getContactImageURL("Twitter")
        twitterImg.onload = () => {
            context.drawImage(twitterImg, 414, 188)
        }
    }

    const loadContact = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = "#6B7598"
        context.fillText("Email:", 289, 219)
        context.fillText("Phone number:", 325, 220)
        context.font = "700 24px Amaranth"
        context.fillStyle = "#242435"
        if (cv.email.length > 30) {
            context.fillText(cv.email.split("@")[0], 289, 235)
            context.fillText("@" + cv.email.split("@")[1], 289, 255)
        } else context.fillText(cv.email, 289, 235)
        context.fillText(cv.phone, 325, 236)
    }

    const loadDescription = (context) => {
        context.font = "400 24px Amaranth"
        context.fillText(cv.description, 32, 351)
    }

    const loadInformation = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = "#6B7598"
        context.fillText("Academic Level :", 32, 483)
        context.fillText("Website :", 288, 483)
        context.fillText("Gender : ", 526, 483)
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
        context.fillText(
            "$" + cv.minSalary + "-" + cv.maxSalary + " monthly",
            288,
            543
        )
        context.fillText(cv.industry.title, 526, 543)
        context.fillText(cv.streetAddress, 32, 587)
        context.fillText(cv.nationality.title, 288, 587)
        context.fillText(cv.dateOfBirth, 526, 587)
    }

    return (
        <>
            <div className={styles.resumeContent + " " + styles.osolo + " " + getStyle()}>
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
