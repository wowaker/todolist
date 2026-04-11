import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";
import { useContext, useState } from "react";
import { TasksContext } from "@/entities/todo/index.js";
import styles from './AddTaskForm.module.scss'

const AddTaskForm = () => {

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const { addTask, newTaskInputRef } = useContext(TasksContext);

  const [error, setError] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const addTaskOnSubmit = (event) => {
    event.preventDefault();

    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle, () => setNewTaskTitle(""));
    }
  };

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "The task can not be empty" : "");
  };

  return (
    <form className={styles.form} onSubmit={addTaskOnSubmit}>
      <Field
        className={styles.field}
        label="New task Title"
        id="new-task"
        value={newTaskTitle}
        error={error}
        newTaskInputRef={newTaskInputRef}
        onInput={onInput}
      />
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
