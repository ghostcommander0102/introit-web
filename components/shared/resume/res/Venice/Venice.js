import NextImage from 'next/image'
import styles from '/styles/scss/dashboard/Venice.module.scss'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf';
import Expdot from "../../Expdot";
import Script from 'next/script'
import htmlRenderer from "utils/htmlRenderer"
import { isEmpty } from "lodash";
import { Button, Spin } from "antd";

import tempcv from 'utils/data';

export default function Venice({
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
    const [eduPos, setEduPos] = useState({})
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
            maskImg.src = "/images/Venicemask.png"
            maskImg.crossOrigin = "*"
            maskImg.onload = () => {
                imagecanvas.width = maskImg.width
                imagecanvas.height = maskImg.height
                imagecontext.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height)
                imagecontext.globalCompositeOperation = 'source-in'
                imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height)
                setAvatarSrc(imagecanvas.toDataURL("image/png"))
                // showCanvas(1)
            }
        }
    }, [cv?.avatar]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         axios.get('https://api.introit.io/profile/resume/view/cv2/3').then(response => {
    //             setCV(response.data.cv)
    //         });
    //     }, 500);
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
            checkSize();
        }
    }, [avatarSrc])

    useEffect(() => {
        // const timeOut = setTimeout(() => {
        // showCanvas(currentPage);
        if (initDraw)
            checkSize()
        // }, 1000);
        // return () => clearTimeout(timeOut);
    }, [cv, type]);

    const showCanvas = (page) => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(async () => {
            html2canvas(document.querySelector("#resume"), {
                useCORS: true,
            }).then(async canvas1 => {
                const backgroundImg = await loadImage(canvas1.toDataURL('image/png'))
                context.drawImage(backgroundImg, 0, 0, 720 * deviceRatio, 1019 * deviceRatio)
                if (page == 1) {
                    const avatarImg = await loadImage(avatarSrc)
                    context.drawImage(avatarImg, 81 * deviceRatio, 85 * deviceRatio, 171 * deviceRatio, 171 * deviceRatio)
                    const linkedImg = await loadImage(getContactImageURL("Linkedin"));
                    const dribbleImg = await loadImage(getContactImageURL("Dribble"));
                    const instagramImg = await loadImage(getContactImageURL("Instagram"));
                    const whatsappImg = await loadImage(getContactImageURL("Whatsapp"));
                    const twitterImg = await loadImage(getContactImageURL("Twitter"));
                    // let dribbleCnt = 0, instagramCnt = 0, whatsappCnt = 0, twitterCnt = 0;
                    let socialtop = 188;
                    socialtop += (Math.ceil((cv.jobTitle ? cv.jobTitle.length : 38) / 38) - 1) * 24;
                    context.drawImage(linkedImg, 294 * deviceRatio, socialtop * deviceRatio, 14 * deviceRatio, 14 * deviceRatio);
                    context.drawImage(dribbleImg, 324 * deviceRatio, socialtop * deviceRatio, 14 * deviceRatio, 14 * deviceRatio);
                    context.drawImage(instagramImg, 354 * deviceRatio, socialtop * deviceRatio, 14 * deviceRatio, 14 * deviceRatio);
                    context.drawImage(whatsappImg, 384 * deviceRatio, socialtop * deviceRatio, 14 * deviceRatio, 14 * deviceRatio);
                    context.drawImage(twitterImg, 414 * deviceRatio, socialtop * deviceRatio, 14 * deviceRatio, 14 * deviceRatio);
                }


                skillContent.forEach(async element => {
                    if (element.page == page) {
                        const skiItem = cv.userSkils[element.index]
                        for (let i = 0; i < 5; i++) {
                            let tempy = 0;
                            tempy += (Math.ceil(cv.userSkils[element.index].title.length / 17) - 1) * 19;
                            if (skiItem.percentage >= (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("full"))
                                context.drawImage(img, (524 + i * 33.5) * deviceRatio, (element.posy + tempy + 27) * deviceRatio, 12, 12)
                            } else if (skiItem.percentage > i * 20 && skiItem.percentage < (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("half"))
                                context.drawImage(img, (524 + i * 33.5) * deviceRatio, (element.posy + tempy + 27) * deviceRatio, 12, 12)
                            } else {
                                const img = await loadImage(getPercentageImageURL("half"))
                                context.drawImage(img, (524 + i * 33.5) * deviceRatio, (element.posy + tempy + 27) * deviceRatio, 12, 12)
                            }
                        }
                    }
                })

                languageContent.forEach(async element => {
                    if (element.page == page) {
                        const langItem = cv.userLanguages[element.index]
                        for (let i = 0; i < 5; i++) {
                            if (langItem.percentage >= (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("full"))
                                context.drawImage(img, (element.posx + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            } else if (langItem.percentage > i * 20 && langItem.percentage < (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("half"))
                                context.drawImage(img, (element.posx + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            } else {
                                const img = await loadImage(getPercentageImageURL("blank"))
                                context.drawImage(img, (element.posx + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            }
                        }
                    }
                })

                expertiseContent.forEach(async element => {
                    if (element.page == page) {
                        const expertiseItem = cv.userExpertises[element.index]

                        for (let i = 0; i < 5; i++) {
                            if (expertiseItem.percentage >= (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("full"))
                                context.drawImage(img, (298.5 + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            } else if (expertiseItem.percentage > i * 20 && expertiseItem.percentage < (i + 1) * 20) {
                                const img = await loadImage(getPercentageImageURL("half"))
                                context.drawImage(img, (298.5 + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            } else {
                                const img = await loadImage(getPercentageImageURL("blank"))
                                context.drawImage(img, (298.5 + i * 33.5) * deviceRatio, (element.posy + 27) * deviceRatio, 12, 12)
                            }
                        }
                    }
                })
                setInitDraw(true);
            });

        }, 500)
    }

    const getBackgroundURL = () => {
        return (type == "light" ? "/images/background/backgroundWhite.png" : (type == "gradient" ? "/images/background/background.png" : "/images/background/backgroundDark.png"))
    }

    const getStyle = () => {
        return (type == "light" ? styles.light : (type == "gradient" ? styles.gradient : styles.dark))
    }

    const getContactImageURL = (contact) => {
        return (type == "dark" ? "/images/contact/" + contact + "White.png" : "/images/contact/" + contact + ".png")
    }

    const getTextColor = () => {
        return (type == "dark" ? "#FFFFFF" : (type == "light" ? "#1C1420" : "#242435"))
    }

    const getTextColor1 = () => {
        return (type == "dark" ? "#9E9E9E" : (type == "light" ? "#4D776F" : "#6B7598"))
    }

    const getPercentageImageURL = (url) => {
        return (type == "dark" ? "/images/" + url + "Dark.png" : "/images/" + url + ".png")
    }

    const getBorderColor = () => {
        return (type == "dark" ? "#FFFFFF" : (type == "light" ? "#1C1420" : "#242435"))
    }


    const generatePDF = async () => {
        setLoader(true);
        setLoading(true);
        const report = new JsPDF('portrait', 'px', 'A4');
        var width = report.internal.pageSize.getWidth();
        var height = report.internal.pageSize.getHeight();
        console.log(width + ":" + height);
        report.addFont("/fonts/Amaranth-Regular.ttf", "Amaranth", "normal")
        report.setFont("Amaranth")
        report.setTextColor(getTextColor())
        // report.setFontType("normal")
        const backgroundImg = await loadImage(getBackgroundURL())
        report.setDrawColor(getBorderColor())
        report.addImage(backgroundImg, 'png', 0, 0, 720 * ratio, 1019 * ratio)
        report.rect(18 * ratio, 18 * ratio, 684 * ratio, 981 * ratio)
        await generateProfile(report)
        for (let i = 1; i <= totalPage; i++) {
            if (i != 1) {
                report.addPage()

                report.addImage(backgroundImg, 'png', 0, 0, 720 * ratio, 1019 * ratio)
                report.rect(18 * ratio, 18 * ratio, 684 * ratio, 981 * ratio)
            }
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
        }

        report.save('report.pdf');
        setLoader(false);
        setLoading(false);
    }

    const generateProfile = async (report) => {
        const avatarImg = await loadImage(avatarSrc)
        report.addImage(avatarImg, 'png', 81 * ratio, 85 * ratio, 171 * ratio, 171 * ratio)

        report.setFontSize(40 * ratio)
        // cv.givenName = cv.givenName.toUpperCase()
        report.text(cv.givenName.toUpperCase(), 289 * ratio, 106 * ratio)

        report.setFontSize(20 * ratio)
        report.text(cv.jobTitle ? cv.jobTitle : "", 289 * ratio, (147 + report.getTextDimensions(cv.jobTitle ? cv.jobTitle : "").h) * ratio)

        const linkedinImg = await loadImage(getContactImageURL("Linkedin"))
        const dribbleImg = await loadImage(getContactImageURL("Dribble"))
        const instagramImg = await loadImage(getContactImageURL("Instagram"))
        const whatsappImg = await loadImage(getContactImageURL("Whatsapp"))
        const twitterImg = await loadImage(getContactImageURL("Twitter"))
        report.addImage(linkedinImg, 294 * ratio, 188 * ratio, 14 * ratio, 14 * ratio)
        report.addImage(dribbleImg, 324 * ratio, 188 * ratio, 14 * ratio, 14 * ratio)
        report.addImage(instagramImg, 354 * ratio, 188 * ratio, 14 * ratio, 14 * ratio)
        report.addImage(whatsappImg, 384 * ratio, 188 * ratio, 14 * ratio, 14 * ratio)
        report.addImage(twitterImg, 414 * ratio, 188 * ratio, 14 * ratio, 14 * ratio)

        report.setTextColor(getTextColor1())
        report.setFontSize(12 * ratio)
        report.text("Email :", 289 * ratio, (220 + report.getTextDimensions("Email :").h) * ratio)
        report.text("Phone number :", 505 * ratio, (220 + report.getTextDimensions("Phone number :").h) * ratio)

        report.setTextColor(getTextColor())
        report.setFontSize(16 * ratio)
        var splitEmail = report.splitTextToSize(cv.email, 184 * ratio)
        report.text(splitEmail, 289 * ratio, (235 + report.getTextDimensions(cv.email).h) * ratio)

        report.text(cv.phone ? cv.phone : "", 505 * ratio, (236 + report.getTextDimensions(cv.phone ? cv.phone : "").h) * ratio)

        report.line(18 * ratio, 319 * ratio, 702 * ratio, 319 * ratio)
        let tmp
        if (typeof window !== "undefined") {
            tmp = document.createElement("DIV")
            tmp.innerHTML = cv?.description
        }

        var splitDescription = report.splitTextToSize(
            tmp?.textContent || tmp?.innerText || "",
            620 * ratio
        )
        report.text(splitDescription, 50 * ratio, (351 + report.getTextDimensions(cv.description).h) * ratio)

        report.line(18 * ratio, 449 * ratio, 702 * ratio, 449 * ratio)

        report.setTextColor(getTextColor1())
        report.setFontSize(12 * ratio)
        report.text("Academic Level :", 50 * ratio, (483 + report.getTextDimensions("Academic Level :").h) * ratio)
        report.text("Website :", 288 * ratio, (483 + report.getTextDimensions("Website :").h) * ratio)
        report.text("Gender : ", 526 * ratio, (483 + report.getTextDimensions("Gender : ").h) * ratio)
        report.text("Driving License :", 50 * ratio, (527 + report.getTextDimensions("Driving License :").h) * ratio)
        report.text("Salary range :", 288 * ratio, (525 + report.getTextDimensions("Salary range :").h) * ratio)
        report.text("Industry :", 526 * ratio, (527 + report.getTextDimensions("Industry :").h) * ratio)
        report.text("Address :", 50 * ratio, (571 + report.getTextDimensions("Address :").h) * ratio)
        report.text("Nationality :", 288 * ratio, (571 + report.getTextDimensions("Nationality :").h) * ratio)
        report.text("Date Of Birth :", 526 * ratio, (571 + report.getTextDimensions("Date Of Birth :").h) * ratio)

        report.setTextColor(getTextColor())
        report.text("Bachelor degree", 50 * ratio, (499 + report.getTextDimensions("Bachelor degree").h) * ratio)
        report.text(cv.website ? cv.website : "", 288 * ratio, (499 + report.getTextDimensions(cv.website ? cv.website : "").h) * ratio)
        report.text(cv.gender ? cv.gender.title : "", 526 * ratio, (499 + report.getTextDimensions(cv.gender ? cv.gender.title : "").h) * ratio)
        report.text(cv.drivingLicense ? cv.drivingLicense.title : "", 50 * ratio, (543 + report.getTextDimensions(cv.drivingLicense ? cv.drivingLicense.title : "").h) * ratio)
        report.text("$ " + cv.minSalary + " - " + cv.maxSalary + " monthly", 288 * ratio, (543 + report.getTextDimensions("$ " + cv.minSalary + " - " + cv.maxSalary + " monthly").h) * ratio)
        report.text(cv.industry ? cv.industry.title : "", 526 * ratio, (543 + report.getTextDimensions(cv.industry ? cv.industry.title : "").h) * ratio)
        report.text(cv.streetAddress ? cv.streetAddress : "", 50 * ratio, (587 + report.getTextDimensions(cv.streetAddress ? cv.streetAddress : "").h) * ratio)
        report.text(cv.nationality ? cv.nationality.title : "", 288 * ratio, (587 + report.getTextDimensions(cv.nationality ? cv.nationality.title : "").h) * ratio)
        report.text(cv.dateOfBirth ? cv.dateOfBirth : "", 526 * ratio, (587 + report.getTextDimensions(cv.dateOfBirth ? cv.dateOfBirth : "").h) * ratio)
    }

    const generateEducation = async (report, page) => {
        if (eduPos.page == page) {
            report.line(18 * ratio, (eduPos.pos - 34) * ratio, 702 * ratio, (eduPos.pos - 34) * ratio)
            report.setFontSize(24 * ratio)
            report.text("EDUCATION", 50 * ratio, (eduPos.pos + report.getTextDimensions("EDUCATION").h) * ratio)
        }
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        educationContent.forEach(element => {
            if (element.page == page) {
                const eduItem = cv.userEducations[element.index]
                const fromDate = new Date(eduItem.fromDate)
                const toDate = new Date(eduItem.toDate)
                report.setFontSize(14 * ratio)
                report.text(eduItem.institute, 50 * ratio, (element.posy + report.getTextDimensions(eduItem.institute).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = eduItem.city?.title + ", " + eduItem.country?.title
                report.text(location, 50 * ratio, (element.posy + 24 + report.getTextDimensions(location).h) * ratio)

                const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear()
                report.text(duration, 455 * ratio, (element.posy + 24 + report.getTextDimensions(duration).h) * ratio, { align: 'right' })

                report.setFontSize(14)
                report.text(eduItem.major, 50 * ratio, (element.posy + 24 + 19 + report.getTextDimensions(eduItem.major).h) * ratio)
            }
        });
    }

    const generateSkills = async (report, page) => {
        if (skillPos.page == page) {
            report.setFontSize(24 * ratio)
            report.text("SKILLS", 524 * ratio, (skillPos.pos + report.getTextDimensions("SKILLS").h) * ratio)
        }
        const fullImg = await loadImage(getPercentageImageURL("full"))
        const halfImg = await loadImage(getPercentageImageURL("half"))
        const blankImg = await loadImage(getPercentageImageURL("blank"))

        skillContent.forEach(element => {
            if (element.page == page) {
                const skiItem = cv.userSkils[element.index]
                report.setFontSize(14 * ratio)
                report.text(skiItem.title, 524 * ratio, (element.posy + report.getTextDimensions(skiItem.title).h) * ratio)

                for (let i = 0; i < 5; i++) {
                    if (skiItem.percentage >= (i + 1) * 20) {
                        report.addImage(fullImg, (524 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    } else if (skiItem.percentage > i * 20 && skiItem.percentage < (i + 1) * 20) {
                        report.addImage(halfImg, (524 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    } else {
                        report.addImage(blankImg, (524 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    }
                }

                report.setFontSize(12 * ratio)
                report.text(skiItem.domination.title, 524 * ratio, (element.posy + 27 + 28 + report.getTextDimensions(skiItem.domination.title).h) * ratio)
                report.text(skiItem.percentage + "%", 670 * ratio, (element.posy + 27 + 28 + report.getTextDimensions(skiItem.percentage).h) * ratio, { align: 'right' })
            }
        })
    }

    const generateExperience = async (report, page) => {
        if (expPos.page == page) {
            report.line(18 * ratio, (expPos.pos - 34) * ratio, 702 * ratio, (expPos.pos - 34) * ratio)
            report.setFontSize(24 * ratio)
            report.text("EXPERIENCE", 50 * ratio, (expPos.pos + report.getTextDimensions("EXPERIENCE").h) * ratio)
        }
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        experienceContent.forEach(element => {
            if (element.page == page) {
                const expItem = cv.userExperiences[element.index]
                const fromDate = new Date(expItem.fromDate)
                const toDate = new Date(expItem.toDate)

                report.setFontSize(16 * ratio)
                report.text(expItem.title, 50 * ratio, (element.posy + report.getTextDimensions(expItem.title).h) * ratio)

                report.setFontSize(12 * ratio)
                const location = expItem.city?.title + ", " + expItem.country?.title
                report.text(location, 50 * ratio, (element.posy + 28 + report.getTextDimensions(location).h) * ratio)
                const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear()
                report.text(duration, 670 * ratio, (element.posy + 28 + report.getTextDimensions(duration).h) * ratio, { align: 'right' })

                report.setFontSize(14 * ratio)
                var splitDescription = report.splitTextToSize(expItem.description, 620 * ratio)
                report.text(splitDescription, 50 * ratio, (element.posy + 28 + 23 + report.getTextDimensions(expItem.description ? expItem.description : "").h) * ratio)
            }
        })
    }

    const generateLanguages = async (report, page) => {
        if (langPos.page == page) {
            report.line(18 * ratio, (langPos.pos - 34) * ratio, 702 * ratio, (langPos.pos - 34) * ratio)
            report.setFontSize(24 * ratio)
            report.text("LANGUAGES", 50 * ratio, (langPos.pos + report.getTextDimensions("LANGUAGES").h) * ratio)
        }
        const fullImg = await loadImage(getPercentageImageURL("full"))
        const halfImg = await loadImage(getPercentageImageURL("half"))
        const blankImg = await loadImage(getPercentageImageURL("blank"))

        languageContent.forEach(element => {
            if (element.page == page) {
                const langItem = cv.userLanguages[element.index]

                report.setFontSize(16 * ratio)
                report.text(langItem.language.title, element.posx * ratio, (element.posy + report.getTextDimensions(langItem.language.title).h) * ratio)

                for (let i = 0; i < 5; i++) {
                    if (langItem.percentage >= (i + 1) * 20) {
                        report.addImage(fullImg, (element.posx + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    } else if (langItem.percentage > i * 20 && langItem.percentage < (i + 1) * 20) {
                        report.addImage(halfImg, (element.posx + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    } else {
                        report.addImage(blankImg, (element.posx + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                    }
                }

                report.setFontSize(12 * ratio)
                report.text(langItem.level.title, element.posx * ratio, (element.posy + 27 + 20 + report.getTextDimensions(langItem.level.title).h) * ratio)
                report.text(langItem.percentage + "%", (element.posx + 146) * ratio, (element.posy + 27 + 20 + report.getTextDimensions(langItem.percentage).h) * ratio, { align: 'right' })
            }
        })
    }

    const generateExpertise = async (report, page) => {
        if (cv.userExpertises && cv.userExpertises.length > 0) {
            if (expertPos.page == page) {
                report.setFontSize(24 * ratio)
                report.text("EXPERTISE", 298.5 * ratio, (expertPos.pos + report.getTextDimensions("EXPERTISE").h) * ratio)
            }
            const fullImg = await loadImage(getPercentageImageURL("full"))
            const halfImg = await loadImage(getPercentageImageURL("half"))
            const blankImg = await loadImage(getPercentageImageURL("blank"))

            expertiseContent.forEach(element => {
                if (element.page == page) {
                    const expertiseItem = cv.userExpertises[element.index]

                    report.setFontSize(16 * ratio)
                    report.text(expertiseItem.title, 298.5 * ratio, (element.posy + report.getTextDimensions(expertiseItem.title).h) * ratio)

                    for (let i = 0; i < 5; i++) {
                        if (expertiseItem.percentage >= (i + 1) * 20) {
                            report.addImage(fullImg, (298.5 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                        } else if (expertiseItem.percentage > i * 20 && expertiseItem.percentage < (i + 1) * 20) {
                            report.addImage(halfImg, (298.5 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                        } else {
                            report.addImage(blankImg, (298.5 + i * 33.5) * ratio, (element.posy + 27) * ratio, 12 * ratio, 12 * ratio)
                        }
                    }

                    report.setFontSize(12 * ratio)
                    report.text(expertiseItem.domination.title, 298.5 * ratio, (element.posy + 27 + 20 + report.getTextDimensions(expertiseItem.domination.title).h) * ratio)
                    report.text(expertiseItem.percentage + "%", 444.5 * ratio, (element.posy + 27 + 20 + report.getTextDimensions(expertiseItem.percentage).h) * ratio, { align: 'right' })
                }
            })
        }
    }

    const generateCourses = async (report, page) => {
        if (cv.userCourses && cv.userCourses.length > 0) {
            if (couPos.page == page) {
                report.setFontSize(24 * ratio)
                report.text("COURSES", 545 * ratio, (couPos.pos + report.getTextDimensions("COURSES").h) * ratio)
            }
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            coursesContent.forEach(element => {
                if (element.page == page) {
                    const couItem = cv.userCourses[element.index]
                    const fromDate = new Date(couItem.fromDate)
                    const toDate = new Date(couItem.toDate)

                    report.setFontSize(16 * ratio)
                    report.text(couItem.title, 545 * ratio, (element.posy + report.getTextDimensions(couItem.title).h) * ratio)

                    report.setFontSize(12 * ratio)
                    const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear();
                    var splitDuration = report.splitTextToSize(duration, 125 * ratio)
                    report.text(splitDuration, 545 * ratio, (element.posy + 23 + report.getTextDimensions(duration).h) * ratio)
                }
            })
        }
    }

    const generateInternships = async (report, page) => {
        if (cv.userInterships && cv.userInterships.length > 0) {
            if (internPos.page == page) {
                report.setFontSize(24 * ratio)
                report.text("INTERNSHIPS", 50 * ratio, (internPos.pos + report.getTextDimensions("INTERNSHIPS").h) * ratio)
            }
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            internshipsContent.forEach(element => {
                if (element.page == page) {
                    const internItem = cv.userInterships[element.index]
                    const fromDate = new Date(internItem.fromDate)
                    const toDate = new Date(internItem.toDate)

                    report.setFontSize(16 * ratio)
                    report.text(internItem.title, (element.index % 2 == 0 ? 50 : 214) * ratio, (element.posy + report.getTextDimensions(internItem.title).h) * ratio)

                    report.setFontSize(12)
                    const location = internItem.city.title + ", " + internItem.country.title
                    report.text(location, (element.index % 2 == 0 ? 50 : 214) * ratio, (element.posy + 24 + report.getTextDimensions(location).h) * ratio)

                    const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear()
                    const splitDuration = report.splitTextToSize(duration, 125 * ratio)
                    report.text(splitDuration, (element.index % 2 == 0 ? 50 : 214) * ratio, (element.posy + 24 + 19 + report.getTextDimensions(duration).h) * ratio)
                }
            })
        }
    }

    const generateReference = async (report, page) => {
        if (cv.userReferences && cv.userReferences.length > 0) {
            if (referPos.page == page) {
                report.setFontSize(24 * ratio)
                report.text("REFERENCES", 363 * ratio, (referPos.pos + report.getTextDimensions("REFERENCES").h) * ratio)
            }
            referencesContent.forEach(element => {
                if (element.page == page) {
                    const referItem = cv.userReferences[element.index]

                    report.setFontSize(16 * ratio)
                    const splitName = report.splitTextToSize(referItem.fullName, 125 * ratio)
                    report.text(splitName, (element.index % 2 == 0 ? 363 : 527) * ratio, (element.posy + report.getTextDimensions(referItem.fullName).h) * ratio)

                    report.setFontSize(12 * ratio)
                    const splitEmail = report.splitTextToSize("Email : " + referItem.email, 125 * ratio)
                    report.text(splitEmail, (element.index % 2 == 0 ? 363 : 527) * ratio, (element.posy + report.getTextDimensions(splitName).h + 10 + report.getTextDimensions(referItem.email).h) * ratio)
                    console.log(":", report.getTextDimensions(splitEmail).h)
                    report.text("Phone :" + referItem.phone, (element.index % 2 == 0 ? 363 : 527) * ratio, (element.posy + report.getTextDimensions(splitName).h + 10 + report.getTextDimensions(splitEmail).h + 10 + report.getTextDimensions(referItem.phone).h) * ratio)
                }
            })
        }
    }

    const generateExtra = async (report, page) => {
        if (cv.userExtraActivities && cv.userExtraActivities.length > 0) {
            if (extraPos.page == page) {
                report.line(18 * ratio, (extraPos.pos - 34) * ratio, 702 * ratio, (extraPos.pos - 34) * ratio)
                report.setFontSize(24 * ratio)
                report.text("EXTRA-CURRICULAR ACTIVITIES", 50 * ratio, (extraPos.pos + report.getTextDimensions("E").h) * ratio)
            }
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            extracurriContent.forEach(element => {
                if (element.page == page) {
                    const extraItem = cv.userExtraActivities[element.index]
                    const fromDate = new Date(extraItem.fromDate)
                    const toDate = new Date(extraItem.toDate)

                    report.setFontSize(16 * ratio)
                    report.text(extraItem.title, 50 * ratio, (element.posy + report.getTextDimensions(extraItem.title).h) * ratio)

                    report.setFontSize(12 * ratio)
                    const location = extraItem.city.title + ", " + extraItem.country.title
                    report.text(location, 50 * ratio, element.posy + 28 + report.getTextDimensions(location).h * ratio)
                    const duration = month[fromDate.getMonth()] + " " + fromDate.getFullYear() + " - " + month[toDate.getMonth()] + " " + toDate.getFullYear()
                    report.text(duration, 670, element.posy + 28 + report.getTextDimensions(location).h * ratio, { align: 'right' })
                    report.setFontSize(14 * ratio)
                    const splitDescription = report.splitTextToSize(extraItem.description, 620 * ratio)
                    report.text(splitDescription, 50 * ratio, (element.posy + 28 + 20 + report.getTextDimensions(extraItem.description).h) * ratio)
                }
            })
        }
    }

    const generatehobbies = async (report, page) => {
        if (hobbiesPos.page == page) {
            report.line(18 * ratio, (hobbiesPos.pos - 34) * ratio, 702 * ratio, (hobbiesPos.pos - 34) * ratio)
            report.setFontSize(24 * ratio)
            report.text("HOBBIES", 50 * ratio, (hobbiesPos.pos + report.getTextDimensions("H").h) * ratio)
        }
        if (hobbiesContentPos.page == page) {
            report.setFontSize(14 * ratio)
            const splitHobbies = report.splitTextToSize(cv.hobbies, 620 * ratio)
            report.text(splitHobbies, 50 * ratio, (hobbiesContentPos.pos + report.getTextDimensions(cv.hobbies).h) * ratio)
        }
    }

    const generateAdditional = async (report, page) => {
        if (addPos.page == page) {
            report.line(18 * ratio, (addPos.pos - 34) * ratio, 702 * ratio, (addPos.pos - 34) * ratio)
            report.setFontSize(24 * ratio)
            report.text("ADDITIONAL INFORMATION", 50 * ratio, (addPos.pos + report.getTextDimensions("A").h) * ratio)
        }
        if (addContentPos.page == page) {
            report.setFontSize(16 * ratio)
            const splitAdd = report.splitTextToSize(cv.additionalInfo, 620 * ratio)
            report.text(splitAdd, 50 * ratio, (addContentPos.pos + report.getTextDimensions(cv.additionalInfo).h) * ratio)
        }
    }

    const generateHonors = async (report, page) => {
        if (cv.userAwards && cv.userExpertises.length > 0) {
            if (honorPos.page == page) {
                report.line(18 * ratio, (honorPos.pos - 34) * ratio, 702 * ratio, (honorPos.pos - 34) * ratio)
                report.setFontSize(24 * ratio)
                report.text("HONORS & AWARDS", 50 * ratio, (honorPos.pos + report.getTextDimensions("H").h) * ratio)
            }
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            honorsContent.forEach(element => {
                if (element.page == page) {
                    const honorItem = cv.userAwards[element.index]
                    const date = new Date(honorItem.date)

                    report.setFontSize(16 * ratio)
                    report.text(honorItem.title, 50 * ratio, (element.posy + report.getTextDimensions(honorItem.title).h) * ratio)

                    report.setFontSize(12 * ratio)
                    const duration = month[date.getMonth()] + " " + date.getFullYear()
                    report.text(duration, 670 * ratio, (element.posy + report.getTextDimensions(duration).h) * ratio, { align: 'right' })

                    report.setFontSize(14 * ratio)
                    const splitDescription = report.splitTextToSize(honorItem.description, 620 * ratio)
                    report.text(splitDescription, 50 * ratio, (element.posy + 27 + report.getTextDimensions(honorItem.description).h) * ratio)
                }
            })
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

    const getDescriptionHeight = () => {
        let height = 0;
        var strippedHtml = cv.description.replace(/<[^>]+>/g, "").split("\n");
        for (let i = 0; i < strippedHtml.length; i++) {
            height += Math.ceil(strippedHtml[i].length / 86) * 22;
        }
        return height;
    }

    const filterContents = () => {
        let eduContent = [];
        let edu_page = 1
        let edu_tempy = 617
        let skill_page = 1
        let skill_tempy = 633
        let descriptionHeight = getDescriptionHeight();
        edu_tempy += descriptionHeight
        skill_tempy = edu_tempy;
        setSkillPos({ pos: skill_tempy, page: 1 })
        setEduPos({ pos: edu_tempy, page: 1 })
        if (cv.userEducations) {
            if (cv.userEducations.length > 0) edu_tempy += 29
            for (let i = 0; i < cv.userEducations.length; i++) {
                if (edu_tempy + 87 > 919) {
                    edu_tempy = 50;
                    edu_page++;
                }
                eduContent.push({
                    index: i,
                    posx: 50,
                    posy: edu_tempy == 50 ? 50 : edu_tempy + 24,
                    page: edu_page
                })
                if (edu_tempy == 50) {
                    edu_tempy += 63
                } else {
                    edu_tempy += 87
                }

            }
            setEducationContent(eduContent);
        }

        let skiContent = []

        if (cv.userSkils) {
            if (cv.userSkils.length > 0) skill_tempy += 29
            for (let i = 0; i < cv.userSkils.length; i++) {
                if (skill_tempy + 75 > 919) {
                    skill_tempy = 50;
                    skill_page++;
                }
                skiContent.push({
                    index: i,
                    posx: 524,
                    posy: skill_tempy == 50 ? 50 : skill_tempy + 16,
                    page: skill_page
                })
                skill_tempy += 75
            }
            console.log(skiContent)
            setSkillContent(skiContent)
        }

        let exp_page = 1
        let exp_tempy = edu_tempy
        let expContent = []
        if (edu_page > skill_page) {
            exp_page = edu_page
            exp_tempy = edu_tempy + 66
        } else if (edu_page == skill_page) {
            exp_page = edu_page
            if (edu_tempy > skill_tempy) {
                exp_tempy = edu_tempy
            } else {
                exp_tempy = skill_tempy
            }
        } else {
            exp_page = skill_page
            exp_tempy = skill_tempy
        }

        if (exp_tempy + 90 > 919) {
            exp_tempy = 50
            exp_page++
        } else {
            exp_tempy += 66
        }
        setExpPos({
            page: exp_page,
            pos: exp_tempy
        })

        if (cv.userExperiences) {
            if (cv.userExperiences.length > 0) {
                exp_tempy += 24
            }
            for (let i = 0; i < cv.userExperiences.length; i++) {
                if (exp_tempy + 74 + Math.ceil((cv.userExperiences[i].description ? cv.userExperiences[i].description.length : 0) / 80) * 17 > 919) {
                    exp_page++
                    exp_tempy = 50
                }
                expContent.push({
                    index: i,
                    posx: 50,
                    posy: exp_tempy + 24,
                    page: exp_page
                })
                exp_tempy += 74 + Math.ceil((cv.userExperiences[i].description ? cv.userExperiences[i].description.length : 0) / 80) * 17
            }
            setExperienceContent(expContent)
            console.log(expContent)
        }

        let lang_tempy = exp_tempy, expert_tempy = exp_tempy, cou_tempy = exp_tempy
        let lang_page = exp_page, expert_page = exp_page, cou_page = exp_page
        let langContent = [], expertContent = [], couContent = []
        let lang_type = 0
        if ((!cv.userExpertises || (cv.userExpertises && cv.userExpertises.length == 0)) && (!cv.userCourses || (cv.userCourses && cv.userCourses.length == 0))) {
            lang_type = 1
        }
        // if (lang_tempy + 90> 919) {
        // 	lang_tempy = exp_tempy = expert_tempy = cou_tempy = 50
        // 	lang_page++
        // 	expert_page++
        // 	cou_page++
        // }
        setExpertPos({
            pos: expert_tempy,
            page: expert_page
        })
        setCouPos({
            pos: cou_tempy,
            page: cou_page
        })

        if (cv.userLanguages) {
            if (cv.userLanguages.length > 0) {
                if (lang_tempy + 90 > 919) {
                    lang_tempy = 50
                    lang_page++
                } else {
                    lang_tempy += 66
                }
                setLangPos({
                    pos: lang_tempy,
                    page: lang_page
                })
                lang_tempy += 24
            }
            for (let i = 0; i < cv.userLanguages.length; i++) {
                if (lang_tempy + 75 > 919) {
                    lang_tempy = 50
                    lang_page++
                }
                langContent.push({
                    index: i,
                    posy: lang_tempy + 16,
                    page: lang_page,
                    posx: lang_type == 0 ? 50 : 50 + (i % 3) * 237
                })
                if (lang_type == 0 || lang_type == 1 && i % 3 == 2) {
                    lang_tempy += 75
                }
            }
            setLanguageContent(langContent)
        }

        if (cv.userExpertises) {
            if (cv.userExpertises.length > 0) {
                if (expert_tempy + 90 > 919) {
                    expert_tempy = 50
                    expert_page++
                } else
                    expert_tempy += 66
                setExpertPos({
                    pos: expert_tempy,
                    page: expert_page
                })
                expert_tempy += 24
            }
            for (let i = 0; i < cv.userExpertises.length; i++) {
                if (expert_tempy + 75 > 919) {
                    expert_tempy = 50
                    expert_page++
                }
                expertContent.push({
                    index: i,
                    posy: expert_tempy + 16,
                    page: expert_page
                })
                expert_tempy += 75
            }
            setExpertiseContent(expertContent)
        }

        if (cv.userCourses) {
            if (cv.userCourses.length > 0) {
                if (cou_tempy + 90 > 919) {
                    cou_tempy = 50
                    cou_page++
                } else
                    cou_tempy += 66
                setCouPos({
                    pos: cou_tempy,
                    page: cou_page
                })
                cou_tempy += 24
            }
            for (let i = 0; i < cv.userCourses.length; i++) {
                if (cou_tempy + 77 > 919) {
                    cou_tempy = 50
                    cou_page++
                }
                couContent.push({
                    index: i,
                    posy: cou_tempy + 24,
                    page: cou_page
                })
                cou_tempy += 77
            }

            setCoursesContent(couContent)
        }



        let intern_page = getMax(lang_page, expert_page, cou_page), refer_page = getMax(lang_page, expert_page, cou_page)
        let intern_tempy = getMax(lang_tempy, expert_tempy, cou_tempy), refer_tempy = getMax(lang_tempy, expert_tempy, cou_tempy)
        let internContent = []

        if (cv.userInterships) {
            if (cv.userInterships.length > 0) {
                if (intern_tempy + 95 > 919) {
                    intern_tempy = 50
                    intern_page++
                } else {
                    intern_tempy += 66
                }
                setInternPos({
                    pos: intern_tempy,
                    page: intern_page
                })
                intern_tempy += 29
            }

            for (let i = 0; i < cv.userInterships.length; i++) {
                if (i % 2 == 0 && intern_tempy + 96 > 919) {
                    intern_tempy = 50
                    intern_page++
                }
                internContent.push({
                    index: i,
                    posy: intern_tempy == 50 ? 50 : intern_tempy + 24,
                    page: intern_page
                })
                if (i % 2 == 1) {
                    intern_tempy += 72
                }
            }
            setInternShipsContent(internContent)
            console.log(internContent)
        }

        let referContent = []

        if (cv.userReferences) {
            if (cv.userReferences.length > 0) {
                if (refer_tempy + 95 > 919) {
                    refer_tempy = 50
                    refer_page++
                } else {
                    refer_tempy += 66
                }
                setReferPos({
                    pos: refer_tempy,
                    page: refer_page
                })
                refer_tempy += 29
            }
            for (let i = 0; i < cv.userReferences.length; i++) {
                if (i % 2 == 0 && refer_tempy + 115 > 919) {
                    refer_tempy = 50
                    refer_page++
                }
                referContent.push({
                    index: i,
                    posy: refer_tempy == 50 ? 50 : refer_tempy + 24,
                    page: refer_page
                })
                if (i % 2 == 1) {
                    refer_tempy += 91
                }
            }
            setReferencesContent(referContent)
        }

        let extra_page = intern_page > refer_page ? intern_page : refer_page
        let extra_tempy = intern_page == refer_page ? (intern_tempy > refer_tempy ? intern_tempy : refer_tempy) : (extra_page == intern_page ? intern_tempy : refer_tempy)
        let extraContent = []
        console.log("extra" + extra_page + ":" + extra_tempy)
        if (cv.userExtraActivities) {
            if (cv.userExtraActivities.length > 0) {
                if (extra_tempy + 95 > 919) {
                    extra_tempy = 50
                    extra_page++
                } else {
                    extra_tempy += 66
                }
                setExtraPos({
                    pos: extra_tempy,
                    page: extra_page
                })
                extra_tempy += 29
            }
            for (let i = 0; i < cv.userExtraActivities.length; i++) {
                if (extra_tempy + 126 > 919) {
                    extra_tempy = 50
                    extra_page++
                }
                extraContent.push({
                    index: i,
                    posy: extra_tempy + 24,
                    page: extra_page
                })
                extra_tempy += 102
            }
            setExtraCurriContent(extraContent)
        }

        let hobby_page = extra_page, hobby_tempy = extra_tempy
        if (cv.hobbies) {
            if (hobby_tempy + 95 > 919) {
                hobby_tempy = 50
                hobby_page++
            } else {
                hobby_tempy += 66
            }
            setHobbiesPos({
                pos: hobby_tempy,
                page: hobby_page
            })
            hobby_tempy += 29;
            if (hobby_tempy + 24 + 51 > 919) {
                hobby_tempy = 50
                hobby_page++
            }
            setHobbiesContentPos({
                pos: hobby_tempy + 24,
                page: hobby_page
            })
            hobby_tempy += 24 + 51
        }

        console.log("hobby", hobby_tempy)
        let add_page = hobby_page, add_tempy = hobby_tempy
        if (cv.additionalInfo) {
            if (add_tempy + 95 > 919) {
                add_tempy = 50
                add_page++
            } else {
                add_tempy += 66
            }
            setAddPos({
                pos: add_tempy,
                page: add_page
            })
            add_tempy += 29;
            if (add_tempy + 24 + 51 > 919) {
                add_tempy = 50
                add_page++
            }
            setAddContentPos({
                pos: add_tempy + 24,
                page: add_page
            })
            add_tempy += 24 + 51
        }

        let honor_page = add_page, honor_tempy = add_tempy, honorContent = []

        if (cv.userAwards) {
            if (cv.userAwards.length > 0) {
                if (honor_tempy + 95 > 919) {
                    honor_tempy = 50
                    honor_page++
                } else {
                    honor_tempy += 66
                }
                setHonorPos({
                    pos: honor_tempy,
                    page: honor_page
                })
                honor_tempy += 29
            }

            for (let i = 0; i < cv.userAwards.length; i++) {
                if (honor_tempy + 102 > 919) {
                    honor_tempy = 50
                    honor_page++
                }
                honorContent.push({
                    index: i,
                    posy: honor_tempy + 24,
                    page: honor_page
                })
                honor_tempy += 78
            }
            console.log(honorContent)
            setHonorsContent(honorContent)
        }

        setTotalPage(honor_page)
        // if (educationContent.length > 0 || skillContent.length > 0) {
        // 	if (educationContent.length > 0 && (skillContent.length == 0 || educationContent[educationContent.length - 1].page > skillContent[skillContent.length - 1].page)) {
        // 		exp_page = educationContent[educationContent.length - 1].page;
        // 		exp_tempy = educationContent[educationContent.length - 1].posy + 87
        // 	} else if(educationContent.length > 0 && skillContent.length > 0 && educationContent[educationContent.length - 1].page == skillContent[skillContent.length - 1].page) {
        // 		if(educationContent[educationContent.length - 1].posy + 87 > skillContent[skillContent.length - 1].posy + 75) {
        // 			exp_tempy = educationContent[educationContent.length - 1].posy + 87
        // 		} else {
        // 			exp_tempy = skillContent[skillContent.length - 1].posy + 75
        // 		}
        // 	} else {
        // 		exp_page = skillContent[skillContent.length - 1].page;
        // 		exp_tempy = skillContent
        // 	}
        // }
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
                    <div className={styles.resumeBorder}></div>
                    <div className={styles.profile}>
                        {/* {getAvatarRef} */}
                        {!isEmpty(avatarSrc) ? (<NextImage src={avatarSrc} width={171} height={171} alt="" ref={avatarRef} className={styles.avatar} />) : null}
                        <div className={styles.content}>
                            <div className={styles.name}>{cv?.givenName}</div>
                            <div className={styles.job}>{cv?.jobTitle}</div>
                            <div className={styles.contactlist}>
                                <a href="">
                                    <NextImage src={getContactImageURL("Linkedin")} width={14} height={14} alt="" />
                                </a>
                                <a href="">
                                    <NextImage src={getContactImageURL("Dribble")} width={14} height={14} alt="" />
                                </a>
                                <a href="">
                                    <NextImage src={getContactImageURL("Instagram")} width={14} height={14} alt="" />
                                </a>
                                <a href="">
                                    <NextImage src={getContactImageURL("Whatsapp")} width={14} height={14} alt="" />
                                </a>
                                <a href="">
                                    <NextImage src={getContactImageURL("Twitter")} width={14} height={14} alt="" />
                                </a>
                            </div>
                            <div className={styles.othercontact}>
                                <div className={styles.emailcontact}>
                                    <div className={styles.title}>Email :</div>
                                    <div className={styles.text}>{cv?.email}</div>
                                </div>
                                <div className={styles.phonecontact}>
                                    <div className={styles.title}>Phone number :</div>
                                    <div className={styles.text}>{cv?.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.maindescription}>{htmlRenderer(cv?.description)}</div>
                    <div className={styles.information}>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Academic Level :</div>
                            <div className={styles.text}>{cv?.degree?.title}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Website :</div>
                            <div className={styles.text}>{cv?.website}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Gender : </div>
                            <div className={styles.text}>{cv?.gender?.title}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Driving License :</div>
                            <div className={styles.text}>{cv?.drivingLicense?.title}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Salary range :</div>
                            <div className={styles.text}>$ {cv?.minSalary} - {cv?.maxSalary} monthly</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Industry :</div>
                            <div className={styles.text}>{cv?.industry?.title}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Address :</div>
                            <div className={styles.text}>{cv?.streetAddress}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Nationality :</div>
                            <div className={styles.text}>{cv?.nationality?.title}</div>
                        </div>
                        <div className={styles.infoItem}>
                            <div className={styles.title}>Date Of Birth :</div>
                            <div className={styles.text}>{cv?.dateOfBirth}</div>
                        </div>
                    </div>
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
                </div>
            );
        } else {
            return (
                <div className={styles.resume + " " + getStyle()} id="resume">
                    <div className={styles.resumeBorder}></div>
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
                </div>
            )
        }
    }

    const getEducationContent = (page) => {
        if (cv.userEducations && cv.userEducations.length > 0) {
            return (
                <>
                    {eduPos.page == page ? <div className={styles.componentTitle} style={{ top: eduPos.pos, left: 50 }}><div className={styles.borderline} style={{ top: -32 }}></div>Education</div> : <></>}
                    {educationContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userEducations[item.index].fromDate)
                        const toDate = new Date(cv.userEducations[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.eduContent} style={{ top: item.posy, left: 50 }}>
                                    <div className={styles.title}>{cv.userEducations[item.index].institute}</div>
                                    <div className={styles.content}>
                                        <div className={styles.location}>{cv.userEducations[item.index].city?.title}, {cv.userEducations[item.index].country?.title}</div>
                                        <div className={styles.Date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()} - {month[toDate.getMonth()]} {toDate.getFullYear()}</div>
                                    </div>
                                    <div className={styles.role}>{cv.userEducations[item.index].major}</div>
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
                    {skillPos.page == page ? <div className={styles.componentTitle} style={{ left: 524, top: skillPos.pos }}>Skill</div> : <></>}
                    {skillContent.map((item) => {
                        let percent = []
                        for (let i = 0; i < 5; i++) {
                            if (cv.userSkils[item.index].percentage >= (i + 1) * 20) {
                                percent.push(<Expdot type={1} />)
                            } else if (i * 20 < cv.userSkils[item.index].percentage && cv.userSkils[item.index].percentage < (i + 1) * 20) {
                                percent.push(<Expdot type={0} />)
                            } else {
                                percent.push(<Expdot type={-1} />)
                            }
                        }
                        return (
                            item.page == page ?
                                <div className={styles.skillContent} style={{ top: item.posy, left: 524 }}>
                                    <div className={styles.title}>{cv.userSkils[item.index].title}</div>
                                    <div className={styles.percent}>{percent}</div>
                                    <div className={styles.content}>
                                        <div className={styles.domination}>{cv.userSkils[item.index].domination.title}</div>
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
                    {expPos.page == page ? <div className={styles.componentTitle} style={{ top: expPos.pos, left: 50 }}><div className={styles.borderline} style={{ top: expPos.pos == 50 ? -32 : -32 }}></div>Experience</div> : <></>}
                    {experienceContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userExperiences[item.index].fromDate)
                        const toDate = new Date(cv.userExperiences[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.expContent} style={{ top: item.posy, left: 50 }}>
                                    <div className={styles.title}>{cv.userExperiences[item.index].title}</div>
                                    <div className={styles.content}>
                                        <div className={styles.location}>{cv.userExperiences[item.index].city?.title}, {cv.userExperiences[item.index].country?.title}</div>
                                        <div className={styles.Date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()} - {month[toDate.getMonth()]} {toDate.getFullYear()}</div>
                                    </div>
                                    <div className={styles.description}>{cv.userExperiences[item.index].description}</div>
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
                    {langPos.page == page ? <div className={styles.componentTitle} style={{ left: 50, top: langPos.pos }}><div className={styles.borderline} style={{ top: langPos.pos == 50 ? -32 : -32 }}></div>Languages</div> : <></>}
                    {languageContent.map((item) => {
                        let percent = []
                        for (let i = 0; i < 5; i++) {
                            if (cv.userLanguages[item.index].percentage >= (i + 1) * 20) {
                                percent.push(<Expdot type={1} />)
                            } else if (i * 20 < cv.userLanguages[item.index].percentage && cv.userLanguages[item.index].percentage < (i + 1) * 20) {
                                percent.push(<Expdot type={0} />)
                            } else {
                                percent.push(<Expdot type={-1} />)
                            }
                        }
                        return (
                            item.page == page ?
                                <div className={styles.languageContent} style={{ top: item.posy, left: item.posx }}>
                                    <div className={styles.title}>{cv.userLanguages[item.index].language.title}</div>
                                    <div className={styles.percent}>{percent}</div>
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
                    {langPos.page == page ? <div className={styles.componentTitle} style={{ left: 298.5, top: langPos.pos }}>Expertise</div> : <></>}
                    {expertiseContent.map((item) => {
                        let percent = []
                        for (let i = 0; i < 5; i++) {
                            if (cv.userExpertises[item.index].percentage >= (i + 1) * 20) {
                                percent.push(<Expdot type={1} />)
                            } else if (i * 20 < cv.userExpertises[item.index].percentage && cv.userExpertises[item.index].percentage < (i + 1) * 20) {
                                percent.push(<Expdot type={0} />)
                            } else {
                                percent.push(<Expdot type={-1} />)
                            }
                        }
                        return (
                            item.page == page ?
                                <div className={styles.expertiseContent} style={{ top: item.posy, left: 298.5 }}>
                                    <div className={styles.title}>{cv.userExpertises[item.index].title}</div>
                                    <div className={styles.percent}>{percent}</div>
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
                    {couPos.page == page ? <div className={styles.componentTitle} style={{ left: 545, top: couPos.pos }}>Expertise</div> : <></>}
                    {coursesContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userCourses[item.index].fromDate)
                        const toDate = new Date(cv.userCourses[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.coursesContent} style={{ top: item.posy, left: 545 }}>
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
                    {internPos.page == page ? <div className={styles.componentTitle} style={{ left: 50, top: internPos.pos }}><div className={styles.borderline} style={{ top: internPos.pos == 50 ? -32 : -32 }}></div>Internships</div> : <></>}
                    {internshipsContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userInterships[item.index].fromDate)
                        const toDate = new Date(cv.userInterships[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.internContent} style={{ top: item.posy, left: (item.index % 2) == 0 ? 50 : 214 }}>
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
                    {referPos.page == page ? <div className={styles.componentTitle} style={{ left: 363, top: referPos.pos }}>References</div> : <></>}
                    {referencesContent.map((item) => {
                        return (
                            item.page == page ?
                                <div className={styles.referContent} style={{ top: item.posy, left: (item.index % 2) == 0 ? 363 : 527 }}>
                                    <div className={styles.title}>{cv.userReferences[item.index].fullName}</div>
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
                    {extraPos.page == page ? <div className={styles.componentTitle} style={{ left: 50, top: extraPos.pos }}><div className={styles.borderline} style={{ top: extraPos.pos == 50 ? -32 : -32 }}></div>Extra-curricular Activities</div> : <></>}
                    {extracurriContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userExtraActivities[item.index].fromDate)
                        const toDate = new Date(cv.userExtraActivities[item.index].toDate)
                        return (
                            item.page == page ?
                                <div className={styles.extraContent} style={{ top: item.posy, left: 50 }}>
                                    <div className={styles.title}>{cv.userExtraActivities[item.index].title}</div>
                                    <div className={styles.content}>
                                        <div className={styles.location}>{cv.userExtraActivities[item.index].city?.title}, {cv.userExtraActivities[item.index].country?.title}</div>
                                        <div className={styles.date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()} - {month[toDate.getMonth()]} {toDate.getFullYear()}</div>
                                    </div>
                                    <div className={styles.description}>{cv.userExtraActivities[item.index].description}</div>
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
                        <div className={styles.componentTitle} style={{ left: 50, top: hobbiesPos.pos }}><div className={styles.borderline} style={{ top: hobbiesPos.pos == 50 ? -32 : -32 }}></div>Hobbies</div>
                        : <></>}
                    {hobbiesContentPos.page == page ?
                        <div className={styles.hobbyContent} style={{ left: 50, top: hobbiesContentPos.pos }}>{cv.hobbies}</div>
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
                        <div className={styles.componentTitle} style={{ left: 50, top: addPos.pos }}><div className={styles.borderline} style={{ top: addPos.pos == 50 ? -32 : -32 }}></div>Additional information</div>
                        : <></>}
                    {addContentPos.page == page ?
                        <div className={styles.hobbyContent} style={{ left: 50, top: addPos.pos + 53 }}>{cv.additionalInfo}</div>
                        : <></>}
                </>
            )
        }
    }

    const getAwards = (page) => {
        if (cv.userAwards && cv.userAwards.length > 0) {
            return (
                <>
                    {honorPos.page == page ? <div className={styles.componentTitle} style={{ left: 50, top: honorPos.pos }}><div className={styles.borderline} style={{ top: honorPos.pos == 50 ? -32 : -32 }}></div>HONORS & AWARDs</div> : <></>}
                    {honorsContent.map((item) => {
                        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const fromDate = new Date(cv.userAwards[item.index].date)

                        return (
                            item.page == page ?
                                <div className={styles.honorContent} style={{ top: item.posy, left: 50 }}>
                                    <div className={styles.content}>
                                        <div className={styles.title}>{cv.userAwards[item.index].title}</div>
                                        <div className={styles.date}>{month[fromDate.getMonth()]} {fromDate.getFullYear()}</div>
                                    </div>
                                    <div className={styles.description}>{cv.userAwards[item.index].description}</div>
                                </div>
                                :
                                <></>
                        )
                    })}
                </>
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

        linkedImg.src = getContactImageURL("Linkedin")
        linkedImg.onload = () => {
            context.drawImage(linkedImg, 294, 188);
        }

        dribbleImg.src = getContactImageURL("Dribble")
        dribbleImg.onload = () => {
            context.drawImage(dribbleImg, 324, 188);
        }

        instagramImg.src = getContactImageURL("Instagram")
        instagramImg.onload = () => {
            context.drawImage(instagramImg, 354, 188);
        }

        whatsappImg.src = getContactImageURL("Whatsapp")
        whatsappImg.onload = () => {
            context.drawImage(whatsappImg, 384, 188);
        }

        twitterImg.src = getContactImageURL("Twitter")
        twitterImg.onload = () => {
            context.drawImage(twitterImg, 414, 188);
        }
    }

    const loadContact = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = '#6B7598'
        context.fillText("Email:", 289, 219)
        context.fillText("Phone number:", 505, 220)
        context.font = "700 16px Amaranth"
        context.fillStyle = '#242435'
        if (cv.email.length > 30) {
            context.fillText(cv.email.split('@')[0], 289, 235)
            context.fillText("@" + cv.email.split('@')[1], 289, 255)
        }
        else
            context.fillText(cv.email, 289, 235)
        context.fillText(cv.phone, 505, 236)
    }

    const loadDescription = (context) => {
        context.font = "400 16px Amaranth"
        context.fillText(cv.description, 50, 351)
    }

    const loadInformation = (context) => {
        context.font = "400 12px Amaranth"
        context.fillStyle = getTextColor1()
        context.fillText("Academic Level :", 50, 483)
        context.fillText("Website :", 288, 483)
        context.fillText("Gender : ", 526, 483)
        context.fillText("Driving License :", 50, 527)
        context.fillText("Salary range :", 288, 525)
        context.fillText("Industry :", 526, 527)
        context.fillText("Address :", 50, 571)
        context.fillText("Nationality :", 288, 571)
        context.fillText("Date Of Birth :", 526, 571)

        context.font = "700 12px Amaranth"
        context.fillStyle = getTextColor()
        context.fillText("Bachelor degree", 50, 499)
        context.fillText(cv.website, 288, 499)
        context.fillText(cv.gender.title, 526, 499)
        context.fillText(cv.drivingLicense.title, 50, 543)
        context.fillText("$" + cv.minSalary + "-" + cv.maxSalary + " monthly", 288, 543)
        context.fillText(cv.industry.title, 526, 543)
        context.fillText(cv.streetAddress, 50, 587)
        context.fillText(cv.nationality.title, 288, 587)
        context.fillText(cv.dateOfBirth, 526, 587)
    }

    return (
        <>
            <div className={styles.resumeContent + " " + styles.venice + " " + getStyle()}>
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
