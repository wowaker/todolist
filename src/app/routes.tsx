import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import type { ComponentType } from "react";

export type Routes = {
    "/": ComponentType;
    "/tasks/:id": ComponentType<{id: string}>;
    "*": ComponentType;
};

export const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404</div>
};
