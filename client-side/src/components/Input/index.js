import React from "react";

const InputWrapper = ({
  value,
  onChange,
  placeholder,
  divClassName,
  inputClassName,
  name,
  labelClassName,
  label,
}) => {
  return (
    <div className={divClassName || "text-xs flex flex-col"}>
      <label htmlFor={name} className={labelClassName || ""}>
        {label}
      </label>
      <input
        className={inputClassName || "inputbox"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default InputWrapper;
