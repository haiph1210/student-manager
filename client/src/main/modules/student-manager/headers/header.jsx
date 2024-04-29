import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {userManagerSetting} from "../../../utils/setting";
import {Link} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {MenuItem} from "@mui/material";

export default function Header(props) {
    const [loginStatus, setLoginStatus] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [settings, setSettings] = React.useState(null);
    const [userProfile, setUserProfile] = React.useState(null);

    useEffect(() => {
        const login = localStorage.getItem("LS_LOGIN_STATUS");
        const user = localStorage.getItem("LS_USER_PROFILE");
        if (login) {
            setLoginStatus(login);
            setSettings(userManagerSetting[0]);
            setUserProfile(user);
        } else {
            setSettings(userManagerSetting[1]);
        }
        console.log(settings)
    }, [settings]);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Container maxWidth="xl" className={"d-flex justify-content-end"}>
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="user" src={userProfile && userProfile.avatarUrl}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings && settings.login.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    component={Link}
                                    to={item.path}
                                    onClick={handleCloseUserMenu}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <span className={'m-sm-3'}>{userProfile && userProfile.fullName}</span>
                </Toolbar>
            </Container>
        </>
    );
}

