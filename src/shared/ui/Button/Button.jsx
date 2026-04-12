import styles from "./Button.module.scss";

const Button = (props) => {
  const {
    className = "",
    variant = 'primary',
    type = "button",
    children,
    isDisabled,
    onClick
  } = props;

  return (
    <button
      className={`${styles[variant]} ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
