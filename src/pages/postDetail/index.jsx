import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './style'
import {withRouter} from 'react-router-dom';
import axios from "axios";


function PostDetail(props) {

    const classes = useStyles();
    const [post, setPost] = useState({});

    const handleRequest = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/post/${props.match.params.id}`);
            setPost(result.data);
        } catch (err) {
           console.log(err);
            // Tra ve 404 page not found
        }
    };

    useEffect(() => {
        handleRequest();
        // eslint-disable-next-line
    }, []);


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <CardMedia
                        className={classes.image}
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={post.images}
                        title="Contemplative Reptile"
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default withRouter(PostDetail);
