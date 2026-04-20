import { memo, useMemo } from 'react';
import { useTasksContext } from '@/entities/todo';
import styles from './TodoInfo.module.scss';

const TodoInfo = () => {
    const {tasks, deleteAllTasks} = useTasksContext();

    const total = tasks?.length;
    const hasTasks = total > 0;
    const doneCount = useMemo(() => {
        return tasks?.filter(({isDone}) => isDone).length;
    }, [tasks]);

    return (
        <div className={styles.info}>
            <div className={styles.totalTasks}>
                Done {doneCount} from {total}
            </div>
            {hasTasks && (
                <button className={styles.deleteAllButton} type="button"
                        onClick={deleteAllTasks}>
                    Delete all
                </button>
            )}
        </div>
    );
};

export default memo(TodoInfo);
