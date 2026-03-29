import styles from "./Field.module.scss";

const Field = (props) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    value,
    error,
    newTaskInputRef,
    onInput,
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
        onInput={onInput}
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
