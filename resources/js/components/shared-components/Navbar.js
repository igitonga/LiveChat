import React, {useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import ChatIcon from '@mui/icons-material/Chat';import GroupIcon from '@mui/icons-material/Group';
import Person2Icon from '@mui/icons-material/Person2';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CallIcon from '@mui/icons-material/Call';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import { getNotifications } from '../../redux/notificationSlice';

import { Outlet, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Badge } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
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
})(({ theme, open }) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notificationsCount } = useSelector(state => state.notification);

  const menuOptions = [
    {
      id: 4,
      title: 'Profile',
      icon: <Person2Icon />,
      action: () => {
        navigate('profile')
        setOpen(false)
      },
  },
    {
        id: 1,
        title: 'Chats',
        icon: <ChatIcon />,
        action: () => {
          navigate('/')
          setOpen(false)
        },
    },
    {
        id: 2,
        title: 'Groups',
        icon: <GroupIcon />,
        action: null,
    },
    {
        id: 3,
        title: 'Calls',
        icon: <CallIcon />,
        action: null,
    },
    {
      id: 5,
      title: 'Logout',
      icon: <LogoutIcon />,
      action: () => {
        dispatch(logoutUser())
      },
    },
  ]

  const menuOptions2 = [
    {
        id: 1,
        title: 'Invite Friends',
        icon: <PersonAddIcon />,
        action: null,
    },
    {
        id: 2,
        title: 'Delete Account',
        icon: <RemoveCircleIcon />,
        action: null,
    },
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const redirectNotificationsPage = () => {
    navigate('notifications');
  }

  useEffect(() => {
    dispatch(getNotifications());
  },[]);

  return (
    <>
      <Box style={{ display: 'flex', position: 'sticky'}}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="flex justify-between">
            <div className='flex items-center'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                Talkative
              </Typography>
            </div>

            <Badge badgeContent={notificationsCount} color='success'>
              <NotificationsIcon onClick={redirectNotificationsPage}/>
            </Badge>
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
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          {menuOptions.map((menu) => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton onClick={menu.action}>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {menuOptions2.map((menu) => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
