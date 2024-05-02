// Trong file router.jsx
import {useRoutes} from "react-router-dom";
import Dashboard from "../modules/student-manager/dasboard/dashboard";
import Login from "../modules/components/scrren/authentication/login/login";
import NotFound from "../modules/components/scrren/404/NotFound";
import Register from "../modules/components/scrren/authentication/register/register";
import Faculty from "../modules/components/scrren/page/faculty-manager/faculty";
import Major from "../modules/components/scrren/page/major-manager/major";
import Class from "../modules/components/scrren/page/class-manager/class";
import Subject from "../modules/components/scrren/page/subject-manager/subject";

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
        // children Dashboard
        {
            path: "/faculty", element: <Faculty/>
        },
        {
            path: "/major", element: <Major/>
        },
        {
            path: "/class", element: <Class/>
        },
        {
            path: "/subject", element: <Subject/>
        },
        // =================

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
