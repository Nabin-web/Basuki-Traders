import "./style.css";

const Button = ({
  onClick,
  children,
  loading,
  disabled,
  fullWidth,
  type,
  className,
}) => {
  return (
    <button
      className={`${
        className ||
        "bg-primary text-white text-center p-3 flex items-center justify-center text-xs"
      } disabled:cursor-not-allowed disabled:bg-gray-600 ${
        fullWidth ? "w-full" : ""
      }`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type ?? "button"}
    >
      {!loading ? (
        <>{children}</>
      ) : (
        <svg className="loader-svg" viewBox="25 25 50 50">
          <circle className="loader-circle" r="20" cy="50" cx="50"></circle>
        </svg>
      )}
    </button>
  );
};

export default Button;
