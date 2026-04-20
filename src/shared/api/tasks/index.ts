import type { Task } from '@/entities/todo';

const URL = 'http://localhost:3001/tasks';

const headers = {
    'Content-Type': 'application/json',
};

type TaskWithoutId = Omit<Task, 'id'>;

const tasksAPI = {
    getAll: (): Promise<Task[]> => {
        return fetch(URL).then((response) => response.json());
    },

    getById: (id: string): Promise<Task> => {
        return fetch(`${URL}/${id}`).then((response) => response.json());
    },

    add: (task: TaskWithoutId): Promise<Task> => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        }).then((response) => response.json());
    },

    delete: (id: string): Promise<Response> => {
        return fetch(`${URL}/${id}`, {method: 'DELETE'});
    },

    deleteAll: (ids: string[]): Promise<Response[]>  => {
        return Promise.all(ids.map(id => tasksAPI.delete(id)));
    },

    toggleComplete: (id: string, isDone: boolean): Promise<Response> => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({isDone}),
        });
    },
};

export default tasksAPI;
