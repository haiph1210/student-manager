// Trong file router.jsx
import {useRoutes} from "react-router-dom";
import Dashboard from "../modules/student-manager/dasboard/dashboard";
import Login from "../modules/components/scrren/login/login";
import NotFound from "../modules/components/scrren/404/NotFound";

export const useAppRoutes = () => {
    return useRoutes([
        {
            path: "/", element: <Dashboard/>,
            children: [
                // {path: "/login", element: <Login/>},
            ]
        },
        {
            path: "/login", element: <Login/>
        },
        {
            path: "/404-not-found", element: <NotFound/>
        },
    ])
        ;
};
