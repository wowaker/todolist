import styles from "./Button.module.scss";
import {ReactNode} from "react";

type ButtonProps = {
  className?: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
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
