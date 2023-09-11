import React from "react";
import { FaCheck } from "react-icons/fa";
import "./checkbox.css";

export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  disabled,
  className,
  labelClassName,
}) => {
  return (
    <div
      style={{ marginRight: "0px" }}
      className={`checkbox ${className && className !== "" ? className : ""}`}
    >
      <input
        type="checkbox"
        disabled={disabled === undefined ? false : disabled}
        onChange={onChange}
        id={name}
        name={name}
        checked={checked}
      />
      <label
        htmlFor={name}
        className={labelClassName ? labelClassName : "text-xs"}
      >
        <span className="box">
          <FaCheck className="check-icon" />
        </span>
        {label || ""}
      </label>
    </div>
  );
};

export default Checkbox;
