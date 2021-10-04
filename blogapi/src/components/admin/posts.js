import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
}));

const Posts = (props) => {
    const { posts } = props;
    const classes = useStyles();
    if(!posts || posts.length === 0) return <p>Cannot find any posts, sorry.</p>;
    return (
        <React.Fragment>
            <Container maxWidth="md" component="main">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => {
                                    return (
                                        <TableRow key={post.id}>
                                            <TableCell component="th" scope="row">
                                                {post.id}
                                            </TableCell>
                                            <TableCell align="left">{post.categoryName}</TableCell>
                                            <TableCell align="left">{post.authorUserName}</TableCell>
                                            <TableCell align="left">
                                                <Link
                                                    component={NavLink}
                                                    color="textPrimary"
                                                    to={'/post/' + post.slug}
                                                    className={classes.link}
                                                >
                                                    {post.title}
                                                </Link>
                                            </TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    component={NavLink}
                                                    color="textPrimary"
                                                    to={'/admin/edit/' + post.slug}
                                                    className={classes.link}
                                                >
                                                    <EditIcon></EditIcon>
                                                </Link>
                                                <Link
                                                    component={NavLink}
                                                    color="secondary"
                                                    to={'/admin/delete/' + post.slug}
                                                    className={classes.link}
                                                >
                                                    <DeleteForeverIcon></DeleteForeverIcon>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell colSpan={5} align="right">
                                        <Button component={NavLink} to={'/admin/create/'} variant="contained" color="primary">
                                            <AddIcon></AddIcon> New Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Posts;