import {useAppRoutes} from "./main/utils/router";
import ErrorBoundary from "./main/modules/student-manager/error/errorboundary";

function App() {
    const routes = useAppRoutes();
    return (
        <>
            <ErrorBoundary>
                {routes}
            </ErrorBoundary>
        </>
    );
}

export default App;
