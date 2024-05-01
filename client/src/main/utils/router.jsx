// Trong file router.jsx
import {useRoutes} from "react-router-dom";
import Dashboard from "../modules/student-manager/dasboard/dashboard";
import Login from "../modules/components/scrren/authentication/login/login";
import NotFound from "../modules/components/scrren/404/NotFound";
import Register from "../modules/components/scrren/authentication/register/register";
import Faculty from "../modules/components/scrren/page/faculty-manager/faculty";

export const useAppRoutes = () => {
    return useRoutes([
        {
            path: "/", element: <Dashboard/>,
            children: [
                // {
                //     path: "/faculty", element: <Faculty/>
                // },
            ]
        },
        {
            path: "/faculty", element: <Faculty/>
        },
        {
            path: "/login", element: <Login/>
        },
        {
            path: "/register", element: <Register/>
        },
        {
            path: "/404-not-found", element: <NotFound/>
        },
    ])
        ;
};
