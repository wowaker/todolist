import styles from "./Checkbox.module.scss";

const Checkbox = (props) => {
    const {className, checked, onChange} = props;

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
