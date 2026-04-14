import AddTaskForm from '@/features/add-task';
import SearchTaskForm from '@/features/search-task';
import TodoInfo from '@/features/stats';
import { TodoList } from '@/entities/todo';
import Button from '@/shared/ui/Button';
import { useTasksContext } from '@/entities/todo';
import styles from './Todo.module.scss';

const Todo = () => {
    const {firstIncompleteTaskRef} = useTasksContext();
    return (
        <div className={styles.todo}>
            <h1 className={styles.title}>To Do List</h1>
            <AddTaskForm/>
            <SearchTaskForm/>
            <TodoInfo/>
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})
                }
            >
                Show first incomplete task
            </Button>
            <TodoList/>
        </div>
    );
};

export default Todo;
