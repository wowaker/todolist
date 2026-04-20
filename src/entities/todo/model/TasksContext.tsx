import { createContext, ReactNode, Ref, RefObject, useMemo } from 'react';
import useTasks from './useTasks.ts';
import useIncompleteTaskScroll from './useIncompleteTaskScroll.ts';
import type { Task } from './types.ts';


type TasksContextType = {
    tasks: Task[];
    filteredTasks: Task[] | null;
    deleteTask: (taskId: string) => void;
    deleteAllTasks: () => void;
    toggleTaskComplete: (taskId: string, isDone: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    newTaskInputRef: Ref<HTMLInputElement>;
    addTask: (title: string, callbackAfterAdding: () => void) => void;
    disappearingTaskId: string | null;
    appearingTaskId: string | null;
    firstIncompleteTaskRef: RefObject<HTMLLIElement | null>;
    firstIncompleteTaskId?: string;
}

type TaskProviderProps = {
    children: ReactNode;
}

export const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = (props: TaskProviderProps) => {
    const {children} = props;

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    } = useTasks();

    const {firstIncompleteTaskRef, firstIncompleteTaskId} =
        useIncompleteTaskScroll(tasks);

    const value = useMemo(
        () => ({
            tasks,
            filteredTasks,
            deleteTask,
            deleteAllTasks,
            toggleTaskComplete,
            searchQuery,
            setSearchQuery,
            newTaskInputRef,
            addTask,
            disappearingTaskId,
            appearingTaskId,
            firstIncompleteTaskRef,
            firstIncompleteTaskId,
        }),
        [
            tasks,
            filteredTasks,
            deleteTask,
            deleteAllTasks,
            toggleTaskComplete,
            searchQuery,
            setSearchQuery,
            newTaskInputRef,
            addTask,
            disappearingTaskId,
            appearingTaskId,
            firstIncompleteTaskRef,
            firstIncompleteTaskId,
        ],
    );

    return <TasksContext.Provider
        value={value}> {children} </TasksContext.Provider>;
};
