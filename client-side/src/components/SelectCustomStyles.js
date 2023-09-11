import React from "react";
import { components } from "react-select";
import "./customStyles.css";

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? "#5897FB" : "white",
    color: state.isFocused || state.isSelected ? "white" : "black",
    fontweight: "normal",
    display: "block",
    whitespace: "pre",
    minheight: "1.2em",
    padding: "0px 5px 1px",
    fontSize: "12px",
  }),

  menu: (provided) => ({
    ...provided,
    margin: 0,
    zIndex: 999,
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#8e8e8e",
    fontSize: "12px",
  }),

  menuList: () => ({
    background: "#FFFFFF",
    border: "1px solid #5897FB",
    maxHeight: "200px",
    overflow: "auto",
  }),

  control: (base, state) => ({
    display: "flex",
    justifyContent: "space-between",
    border: state.isFocused ? "1px solid #00A6E9" : "1px solid #dfdfdf",
    borderRadius: "4px",
    height: "36.5px",
    background: "#FFFFFF",
    fontSize: "14px",
  }),

  valueContainer: () => ({
    padding: "0px 5px",
  }),

  indicatorSeparator: () => ({
    background: "transparent",
  }),

  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
};

export const customStylesAdmin = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused || state.isSelected ? "#5897FB" : "white",
    color: state.isFocused || state.isSelected ? "white" : "black",
    fontweight: "normal",
    display: "block",
    whitespace: "pre",
    minheight: "1.2em",
    padding: "0px 5px 1px",
    fontSize: "12px",
  }),

  menu: (provided) => ({
    ...provided,
    margin: 0,
    zIndex: 999,
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "12px",
    paddingLeft: "5px",
  }),

  menuList: () => ({
    background: "#FFFFFF",
    border: "1px solid #5897FB",
    maxHeight: "200px",
    overflow: "auto",
  }),

  control: (base, state) => ({
    display: "flex",
    justifyContent: "space-between",
    border: state.isFocused ? "1px solid #00A6E9" : "1px solid #dfdfdf",
    borderRadius: "4px",
    height: "34px",
    background: "#FFFFFF",
  }),

  valueContainer: () => ({
    padding: "3px 6px",
  }),

  indicatorSeparator: () => ({
    background: "transparent",
  }),

  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
};

// this is done to remove onMouseMove and onMouseOver props and add own stying(customStyles.css) to optimize the select component
export const CustomOption = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <components.Option className="custom-option" {...newProps}>
      {children}
    </components.Option>
  );
};

// this is select specific options
export const selectActions = ["menu-close", "input-blur", "set-value"];
