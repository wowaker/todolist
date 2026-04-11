import Router from "./routing/Router";
import { routes } from "@/app/routes";
import "./styles";

const App = () => {
  return <Router routes = {routes} />;
};

export default App;
