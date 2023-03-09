import React from "react";
export default function SubSidebarItem({ children }) {
  return (
    <div
      className="flex flex-col items-stretch justify-between"
      style={{ width: 210 }}
    >
      {children}
    </div>
  );
}
