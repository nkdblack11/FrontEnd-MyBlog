import React, {useState, useEffect} from 'react';
import {setGlobal, useGlobal} from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import _useStyles from './style'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import queryString from 'querystring';


function Login() {
    const classes = _useStyles();
    const history = useHistory();
    const [account, setAccount] = useState({});
    const [userInfo] = useGlobal("userInfo");

    const handleSignUp = () => {
        history.push("/signUp");
    };

    useEffect(() => {
        const {redirect_uri} = queryString.parse(window.location.href.split('?')[1]);
        if (redirect_uri) sessionStorage.setItem("redirect_uri", redirect_uri)
        if(userInfo){
            history.push('/')
        }
    }, []);


    const handleOnChange = (evt) => {
        const {id, value} = evt.target;
        if (id === "username") setAccount({...account, username: value});
        if (id === "password") setAccount({...account, password: value});
    };

    const getTokens = () => new Promise((resolve, reject) => {
        const config = {headers: {'Content-Type': 'application/json'}};
        axios.post('http://localhost:4000/auth/login', account, config)
            .then(res => resolve(res.data))
            .catch(reject);
    });

    const getUserInfo = (accessToken) => new Promise((resolve, reject) => {
        const config = {headers: {'Authorization': 'Bearer ' + accessToken}};
        axios.get('http://localhost:4000/profile', config)
            .then(res => resolve(res.data))
            .catch(reject);
    });

    const handleLogin = async () => {
        try {
            const {accessToken} = await getTokens();
            const userInfo = await getUserInfo(accessToken);
            setGlobal({
                userInfo,
                accessToken,
            });
            const redirect = sessionStorage.getItem("redirect_uri");
            if (redirect) {
                sessionStorage.removeItem("redirect_uri");
                return history.push(redirect.replace('http://localhost:3000', ''));
            }
            history.push("/")

        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        onClick={handleLogin}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={() => handleSignUp()} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login;
