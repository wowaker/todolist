import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import type { FC } from "react";

export type Routes = {
    "/": FC;
    "/tasks/:id": FC<{id: string}>;
    "*": FC;
};

export const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404</div>
};
