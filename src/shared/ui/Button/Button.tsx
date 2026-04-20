import { ComponentProps } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
    variant?: string;
    isDisabled?: boolean;
    type?: 'button';
}

const Button = (props: ButtonProps) => {
    const {
        className = '',
        variant = 'primary',
        type = 'button',
        children,
        isDisabled,
        onClick,
        ...restProps

    } = props;

    return (
        <button
            className={`${styles[variant]} ${className}`}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;
