import { useRef } from "react";
import {Task} from "@/entities/todo/model/types.ts";

const useIncompleteTaskScroll = (tasks: Task[]) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks?.find((task) => !task.isDone)?.id;

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  };
};

export default useIncompleteTaskScroll;
