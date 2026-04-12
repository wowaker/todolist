import Field from "@/shared/ui/Field";
import {useTasksContext} from "@/entities/todo/model/useTasksContext.tsx";
import {ChangeEvent} from "react";
import styles from './SearchTaskForm.module.scss'

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useTasksContext();

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
        }}
      />
    </form>
  );
};

export default SearchTaskForm;
