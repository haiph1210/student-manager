import HouseIcon from '@mui/icons-material/House';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GradingIcon from '@mui/icons-material/Grading';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';

export const setting = [
    {"title": "Trang chủ", "icon": <HouseIcon/>, "path": "/"},
    {
        "title": "Quản lý khoa", "icon": <AssignmentTurnedInIcon/>, "path": "/faculty",
        "role": ["ADMIN", "USER"],
        // "children": [
        //     {"title": "Danh sách khoa", "icon": <AssignmentTurnedInIcon/>, "path": "/faculty"},
        // ]
    },
    {"title": "Quản lý ngành học", "icon": <GradingIcon/>, "path": "/major"},
    {"title": "Quản lý người dùng", "icon": <AccountCircleIcon/>, "path": "/user"},
    {"title": "Quản lý lớp học", "icon": <SchoolIcon/>, "path": "/class"},
    {"title": "Quản lý môn học", "icon": <MenuBookIcon/>, "path": "/subject"},
    {"title": "Quản lý thời khóa biểu", "icon": <CalendarMonthIcon/>, "path": "/schedule"}
]

export const userManagerSetting =
    [
        {
            "login": [
                {"title": "Trang cá nhân", "icon": <InfoIcon/>, "path": "/profile"},
                {"title": "Đổi mật khẩu", "icon": <ManageAccountsIcon/>, "path": "/change-password"},
                {"title": "Đăng xuất", "icon": <LogoutIcon/>, "path": "/logout"},
            ]
        },
        {
            "login": [
                {"title": "Đăng kí", "icon": <AppRegistrationIcon/>, "path": "/register"},
                {"title": "Đăng nhập", "icon": <LoginIcon/>, "path": "/login"},
            ]
        }
    ]