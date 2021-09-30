import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Create() {
    function slugify(string) {
        const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    const history = useHistory();
    const initialFormData = Object.freeze({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
    });

    const [postData, updateFormData] = useState(initialFormData);
    const [postImage, setPostImage] = useState({image: null});

    const handleChange = (e) => {
        if([e.target.name] == 'image') {
            setPostImage({
                image: e.target.files[0],
            });
        }
        if([e.target.name] == 'title') {
            updateFormData({
                ...postData,
                //Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
        }
        else {
            updateFormData({
                ...postData,
                //Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', postData.title);
        formData.append('slug', postData.slug);
        formData.append('author', 1);
        formData.append('excerpt', postData.excerpt);
        formData.append('content', postData.content);
        if(postImage.image !== null) {
            formData.append('image', postImage.image);
        }        
        axiosInstance.post('', formData);
        history.push({
            pathname: '/admin/',
        });
        window.location.reload();
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create New Post
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required 
                                fullWidth 
                                id="title" 
                                label="Post Title"
                                name="title"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required 
                                fullWidth 
                                id="excerpt" 
                                label="Post Excerpt"
                                name="excerpt"
                                onChange={handleChange}
                                multiline 
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required 
                                fullWidth 
                                id="slug" 
                                label="slug"
                                name="slug"
                                value={postData.slug}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required 
                                fullWidth 
                                id="content" 
                                label="Post Content"
                                name="content"
                                onChange={handleChange}
                                multiline 
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined" 
                                fullWidth 
                                id="post-image" 
                                label="Post Image"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                type="file"
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        type="submit"
                        fullWidth 
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Create Post
                    </Button>
                </form>
            </div>
        </Container>
    );
}