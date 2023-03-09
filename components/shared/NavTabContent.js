import React from "react";
export default function NavTabContent({ children, theme }) {
  const styles = {
    background: theme ? "#F2F2F8" : "#292A3A",
    borderRadius: 12,
    padding: "10px 15px",
  };
  return <div style={styles}>{children}</div>;
}
