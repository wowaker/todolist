import { memo } from "react";
import RouterLink from "@/shared/ui/RouterLink";
import styles from "./TodoItem.module.scss";
import {useTasksContext} from "@/entities/todo/model/useTasksContext.tsx";
import Checkbox from "@/shared/ui/Checkbox";

type TodoItemProps = {
  className?: string;
  id: number;
  title?: string;
  isDone?: boolean;
}

const TodoItem = (props: TodoItemProps) => {
  const { className = "", id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
  } = useTasksContext();

  return (
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${disappearingTaskId === id ? styles.isDisappearing : ""}
        ${appearingTaskId === id ? styles.isAppearing : ""}
      `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      {/*<Checkbox /> --- в процессе, но стили уже мигрировали*/}
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={(event) => {
          toggleTaskComplete(id, event.target.checked);
        }}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        {title}
      </RouterLink>
      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)}
      >
      </button>
    </li>
  );
};

export default memo(TodoItem);
