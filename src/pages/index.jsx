import React, {useEffect, useState} from 'react';
import {setGlobal} from 'reactn';
import CircularProgress from '@material-ui/core/CircularProgress';
import Login from "./login";
import Home from "./home";
import PostDetail from "./postDetail";
import EditPost from "./editPost";
import SignUp from "./signUp";
import Profile from './profile'
import axios from 'axios';

import {
    Switch,
    Route,
} from "react-router-dom";

function Page() {

    const [isLoading, setIsLoading] = useState(true);

    const getTokens = () => new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/auth/refreshToken')
            .then(res => resolve(res.data))
            .catch(reject);
    });

    const getUserInfo = (accessToken) => new Promise((resolve, reject) => {
        const config = {headers: {'Authorization': 'Bearer ' + accessToken}};
        axios.get('http://localhost:4000/profile', config)
            .then(res => resolve(res.data))
            .catch(reject);
    });

    const handleFirstRequest = async () => {
        try {
            const {accessToken} = await getTokens();
            const userInfo = await getUserInfo(accessToken);
            await setGlobal({
                accessToken,
                userInfo,
            });
            setIsLoading(false)
        } catch (e) {
            console.log(e);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        handleFirstRequest();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isLoading ? <CircularProgress/> :
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/signUp">
                        <SignUp/>
                    </Route>
                    <Route exact path="/post/:id/:title">
                        <PostDetail/>
                    </Route>
                    <Route path="/post/edit/:id">
                        <EditPost/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                </Switch>
            }
        </>
    );
}

export default Page;
