import { RiArrowLeftLine } from "react-icons/ri";
import "./style.css";

export const BackButton = ({ onClick }) => {
  return (
    <span className="backbtn" onClick={onClick}>
      <RiArrowLeftLine className="text-lg" />
    </span>
  );
};
