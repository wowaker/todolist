import type { Task } from '@/entities/todo';

const URL = 'http://localhost:3001/tasks';

const headers = {
    'Content-Type': 'application/json',
};

type TaskWithoutId = Omit<Task, 'id'>;

const tasksAPI = {
    getAll: () => {
        return fetch(URL).then((response) => response.json());
    },

    getById: (id: string) => {
        return fetch(`${URL}/${id}`).then((response) => response.json());
    },

    add: (task: TaskWithoutId) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        }).then((response) => response.json());
    },

    delete: (id: number) => {
        return fetch(`${URL}/${id}`, {method: 'DELETE'});
    },

    deleteAll: (ids: number[]) => {
        return Promise.all(ids.map(id => tasksAPI.delete(id)));
    },

    toggleComplete: (id: number, isDone: boolean) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({isDone}),
        });
    },
};

export default tasksAPI;
