import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../contexts/loginContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#1e1e1e',
        color: '#fff',
    },
    white: {
        color: '#fff',
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    dashboard: {
        marginRight: theme.spacing(-1),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    loggedMessage: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

function Header() {
    const classes = useStyles(); 

    const { user, setUser, isAuth } = useContext(LoginContext);

    let history = useHistory();
    const [data, setData] = useState({ search: '' });

    const goSearch = (e) => {
        history.push({
            pathname: '/search/',
            search: '?search=' + data.search,
        });
        window.location.reload();
    };

    return (
        <React.Fragment>            
            <CssBaseline />
            <AppBar 
                position="static" 
                elevation={0} 
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        <Link 
                            component={NavLink}
                            to="/"
                            underline="none"
                            className={classes.white}
                        >
                            ActaBlog
                        </Link>
                    </Typography>
                    
                    <SearchBar
                        value={data.search}
                        onChange={(newValue) => setData({ search: newValue })}
                        onRequestSearch={() => goSearch(data.search)}
                    />

                    {isAuth ?                   
                        <>
                            <p className={classes.loggedMessage}>Welcome, {user}</p>
                            <Button 
                                href="#"
                                color="secondary"
                                variant="contained"
                                className={classes.dashboard}
                                component={NavLink}
                                to="/admin"
                            >
                                Dashboard
                            </Button>
                            <Button 
                                href="#"
                                color="secondary"
                                variant="outlined"
                                className={classes.link}
                                component={NavLink}
                                to="/logout"
                            >
                                Logout
                            </Button>
                        </>
                        :
                        <>
                        <nav>
                            <Link 
                                color="textPrimary"
                                className={`${classes.link} ${classes.white}`}
                                component={NavLink}
                                to="/register"
                            >
                                Register
                            </Link>
                        </nav>                    
                            <Button 
                                href="#"
                                color="secondary"
                                variant="contained"
                                className={classes.link}
                                component={NavLink}
                                to="/login"
                            >
                                Login
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );  
}

export default Header;
