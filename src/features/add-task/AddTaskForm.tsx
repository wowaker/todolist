import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useTasksContext } from '@/entities/todo';
import Field from '@/shared/ui/Field';
import Button from '@/shared/ui/Button';
import styles from './AddTaskForm.module.scss';

const AddTaskForm = () => {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const {addTask, newTaskInputRef} = useTasksContext();

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const addTaskOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle, () => setNewTaskTitle(''));
        }
    };

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value} = event.target;
        const clearValue = value.trim();
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
        setNewTaskTitle(value);
        setError(hasOnlySpaces ? 'The task can not be empty' : '');
    };

    return (
        <form className={styles.form} onSubmit={addTaskOnSubmit}>
            <Field
                labelName="New task Title"
                id="new-task"
                value={newTaskTitle}
                error={error}
                newTaskInputRef={newTaskInputRef}
                onChange={onChange}
            />
            <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
                Add
            </Button>
        </form>
    );
};

export default AddTaskForm;
