import {Task} from "@/entities/todo/model/types.ts";

const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },

  getById: (id: number) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (task: Task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },

  delete: (id: number) => {
    return fetch(`${URL}/${id}`, { method: "DELETE" });
  },

  deleteAll: (tasks: Task[]) => {
    return Promise.all(
      tasks.map(({ id }) => {
        if (typeof id === "number") {
          tasksAPI.delete(id);
        }
      }),
    );
  },

  toggleComplete: (id: number, isDone: boolean) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
