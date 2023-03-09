import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import Styles from "/styles/scss/dashboard/Resume.module.scss";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import Script from "next/script";
import Expdot from "../../Expdot";
import { Button, Spin } from "antd";
import { isEmpty } from "lodash";
import ThemeModal from "../../ThemeModal";

export default function Gradient({
  cv = {},

  modalTheme,
  setModalTheme,
  theme,
}) {
  //***************************
  // Define State
  //***************************
  const canvasRef = useRef(null);
  const avatarRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [eduPos] = useState({ pos: 683, page: 1 });
  const [skillPos] = useState({ pos: 683, page: 1 });
  const [expPos, setExpPos] = useState({});
  const [langPos, setLangPos] = useState({});
  const [expertPos, setExpertPos] = useState({});
  const [couPos, setCouPos] = useState({});
  const [internPos, setInternPos] = useState({});
  const [referPos, setReferPos] = useState({});
  const [extraPos, setExtraPos] = useState({});
  const [hobbiesPos, setHobbiesPos] = useState({});
  const [hobbiesContentPos, setHobbiesContentPos] = useState({});
  const [addPos, setAddPos] = useState({});
  const [addContentPos, setAddContentPos] = useState({});
  const [honorPos, setHonorPos] = useState({});
  const [educationContent, setEducationContent] = useState([]);
  const [skillContent, setSkillContent] = useState([]);
  const [experienceContent, setExperienceContent] = useState([]);
  const [languageContent, setLanguageContent] = useState([]);
  const [expertiseContent, setExpertiseContent] = useState([]);
  const [coursesContent, setCoursesContent] = useState([]);
  const [internshipsContent, setInternShipsContent] = useState([]);
  const [referencesContent, setReferencesContent] = useState([]);
  const [extracurriContent, setExtraCurriContent] = useState([]);
  const [honorsContent, setHonorsContent] = useState([]);
  const [loader, setLoader] = useState(false);
  const ratio = 0.62;

  //***************************
  // Define Function
  //***************************
  const showCanvas = (page) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // context.scale(0.7, 0.8);
    setTimeout(async () => {
      html2canvas(document.querySelector("#resume"), {
        useCORS: true,
      }).then(async (canvas1) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        const backgroundImg = await loadImage(canvas1.toDataURL("image/png"));
        context.drawImage(backgroundImg, 0, 0);
        if (page == 1) {
          const avatarImg = await loadImage(avatarSrc);
          context.drawImage(
            avatarImg,
            81 * window.devicePixelRatio,
            85 * window.devicePixelRatio,
            171 * window.devicePixelRatio,
            171 * window.devicePixelRatio
          );
        }

        skillContent.forEach(async (element) => {
          if (element.page == page) {
            const skiItem = cv.userSkils[element.index];
            for (let i = 0; i < 5; i++) {
              if (skiItem.percentage >= (i + 1) * 20) {
                const img = await loadImage("/images/full.png");
                context.drawImage(
                  img,
                  (524 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else if (
                skiItem.percentage > i * 20 &&
                skiItem.percentage < (i + 1) * 20
              ) {
                const img = await loadImage("/images/half.png");
                context.drawImage(
                  img,
                  (524 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else {
                const img = await loadImage("/images/half.png");
                context.drawImage(
                  img,
                  (524 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              }
            }
          }
        });

        languageContent.forEach(async (element) => {
          if (element.page == page) {
            const langItem = cv.userLanguages[element.index];
            for (let i = 0; i < 5; i++) {
              if (langItem.percentage >= (i + 1) * 20) {
                const img = await loadImage("/images/full.png");
                context.drawImage(
                  img,
                  (50 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else if (
                langItem.percentage > i * 20 &&
                langItem.percentage < (i + 1) * 20
              ) {
                const img = await loadImage("/images/half.png");
                context.drawImage(
                  img,
                  (50 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else {
                const img = await loadImage("/images/blank.png");
                context.drawImage(
                  img,
                  (50 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              }
            }
          }
        });

        expertiseContent.forEach(async (element) => {
          if (element.page == page) {
            const expertiseItem = cv.userExpertises[element.index];

            for (let i = 0; i < 5; i++) {
              if (expertiseItem.percentage >= (i + 1) * 20) {
                const img = await loadImage("/images/full.png");
                context.drawImage(
                  img,
                  (298.5 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else if (
                expertiseItem.percentage > i * 20 &&
                expertiseItem.percentage < (i + 1) * 20
              ) {
                const img = await loadImage("/images/half.png");
                context.drawImage(
                  img,
                  (298.5 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              } else {
                const img = await loadImage("/images/blank.png");
                context.drawImage(
                  img,
                  (298.5 + i * 33.5) * window.devicePixelRatio,
                  (element.posy + 27) * window.devicePixelRatio,
                  12,
                  12
                );
              }
            }
          }
        });
      });
    }, 500);
  };

  const generatePDF = async () => {
    setLoader(true);
    const report = new JsPDF("portrait", "px", "A4");
    report.addFont("/assets/fonts/Amaranth-Regular.ttf", "Amaranth", "normal");
    report.setFont("Amaranth");
    report.setTextColor("#242435");
    // report.setFontType("normal")

    const backgroundImg = await loadImage("/images/background.png");
    report.addImage(backgroundImg, "png", 0, 0, 720 * ratio, 1019 * ratio);

    await generateProfile(report);
    for (let i = 1; i <= totalPage; i++) {
      if (i != 1) {
        report.addPage();
        report.addImage(backgroundImg, "png", 0, 0, 720 * ratio, 1019 * ratio);
      }
      await generateEducation(report, i);
      await generateSkills(report, i);
      await generateExperience(report, i);
      await generateLanguages(report, i);
      await generateExpertise(report, i);
      await generateCourses(report, i);
      await generateInternships(report, i);
      await generateReference(report, i);
      await generateExtra(report, i);
      await generatehobbies(report, i);
      await generateAdditional(report, i);
      await generateHonors(report, i);
    }

    report.save("report.pdf");
    setLoader(false);
  };

  const generateProfile = async (report) => {
    const avatarImg = await loadImage(avatarSrc);
    report.addImage(
      avatarImg,
      "png",
      81 * ratio,
      85 * ratio,
      171 * ratio,
      171 * ratio
    );

    report.setFontSize(40 * ratio);
    // cv.givenName = cv.givenName.toUpperCase()
    report.text(cv.givenName.toUpperCase(), 289 * ratio, 106 * ratio);

    report.setFontSize(20 * ratio);
    report.text(
      cv.jobTitle,
      289 * ratio,
      (147 + report.getTextDimensions(cv.jobTitle).h) * ratio
    );

    const linkedinImg = await loadImage("/images/Linkedin.png");
    const dribbleImg = await loadImage("/images/Dribble.png");
    const instagramImg = await loadImage("/images/Instagram.png");
    const whatsappImg = await loadImage("/images/Whatsapp.png");
    const twitterImg = await loadImage("/images/Twitter.png");
    report.addImage(
      linkedinImg,
      294 * ratio,
      188 * ratio,
      14 * ratio,
      14 * ratio
    );
    report.addImage(
      dribbleImg,
      324 * ratio,
      188 * ratio,
      14 * ratio,
      14 * ratio
    );
    report.addImage(
      instagramImg,
      354 * ratio,
      188 * ratio,
      14 * ratio,
      14 * ratio
    );
    report.addImage(
      whatsappImg,
      384 * ratio,
      188 * ratio,
      14 * ratio,
      14 * ratio
    );
    report.addImage(
      twitterImg,
      414 * ratio,
      188 * ratio,
      14 * ratio,
      14 * ratio
    );

    report.setTextColor("#6B7598");
    report.setFontSize(12 * ratio);
    report.text(
      "Email :",
      289 * ratio,
      (220 + report.getTextDimensions("Email :").h) * ratio
    );

    report.text(
      "Phone number :",
      505 * ratio,
      (220 + report.getTextDimensions("Phone number :").h) * ratio
    );

    report.setTextColor("#242435");
    report.setFontSize(16 * ratio);
    var splitEmail = report.splitTextToSize(cv.email, 184 * ratio);
    report.text(
      splitEmail,
      289 * ratio,
      (235 + report.getTextDimensions(cv.email).h) * ratio
    );

    report.text(
      cv.phone,
      505 * ratio,
      (236 + report.getTextDimensions(cv.phone).h) * ratio
    );

    var splitDescription = report.splitTextToSize(cv.description, 620 * ratio);
    report.text(
      splitDescription,
      50 * ratio,
      (351 + report.getTextDimensions(cv.description).h) * ratio
    );

    report.setTextColor("#6B7598");
    report.setFontSize(12 * ratio);
    report.text(
      "Academic Level :",
      50 * ratio,
      (483 + report.getTextDimensions("Academic Level :").h) * ratio
    );
    report.text(
      "Website :",
      288 * ratio,
      (483 + report.getTextDimensions("Website :").h) * ratio
    );
    report.text(
      "Gender : ",
      526 * ratio,
      (483 + report.getTextDimensions("Gender : ").h) * ratio
    );
    report.text(
      "Driving License :",
      50 * ratio,
      (527 + report.getTextDimensions("Driving License :").h) * ratio
    );
    report.text(
      "Salary range :",
      288 * ratio,
      (525 + report.getTextDimensions("Salary range :").h) * ratio
    );
    report.text(
      "Industry :",
      526 * ratio,
      (527 + report.getTextDimensions("Industry :").h) * ratio
    );
    report.text(
      "Address :",
      50 * ratio,
      (571 + report.getTextDimensions("Address :").h) * ratio
    );
    report.text(
      "Nationality :",
      288 * ratio,
      (571 + report.getTextDimensions("Nationality :").h) * ratio
    );
    report.text(
      "Date Of Birth :",
      526 * ratio,
      (571 + report.getTextDimensions("Date Of Birth :").h) * ratio
    );

    report.setTextColor("#242435");
    report.text(
      "Bachelor degree",
      50 * ratio,
      (499 + report.getTextDimensions("Bachelor degree").h) * ratio
    );
    report.text(
      cv.website,
      288 * ratio,
      (499 + report.getTextDimensions(cv.website).h) * ratio
    );
    report.text(
      cv.gender.title,
      526 * ratio,
      (499 + report.getTextDimensions(cv.gender.title).h) * ratio
    );
    report.text(
      cv.drivingLicense.title,
      50 * ratio,
      (543 + report.getTextDimensions(cv.drivingLicense.title).h) * ratio
    );
    report.text(
      "$ " + cv.minSalary + " - " + cv.maxSalary + " monthly",
      288 * ratio,
      (543 +
        report.getTextDimensions(
          "$ " + cv.minSalary + " - " + cv.maxSalary + " monthly"
        ).h) *
        ratio
    );
    report.text(
      cv.industry.title,
      526 * ratio,
      (543 + report.getTextDimensions(cv.industry.title).h) * ratio
    );
    report.text(
      cv.streetAddress,
      50 * ratio,
      (587 + report.getTextDimensions(cv.streetAddress).h) * ratio
    );
    report.text(
      cv.nationality.title,
      288 * ratio,
      (587 + report.getTextDimensions(cv.nationality.title).h) * ratio
    );
    report.text(
      cv.dateOfBirth,
      526 * ratio,
      (587 + report.getTextDimensions(cv.dateOfBirth).h) * ratio
    );
  };

  const generateEducation = async (report, page) => {
    if (eduPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "EDUCATION",
        50 * ratio,
        (eduPos.pos + report.getTextDimensions("EDUCATION").h) * ratio
      );
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
    ];
    educationContent.forEach((element) => {
      if (element.page == page) {
        const eduItem = cv.userEducations[element.index];
        const fromDate = new Date(eduItem.fromDate);
        const toDate = new Date(eduItem.toDate);
        report.setFontSize(14 * ratio);
        report.text(
          eduItem.institute,
          50 * ratio,
          (element.posy + report.getTextDimensions(eduItem.institute).h) * ratio
        );

        report.setFontSize(12 * ratio);
        const location = eduItem?.city?.title + ", " + eduItem?.country?.title;
        report.text(
          location,
          50 * ratio,
          (element.posy + 24 + report.getTextDimensions(location).h) * ratio
        );

        const duration =
          month[fromDate.getMonth()] +
          " " +
          fromDate.getFullYear() +
          " - " +
          month[toDate.getMonth()] +
          " " +
          toDate.getFullYear();
        report.text(
          duration,
          455 * ratio,
          (element.posy + 24 + report.getTextDimensions(duration).h) * ratio,
          { align: "right" }
        );

        report.setFontSize(14);
        report.text(
          eduItem.major,
          50 * ratio,
          (element.posy + 24 + 19 + report.getTextDimensions(eduItem.major).h) *
            ratio
        );
      }
    });
  };

  const generateSkills = async (report, page) => {
    if (skillPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "SKILLS",
        524 * ratio,
        (skillPos.pos + report.getTextDimensions("SKILLS").h) * ratio
      );
    }
    const fullImg = await loadImage("/images/full.png");
    const halfImg = await loadImage("/images/half.png");
    const blankImg = await loadImage("/images/blank.png");

    skillContent.forEach((element) => {
      if (element.page == page) {
        const skiItem = cv.userSkils[element.index];

        report.setFontSize(14 * ratio);
        report.text(
          skiItem.title,
          524 * ratio,
          (element.posy + report.getTextDimensions(skiItem.title).h) * ratio
        );

        for (let i = 0; i < 5; i++) {
          if (skiItem.percentage >= (i + 1) * 20) {
            report.addImage(
              fullImg,
              (524 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else if (
            skiItem.percentage > i * 20 &&
            skiItem.percentage < (i + 1) * 20
          ) {
            report.addImage(
              halfImg,
              (524 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else {
            report.addImage(
              blankImg,
              (524 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          }
        }

        report.setFontSize(12 * ratio);
        report.text(
          skiItem.domination.title,
          524 * ratio,
          (element.posy +
            27 +
            28 +
            report.getTextDimensions(skiItem.domination.title).h) *
            ratio
        );
        report.text(
          skiItem.percentage + "%",
          670 * ratio,
          (element.posy +
            27 +
            28 +
            report.getTextDimensions(skiItem.percentage).h) *
            ratio,
          { align: "right" }
        );
      }
    });
  };

  const generateExperience = async (report, page) => {
    if (expPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "EXPERIENCE",
        50 * ratio,
        (expPos.pos + report.getTextDimensions("EXPERIENCE").h) * ratio
      );
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
    ];
    experienceContent.forEach((element) => {
      if (element.page == page) {
        const expItem = cv.userExperiences[element.index];
        const fromDate = new Date(expItem.fromDate);
        const toDate = new Date(expItem.toDate);

        report.setFontSize(16 * ratio);
        report.text(
          expItem.title,
          50 * ratio,
          (element.posy + report.getTextDimensions(expItem.title).h) * ratio
        );

        report.setFontSize(12 * ratio);
        const location = expItem?.city?.title + ", " + expItem?.country?.title;
        report.text(
          location,
          50 * ratio,
          (element.posy + 28 + report.getTextDimensions(location).h) * ratio
        );
        const duration =
          month[fromDate.getMonth()] +
          " " +
          fromDate.getFullYear() +
          " - " +
          month[toDate.getMonth()] +
          " " +
          toDate.getFullYear();
        report.text(
          duration,
          670 * ratio,
          (element.posy + 28 + report.getTextDimensions(duration).h) * ratio,
          { align: "right" }
        );

        report.setFontSize(14 * ratio);
        var splitDescription = report.splitTextToSize(
          expItem.description,
          620 * ratio
        );
        report.text(
          splitDescription,
          50 * ratio,
          (element.posy +
            28 +
            23 +
            report.getTextDimensions(expItem.description).h) *
            ratio
        );
      }
    });
  };

  const generateLanguages = async (report, page) => {
    if (langPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "LANGUAGES",
        50 * ratio,
        (langPos.pos + report.getTextDimensions("LANGUAGES").h) * ratio
      );
    }
    const fullImg = await loadImage("/images/full.png");
    const halfImg = await loadImage("/images/half.png");
    const blankImg = await loadImage("/images/blank.png");

    languageContent.forEach((element) => {
      if (element.page == page) {
        const langItem = cv.userLanguages[element.index];

        report.setFontSize(16 * ratio);
        report.text(
          langItem.language.title,
          50 * ratio,
          (element.posy + report.getTextDimensions(langItem.language.title).h) *
            ratio
        );

        for (let i = 0; i < 5; i++) {
          if (langItem.percentage >= (i + 1) * 20) {
            report.addImage(
              fullImg,
              (50 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else if (
            langItem.percentage > i * 20 &&
            langItem.percentage < (i + 1) * 20
          ) {
            report.addImage(
              halfImg,
              (50 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else {
            report.addImage(
              blankImg,
              (50 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          }
        }

        report.setFontSize(12 * ratio);
        report.text(
          langItem.level.title,
          50 * ratio,
          (element.posy +
            27 +
            20 +
            report.getTextDimensions(langItem.level.title).h) *
            ratio
        );
        report.text(
          langItem.percentage + "%",
          196 * ratio,
          (element.posy +
            27 +
            20 +
            report.getTextDimensions(langItem.percentage).h) *
            ratio,
          { align: "right" }
        );
      }
    });
  };

  const generateExpertise = async (report, page) => {
    if (expertPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "EXPERTISE",
        298.5 * ratio,
        (expertPos.pos + report.getTextDimensions("EXPERTISE").h) * ratio
      );
    }
    const fullImg = await loadImage("/images/full.png");
    const halfImg = await loadImage("/images/half.png");
    const blankImg = await loadImage("/images/blank.png");

    expertiseContent.forEach((element) => {
      if (element.page == page) {
        const expertiseItem = cv.userExpertises[element.index];

        report.setFontSize(16 * ratio);
        report.text(
          expertiseItem.title,
          298.5 * ratio,
          (element.posy + report.getTextDimensions(expertiseItem.title).h) *
            ratio
        );

        for (let i = 0; i < 5; i++) {
          if (expertiseItem.percentage >= (i + 1) * 20) {
            report.addImage(
              fullImg,
              (298.5 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else if (
            expertiseItem.percentage > i * 20 &&
            expertiseItem.percentage < (i + 1) * 20
          ) {
            report.addImage(
              halfImg,
              (298.5 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          } else {
            report.addImage(
              blankImg,
              (298.5 + i * 33.5) * ratio,
              (element.posy + 27) * ratio,
              12 * ratio,
              12 * ratio
            );
          }
        }

        report.setFontSize(12 * ratio);
        report.text(
          expertiseItem.domination.title,
          298.5 * ratio,
          (element.posy +
            27 +
            20 +
            report.getTextDimensions(expertiseItem.domination.title).h) *
            ratio
        );
        report.text(
          expertiseItem.percentage + "%",
          444.5 * ratio,
          (element.posy +
            27 +
            20 +
            report.getTextDimensions(expertiseItem.percentage).h) *
            ratio,
          { align: "right" }
        );
      }
    });
  };

  const generateCourses = async (report, page) => {
    if (couPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "COURSES",
        545 * ratio,
        (couPos.pos + report.getTextDimensions("COURSES").h) * ratio
      );
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
    ];
    coursesContent.forEach((element) => {
      if (element.page == page) {
        const couItem = cv.userCourses[element.index];
        const fromDate = new Date(couItem.fromDate);
        const toDate = new Date(couItem.toDate);

        report.setFontSize(16 * ratio);
        report.text(
          couItem.title,
          545 * ratio,
          (element.posy + report.getTextDimensions(couItem.title).h) * ratio
        );

        report.setFontSize(12 * ratio);
        const duration =
          month[fromDate.getMonth()] +
          " " +
          fromDate.getFullYear() +
          " - " +
          month[toDate.getMonth()] +
          " " +
          toDate.getFullYear();
        var splitDuration = report.splitTextToSize(duration, 125 * ratio);
        report.text(
          splitDuration,
          545 * ratio,
          (element.posy + 23 + report.getTextDimensions(duration).h) * ratio
        );
      }
    });
  };

  const generateInternships = async (report, page) => {
    if (internPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "INTERNSHIPS",
        50 * ratio,
        (internPos.pos + report.getTextDimensions("INTERNSHIPS").h) * ratio
      );
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
    ];
    internshipsContent.forEach((element) => {
      if (element.page == page) {
        const internItem = cv.userInterships[element.index];
        const fromDate = new Date(internItem.fromDate);
        const toDate = new Date(internItem.toDate);

        report.setFontSize(16 * ratio);
        report.text(
          internItem.title,
          (element.index % 2 == 0 ? 50 : 214) * ratio,
          (element.posy + report.getTextDimensions(internItem.title).h) * ratio
        );

        report.setFontSize(12);
        const location =
          internItem?.city?.title + ", " + internItem?.country?.title;
        report.text(
          location,
          (element.index % 2 == 0 ? 50 : 214) * ratio,
          (element.posy + 24 + report.getTextDimensions(location).h) * ratio
        );

        const duration =
          month[fromDate.getMonth()] +
          " " +
          fromDate.getFullYear() +
          " - " +
          month[toDate.getMonth()] +
          " " +
          toDate.getFullYear();
        const splitDuration = report.splitTextToSize(duration, 125 * ratio);
        report.text(
          splitDuration,
          (element.index % 2 == 0 ? 50 : 214) * ratio,
          (element.posy + 24 + 19 + report.getTextDimensions(duration).h) *
            ratio
        );
      }
    });
  };

  const generateReference = async (report, page) => {
    if (referPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "REFERENCES",
        363 * ratio,
        (referPos.pos + report.getTextDimensions("REFERENCES").h) * ratio
      );
    }
    referencesContent.forEach((element) => {
      if (element.page == page) {
        const referItem = cv.userReferences[element.index];

        report.setFontSize(16 * ratio);
        const splitName = report.splitTextToSize(
          referItem.fullName,
          125 * ratio
        );
        report.text(
          splitName,
          (element.index % 2 == 0 ? 363 : 527) * ratio,
          (element.posy + report.getTextDimensions(referItem.fullName).h) *
            ratio
        );

        report.setFontSize(12 * ratio);
        const splitEmail = report.splitTextToSize(
          "Email : " + referItem.email,
          125 * ratio
        );
        report.text(
          splitEmail,
          (element.index % 2 == 0 ? 363 : 527) * ratio,
          (element.posy +
            report.getTextDimensions(splitName).h +
            10 +
            report.getTextDimensions(referItem.email).h) *
            ratio
        );
        report.text(
          "Phone :" + referItem.phone,
          (element.index % 2 == 0 ? 363 : 527) * ratio,
          (element.posy +
            report.getTextDimensions(splitName).h +
            10 +
            report.getTextDimensions(splitEmail).h +
            10 +
            report.getTextDimensions(referItem.phone).h) *
            ratio
        );
      }
    });
  };

  const generateExtra = async (report, page) => {
    if (extraPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "EXTRA-CURRICULAR ACTIVITIES",
        50 * ratio,
        (extraPos.pos + report.getTextDimensions("E").h) * ratio
      );
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
    ];
    extracurriContent.forEach((element) => {
      if (element.page == page) {
        const extraItem = cv.userExtraActivities[element.index];
        const fromDate = new Date(extraItem.fromDate);
        const toDate = new Date(extraItem.toDate);

        report.setFontSize(16 * ratio);
        report.text(
          extraItem.title,
          50 * ratio,
          (element.posy + report.getTextDimensions(extraItem.title).h) * ratio
        );

        report.setFontSize(12 * ratio);
        const location =
          extraItem?.city?.title + ", " + extraItem?.country?.title;
        report.text(
          location,
          50 * ratio,
          element.posy + 28 + report.getTextDimensions(location).h * ratio
        );
        const duration =
          month[fromDate.getMonth()] +
          " " +
          fromDate.getFullYear() +
          " - " +
          month[toDate.getMonth()] +
          " " +
          toDate.getFullYear();
        report.text(
          duration,
          670,
          element.posy + 28 + report.getTextDimensions(location).h * ratio,
          { align: "right" }
        );
        report.setFontSize(14 * ratio);
        const splitDescription = report.splitTextToSize(
          extraItem.description,
          620 * ratio
        );
        report.text(
          splitDescription,
          50 * ratio,
          (element.posy +
            28 +
            20 +
            report.getTextDimensions(extraItem.description).h) *
            ratio
        );
      }
    });
  };

  const generatehobbies = async (report, page) => {
    if (hobbiesPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "HOBBIES",
        50 * ratio,
        (hobbiesPos.pos + report.getTextDimensions("H").h) * ratio
      );
    }
    if (hobbiesContentPos.page == page) {
      report.setFontSize(14 * ratio);
      const splitHobbies = report.splitTextToSize(cv.hobbies, 620 * ratio);
      report.text(
        splitHobbies,
        50 * ratio,
        (hobbiesContentPos.pos + report.getTextDimensions(cv.hobbies).h) * ratio
      );
    }
  };

  const generateAdditional = async (report, page) => {
    if (addPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "ADDITIONAL INFORMATION",
        50 * ratio,
        (addPos.pos + report.getTextDimensions("A").h) * ratio
      );
    }
    if (addContentPos.page == page) {
      report.setFontSize(16 * ratio);
      const splitAdd = report.splitTextToSize(cv.additionalInfo, 620 * ratio);
      report.text(
        splitAdd,
        50 * ratio,
        (addContentPos.pos + report.getTextDimensions(cv.additionalInfo).h) *
          ratio
      );
    }
  };

  const generateHonors = async (report, page) => {
    if (honorPos.page == page) {
      report.setFontSize(24 * ratio);
      report.text(
        "HONORS & AWARDS",
        50 * ratio,
        (honorPos.pos + report.getTextDimensions("H").h) * ratio
      );
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
    ];
    honorsContent.forEach((element) => {
      if (element.page == page) {
        const honorItem = cv.userAwards[element.index];
        const date = new Date(honorItem.date);

        report.setFontSize(16 * ratio);
        report.text(
          honorItem.title,
          50 * ratio,
          (element.posy + report.getTextDimensions(honorItem.title).h) * ratio
        );

        report.setFontSize(12 * ratio);
        const duration = month[date.getMonth()] + " " + date.getFullYear();
        report.text(
          duration,
          670 * ratio,
          (element.posy + report.getTextDimensions(duration).h) * ratio,
          { align: "right" }
        );

        report.setFontSize(14 * ratio);
        const splitDescription = report.splitTextToSize(
          honorItem.description,
          620 * ratio
        );
        report.text(
          splitDescription,
          50 * ratio,
          (element.posy +
            27 +
            report.getTextDimensions(honorItem.description).h) *
            ratio
        );
      }
    });
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img);
      };
    });
  };

  const filterContents = () => {
    let eduContent = [];
    let edu_page = 1;
    let edu_tempy = 683;
    if (cv.userEducations) {
      if (cv.userEducations.length > 0) edu_tempy = 707;
      for (let i = 0; i < cv.userEducations.length; i++) {
        if (edu_tempy + 87 > 1019) {
          edu_tempy = 50;
          edu_page++;
        }
        eduContent.push({
          index: i,
          posx: 50,
          posy: edu_tempy + 24,
          page: edu_page,
        });
        edu_tempy += 87;
      }
      setEducationContent(eduContent);
    }

    let skiContent = [];
    let skill_page = 1;
    let skill_tempy = 633;

    if (cv.userSkils) {
      if (cv.userSkils.length > 0) skill_tempy = 707;
      for (let i = 0; i < cv.userSkils.length; i++) {
        if (skill_tempy + 75 > 1019) {
          skill_tempy = 50;
          skill_page++;
        }
        skiContent.push({
          index: i,
          posx: 524,
          posy: skill_tempy + 16,
          page: skill_page,
        });
        skill_tempy += 75;
      }
      setSkillContent(skiContent);
    }

    let exp_page = 1;
    let exp_tempy = 683;
    let expContent = [];
    if (edu_page > skill_page) {
      exp_page = edu_page;
      exp_tempy = edu_tempy;
    } else if (edu_page == skill_page) {
      exp_page = edu_page;
      if (edu_page + 87 > skill_page + 75) {
        exp_tempy = edu_tempy + 87;
      } else {
        exp_tempy = skill_tempy + 75;
      }
    } else {
      exp_page = skill_page;
      exp_tempy = skill_tempy;
    }

    if (exp_tempy + 24 > 1019) {
      exp_tempy = 50;
      exp_page++;
    }
    setExpPos({
      page: exp_page,
      pos: exp_tempy,
    });

    if (cv.userExperiences) {
      if (cv.userExperiences.length > 0) {
        exp_tempy += 24;
      }
      for (let i = 0; i < cv.userExperiences.length; i++) {
        if (exp_tempy + 126 > 1019) {
          exp_page++;
          exp_tempy = 50;
        }
        expContent.push({
          index: i,
          posx: 50,
          posy: exp_tempy + 24,
          page: exp_page,
        });
        exp_tempy += 126;
      }
      setExperienceContent(expContent);
    }

    let lang_tempy = exp_tempy,
      expert_tempy = exp_tempy,
      cou_tempy = exp_tempy;
    let lang_page = exp_page,
      expert_page = exp_page,
      cou_page = exp_page;
    let langContent = [],
      expertContent = [],
      couContent = [];
    // if (lang_tempy + 90 > 1019) {
    // 	lang_tempy = exp_tempy = expert_tempy = cou_tempy = 50
    // 	lang_page++
    // 	expert_page++
    // 	cou_page++
    // }
    setExpertPos({
      pos: expert_tempy,
      page: expert_page,
    });
    setCouPos({
      pos: cou_tempy,
      page: cou_page,
    });

    if (cv.userLanguages) {
      if (cv.userLanguages.length > 0) {
        if (lang_tempy + 90 > 1019) {
          lang_tempy = 50;
          lang_page++;
        } else lang_tempy += 66;
        setLangPos({
          pos: lang_tempy,
          page: lang_page,
        });
        lang_tempy += 24;
      }
      for (let i = 0; i < cv.userLanguages.length; i++) {
        if (lang_tempy + 75 > 1019) {
          lang_tempy = 50;
          lang_page++;
        }
        langContent.push({
          index: i,
          posy: lang_tempy + 16,
          page: lang_page,
        });
        lang_tempy += 75;
      }
      setLanguageContent(langContent);
    }

    if (cv.userExpertises) {
      if (cv.userExpertises.length > 0) {
        if (expert_tempy + 90 > 1019) {
          expert_tempy = 50;
          expert_page++;
        } else expert_tempy += 66;
        setExpertPos({
          pos: expert_tempy,
          page: expert_page,
        });
        expert_tempy += 24;
      }
      for (let i = 0; i < cv.userExpertises.length; i++) {
        if (expert_tempy + 75 > 1019) {
          expert_tempy = 50;
          expert_page++;
        }
        expertContent.push({
          index: i,
          posy: expert_tempy + 16,
          page: expert_page,
        });
        expert_tempy += 75;
      }
      setExpertiseContent(expertContent);
    }

    if (cv.userCourses) {
      if (cv.userCourses.length > 0) {
        if (cou_tempy + 90 > 1019) {
          cou_tempy = 50;
          cou_page++;
        } else cou_tempy += 66;
        setCouPos({
          pos: cou_tempy,
          page: cou_page,
        });
        cou_tempy += 24;
      }
      for (let i = 0; i < cv.userCourses.length; i++) {
        if (cou_tempy + 77 > 1019) {
          cou_tempy = 50;
          cou_page++;
        }
        couContent.push({
          index: i,
          posy: cou_tempy + 24,
          page: cou_page,
        });
        cou_tempy += 77;
      }

      setCoursesContent(couContent);
    }

    let intern_page = getMax(lang_page, expert_page, cou_page),
      refer_page = getMax(lang_page, expert_page, cou_page);
    let intern_tempy = getMax(lang_tempy, expert_tempy, cou_tempy),
      refer_tempy = getMax(lang_tempy, expert_tempy, cou_tempy);
    let internContent = [];

    if (cv.userInterships) {
      if (cv.userInterships.length > 0) {
        if (intern_tempy + 95 > 1019) {
          intern_tempy = 50;
          intern_page++;
        } else {
          intern_tempy += 66;
        }
        setInternPos({
          pos: intern_tempy,
          page: intern_page,
        });
        intern_tempy += 29;
      }

      for (let i = 0; i < cv.userInterships.length; i++) {
        if (i % 2 == 0 && intern_tempy + 96 > 1019) {
          intern_tempy = 50;
          intern_page++;
        }
        internContent.push({
          index: i,
          posy: intern_tempy + 24,
          page: intern_page,
        });
        if (i % 2 == 1) {
          intern_tempy += 72;
        }
      }
      setInternShipsContent(internContent);
    }

    let referContent = [];

    if (cv.userReferences) {
      if (cv.userReferences.length > 0) {
        if (refer_tempy + 95 > 1019) {
          refer_tempy = 50;
          refer_page++;
        } else {
          refer_tempy += 66;
        }
        setReferPos({
          pos: refer_tempy,
          page: refer_page,
        });
        refer_tempy += 29;
      }
      for (let i = 0; i < cv.userReferences.length; i++) {
        if (i % 2 == 0 && refer_tempy + 115 > 1019) {
          refer_tempy = 50;
          refer_page++;
        }
        referContent.push({
          index: i,
          posy: refer_tempy + 24,
          page: refer_page,
        });
        if (i % 2 == 1) {
          refer_tempy += 91;
        }
      }
      setReferencesContent(referContent);
    }

    let extra_page = intern_page > refer_page ? intern_page : refer_page;
    let extra_tempy = intern_tempy > refer_tempy ? intern_tempy : refer_tempy;
    let extraContent = [];

    if (cv.userExtraActivities) {
      if (cv.userExtraActivities.length > 0) {
        if (extra_tempy + 95 > 1019) {
          extra_tempy = 50;
          extra_page++;
        } else {
          extra_tempy += 66;
        }
        setExtraPos({
          pos: extra_tempy,
          page: extra_page,
        });
        extra_tempy += 29;
      }
      for (let i = 0; i < cv.userExtraActivities.length; i++) {
        if (extra_tempy + 126 > 1019) {
          extra_tempy = 50;
          extra_page++;
        }
        extraContent.push({
          index: i,
          posy: extra_tempy + 24,
          page: extra_page,
        });
        extra_tempy += 102;
      }
      setExtraCurriContent(extraContent);
    }

    let hobby_page = extra_page,
      hobby_tempy = extra_tempy;
    if (cv.hobbies) {
      if (hobby_tempy + 95 > 1019) {
        hobby_tempy = 50;
        hobby_page++;
      } else {
        hobby_tempy += 66;
      }
      setHobbiesPos({
        pos: hobby_tempy,
        page: hobby_page,
      });
      hobby_tempy += 29;
      if (hobby_tempy + 24 + 51 > 1019) {
        hobby_tempy = 50;
        hobby_page++;
      }
      setHobbiesContentPos({
        pos: hobby_tempy + 24,
        page: hobby_page,
      });
      hobby_tempy += 24 + 51;
    }

    let add_page = hobby_page,
      add_tempy = hobby_tempy;
    if (cv.additionalInfo) {
      if (add_tempy + 95 > 1019) {
        add_tempy = 50;
        add_page++;
      } else {
        add_tempy += 66;
      }
      setAddPos({
        pos: add_tempy,
        page: add_page,
      });
      add_tempy += 29;
      if (add_tempy + 24 + 51 > 1019) {
        add_tempy = 50;
        add_page++;
      }
      setAddContentPos({
        pos: add_tempy + 24,
        page: add_page,
      });
      add_tempy += 24 + 51;
    }

    let honor_page = add_page,
      honor_tempy = add_tempy,
      honorContent = [];

    if (cv.userAwards) {
      if (cv.userAwards) {
        if (honor_tempy + 95 > 1019) {
          honor_tempy = 50;
          honor_page++;
        } else {
          honor_tempy += 66;
        }
        setHonorPos({
          pos: honor_tempy,
          page: honor_page,
        });
        honor_tempy += 29;
      }

      for (let i = 0; i < cv.userAwards.length; i++) {
        if (honor_tempy + 102 > 1019) {
          honor_tempy = 50;
          honor_page++;
        }
        honorContent.push({
          index: i,
          posy: honor_tempy + 24,
          page: honor_page,
        });
        honor_tempy += 78;
      }
      setHonorsContent(honorContent);
    }

    setTotalPage(honor_page);
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
  };

  const getMax = (a, b, c) => {
    let largest;
    if (a >= b && a >= c) {
      largest = a;
    } else if (b >= a && b >= c) {
      largest = b;
    } else {
      largest = c;
    }
    return largest;
  };

  const prevPage = () => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
    showCanvas(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage == totalPage) return;
    setCurrentPage(currentPage + 1);
    showCanvas(currentPage + 1);
  };

  const getResumeContent = (page) => {
    if (page == 1) {
      return (
        <div className={Styles.resume} id="resume">
          <div className={Styles.profile}>
            {!isEmpty(avatarSrc) ? (
              <NextImage
                src={avatarSrc || "/"}
                width={171}
                height={171}
                alt=""
                ref={avatarRef}
                className={Styles.avatar}
              />
            ) : null}

            <div className={Styles.content}>
              <div className={Styles.name}>{cv?.givenName}</div>
              <div className={Styles.job}>{cv?.jobTitle}</div>
              <div className={Styles.contactlist}>
                <a href="">
                  <NextImage
                    src="/images/Linkedin.png"
                    width={14}
                    height={14}
                    alt=""
                  />
                </a>
                <a href="">
                  <NextImage
                    src="/images/Dribble.png"
                    width={14}
                    height={14}
                    alt=""
                  />
                </a>
                <a href="">
                  <NextImage
                    src="/images/Instagram.png"
                    width={14}
                    height={14}
                    alt=""
                  />
                </a>
                <a href="">
                  <NextImage
                    src="/images/Whatsapp.png"
                    width={14}
                    height={14}
                    alt=""
                  />
                </a>
                <a href="">
                  <NextImage
                    src="/images/Twitter.png"
                    width={14}
                    height={14}
                    alt=""
                  />
                </a>
              </div>
              <div className={Styles.othercontact}>
                <div className={Styles.emailcontact}>
                  <div className={Styles.title}>Email :</div>
                  <div className={Styles.text}>{cv?.email}</div>
                </div>
                <div className={Styles.phonecontact}>
                  <div className={Styles.title}>Phone number :</div>
                  <div className={Styles.text}>{cv?.phone}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.maindescription}>{cv?.description}</div>
          <div className={Styles.information}>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Academic Level :</div>
              <div className={Styles.text}>{cv?.degree?.title}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Website :</div>
              <div className={Styles.text}>{cv?.website}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Gender : </div>
              <div className={Styles.text}>{cv?.gender?.title}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Driving License :</div>
              <div className={Styles.text}>{cv?.drivingLicense?.title}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Salary range :</div>
              <div className={Styles.text}>
                $ {cv?.minSalary} - {cv?.maxSalary} monthly
              </div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Industry :</div>
              <div className={Styles.text}>{cv?.industry?.title}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Address :</div>
              <div className={Styles.text}>{cv?.streetAddress}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Nationality :</div>
              <div className={Styles.text}>{cv?.nationality?.title}</div>
            </div>
            <div className={Styles.infoItem}>
              <div className={Styles.title}>Date Of Birth :</div>
              <div className={Styles.text}>{cv?.dateOfBirth}</div>
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
        <div className={Styles.resume} id="resume">
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
    }
  };

  const getEducationContent = (page) => {
    if (cv.userEducations && cv.userEducations.length > 0) {
      return (
        <>
          {eduPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ top: eduPos.pos, left: 50 }}
            >
              Education
            </div>
          ) : (
            <></>
          )}
          {educationContent.map((item, index) => {
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
            ];
            const fromDate = new Date(cv.userEducations[item.index].fromDate);
            const toDate = new Date(cv.userEducations[item.index].toDate);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.eduContent}
                style={{ top: item.posy, left: 50 }}
              >
                <div className={Styles.title}>
                  {cv.userEducations[item.index].institute}
                </div>
                <div className={Styles.content}>
                  <div className={Styles.location}>
                    {cv.userEducations[item.index]?.city?.title},{" "}
                    {cv.userEducations[item.index]?.country?.title}
                  </div>
                  <div className={Styles.Date}>
                    {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                    {month[toDate.getMonth()]} {toDate.getFullYear()}
                  </div>
                </div>
                <div className={Styles.role}>
                  {cv.userEducations[item.index].major}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getSkillContent = (page) => {
    if (cv.userSkils && cv.userSkils.length > 0) {
      return (
        <>
          {skillPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 524, top: skillPos.pos }}
            >
              Skill
            </div>
          ) : (
            <></>
          )}
          {skillContent.map((item, index) => {
            let percent = [];
            for (let i = 0; i < 5; i++) {
              if (cv.userSkils[item.index].percentage >= (i + 1) * 20) {
                percent.push(<Expdot type={1} />);
              } else if (
                i * 20 < cv.userSkils[item.index].percentage &&
                cv.userSkils[item.index].percentage < (i + 1) * 20
              ) {
                percent.push(<Expdot type={0} />);
              } else {
                percent.push(<Expdot type={-1} />);
              }
            }
            return item.page == page ? (
              <div
                key={index}
                className={Styles.skillContent}
                style={{ top: item.posy, left: 524 }}
              >
                <div className={Styles.title}>
                  {cv.userSkils[item.index].title}
                </div>
                <div className={Styles.percent}>{percent}</div>
                <div className={Styles.content}>
                  <div className={Styles.domination}>
                    {cv.userSkils[item.index].domination.title}
                  </div>
                  <div className={Styles.percentage}>
                    {cv.userSkils[item.index].percentage}%
                  </div>
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getExperienceContent = (page) => {
    if (cv.userExperiences && cv.userExperiences.length > 0) {
      return (
        <>
          {expPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ top: expPos.pos, left: 50 }}
            >
              Experience
            </div>
          ) : (
            <></>
          )}
          {experienceContent.map((item, index) => {
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
            ];
            const fromDate = new Date(cv.userExperiences[item.index].fromDate);
            const toDate = new Date(cv.userExperiences[item.index].toDate);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.expContent}
                style={{ top: item.posy, left: 50 }}
              >
                <div className={Styles.title}>
                  {cv.userExperiences[item.index].title}
                </div>
                <div className={Styles.content}>
                  <div className={Styles.location}>
                    {cv.userExperiences[item.index]?.city?.title},{" "}
                    {cv.userExperiences[item.index]?.country?.title}
                  </div>
                  <div className={Styles.Date}>
                    {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                    {month[toDate.getMonth()]} {toDate.getFullYear()}
                  </div>
                </div>
                <div className={Styles.description}>
                  {cv.userExperiences[item.index].description}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getLanguageContent = (page) => {
    if (cv.userLanguages && cv.userLanguages.length > 0) {
      return (
        <>
          {langPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: langPos.pos }}
            >
              Languages
            </div>
          ) : (
            <></>
          )}
          {languageContent.map((item, index) => {
            let percent = [];
            for (let i = 0; i < 5; i++) {
              if (cv.userLanguages[item.index].percentage >= (i + 1) * 20) {
                percent.push(<Expdot type={1} />);
              } else if (
                i * 20 < cv.userLanguages[item.index].percentage &&
                cv.userLanguages[item.index].percentage < (i + 1) * 20
              ) {
                percent.push(<Expdot type={0} />);
              } else {
                percent.push(<Expdot type={-1} />);
              }
            }
            return item.page == page ? (
              <div
                key={index}
                className={Styles.languageContent}
                style={{ top: item.posy, left: 50 }}
              >
                <div className={Styles.title}>
                  {cv.userLanguages[item.index].language.title}
                </div>
                <div className={Styles.percent}>{percent}</div>
                <div className={Styles.content}>
                  <div className={Styles.level}>
                    {cv.userLanguages[item.index].level.title}
                  </div>
                  <div className={Styles.percentage}>
                    {cv.userLanguages[item.index].percentage}%
                  </div>
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getExpertiseContent = (page) => {
    if (cv.userExpertises && cv.userExpertises.length > 0) {
      return (
        <>
          {langPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 298.5, top: langPos.pos }}
            >
              Expertise
            </div>
          ) : (
            <></>
          )}
          {expertiseContent.map((item, index) => {
            let percent = [];
            for (let i = 0; i < 5; i++) {
              if (cv.userExpertises[item.index].percentage >= (i + 1) * 20) {
                percent.push(<Expdot type={1} />);
              } else if (
                i * 20 < cv.userExpertises[item.index].percentage &&
                cv.userExpertises[item.index].percentage < (i + 1) * 20
              ) {
                percent.push(<Expdot type={0} />);
              } else {
                percent.push(<Expdot type={-1} />);
              }
            }
            return item.page == page ? (
              <div
                key={index}
                className={Styles.expertiseContent}
                style={{ top: item.posy, left: 298.5 }}
              >
                <div className={Styles.title}>
                  {cv.userExpertises[item.index].title}
                </div>
                <div className={Styles.percent}>{percent}</div>
                <div className={Styles.content}>
                  <div className={Styles.level}>
                    {cv.userExpertises[item.index].domination.title}
                  </div>
                  <div className={Styles.percentage}>
                    {cv.userExpertises[item.index].percentage}%
                  </div>
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getCoursesContent = (page) => {
    if (cv.userCourses && cv.userCourses.length > 0) {
      return (
        <>
          {couPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 545, top: couPos.pos }}
            >
              Expertise
            </div>
          ) : (
            <></>
          )}
          {coursesContent.map((item, index) => {
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
            ];
            const fromDate = new Date(cv.userCourses[item.index].fromDate);
            const toDate = new Date(cv.userCourses[item.index].toDate);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.coursesContent}
                style={{ top: item.posy, left: 545 }}
              >
                <div className={Styles.title}>
                  {cv.userCourses[item.index].title}
                </div>
                <div className={Styles.date}>
                  {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                  {month[toDate.getMonth()]} {toDate.getFullYear()}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getInternshipsContent = (page) => {
    if (cv.userInterships && cv.userInterships.length > 0) {
      return (
        <>
          {internPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: internPos.pos }}
            >
              Internships
            </div>
          ) : (
            <></>
          )}
          {internshipsContent.map((item, index) => {
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
            ];
            const fromDate = new Date(cv.userInterships[item.index].fromDate);
            const toDate = new Date(cv.userInterships[item.index].toDate);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.internContent}
                style={{ top: item.posy, left: item.index % 2 == 0 ? 50 : 214 }}
              >
                <div className={Styles.title}>
                  {cv.userInterships[item.index].title}
                </div>
                <div className={Styles.location}>
                  {cv.userInterships[item.index]?.city?.title},{" "}
                  {cv.userInterships[item.index]?.country?.title}
                </div>
                <div className={Styles.date}>
                  {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                  {month[toDate.getMonth()]} {toDate.getFullYear()}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getReferences = (page) => {
    if (cv.userReferences && cv.userReferences.length > 0) {
      return (
        <>
          {referPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 363, top: referPos.pos }}
            >
              References
            </div>
          ) : (
            <></>
          )}
          {referencesContent.map((item, index) => {
            return item.page == page ? (
              <div
                key={index}
                className={Styles.referContent}
                style={{
                  top: item.posy,
                  left: item.index % 2 == 0 ? 363 : 527,
                }}
              >
                <div className={Styles.title}>
                  {cv.userReferences[item.index].fullName}
                </div>
                <div className={Styles.email}>
                  Email : {cv.userReferences[item.index].email}
                </div>
                <div className={Styles.phone}>
                  Phone : {cv.userReferences[item.index].phone}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getExtraActivites = (page) => {
    if (cv.userExtraActivities && cv.userExtraActivities.length > 0) {
      return (
        <>
          {extraPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: extraPos.pos }}
            >
              Extra-curricular Activities
            </div>
          ) : (
            <></>
          )}
          {extracurriContent.map((item, index) => {
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
            ];
            const fromDate = new Date(
              cv.userExtraActivities[item.index].fromDate
            );
            const toDate = new Date(cv.userExtraActivities[item.index].toDate);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.extraContent}
                style={{ top: item.posy, left: 50 }}
              >
                <div className={Styles.title}>
                  {cv.userExtraActivities[item.index].title}
                </div>
                <div className={Styles.content}>
                  <div className={Styles.location}>
                    {cv.userExtraActivities[item.index]?.city?.title},{" "}
                    {cv.userExtraActivities[item.index]?.country?.title}
                  </div>
                  <div className={Styles.date}>
                    {month[fromDate.getMonth()]} {fromDate.getFullYear()} -{" "}
                    {month[toDate.getMonth()]} {toDate.getFullYear()}
                  </div>
                </div>
                <div className={Styles.description}>
                  {cv.userExtraActivities[item.index].description}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };

  const getHobbies = (page) => {
    if (cv.hobbies) {
      return (
        <>
          {hobbiesPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: hobbiesPos.pos }}
            >
              Hobbies
            </div>
          ) : (
            <></>
          )}
          {hobbiesContentPos.page == page ? (
            <div
              className={Styles.hobbyContent}
              style={{ left: 50, top: hobbiesContentPos.pos }}
            >
              {cv.hobbies}
            </div>
          ) : (
            <></>
          )}
        </>
      );
    }
  };

  const getAdditional = (page) => {
    if (cv.additionalInfo) {
      return (
        <>
          {addPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: addPos.pos }}
            >
              Additional information
            </div>
          ) : (
            <></>
          )}
          {addContentPos.page == page ? (
            <div
              className={Styles.hobbyContent}
              style={{ left: 50, top: addPos.pos + 53 }}
            >
              {cv.additionalInfo}
            </div>
          ) : (
            <></>
          )}
        </>
      );
    }
  };

  const getAwards = (page) => {
    if (cv.userAwards && cv.userAwards.length > 0) {
      return (
        <>
          {honorPos.page == page ? (
            <div
              className={Styles.componentTitle}
              style={{ left: 50, top: honorPos.pos }}
            >
              HONORS & AWARDs
            </div>
          ) : (
            <></>
          )}
          {honorsContent.map((item, index) => {
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
            ];
            const fromDate = new Date(cv.userAwards[item.index].date);
            return item.page == page ? (
              <div
                key={index}
                className={Styles.honorContent}
                style={{ top: item.posy, left: 50 }}
              >
                <div className={Styles.content}>
                  <div className={Styles.title}>
                    {cv.userAwards[item.index].title}
                  </div>
                  <div className={Styles.date}>
                    {month[fromDate.getMonth()]} {fromDate.getFullYear()}
                  </div>
                </div>
                <div className={Styles.description}>
                  {cv.userAwards[item.index].description}
                </div>
              </div>
            ) : (
              <div key={index}></div>
            );
          })}
        </>
      );
    }
  };
  //***************************
  // Define UseEffect
  //***************************
  useEffect(() => {
    filterContents();
    const avatar = new Image();
    avatar.crossOrigin = "*";
    var imagecanvas = document.createElement("canvas");
    var imagecontext = imagecanvas.getContext("2d");
    const avatarImg = new Image();
    avatarImg.src = cv.avatar;
    avatarImg.crossOrigin = "*";
    avatarImg.onload = () => {
      const maskImg = new Image();
      maskImg.src = "/images/mask.png";
      maskImg.crossOrigin = "*";
      maskImg.onload = () => {
        imagecanvas.width = maskImg.width;
        imagecanvas.height = maskImg.height;
        imagecontext.drawImage(maskImg, 0, 0, maskImg.width, maskImg.height);
        imagecontext.globalCompositeOperation = "source-in";
        imagecontext.drawImage(avatarImg, 0, 0, maskImg.width, maskImg.height);
        setAvatarSrc(imagecanvas.toDataURL("image/png"));
      };
    };
  }, [cv?.avatar]);

  useEffect(() => {
    if (avatarSrc) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const scale = window.devicePixelRatio;
      context.scale(1 / scale, 1 / scale);
      showCanvas(currentPage);
    }
  }, [avatarSrc]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      showCanvas(currentPage);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [cv]);

  return (
    <>
      <div className={Styles.resumeContent}>
        {getResumeContent(currentPage)}
      </div>

      <div className="pl-4">
        <div style={{ height: "calc(100vh - 143px)" }}>
          <canvas
            ref={canvasRef}
            width={720}
            height={1023}
            style={{
              transform: "scale(" + 1 + ")",
            }}
            className={Styles.canvas}
          ></canvas>
        </div>

        <div className={Styles.pagination}>
          <div
            className={
              Styles.prev + " " + (currentPage == 1 ? Styles.disabled : "")
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
          <div className={Styles.pageInfo}>
            {currentPage} / {totalPage}
          </div>
          <div
            className={
              Styles.next +
              " " +
              (currentPage == totalPage ? Styles.disabled : "")
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
            className={Styles.button}
            onClick={generatePDF}
            type="button"
          >
            {loader ? <Spin /> : "Export PDF"}
          </Button>
        </div>
      </div>
      <ThemeModal
        onClick={generatePDF}
        visible={modalTheme}
        theme={theme}
        loader={loader}
        handleClose={() => setModalTheme(false)}
      />
    </>
  );
}
