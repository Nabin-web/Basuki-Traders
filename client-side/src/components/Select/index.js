import Select from "react-select";

const SelectWrapper = (props) => {
  return (
    <div className={`${props.className && props.className} text-xs`}>
      {props.label !== undefined && props.label !== null && (
        <span className={`${props.labelClassName && props.labelClassName} `}>
          {props.label}{" "}
          {props.isRequired ? <span className="text-red-500">*</span> : null}
        </span>
      )}
      <div className={`${props.selectClassName && props.selectClassName}`}>
        <Select isSearchable {...props} className="w-full" />
      </div>
    </div>
  );
};

export default SelectWrapper;
