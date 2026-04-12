import {useEffect, useState} from "react";
import {Routes} from "@/app/routes";


interface RouterProps {
  routes: Routes;
}

export const useRoute = (): string  => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

const Router = (props: RouterProps) => {
  const { routes } = props;
  const path= useRoute();

  if (path.startsWith("/tasks/")) {
    const id = path.replace("/tasks/", "");
    const TaskPage = routes["/tasks/:id"];

    return <TaskPage id={id} />;
  }

  const Page = routes['/'] ?? routes["*"]; // затычка, надо поправить

  return <Page />;
};

export default Router;
