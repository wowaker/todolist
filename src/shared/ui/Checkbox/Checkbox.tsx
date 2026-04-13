import styles from "./Checkbox.module.scss";

type CheckboxProps = {
    className?: string;
    checked?: boolean;
    onChange?: () => void;
}

const Checkbox = (props: CheckboxProps) => {
    const {
        className,
        checked,
        onChange
    } = props;

    return (
        <input
            type='checkbox'
            className={`${styles.checkbox} ${className}`}
            checked={checked}
            onChange={onChange}
        />
    );
};

export default Checkbox;
