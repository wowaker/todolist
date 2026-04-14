import { useEffect, useState } from 'react';
import TasksPage from '@/pages/TasksPage';
import TaskPage from '@/pages/TaskPage';

export const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404</div>
} as const;


const matchPath = (path: string, route: string) => {
    const pathParts = path.split('/').filter(Boolean);
    const routePaths = route.split('/').filter(Boolean);

    if (pathParts.length !== routePaths.length) {
        return null
    }

    const params: Record<string, string> = {}

    for (let i = 0; i < routePaths.length; i++) {
        if (routePaths[i].startsWith(':')) {
            const paramName = routePaths[i].slice(1)

            params[paramName] = pathParts[i]
        } else if (routePaths[i] !== pathParts[i]) {
            return null
        }
    }

    return params;
}

export const useRoute = (): string => {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    return path;
};

const Router = (props: { routes: typeof routes }) => {
    const {routes} = props;
    const path = useRoute();

    const taskParams = matchPath(path, '/tasks/:id');
    if (taskParams) {
        const Page = routes['/tasks/:id'];
        return <Page id={taskParams.id} />;
    }

    if (path === '/') {
        const Page = routes['/'];
        return <Page />;
    }

    const NotFound = routes['*'];
    return <NotFound />;
};

export default Router;
