import {useAppRoutes} from "./main/utils/router";

function App() {
    const routes = useAppRoutes();
    return (
        <>
            {routes}
        </>
    );
}

export default App;
