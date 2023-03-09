import React, { useEffect } from "react";
const SiteBody = ({ children, theme }) => {
  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    if (theme) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }, [theme]);
  return <div>{children}</div>;
};
export default SiteBody;
