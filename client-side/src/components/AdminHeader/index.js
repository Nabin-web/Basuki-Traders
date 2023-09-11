import React from "react";

const AdminHeader = ({ children, className }) => {
  return <div className={className ?? "text-lg font-semibold"}>{children}</div>;
};

export default AdminHeader;
