import { ComponentProps, Ref } from 'react';
import styles from './Field.module.scss';

interface FieldProps extends ComponentProps<'input'> {
    wrapperClassName?: string;
    labelName?: string;
    error?: string;
    newTaskInputRef?: Ref<HTMLInputElement>;
}

const Field = (props: FieldProps) => {
    const {
        wrapperClassName = '',
        labelName,
        type = 'text',
        value,
        error,
        newTaskInputRef,
        onChange,
        ...inputProps
    } = props;

    return (
        <div className={`${styles.field} ${styles.form} ${wrapperClassName}`}>
            <label className={styles.label} htmlFor={inputProps.id}>
                {labelName}
            </label>
            <input
                className={`${styles.input} ${error ? styles.isInvalid : ''}`}
                id={inputProps.id}
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
