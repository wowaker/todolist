import { memo } from "react";
import { TodoItem } from "@/entities/todo/index.js";
import {Task} from "@/entities/todo/model/types.ts";
import styles from "./Todolist.module.scss";
import {useTasksContext} from "@/entities/todo/model/useTasksContext.tsx";

const TodoList = () => {
  const { tasks, filteredTasks } = useTasksContext();

  const hasTasks = tasks?.length > 0;

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks</div>;
  }

  if (hasTasks && filteredTasks?.length === 0) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task: Task) => (
        <TodoItem className={styles.item} key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
