import { ComponentProps } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ComponentProps<'button'> {
    variant?: string;
    isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const {
        className = '',
        variant = 'primary',
        type = 'button',
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
