import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from "react-router-dom";
import {setting} from "../../../utils/setting";
import Header from "../headers/header";
import Footer from "../footer/footer";
import {useEffect} from "react";

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Dashboard(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [childMenu, setChildMenu] = React.useState(null);
    const [isAuth, setIsAuth] = React.useState(null);

    useEffect(() => {
        const loginResp = localStorage.getItem("auth");
        if (loginResp) {
            setIsAuth(loginResp)
        }
    }, []);
    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (item.children) {
            setChildMenu(item.children);
        } else {
            setChildMenu(null);
        }
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={"container"}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{mr: 2, ...(open && {display: 'none'})}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Header/>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        {isAuth &&
                            <List>
                                {setting && setting.map((item, index) => (
                                    <div key={index}>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                component={Link}
                                                to={item.path}
                                                selected={selectedItem === item}
                                                onClick={() => handleItemClick(item)}
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.title}/>
                                            </ListItemButton>
                                        </ListItem>
                                        {item.children && (
                                            <List>
                                                {item.children.map((child, childIndex) => (
                                                    <ListItem key={childIndex} disablePadding>
                                                        <ListItemButton
                                                            component={Link}
                                                            to={child.path}
                                                            selected={selectedItem === child}
                                                            onClick={() => handleItemClick(child)}
                                                        >
                                                            <ListItemIcon>
                                                                {child.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={child.title}/>
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        )}
                                    </div>
                                ))}
                            </List>
                        }

                    </Drawer>
                    <Main open={open}>
                        <div className={"mt-5"}>

                        </div>

                        <DrawerHeader/>
                        <Footer/>
                    </Main>
                </Box>
                <Divider/>

            </div>
        </>
    );
}
