import styles from "./Field.module.scss";
import {ChangeEventHandler, Ref} from 'react'

type FieldProps = {
    className?: string;
    id?: string;
    label?: string;
    type?: string;
    value?: string;
    error?: string;
    newTaskInputRef?: Ref<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const Field = (props: FieldProps) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    value,
    error,
    newTaskInputRef,
    onChange,
  } = props;

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        ref={newTaskInputRef}
        onChange={onChange}
      />
      {error && (
        <span className={styles.error} title={error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Field;
