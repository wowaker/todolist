import { useState, useEffect, useRef, useCallback, useMemo, useReducer } from "react";
import tasksAPI from "@/shared/api/tasks";
import {Task} from "@/entities/todo/model/types.ts";

type Action =
    | { type: "SET_ALL"; tasks: Task[] }
    | { type: "ADD"; task: Task }
    | { type: "TOGGLE_COMPLETE"; id: number; isDone: boolean }
    | { type: "DELETE"; id: number }
    | { type: "DELETE_ALL" };

const tasksReducer = (state: Task[], action: Action) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case "ADD": {
      return [...state, action.task];
    }
    case "TOGGLE_COMPLETE": {
      const { id, isDone } = action;

      return state.map((task: Task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case "DELETE": {
      return state.filter((task: Task) => task.id !== action.id);
    }
    case "DELETE_ALL": {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState<number | null>(null);
  const [appearingTaskId, setAppearingTaskId] = useState<number | null>(null);

  const newTaskInputRef = useRef<HTMLInputElement | null>(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: "DELETE_ALL" }));
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId: number) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        dispatch({ type: "DELETE", id: taskId });
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId: number, isDone: boolean) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: "TOGGLE_COMPLETE", id: taskId, isDone });
    });
  }, []);

  const addTask = useCallback((title: string, callbackAfterAdding: () => void) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
      callbackAfterAdding();
      setSearchQuery("");
      newTaskInputRef.current?.focus();
      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current?.focus();

    tasksAPI.getAll().then((serverTasks) => {
      dispatch({ type: "SET_ALL", tasks: serverTasks });
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter((task: Task) => task.title.toLowerCase().includes(clearSearchQuery))
      : null;
  }, [searchQuery, tasks]);

  return {
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
  };
};

export default useTasks;
