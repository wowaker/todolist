import Router from './routing/Router';
import { routes } from './routing/Router';
import './styles';

const App = () => {
    return <Router routes={routes}/>;
};

export default App;
