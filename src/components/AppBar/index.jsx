import React, {useState} from 'react';
import {setGlobal} from 'reactn';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './style'
import {useHistory} from 'react-router';
import {useGlobal} from 'reactn';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';


const InitAppBar = () => {
    const classes = useStyles();
    const [userInfo] = useGlobal('userInfo');
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleRedirectLogin = () => {
        const href = window.location.href;
        const regexLogin = /^http:\/\/localhost:3000\/login/;
        const regexRegister = /^http:\/\/localhost:3000\/signUp/;
        if (!regexLogin.test(href) && !regexRegister.test(href)) {
            return history.push('/login?redirect_uri=' + window.location.href)
        }
        if (regexRegister.test(href)) {
            return history.push('/login')
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        sessionStorage.clear();
        setGlobal({
            accessToken: '',
            userInfo: null
        });
        await axios.delete('http://localhost:4000/auth/logOut');
        history.push('/')
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6" className={classes.title}>
                        Home
                    </Typography>
                    <div className={classes.root}/>
                    {!userInfo ? <Button onClick={handleRedirectLogin}
                                         aria-haspopup="true"
                                         color="inherit"
                        >
                            Login
                        </Button> : <button
                            onClick={handleClick}
                            aria-haspopup="true"
                            id="simple-menu"
                        >
                            <Avatar alt="Cindy Baker" src={userInfo.avatar}/>
                        </button>}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/profile" >Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default InitAppBar;
