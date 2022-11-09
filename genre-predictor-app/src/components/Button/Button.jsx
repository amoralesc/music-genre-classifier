/* eslint-disable react/button-has-type */
import "./Button.css";

const Button = ({
  variant = "primary",
  outline = false,
  size = "md",
  type = "button",
  onClick,
  children,
}) => {
  // map the variant prop to a CSS class
  const variantClass = `btn-${outline ? "outline-".concat(variant) : variant}`;
  const classes = `btn ${variantClass} btn-${size}`;

  return (
    <button type={type || "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
