import { ComponentProps } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = (props: Omit<ComponentProps<'input'>, 'type'>) => {
    const {
        className,
        checked,
        onChange,
        ...restProps
    } = props;

    return (
        <input
            type="checkbox"
            className={`${styles.checkbox} ${className}`}
            checked={checked}
            onChange={onChange}
            {...restProps}
        />
    );
};

export default Checkbox;
