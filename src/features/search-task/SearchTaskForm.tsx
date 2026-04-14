import { ChangeEventHandler } from 'react';
import { useTasksContext } from '@/entities/todo';
import Field from '@/shared/ui/Field';
import styles from './SearchTaskForm.module.scss';

const SearchTaskForm = () => {
    const {searchQuery, setSearchQuery} = useTasksContext();

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchQuery(event?.target.value);
    };

    return (
        <form className={styles.form}
              onSubmit={(event) => event.preventDefault()}>
            <Field
                wrapperClassName={styles.field}
                labelName="Search task"
                id="search-task"
                type="search"
                value={searchQuery}
                onChange={onChange}
            />
        </form>
    );
};

export default SearchTaskForm;
