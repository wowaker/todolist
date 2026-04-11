import { useEffect, useState } from "react";
import tasksApi from "@/shared/api/tasks";
import {Task} from "@/entities/todo/model/types.ts";

type TaskPageProps = {
  id: string
}

const TaskPage = (props: TaskPageProps) => {
  const { id } = props;

  const [task, setTask] = useState<Task| null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksApi
      .getById(id)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.isDone ? "Задача выполнена" : "Задача не выполнена"}</p>
    </div>
  );
};

export default TaskPage;
