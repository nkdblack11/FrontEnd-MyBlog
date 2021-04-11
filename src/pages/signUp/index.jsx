import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './style'
import {useHistory} from 'react-router-dom';
import axios from 'axios';


function SignUp() {
    const history = useHistory();
    const [account, setAccount] = useState({});
    const classes = useStyles();
    const [userInfo] = useGlobal("userInfo");

    const handleSignIn = () => {
        history.push("/login");
    };

    const handleChange = (evt) => {
        const {id, value} = evt.target;
        if (id === "username") setAccount({...account, username: value});
        if (id === "password") setAccount({...account, password: value});
        if (id === "confirmPassword") setAccount({...account, confirmPassword: value});
    };

    const getTokens = () => new Promise((resolve, reject) => {
        const config = {headers: {'Content-Type': 'application/json'}};
        axios.post('http://localhost:4000/auth/register', account, config)
            .then(res => resolve(res.data))
            .catch(reject);
    });

    const handleSignUp = async () => {
        try {
            const {accessToken} = await getTokens();
            if (accessToken) {
                const redirect = sessionStorage.getItem("redirect_uri");
                if (redirect){
                    sessionStorage.removeItem("redirect_uri");
                    return  history.push(redirect.replace("http://localhost:3000", ""));
                }
                history.push("/");
            }
        } catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        if(userInfo){
            history.push('/')
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={account.username || ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={() => handleSignUp()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => handleSignIn()} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
