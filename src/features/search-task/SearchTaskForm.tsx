import Field from "@/shared/ui/Field";
import {useTasksContext} from "@/entities/todo/model/useTasksContext.tsx";
import styles from './SearchTaskForm.module.scss'
import {ChangeEventHandler} from "react";

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useTasksContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setSearchQuery(event?.target.value);
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Field
        className={styles.field}
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onChange={onChange}
      />
    </form>
  );
};

export default SearchTaskForm;
