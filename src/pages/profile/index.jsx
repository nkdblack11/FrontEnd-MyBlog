import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './style';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';


export default function Album() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [userInfo] = useGlobal("userInfo");
    const history = useHistory();

    const handleEditPost = (post) => {
        history.push("/post/edit/" + post.id + "/" + post.title)
    };

    const handleRequest = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/post/showPost/${userInfo.user_uid}`);
            setPosts(result.data);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        handleRequest();
    }, []);

    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <CardMedia
                            className={classes.media}
                            image={userInfo.avatar}
                            title="Paella dish"
                        />
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <Typography>
                                        {post.tag}
                                    </Typography>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {post.title}
                                        </Typography>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={post.images}
                                            title="Image title"
                                        />
                                        <Typography>
                                            {post.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={Link} to={"/post/" + post.id + "/" + post.title} size="small"
                                                color="primary">
                                            View
                                        </Button>
                                        {userInfo && userInfo.user_uid === post.user_uid ?
                                            <Button size="small" color="primary" onClick={() => handleEditPost(post)}>
                                                Edit
                                            </Button> : null}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
