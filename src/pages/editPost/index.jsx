import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';


export default function EditPost() {
    const classes = useStyles();
    const [post, setPost] = useState({});
    const history = useHistory();
    const params = useParams();
    const [accessToken] = useGlobal("accessToken");

    const editPost = (image) => new Promise((resolve, reject) => {
        const config = {headers: {'Authorization': 'Bearer ' + accessToken}};
        post.image = image;
        axios.post(`http://localhost:4000/post/edit/${params.id}`, post, config)
            .then(res => resolve(res))
            .catch(reject);
    });

    const handleOnChange = (evt) => {
        const {id, value, files} = evt.target;
        console.log(evt);
        if (id === "image") return setPost({...post, image: files[0]});
        setPost({...post, [id]: value});
        console.log('post ', post)
    };

    const handleEditPost = async () => {
        try {

            const data = new FormData();
            data.append('image', post.image);

            const resultImg = await axios.post('http://localhost:4000/upload-file/uploadFile', data,
                {headers: {'Content-Type': 'multipart/form-data'}});

            const result = await editPost(resultImg.data.image);
            if (result.status === 200) {
                return history.goBack();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={handleOnChange}
                            margin="normal"
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                        />
                        <TextField
                            onChange={handleOnChange}
                            margin="normal"
                            fullWidth
                            name="content"
                            label="Content"
                            id="content"
                        />
                        <TextField
                            onChange={handleOnChange}
                            margin="normal"
                            fullWidth
                            name="tag"
                            label="Tag"
                            id="tag"
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    onClick={handleEditPost}
                                    variant="body2">
                                    Save
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link
                                    onClick={handleEditPost}
                                    href="#" variant="body2">
                                    Case
                                </Link>
                            </Grid>
                            <input
                                onChange={handleOnChange}
                                type="file"
                                id="image"
                                name="image"/>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
