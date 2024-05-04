// Trong file router.jsx
import {useRoutes, Outlet} from "react-router-dom";
import Dashboard from "../modules/student-manager/dasboard/dashboard";
import Login from "../modules/components/scrren/authentication/login/login";
import NotFound from "../modules/components/scrren/404/NotFound";
import Register from "../modules/components/scrren/authentication/register/register";
import Faculty from "../modules/components/scrren/page/faculty-manager/faculty";
import Major from "../modules/components/scrren/page/major-manager/major";
import Class from "../modules/components/scrren/page/class-manager/class";
import Schedule from "../modules/components/scrren/page/schedule-manager/schedule";
import Subject from "../modules/components/scrren/page/subject-manager/subject";
import User from "../modules/components/scrren/page/user-manager/user";
import Home from "../modules/components/scrren/page/home-manager/home";
import Logout from "../modules/components/scrren/authentication/logout/logout";

export const useAppRoutes = () => {
    return useRoutes([
        {
            path: "/", element: <Dashboard/>,
            children: [
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
                {
                    path: "/schedule", element: <Schedule/>
                },
                {
                    path: "/user", element: <User/>
                },
                {
                    path: "/", element: <Home/>
                },
                {
                    path: "/", element: <Outlet/>
                },
            ]
        },
        {
            path: "/login", element: <Login/>
        },
        {
            path: "/register", element: <Register/>
        },
        {
            path: "/logout", element: <Logout/>
        },
        {
            path: "/404-not-found", element: <NotFound/>
        },
    ])
        ;
};
