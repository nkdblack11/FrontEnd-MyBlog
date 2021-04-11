import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './style';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const [userInfo] = useGlobal("userInfo");
    const [listPost, setListPost] = useState([]);

    const handleEditPost = (post) => {
            history.push("/post/edit/" + post.id + "/" + post.title)
    };

    const handleRequest = async () => {
        try {
            const result = await axios.get('http://localhost:4000/post/showAll');
            setListPost(result.data)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        handleRequest();
        // eslint-disable-next-line
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                {/* Hero unit */}
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {listPost.map((post, key) => (
                            <Grid item key={key} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>

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
                                        { userInfo && userInfo.user_uid === post.user_uid ? <Button size="small" color="primary" onClick={() => handleEditPost(post)}>
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

export default Home;
